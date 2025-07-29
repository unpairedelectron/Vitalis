// Health API Integration Manager for Vitalis
import { HealthMetric, HealthDataSource, HeartRateData, SleepData, ActivityData } from '@/types/health';

export interface HealthAPICredentials {
  source: HealthDataSource;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  userId: string;
}

export class HealthDataAggregator {
  private credentials: Map<HealthDataSource, HealthAPICredentials> = new Map();

  constructor() {
    // Initialize API clients
  }

  async connectHealthSource(source: HealthDataSource, credentials: HealthAPICredentials): Promise<boolean> {
    try {
      await this.validateCredentials(source, credentials);
      this.credentials.set(source, credentials);
      return true;
    } catch (error) {
      console.error(`Failed to connect ${source}:`, error);
      return false;
    }
  }

  async getHeartRateData(source: HealthDataSource, startDate: Date, endDate: Date): Promise<HeartRateData[]> {
    const creds = this.credentials.get(source);
    if (!creds) throw new Error(`No credentials for ${source}`);

    switch (source) {
      case 'samsung_health':
        return this.getSamsungHeartRate(creds, startDate, endDate);
      case 'apple_health':
        return this.getAppleHeartRate(creds, startDate, endDate);
      case 'fitbit':
        return this.getFitbitHeartRate(creds, startDate, endDate);
      case 'oura':
        return this.getOuraHeartRate(creds, startDate, endDate);
      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  }

  async getSleepData(source: HealthDataSource, startDate: Date, endDate: Date): Promise<SleepData[]> {
    const creds = this.credentials.get(source);
    if (!creds) throw new Error(`No credentials for ${source}`);

    switch (source) {
      case 'samsung_health':
        return this.getSamsungSleep(creds, startDate, endDate);
      case 'apple_health':
        return this.getAppleSleep(creds, startDate, endDate);
      case 'fitbit':
        return this.getFitbitSleep(creds, startDate, endDate);
      case 'oura':
        return this.getOuraSleep(creds, startDate, endDate);
      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  }

  async getActivityData(source: HealthDataSource, startDate: Date, endDate: Date): Promise<ActivityData[]> {
    const creds = this.credentials.get(source);
    if (!creds) throw new Error(`No credentials for ${source}`);

    switch (source) {
      case 'samsung_health':
        return this.getSamsungActivity(creds, startDate, endDate);
      case 'apple_health':
        return this.getAppleActivity(creds, startDate, endDate);
      case 'google_fit':
        return this.getGoogleFitActivity(creds, startDate, endDate);
      case 'fitbit':
        return this.getFitbitActivity(creds, startDate, endDate);
      case 'oura':
        return this.getOuraActivity(creds, startDate, endDate);
      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  }

  // Samsung Health API Integration
  private async getSamsungHeartRate(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<HeartRateData[]> {
    // Samsung Health API implementation
    const response = await fetch('https://shealthapi.samsung.com/v1/heartrates', {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        time_offset: '+00:00'
      })
    });

    const data = await response.json();
    return this.transformSamsungHeartRate(data);
  }

  private async getSamsungSleep(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<SleepData[]> {
    const response = await fetch('https://shealthapi.samsung.com/v1/sleeps', {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString()
      })
    });

    const data = await response.json();
    return this.transformSamsungSleep(data);
  }

  private async getSamsungActivity(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<ActivityData[]> {
    const response = await fetch('https://shealthapi.samsung.com/v1/activities', {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString()
      })
    });

    const data = await response.json();
    return this.transformSamsungActivity(data);
  }

  // Apple HealthKit Integration
  private async getAppleHeartRate(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<HeartRateData[]> {
    // Note: Apple HealthKit requires native iOS integration
    // This would be handled in the React Native mobile app
    throw new Error('Apple HealthKit requires native iOS integration');
  }

  private async getAppleSleep(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<SleepData[]> {
    throw new Error('Apple HealthKit requires native iOS integration');
  }

  private async getAppleActivity(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<ActivityData[]> {
    throw new Error('Apple HealthKit requires native iOS integration');
  }

  // Fitbit API Integration
  private async getFitbitHeartRate(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<HeartRateData[]> {
    const response = await fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}.json`, {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`
      }
    });

    const data = await response.json();
    return this.transformFitbitHeartRate(data);
  }

