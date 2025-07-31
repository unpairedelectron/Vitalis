// Multi-Device Connector - No API Registration Required
'use client';

export class NoRegistrationHealthConnector {
  
  // Method 1: Bluetooth LE Direct Connection
  async connectViaBluetooth(): Promise<boolean> {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { name: 'Mi Watch' },
          { name: 'Galaxy Watch' },
          { namePrefix: 'Fitbit' },
          { services: ['180d'] } // Heart Rate Service
        ],
        optionalServices: [
          '180d', // Heart Rate
          '1822', // Pulse Oximeter
          '180f', // Battery Service
          '1809'  // Health Thermometer
        ]
      });

      const server = await device.gatt?.connect();
      if (server?.connected) {
        console.log(`Connected to ${device.name}`);
        return true;
      }
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
    }
    return false;
  }

  // Method 2: File Upload Processing
  async processHealthExport(file: File, source: 'mi-fit' | 'samsung' | 'apple' | 'fitbit'): Promise<HealthData[]> {
    const text = await file.text();
    
    switch (source) {
      case 'mi-fit':
        return this.parseMiFitData(text);
      case 'samsung':
        return this.parseSamsungHealthData(text);
      case 'apple':
        return this.parseAppleHealthData(text);
      case 'fitbit':
        return this.parseFitbitData(text);
      default:
        throw new Error('Unsupported format');
    }
  }

  private parseMiFitData(csvText: string): HealthData[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        timestamp: new Date(values[0]),
        heartRate: parseInt(values[1]),
        steps: parseInt(values[2]),
        calories: parseInt(values[3]),
        sleepHours: parseFloat(values[4]),
        source: 'mi-fit'
      };
    });
  }

  private parseSamsungHealthData(csvText: string): HealthData[] {
    // Samsung Health CSV format parsing
    const lines = csvText.split('\n');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        timestamp: new Date(values[0]),
        heartRate: parseInt(values[1]) || undefined,
        steps: parseInt(values[2]) || undefined,
        source: 'samsung'
      };
    });
  }

  private parseAppleHealthData(xmlText: string): HealthData[] {
    // Apple Health XML format parsing (simplified)
    const data: HealthData[] = [];
    // XML parsing would go here
    return data;
  }

  private parseFitbitData(csvText: string): HealthData[] {
    // Fitbit CSV format parsing
    const lines = csvText.split('\n');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        timestamp: new Date(values[0]),
        heartRate: parseInt(values[1]) || undefined,
        steps: parseInt(values[2]) || undefined,
        source: 'fitbit'
      };
    });
  }

  // Method 3: Health Connect Integration
  async connectHealthConnect(): Promise<boolean> {
    try {
      // Check if Health Connect is available (Android 14+)
      if ('healthConnect' in window) {
        const hc = (window as any).healthConnect;
        
        const granted = await hc.requestPermissions([
          'android.permission.health.READ_HEART_RATE',
          'android.permission.health.READ_STEPS',
          'android.permission.health.READ_SLEEP'
        ]);

        return granted.every((p: any) => p === 'granted');
      }
    } catch (error) {
      console.error('Health Connect failed:', error);
    }
    return false;
  }

  // Get real-time data from any connected source
  async getRealTimeData(): Promise<RealTimeHealthData> {
    const data: RealTimeHealthData = {};

    // Try Bluetooth first
    try {
      const hr = await this.getBluetoothHeartRate(); data.heartRate = hr === null ? undefined : hr;
      const steps = await this.getBluetoothSteps(); data.steps = steps === null ? undefined : steps;
    } catch (e) {
      console.log('Bluetooth unavailable, trying other sources');
    }

    // Try Health Connect
    try {
      if (!data.heartRate) {
        const hcHeartRate = await this.getHealthConnectHeartRate(); data.heartRate = hcHeartRate === null ? undefined : hcHeartRate;
      }
    } catch (e) {
      console.log('Health Connect unavailable');
    }

    return data;
  }

  private async getBluetoothHeartRate(): Promise<number | null> {
    // Implementation for BLE heart rate reading
    // (Using the code from mi-watch-ble.ts)
    return null; // Placeholder
  }

  private async getBluetoothSteps(): Promise<number | null> {
    // Implementation for BLE step count reading
    return null; // Placeholder
  }

  private async getHealthConnectHeartRate(): Promise<number | null> {
    try {
      const hc = (window as any).healthConnect;
      const records = await hc.readRecords('HeartRate', {
        timeRangeFilter: {
          startTime: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
          endTime: new Date()
        }
      });
      
      return records.length > 0 ? records[0].beatsPerMinute : null;
    } catch (error) {
      return null;
    }
  }
}

interface HealthData {
  timestamp: Date;
  heartRate?: number;
  steps?: number;
  calories?: number;
  sleepHours?: number;
  source: string;
}

interface RealTimeHealthData {
  heartRate?: number;
  steps?: number;
  bloodOxygen?: number;
  temperature?: number;
}

export const noRegConnector = new NoRegistrationHealthConnector();
