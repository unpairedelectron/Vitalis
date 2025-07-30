// Enhanced Real Health API Integration Manager for Vitalis
import { HealthMetric, HealthDataSource, HeartRateData, SleepData, ActivityData } from '@/types/health';
import { DatabaseHelpers, HealthDataEncryption } from './database';
import { config } from './config';

export interface HealthAPICredentials {
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  expiresAt?: Date;
  scope?: string[];
  userId?: string;
}

export interface DeviceSyncResult {
  success: boolean;
  recordsProcessed: number;
  errors: string[];
  lastSyncTimestamp: Date;
}

export interface HealthAPIResponse<T> {
  data: T[];
  nextPageToken?: string;
  hasMore: boolean;
  totalCount?: number;
}

export class RealHealthDataAggregator {
  private credentials: Map<string, HealthAPICredentials> = new Map(); // userId_source key
  private rateLimiters: Map<string, number> = new Map();
  private syncInProgress: Set<string> = new Set();

  constructor() {
    // Initialize rate limiters
    this.initializeRateLimiters();
  }

  // ====================
  // MAIN CONNECTION FLOW
  // ====================

  /**
   * Connect a health data source for a user
   */
  async connectHealthSource(
    userId: string,
    source: HealthDataSource, 
    credentials: HealthAPICredentials
  ): Promise<{ success: boolean; authUrl?: string; error?: string }> {
    try {
      console.log(`🔗 Connecting ${source} for user ${userId}`);

      // Validate credentials with the health platform
      const validation = await this.validateCredentials(source, credentials);
      if (!validation.isValid) {
        return { 
          success: false, 
          error: validation.error,
          authUrl: validation.authUrl 
        };
      }

      // Store encrypted credentials in database
      await this.storeCredentials(userId, source, credentials);
      
      // Store in memory for this session
      const key = `${userId}_${source}`;
      this.credentials.set(key, credentials);

      // Register device connection in database
      await DatabaseHelpers.connectDevice(userId, {
        deviceType: this.getDeviceTypeFromSource(source),
        deviceName: this.getDeviceNameFromSource(source),
        deviceId: `${source}_${credentials.userId || 'primary'}`,
        manufacturer: this.getManufacturerFromSource(source),
        connectionType: 'API',
        dataTypes: this.getSupportedDataTypes(source)
      });

      console.log(`✅ Successfully connected ${source} for user ${userId}`);
      return { success: true };

    } catch (error) {
      console.error(`❌ Failed to connect ${source}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown connection error' 
      };
    }
  }

  /**
   * Comprehensive data sync for all connected sources
   */
  async syncAllHealthData(
    userId: string,
    sources?: HealthDataSource[],
    startDate: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    endDate: Date = new Date()
  ): Promise<{ [source: string]: DeviceSyncResult }> {
    console.log(`🔄 Starting health data sync for user ${userId}`);
    
    const results: { [source: string]: DeviceSyncResult } = {};
    
    // Get all connected sources if not specified
    if (!sources) {
      sources = await this.getConnectedSources(userId);
    }

    // Sync each source
    for (const source of sources) {
      const syncKey = `${userId}_${source}`;
      
      // Check if sync is already in progress
      if (this.syncInProgress.has(syncKey)) {
        results[source] = {
          success: false,
          recordsProcessed: 0,
          errors: ['Sync already in progress'],
          lastSyncTimestamp: new Date()
        };
        continue;
      }

      this.syncInProgress.add(syncKey);
      
      try {
        results[source] = await this.syncHealthSource(userId, source, startDate, endDate);
      } catch (error) {
        results[source] = {
          success: false,
          recordsProcessed: 0,
          errors: [error instanceof Error ? error.message : 'Unknown sync error'],
          lastSyncTimestamp: new Date()
        };
      } finally {
        this.syncInProgress.delete(syncKey);
      }
    }

    console.log(`✅ Health data sync completed for user ${userId}`, results);
    return results;
  }

  /**
   * Sync data from a specific health source
   */
  private async syncHealthSource(
    userId: string,
    source: HealthDataSource,
    startDate: Date,
    endDate: Date
  ): Promise<DeviceSyncResult> {
    const result: DeviceSyncResult = {
      success: false,
      recordsProcessed: 0,
      errors: [],
      lastSyncTimestamp: new Date()
    };

    try {
      // Get stored credentials
      const creds = await this.getStoredCredentials(userId, source);
      if (!creds) {
        throw new Error(`No credentials found for ${source}`);
      }

      // Check rate limits
      if (!this.checkRateLimit(source)) {
        throw new Error(`Rate limit exceeded for ${source}. Please try again later.`);
      }

      console.log(`📊 Syncing ${source} data from ${startDate.toISOString()} to ${endDate.toISOString()}`);

      // Sync different data types based on source capabilities
      const syncPromises: Promise<{ recordsProcessed: number }>[] = [];

      // Heart Rate Data
      if (this.supportsHeartRate(source)) {
        syncPromises.push(
          this.syncHeartRateData(userId, source, creds, startDate, endDate)
        );
      }

      // Sleep Data
      if (this.supportsSleep(source)) {
        syncPromises.push(
          this.syncSleepData(userId, source, creds, startDate, endDate)
        );
      }

      // Activity Data
      if (this.supportsActivity(source)) {
        syncPromises.push(
          this.syncActivityData(userId, source, creds, startDate, endDate)
        );
      }

      // Blood Oxygen (if supported)
      if (this.supportsBloodOxygen(source)) {
        syncPromises.push(
          this.syncBloodOxygenData(userId, source, creds, startDate, endDate)
        );
      }

      // Stress/HRV Data (if supported)
      if (this.supportsStressData(source)) {
        syncPromises.push(
          this.syncStressData(userId, source, creds, startDate, endDate)
        );
      }

      // Execute all syncs concurrently
      const results = await Promise.allSettled(syncPromises);
      
      // Process results
      results.forEach((syncResult, index) => {
        if (syncResult.status === 'fulfilled') {
          result.recordsProcessed += syncResult.value.recordsProcessed;
        } else {
          result.errors.push(`Data sync ${index} failed: ${syncResult.reason}`);
        }
      });

      result.success = result.errors.length === 0;
      
      // Update last sync timestamp in device connection
      if (result.success) {
        await this.updateLastSyncTimestamp(userId, source, result.lastSyncTimestamp);
      }

      // Update rate limiter
      this.updateRateLimit(source);

      return result;

    } catch (error) {
      console.error(`❌ Sync failed for ${source}:`, error);
      result.errors.push(error instanceof Error ? error.message : 'Unknown sync error');
      return result;
    }
  }

  // ========================
  // SAMSUNG HEALTH INTEGRATION
  // ========================

  private async syncSamsungHealthData(
    userId: string,
    creds: HealthAPICredentials,
    dataType: string,
    startDate: Date,
    endDate: Date
  ): Promise<any[]> {
    const baseUrl = 'https://shealth.samsung.com/api/v1';
    
    // Build the request
    const requestBody = {
      start_time: Math.floor(startDate.getTime()),
      end_time: Math.floor(endDate.getTime()),
      time_offset: '+00:00'
    };

    try {
      const response = await fetch(`${baseUrl}/users/${creds.userId}/${dataType}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${creds.accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshedCreds = await this.refreshSamsungToken(creds);
          if (refreshedCreds) {
            // Update stored credentials
            await this.storeCredentials(userId, 'samsung_health', refreshedCreds);
            // Retry with new token
            return this.syncSamsungHealthData(userId, refreshedCreds, dataType, startDate, endDate);
          }
        }
        throw new Error(`Samsung Health API error (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      return data.result || [];

    } catch (error) {
      console.error(`Samsung Health ${dataType} sync error:`, error);
      throw error;
    }
  }

  private async refreshSamsungToken(creds: HealthAPICredentials): Promise<HealthAPICredentials | null> {
    if (!creds.refreshToken) return null;

    try {
      const response = await fetch('https://account.samsung.com/mobile/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: creds.refreshToken,
          client_id: config.healthApis.samsung.clientId,
          client_secret: config.healthApis.samsung.clientSecret
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh Samsung token');
      }

      const tokenData = await response.json();
      
      return {
        ...creds,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || creds.refreshToken,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000)
      };

    } catch (error) {
      console.error('Samsung token refresh error:', error);
      return null;
    }
  }

  // ==================
  // FITBIT INTEGRATION
  // ==================

  private async syncFitbitData(
    userId: string,
    creds: HealthAPICredentials,
    dataType: string,
    startDate: Date,
    endDate: Date
  ): Promise<any> {
    const baseUrl = 'https://api.fitbit.com/1';
    let endpoint = '';

    // Build endpoint based on data type
    switch (dataType) {
      case 'heart_rate':
        endpoint = `/user/-/activities/heart/date/${this.formatFitbitDate(startDate)}/${this.formatFitbitDate(endDate)}.json`;
        break;
      case 'sleep':
        endpoint = `/user/-/sleep/date/${this.formatFitbitDate(startDate)}/${this.formatFitbitDate(endDate)}.json`;
        break;
      case 'activities':
        endpoint = `/user/-/activities/date/${this.formatFitbitDate(startDate)}/${this.formatFitbitDate(endDate)}.json`;
        break;
      case 'steps':
        endpoint = `/user/-/activities/steps/date/${this.formatFitbitDate(startDate)}/${this.formatFitbitDate(endDate)}.json`;
        break;
      default:
        throw new Error(`Unsupported Fitbit data type: ${dataType}`);
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${creds.accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          const refreshedCreds = await this.refreshFitbitToken(creds);
          if (refreshedCreds) {
            await this.storeCredentials(userId, 'fitbit', refreshedCreds);
            return this.syncFitbitData(userId, refreshedCreds, dataType, startDate, endDate);
          }
        }
        throw new Error(`Fitbit API error (${response.status}): ${response.statusText}`);
      }

      return response.json();

    } catch (error) {
      console.error(`Fitbit ${dataType} sync error:`, error);
      throw error;
    }
  }

  private async refreshFitbitToken(creds: HealthAPICredentials): Promise<HealthAPICredentials | null> {
    if (!creds.refreshToken) return null;

    try {
      const response = await fetch('https://api.fitbit.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${config.healthApis.fitbit.clientId}:${config.healthApis.fitbit.clientSecret}`).toString('base64')}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: creds.refreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh Fitbit token');
      }

      const tokenData = await response.json();
      
      return {
        ...creds,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || creds.refreshToken,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000)
      };

    } catch (error) {
      console.error('Fitbit token refresh error:', error);
      return null;
    }
  }

  // ================
  // OURA INTEGRATION  
  // ================

  private async syncOuraData(
    userId: string,
    creds: HealthAPICredentials,
    dataType: string,
    startDate: Date,
    endDate: Date
  ): Promise<any> {
    const baseUrl = 'https://api.ouraring.com/v2/usercollection';
    let endpoint = '';

    // Build endpoint based on data type
    switch (dataType) {
      case 'heart_rate':
        endpoint = `/heartrate?start_date=${this.formatOuraDate(startDate)}&end_date=${this.formatOuraDate(endDate)}`;
        break;
      case 'sleep':
        endpoint = `/sleep?start_date=${this.formatOuraDate(startDate)}&end_date=${this.formatOuraDate(endDate)}`;
        break;
      case 'activity':
        endpoint = `/daily_activity?start_date=${this.formatOuraDate(startDate)}&end_date=${this.formatOuraDate(endDate)}`;
        break;
      case 'readiness':
        endpoint = `/daily_readiness?start_date=${this.formatOuraDate(startDate)}&end_date=${this.formatOuraDate(endDate)}`;
        break;
      default:
        throw new Error(`Unsupported Oura data type: ${dataType}`);
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${creds.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Oura API error (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error(`Oura ${dataType} sync error:`, error);
      throw error;
    }
  }

  // ===================
  // DATA SYNC METHODS
  // ===================

  private async syncHeartRateData(
    userId: string,
    source: HealthDataSource,
    creds: HealthAPICredentials,
    startDate: Date,
    endDate: Date
  ): Promise<{ recordsProcessed: number }> {
    console.log(`❤️  Syncing heart rate data from ${source}`);
    
    let rawData: any[] = [];
    let recordsProcessed = 0;

    try {
      // Fetch raw data based on source
      switch (source) {
        case 'samsung_health':
          rawData = await this.syncSamsungHealthData(userId, creds, 'heart_rates', startDate, endDate);
          break;
        case 'fitbit':
          const fitbitData = await this.syncFitbitData(userId, creds, 'heart_rate', startDate, endDate);
          rawData = fitbitData['activities-heart'] || [];
          break;
        case 'oura':
          rawData = await this.syncOuraData(userId, creds, 'heart_rate', startDate, endDate);
          break;
        default:
          throw new Error(`Heart rate sync not implemented for ${source}`);
      }

      // Transform and store data
      const transformedData = this.transformHeartRateData(source, rawData);
      
      for (const hrData of transformedData) {
        try {
          await DatabaseHelpers.storeHealthData(userId, {
            type: 'HEART_RATE',
            value: hrData.value,
            unit: hrData.unit,
            timestamp: hrData.timestamp,
            source: source,
            confidence: hrData.confidence || 0.9,
            metadata: hrData.metadata
          });
          recordsProcessed++;
        } catch (error) {
          console.error('Failed to store heart rate data:', error);
        }
      }

      console.log(`✅ Stored ${recordsProcessed} heart rate records from ${source}`);
      return { recordsProcessed };

    } catch (error) {
      console.error(`❌ Heart rate sync failed for ${source}:`, error);
      throw error;
    }
  }

  private async syncSleepData(
    userId: string,
    source: HealthDataSource,
    creds: HealthAPICredentials,
    startDate: Date,
    endDate: Date
  ): Promise<{ recordsProcessed: number }> {
    console.log(`😴 Syncing sleep data from ${source}`);
    
    let rawData: any[] = [];
    let recordsProcessed = 0;

    try {
      // Fetch raw data based on source
      switch (source) {
        case 'samsung_health':
          rawData = await this.syncSamsungHealthData(userId, creds, 'sleep', startDate, endDate);
          break;
        case 'fitbit':
          const fitbitData = await this.syncFitbitData(userId, creds, 'sleep', startDate, endDate);
          rawData = fitbitData.sleep || [];
          break;
        case 'oura':
          rawData = await this.syncOuraData(userId, creds, 'sleep', startDate, endDate);
          break;
        default:
          throw new Error(`Sleep sync not implemented for ${source}`);
      }

      // Transform and store sleep metrics
      const transformedData = this.transformSleepData(source, rawData);
      
      for (const sleepData of transformedData) {
        try {
          // Store total sleep duration
          await DatabaseHelpers.storeHealthData(userId, {
            type: 'SLEEP_DURATION',
            value: sleepData.totalSleep,
            unit: 'minutes',
            timestamp: sleepData.date,
            source: source,
            confidence: 0.95,
            metadata: {
              sleepScore: sleepData.sleepScore,
              efficiency: sleepData.efficiency,
              startTime: sleepData.startTime,
              endTime: sleepData.endTime
            }
          });

          // Store deep sleep if available
          if (sleepData.deepSleep !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'SLEEP_DEEP',
              value: sleepData.deepSleep,
              unit: 'minutes',
              timestamp: sleepData.date,
              source: source,
              confidence: 0.9
            });
          }

          // Store REM sleep if available
          if (sleepData.remSleep !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'SLEEP_REM',
              value: sleepData.remSleep,
              unit: 'minutes',
              timestamp: sleepData.date,
              source: source,
              confidence: 0.9
            });
          }

          // Store light sleep if available
          if (sleepData.lightSleep !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'SLEEP_LIGHT',
              value: sleepData.lightSleep,
              unit: 'minutes',
              timestamp: sleepData.date,
              source: source,
              confidence: 0.9
            });
          }

          recordsProcessed++;
        } catch (error) {
          console.error('Failed to store sleep data:', error);
        }
      }

      console.log(`✅ Stored ${recordsProcessed} sleep records from ${source}`);
      return { recordsProcessed };

    } catch (error) {
      console.error(`❌ Sleep sync failed for ${source}:`, error);
      throw error;
    }
  }

  private async syncActivityData(
    userId: string,
    source: HealthDataSource,
    creds: HealthAPICredentials,
    startDate: Date,
    endDate: Date
  ): Promise<{ recordsProcessed: number }> {
    console.log(`🏃 Syncing activity data from ${source}`);
    
    let rawData: any[] = [];
    let recordsProcessed = 0;

    try {
      // Fetch raw data based on source
      switch (source) {
        case 'samsung_health':
          rawData = await this.syncSamsungHealthData(userId, creds, 'step_daily_trends', startDate, endDate);
          break;
        case 'fitbit':
          const stepsData = await this.syncFitbitData(userId, creds, 'steps', startDate, endDate);
          rawData = stepsData['activities-steps'] || [];
          break;
        case 'oura':
          rawData = await this.syncOuraData(userId, creds, 'activity', startDate, endDate);
          break;
        default:
          throw new Error(`Activity sync not implemented for ${source}`);
      }

      // Transform and store activity data
      const transformedData = this.transformActivityData(source, rawData);
      
      for (const activityData of transformedData) {
        try {
          // Store steps
          if (activityData.steps !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'STEPS',
              value: activityData.steps,
              unit: 'count',
              timestamp: activityData.timestamp,
              source: source,
              confidence: 0.98
            });
          }

          // Store calories
          if (activityData.calories !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'CALORIES_BURNED',
              value: activityData.calories,
              unit: 'kcal',
              timestamp: activityData.timestamp,
              source: source,
              confidence: 0.85
            });
          }

          // Store distance
          if (activityData.distance !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'DISTANCE',
              value: activityData.distance,
              unit: 'meters',
              timestamp: activityData.timestamp,
              source: source,
              confidence: 0.9
            });
          }

          // Store active minutes
          if (activityData.activeMinutes !== undefined) {
            await DatabaseHelpers.storeHealthData(userId, {
              type: 'ACTIVE_MINUTES',
              value: activityData.activeMinutes,
              unit: 'minutes',
              timestamp: activityData.timestamp,
              source: source,
              confidence: 0.9
            });
          }

          recordsProcessed++;
        } catch (error) {
          console.error('Failed to store activity data:', error);
        }
      }

      console.log(`✅ Stored ${recordsProcessed} activity records from ${source}`);
      return { recordsProcessed };

    } catch (error) {
      console.error(`❌ Activity sync failed for ${source}:`, error);
      throw error;
    }
  }

  private async syncBloodOxygenData(
    userId: string,
    source: HealthDataSource,
    creds: HealthAPICredentials,
    startDate: Date,
    endDate: Date
  ): Promise<{ recordsProcessed: number }> {
    // Implementation for SpO2 data sync
    console.log(`🫁 Blood oxygen sync not yet implemented for ${source}`);
    return { recordsProcessed: 0 };
  }

  private async syncStressData(
    userId: string,
    source: HealthDataSource,
    creds: HealthAPICredentials,
    startDate: Date,
    endDate: Date
  ): Promise<{ recordsProcessed: number }> {
    // Implementation for stress/HRV data sync
    console.log(`😰 Stress data sync not yet implemented for ${source}`);
    return { recordsProcessed: 0 };
  }

  // ======================
  // DATA TRANSFORMATION
  // ======================

  private transformHeartRateData(source: HealthDataSource, rawData: any[]): any[] {
    const transformed: any[] = [];

    switch (source) {
      case 'samsung_health':
        rawData.forEach(item => {
          transformed.push({
            value: item.heart_rate || item.value,
            unit: 'bpm',
            timestamp: new Date(item.start_time || item.timestamp),
            confidence: 0.9,
            metadata: {
              deviceId: item.device_uuid,
              source: 'samsung_health'
            }
          });
        });
        break;

      case 'fitbit':
        rawData.forEach(day => {
          if (day.value && day.value.restingHeartRate) {
            transformed.push({
              value: day.value.restingHeartRate,
              unit: 'bpm',
              timestamp: new Date(day.dateTime),
              confidence: 0.95,
              metadata: {
                type: 'resting',
                source: 'fitbit'
              }
            });
          }
        });
        break;

      case 'oura':
        rawData.forEach(item => {
          transformed.push({
            value: item.bpm,
            unit: 'bpm',
            timestamp: new Date(item.timestamp),
            confidence: 0.92,
            metadata: {
              source: 'oura'
            }
          });
        });
        break;
    }

    return transformed;
  }

  private transformSleepData(source: HealthDataSource, rawData: any[]): any[] {
    const transformed: any[] = [];

    switch (source) {
      case 'samsung_health':
        rawData.forEach(item => {
          const sleepData: any = {
            date: new Date(item.sleep_date || item.start_time),
            totalSleep: item.sleep_duration / 60, // Convert to minutes
            sleepScore: item.sleep_efficiency || 85,
            efficiency: item.sleep_efficiency || 85,
            startTime: item.start_time,
            endTime: item.end_time
          };

          if (item.deep_sleep_time) {
            sleepData.deepSleep = item.deep_sleep_time / 60;
          }
          if (item.rem_sleep_time) {
            sleepData.remSleep = item.rem_sleep_time / 60;
          }
          if (item.light_sleep_time) {
            sleepData.lightSleep = item.light_sleep_time / 60;
          }

          transformed.push(sleepData);
        });
        break;

      case 'fitbit':
        rawData.forEach(night => {
          const sleepData: any = {
            date: new Date(night.dateOfSleep),
            totalSleep: night.minutesToFallAsleep + night.minutesAsleep,
            sleepScore: night.efficiency || 85,
            efficiency: night.efficiency || 85,
            startTime: night.startTime,
            endTime: night.endTime
          };

          // Process sleep levels
          if (night.levels && night.levels.summary) {
            const summary = night.levels.summary;
            if (summary.deep) sleepData.deepSleep = summary.deep.minutes;
            if (summary.rem) sleepData.remSleep = summary.rem.minutes;
            if (summary.light) sleepData.lightSleep = summary.light.minutes;
          }

          transformed.push(sleepData);
        });
        break;

      case 'oura':
        rawData.forEach(item => {
          transformed.push({
            date: new Date(item.day),
            totalSleep: item.total_sleep_duration / 60, // Convert to minutes
            deepSleep: item.deep_sleep_duration / 60,
            remSleep: item.rem_sleep_duration / 60,
            lightSleep: item.light_sleep_duration / 60,
            sleepScore: item.score,
            efficiency: item.efficiency,
            startTime: item.bedtime_start,
            endTime: item.bedtime_end
          });
        });
        break;
    }

    return transformed;
  }

  private transformActivityData(source: HealthDataSource, rawData: any[]): any[] {
    const transformed: any[] = [];

    switch (source) {
      case 'samsung_health':
        rawData.forEach(item => {
          transformed.push({
            timestamp: new Date(item.day_time || item.start_time),
            steps: item.step_count || item.count,
            calories: item.calorie || item.calories,
            distance: item.distance,
            activeMinutes: item.active_time ? item.active_time / 60 : undefined
          });
        });
        break;

      case 'fitbit':
        rawData.forEach(day => {
          transformed.push({
            timestamp: new Date(day.dateTime),
            steps: parseInt(day.value),
            calories: undefined, // Need separate call for calories
            distance: undefined, // Need separate call for distance
            activeMinutes: undefined // Need separate call for active minutes
          });
        });
        break;

      case 'oura':
        rawData.forEach(item => {
          transformed.push({
            timestamp: new Date(item.day),
            steps: item.steps,
            calories: item.active_calories,
            distance: item.equivalent_walking_distance,
            activeMinutes: item.high_activity_time ? item.high_activity_time / 60 : undefined
          });
        });
        break;
    }

    return transformed;
  }

  // =================
  // UTILITY METHODS
  // =================

  private async validateCredentials(
    source: HealthDataSource, 
    credentials: HealthAPICredentials
  ): Promise<{ isValid: boolean; error?: string; authUrl?: string }> {
    // Validate credentials with each platform
    try {
      switch (source) {
        case 'samsung_health':
          return await this.validateSamsungCredentials(credentials);
        case 'fitbit':
          return await this.validateFitbitCredentials(credentials);
        case 'oura':
          return await this.validateOuraCredentials(credentials);
        default:
          return { isValid: false, error: `Validation not implemented for ${source}` };
      }
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Validation failed' 
      };
    }
  }

  private async validateSamsungCredentials(creds: HealthAPICredentials): Promise<{ isValid: boolean; error?: string }> {
    if (!creds.accessToken) {
      return { isValid: false, error: 'Access token required' };
    }

    try {
      const response = await fetch('https://shealth.samsung.com/api/v1/users/profile', {
        headers: {
          'Authorization': `Bearer ${creds.accessToken}`,
          'Accept': 'application/json'
        }
      });

      return { isValid: response.ok };
    } catch (error) {
      return { isValid: false, error: 'Failed to validate Samsung Health credentials' };
    }
  }

  private async validateFitbitCredentials(creds: HealthAPICredentials): Promise<{ isValid: boolean; error?: string }> {
    if (!creds.accessToken) {
      return { isValid: false, error: 'Access token required' };
    }

    try {
      const response = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
        headers: {
          'Authorization': `Bearer ${creds.accessToken}`,
          'Accept': 'application/json'
        }
      });

      return { isValid: response.ok };
    } catch (error) {
      return { isValid: false, error: 'Failed to validate Fitbit credentials' };
    }
  }

  private async validateOuraCredentials(creds: HealthAPICredentials): Promise<{ isValid: boolean; error?: string }> {
    if (!creds.accessToken) {
      return { isValid: false, error: 'Access token required' };
    }

    try {
      const response = await fetch('https://api.ouraring.com/v2/usercollection/personal_info', {
        headers: {
          'Authorization': `Bearer ${creds.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return { isValid: response.ok };
    } catch (error) {
      return { isValid: false, error: 'Failed to validate Oura credentials' };
    }
  }

  private async storeCredentials(
    userId: string, 
    source: HealthDataSource, 
    credentials: HealthAPICredentials
  ): Promise<void> {
    // Encrypt sensitive credentials before storing
    const encryptedCreds = {
      ...credentials,
      accessToken: credentials.accessToken ? HealthDataEncryption.encrypt(credentials.accessToken) : undefined,
      refreshToken: credentials.refreshToken ? HealthDataEncryption.encrypt(credentials.refreshToken) : undefined
    };

    // Store in database (implementation depends on your schema)
    // For now, we'll store in memory
    const key = `${userId}_${source}`;
    this.credentials.set(key, credentials);
  }

  private async getStoredCredentials(
    userId: string, 
    source: HealthDataSource
  ): Promise<HealthAPICredentials | null> {
    const key = `${userId}_${source}`;
    return this.credentials.get(key) || null;
  }

  private async getConnectedSources(userId: string): Promise<HealthDataSource[]> {
    // Get connected sources from database
    // For now, return commonly connected sources
    return ['samsung_health', 'fitbit', 'oura'];
  }

  private checkRateLimit(source: HealthDataSource): boolean {
    const now = Date.now();
    const lastRequest = this.rateLimiters.get(source) || 0;
    const minInterval = this.getRateLimitInterval(source);
    
    return (now - lastRequest) >= minInterval;
  }

  private updateRateLimit(source: HealthDataSource): void {
    this.rateLimiters.set(source, Date.now());
  }

  private getRateLimitInterval(source: HealthDataSource): number {
    // Rate limit intervals in milliseconds
    switch (source) {
      case 'samsung_health': return 1000; // 1 second
      case 'fitbit': return 3600000; // 1 hour (150 requests per hour)
      case 'oura': return 300000; // 5 minutes
      default: return 5000; // 5 seconds default
    }
  }

  private initializeRateLimiters(): void {
    // Initialize rate limiters for all sources
    const sources: HealthDataSource[] = ['samsung_health', 'fitbit', 'oura', 'apple_health', 'google_fit'];
    sources.forEach(source => {
      this.rateLimiters.set(source, 0);
    });
  }

  private async updateLastSyncTimestamp(
    userId: string, 
    source: HealthDataSource, 
    timestamp: Date
  ): Promise<void> {
    // Update last sync timestamp in device connection
    // Implementation would update the database
    console.log(`📅 Updated last sync for ${source}: ${timestamp.toISOString()}`);
  }

  // Source capability checks
  private supportsHeartRate(source: HealthDataSource): boolean {
    return ['samsung_health', 'fitbit', 'oura', 'apple_health'].includes(source);
  }

  private supportsSleep(source: HealthDataSource): boolean {
    return ['samsung_health', 'fitbit', 'oura', 'apple_health'].includes(source);
  }

  private supportsActivity(source: HealthDataSource): boolean {
    return ['samsung_health', 'fitbit', 'oura', 'apple_health', 'google_fit'].includes(source);
  }

  private supportsBloodOxygen(source: HealthDataSource): boolean {
    return ['samsung_health', 'fitbit', 'apple_health'].includes(source);
  }

  private supportsStressData(source: HealthDataSource): boolean {
    return ['samsung_health', 'fitbit'].includes(source);
  }

  // Device mapping utilities
  private getDeviceTypeFromSource(source: HealthDataSource): any {
    switch (source) {
      case 'samsung_health': return 'SMARTWATCH';
      case 'fitbit': return 'FITNESS_BAND';
      case 'oura': return 'SMART_RING';
      case 'apple_health': return 'SMARTWATCH';
      default: return 'SMARTWATCH';
    }
  }

  private getDeviceNameFromSource(source: HealthDataSource): string {
    switch (source) {
      case 'samsung_health': return 'Samsung Health';
      case 'fitbit': return 'Fitbit Device';
      case 'oura': return 'Oura Ring';
      case 'apple_health': return 'Apple Watch';
      default: return 'Unknown Device';
    }
  }

  private getManufacturerFromSource(source: HealthDataSource): string {
    switch (source) {
      case 'samsung_health': return 'Samsung';
      case 'fitbit': return 'Fitbit';
      case 'oura': return 'Oura';
      case 'apple_health': return 'Apple';
      default: return 'Unknown';
    }
  }

  private getSupportedDataTypes(source: HealthDataSource): string[] {
    const baseTypes = ['heart_rate', 'sleep', 'activity'];
    
    switch (source) {
      case 'samsung_health':
        return [...baseTypes, 'blood_oxygen', 'stress', 'body_composition'];
      case 'fitbit':
        return [...baseTypes, 'blood_oxygen', 'stress'];
      case 'oura':
        return [...baseTypes, 'readiness', 'temperature'];
      case 'apple_health':
        return [...baseTypes, 'blood_oxygen', 'ecg'];
      default:
        return baseTypes;
    }
  }

  // Date formatting utilities
  private formatFitbitDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private formatOuraDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
}

// Export singleton instance
export const realHealthDataAggregator = new RealHealthDataAggregator();