  private async getFitbitSleep(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<SleepData[]> {
    const response = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}.json`, {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`
      }
    });

    const data = await response.json();
    return this.transformFitbitSleep(data);
  }

  private async getFitbitActivity(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<ActivityData[]> {
    const response = await fetch(`https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=${endDate.toISOString().split('T')[0]}&sort=desc&offset=0&limit=20`, {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`
      }
    });

    const data = await response.json();
    return this.transformFitbitActivity(data);
  }

  // Oura Ring API Integration
  private async getOuraHeartRate(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<HeartRateData[]> {
    const response = await fetch(`https://api.ouraring.com/v2/usercollection/heartrate?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`, {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`
      }
    });

    const data = await response.json();
    return this.transformOuraHeartRate(data);
  }

  private async getOuraSleep(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<SleepData[]> {
    const response = await fetch(`https://api.ouraring.com/v2/usercollection/sleep?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`, {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`
      }
    });

    const data = await response.json();
    return this.transformOuraSleep(data);
  }

  private async getOuraActivity(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<ActivityData[]> {
    const response = await fetch(`https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`, {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`
      }
    });

    const data = await response.json();
    return this.transformOuraActivity(data);
  }

  // Google Fit API Integration
  private async getGoogleFitActivity(creds: HealthAPICredentials, startDate: Date, endDate: Date): Promise<ActivityData[]> {
    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        aggregateBy: [
          { dataTypeName: 'com.google.step_count.delta' },
          { dataTypeName: 'com.google.calories.expended' },
          { dataTypeName: 'com.google.distance.delta' }
        ],
        bucketByTime: { durationMillis: 86400000 }, // 1 day
        startTimeMillis: startDate.getTime(),
        endTimeMillis: endDate.getTime()
      })
    });

    const data = await response.json();
    return this.transformGoogleFitActivity(data);
  }

  // Data transformation methods
  private transformSamsungHeartRate(data: any): HeartRateData[] {
    // Transform Samsung Health data to our format
    return data.heart_rates?.map((hr: any) => ({
      id: `samsung_hr_${hr.start_time}`,
      timestamp: new Date(hr.start_time),
      value: hr.heart_rate,
      unit: 'bpm',
      confidence: 0.9,
      source: 'samsung_health' as HealthDataSource,
      type: 'active' as const
    })) || [];
  }

  private transformSamsungSleep(data: any): SleepData[] {
    return data.sleeps?.map((sleep: any) => ({
      id: `samsung_sleep_${sleep.start_time}`,
      date: new Date(sleep.start_time),
      totalSleep: sleep.total_sleep_time / 60000, // ms to minutes
      deepSleep: sleep.deep_sleep_time / 60000,
      remSleep: sleep.rem_sleep_time / 60000,
      lightSleep: sleep.light_sleep_time / 60000,
      awakeTime: sleep.awake_time / 60000,
      sleepScore: sleep.efficiency * 100,
      efficiency: sleep.efficiency * 100,
      source: 'samsung_health' as HealthDataSource
    })) || [];
  }

  private transformSamsungActivity(data: any): ActivityData[] {
    return data.activities?.map((activity: any) => ({
      id: `samsung_activity_${activity.start_time}`,
      timestamp: new Date(activity.start_time),
      type: this.mapActivityType(activity.activity_type),
      duration: activity.duration / 60000, // ms to minutes
      calories: activity.calorie,
      steps: activity.step_count,
      distance: activity.distance,
      source: 'samsung_health' as HealthDataSource
    })) || [];
  }

  private transformFitbitHeartRate(data: any): HeartRateData[] {
    const heartRateData: HeartRateData[] = [];
    
    data['activities-heart']?.forEach((day: any) => {
      if (day.value?.heartRateZones) {
        day.value.heartRateZones.forEach((zone: any) => {
          heartRateData.push({
            id: `fitbit_hr_${day.dateTime}_${zone.name}`,
            timestamp: new Date(day.dateTime),
            value: zone.min,
            unit: 'bpm',
            confidence: 0.85,
            source: 'fitbit' as HealthDataSource,
            type: 'active' as const,
            zone: this.mapFitbitZone(zone.name)
          });
        });
      }
    });

    return heartRateData;
  }

  private transformFitbitSleep(data: any): SleepData[] {
    return data.sleep?.map((sleep: any) => ({
      id: `fitbit_sleep_${sleep.dateOfSleep}`,
      date: new Date(sleep.dateOfSleep),
      totalSleep: sleep.timeInBed,
      deepSleep: sleep.levels?.summary?.deep?.minutes || 0,
      remSleep: sleep.levels?.summary?.rem?.minutes || 0,
      lightSleep: sleep.levels?.summary?.light?.minutes || 0,
      awakeTime: sleep.levels?.summary?.wake?.minutes || 0,
      sleepScore: sleep.efficiency,
      efficiency: sleep.efficiency,
      source: 'fitbit' as HealthDataSource
    })) || [];
  }

  private transformFitbitActivity(data: any): ActivityData[] {
    return data.activities?.map((activity: any) => ({
      id: `fitbit_activity_${activity.logId}`,
      timestamp: new Date(`${activity.startDate}T${activity.startTime}`),
      type: this.mapActivityType(activity.activityName),
      duration: activity.duration / 60000, // ms to minutes
      calories: activity.calories,
      steps: activity.steps,
      distance: activity.distance * 1000, // km to meters
      avgHeartRate: activity.averageHeartRate,
      source: 'fitbit' as HealthDataSource
    })) || [];
  }

  private transformOuraHeartRate(data: any): HeartRateData[] {
    return data.data?.map((hr: any) => ({
      id: `oura_hr_${hr.timestamp}`,
      timestamp: new Date(hr.timestamp),
      value: hr.bpm,
      unit: 'bpm',
      confidence: 0.95,
      source: 'oura' as HealthDataSource,
      type: 'active' as const
    })) || [];
  }

  private transformOuraSleep(data: any): SleepData[] {
    return data.data?.map((sleep: any) => ({
      id: `oura_sleep_${sleep.day}`,
      date: new Date(sleep.day),
      totalSleep: sleep.total_sleep_duration / 60, // seconds to minutes
      deepSleep: sleep.deep_sleep_duration / 60,
      remSleep: sleep.rem_sleep_duration / 60,
      lightSleep: sleep.light_sleep_duration / 60,
      awakeTime: sleep.awake_time / 60,
      sleepScore: sleep.score,
      efficiency: sleep.efficiency,
      source: 'oura' as HealthDataSource
    })) || [];
  }

  private transformOuraActivity(data: any): ActivityData[] {
    return data.data?.map((activity: any) => ({
      id: `oura_activity_${activity.day}`,
      timestamp: new Date(activity.day),
      type: 'other' as const,
      duration: activity.active_calories,
      calories: activity.total_calories,
      steps: activity.steps,
      distance: activity.equivalent_walking_distance,
      source: 'oura' as HealthDataSource
    })) || [];
  }

  private transformGoogleFitActivity(data: any): ActivityData[] {
    // Transform Google Fit aggregated data
    const activities: ActivityData[] = [];
    
    data.bucket?.forEach((bucket: any) => {
      const timestamp = new Date(parseInt(bucket.startTimeMillis));
      let steps = 0;
      let calories = 0;
      let distance = 0;

      bucket.dataset?.forEach((dataset: any) => {
        dataset.point?.forEach((point: any) => {
          switch (dataset.dataSourceId) {
            case 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps':
              steps = point.value[0].intVal;
              break;
            case 'derived:com.google.calories.expended:com.google.android.gms:platform':
              calories = point.value[0].fpVal;
              break;
            case 'derived:com.google.distance.delta:com.google.android.gms:platform':
              distance = point.value[0].fpVal;
              break;
          }
        });
      });

      activities.push({
        id: `googlefit_activity_${timestamp.getTime()}`,
        timestamp,
        type: 'walking' as const,
        duration: 1440, // Full day in minutes
        calories,
        steps,
        distance,
        source: 'google_fit' as HealthDataSource
      });
    });

    return activities;
  }

  private mapActivityType(activityName: string): any {
    const mapping: Record<string, any> = {
      'running': 'running',
      'walking': 'walking',
      'cycling': 'cycling',
      'swimming': 'swimming',
      'workout': 'strength_training',
      'yoga': 'yoga',
      'meditation': 'meditation'
    };
    
    return mapping[activityName.toLowerCase()] || 'other';
  }

  private mapFitbitZone(zoneName: string): any {
    const mapping: Record<string, any> = {
      'Fat Burn': 'fat_burn',
      'Cardio': 'cardio',
      'Peak': 'peak'
    };
    
    return mapping[zoneName] || 'cardio';
  }

  private async validateCredentials(source: HealthDataSource, credentials: HealthAPICredentials): Promise<void> {
    // Implement credential validation for each source
    switch (source) {
      case 'samsung_health':
        await this.validateSamsungCredentials(credentials);
        break;
      case 'fitbit':
        await this.validateFitbitCredentials(credentials);
        break;
      case 'oura':
        await this.validateOuraCredentials(credentials);
        break;
      case 'google_fit':
        await this.validateGoogleFitCredentials(credentials);
        break;
      default:
        throw new Error(`Validation not implemented for ${source}`);
    }
  }

  private async validateSamsungCredentials(credentials: HealthAPICredentials): Promise<void> {
    // Samsung Health credential validation
    const response = await fetch('https://shealthapi.samsung.com/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${credentials.accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Invalid Samsung Health credentials');
    }
  }

  private async validateFitbitCredentials(credentials: HealthAPICredentials): Promise<void> {
    const response = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
      headers: {
        'Authorization': `Bearer ${credentials.accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Invalid Fitbit credentials');
    }
  }

  private async validateOuraCredentials(credentials: HealthAPICredentials): Promise<void> {
    const response = await fetch('https://api.ouraring.com/v2/usercollection/personal_info', {
      headers: {
        'Authorization': `Bearer ${credentials.accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Invalid Oura credentials');
    }
  }

  private async validateGoogleFitCredentials(credentials: HealthAPICredentials): Promise<void> {
    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataSources', {
      headers: {
        'Authorization': `Bearer ${credentials.accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Invalid Google Fit credentials');
    }
  }
}
