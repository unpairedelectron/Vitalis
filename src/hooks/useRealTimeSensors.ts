// Real-time Sensor Data Hook for Vitalis
'use client';

import { useState, useEffect, useCallback } from 'react';
import { sensorManager, RealTimeSensorData, DeviceConnection, SensorReading } from '@/lib/sensor-integration';

export interface SensorHookReturn {
  realTimeData: RealTimeSensorData;
  connectedDevices: DeviceConnection[];
  isConnecting: boolean;
  error: string | null;
  connectToDevice: (source: string) => Promise<boolean>;
  disconnectFromDevice: (source: string) => Promise<void>;
  refreshConnections: () => Promise<void>;
}

export function useRealTimeSensors(): SensorHookReturn {
  const [realTimeData, setRealTimeData] = useState<RealTimeSensorData>({});
  const [connectedDevices, setConnectedDevices] = useState<DeviceConnection[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize sensor connections on mount
  useEffect(() => {
    initializeSensors();
    return () => {
      // Cleanup real-time monitoring
      sensorManager.stopRealTimeMonitoring('dashboard');
    };
  }, []);

  const initializeSensors = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Initialize all available sensors
      const connections = await sensorManager.initializeAll();
      setConnectedDevices(connections);

      // Start real-time monitoring for connected devices
      const connectedCount = connections.filter(c => c.isConnected).length;
      if (connectedCount > 0) {
        sensorManager.startRealTimeMonitoring((data: RealTimeSensorData) => {
          setRealTimeData(prevData => ({
            ...prevData,
            ...data,
            lastUpdate: new Date()
          }));
        });
      }

    } catch (err) {
      console.error('Failed to initialize sensors:', err);
      setError('Failed to connect to health devices');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectToDevice = useCallback(async (source: string): Promise<boolean> => {
    try {
      setIsConnecting(true);
      setError(null);

      // This would trigger the OAuth flow for the specific device
      const success = await initializeSpecificSensor(source);
      
      if (success) {
        // Update device connection status
        setConnectedDevices(prev => 
          prev.map(device => 
            device.source === source 
              ? { ...device, isConnected: true, lastSync: new Date() }
              : device
          )
        );
        
        // Restart real-time monitoring to include new device
        await refreshConnections();
      }

      return success;
    } catch (err) {
      console.error(`Failed to connect to ${source}:`, err);
      setError(`Failed to connect to ${source}`);
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectFromDevice = useCallback(async (source: string): Promise<void> => {
    try {
      // Remove device tokens/credentials
      localStorage.removeItem(`${source}_access_token`);
      localStorage.removeItem(`${source}_refresh_token`);

      // Update device connection status
      setConnectedDevices(prev => 
        prev.map(device => 
          device.source === source 
            ? { ...device, isConnected: false }
            : device
        )
      );

      // Clear related sensor data
      setRealTimeData(prev => {
        const updated = { ...prev };
        if (prev.heartRate?.source === source) delete updated.heartRate;
        if (prev.bloodOxygen?.source === source) delete updated.bloodOxygen;
        if (prev.bodyTemperature?.source === source) delete updated.bodyTemperature;
        if (prev.steps?.source === source) delete updated.steps;
        if (prev.hrv?.source === source) delete updated.hrv;
        return updated;
      });

    } catch (err) {
      console.error(`Failed to disconnect from ${source}:`, err);
      setError(`Failed to disconnect from ${source}`);
    }
  }, []);

  const refreshConnections = useCallback(async (): Promise<void> => {
    try {
      setIsConnecting(true);
      const connections = await sensorManager.initializeAll();
      setConnectedDevices(connections);
      
      // Get latest sensor data
      const latestData = await sensorManager.getRealTimeData();
      setRealTimeData(prevData => ({
        ...prevData,
        ...latestData,
        lastUpdate: new Date()
      }));

    } catch (err) {
      console.error('Failed to refresh connections:', err);
      setError('Failed to refresh device connections');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    realTimeData,
    connectedDevices,
    isConnecting,
    error,
    connectToDevice,
    disconnectFromDevice,
    refreshConnections
  };
}

// Helper function to initialize specific sensor
async function initializeSpecificSensor(source: string): Promise<boolean> {
  try {
    // Import sensor integration classes dynamically to avoid SSR issues
    const { 
      SamsungHealthConnector, 
      AppleHealthConnector, 
      FitbitConnector, 
      OuraConnector,
      XiaomiHealthConnector,
      FireBolttConnector 
    } = await import('../lib/sensor-integration');

    switch (source) {
      case 'samsung_health':
        const samsungConnector = new SamsungHealthConnector();
        return await samsungConnector.connectManually();

      case 'apple_health':
        const appleConnector = new AppleHealthConnector();
        return await appleConnector.connectManually();

      case 'fitbit':
        const fitbitConnector = new FitbitConnector();
        return await fitbitConnector.connectManually();

      case 'oura':
        const ouraConnector = new OuraConnector();
        return await ouraConnector.connectManually();

      case 'xiaomi_health':
        const xiaomiConnector = new XiaomiHealthConnector();
        return await xiaomiConnector.connectManually();

      case 'fire_boltt':
        const fireBolttConnector = new FireBolttConnector();
        return await fireBolttConnector.connectManually();

      case 'google_fit':
      case 'garmin':
      case 'whoop':
        // These connectors don't exist yet - return false for now
        console.log(`${source} connector not implemented yet`);
        return false;

      default:
        throw new Error(`Unsupported sensor source: ${source}`);
    }
  } catch (error) {
    console.error(`Failed to initialize ${source}:`, error);
    return false;
  }
}

// Hook for historical health data
export function useHealthHistory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      
      // Fetch historical data from all connected sources
      const response = await fetch('/api/health/history');
      const historicalData = await response.json();
      
      setData(historicalData);
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, refetch: fetchHistoricalData };
}

// Hook for device management
export function useDeviceManagement() {
  const [availableDevices, setAvailableDevices] = useState<string[]>([]);

  useEffect(() => {
    // Detect available health platforms
    const devices: string[] = [];
    
    // Check for Samsung Health
    if (typeof window !== 'undefined') {
      if ('SamsungHealth' in window || navigator.userAgent.includes('Samsung')) {
        devices.push('samsung_health');
      }
      
      // Check for Apple HealthKit
      if ('HealthKit' in window || navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        devices.push('apple_health');
      }
      
      // Always available via web API or BLE
      devices.push('fitbit', 'oura');
      
      // Indian market smartwatches - always show as available
      devices.push('fire_boltt', 'xiaomi_health');
      
      // Other popular fitness devices
      devices.push('google_fit', 'garmin', 'whoop');
    }
    
    console.log('🔍 Available devices detected:', devices);
    setAvailableDevices(devices);
  }, []);

  return { availableDevices };
}
