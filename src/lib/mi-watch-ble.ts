// Bluetooth Low Energy (BLE) Connector for Mi Watch - Indian Market
'use client';

// Web Bluetooth API Type Definitions
declare global {
  interface Navigator {
    bluetooth: Bluetooth;
  }
  
  interface Bluetooth {
    getAvailability(): Promise<boolean>;
    requestDevice(options: BluetoothRequestDeviceOptions): Promise<BluetoothDevice>;
  }
  
  interface BluetoothDevice {
    id: string;
    name?: string;
    gatt?: BluetoothRemoteGATTServer;
  }
  
  interface BluetoothRemoteGATTServer {
    connected: boolean;
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  }
  
  interface BluetoothRemoteGATTService {
    getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
  }
  
  interface BluetoothRemoteGATTCharacteristic {
    readValue(): Promise<DataView>;
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    addEventListener(type: string, listener: (event: Event & { target: BluetoothRemoteGATTCharacteristic }) => void): void;
    value?: DataView;
  }
  
  interface BluetoothRequestDeviceOptions {
    filters?: BluetoothRequestDeviceFilter[];
    optionalServices?: string[];
  }
  
  interface BluetoothRequestDeviceFilter {
    name?: string;
    namePrefix?: string;
    services?: string[];
  }
}

export interface BLEDevice {
  id: string;
  name: string;
  connected: boolean;
  batteryLevel?: number;
  rssi?: number;
}

export class MiWatchBLEConnector {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private heartRateService: BluetoothRemoteGATTService | null = null;
  private spo2Service: BluetoothRemoteGATTService | null = null;
  
  // BLE Service UUIDs for health data
  private readonly HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
  private readonly HEART_RATE_MEASUREMENT = '00002a37-0000-1000-8000-00805f9b34fb';
  private readonly PULSE_OXIMETER_SERVICE = '00001822-0000-1000-8000-00805f9b34fb';
  private readonly SPO2_MEASUREMENT = '00002a5e-0000-1000-8000-00805f9b34fb';
  
  async isBluetoothSupported(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.bluetooth) {
      console.warn('Web Bluetooth API not supported in this browser');
      return false;
    }
    
    const available = await navigator.bluetooth.getAvailability();
    return available;
  }

  async scanForMiWatch(): Promise<BLEDevice[]> {
    if (!await this.isBluetoothSupported()) {
      throw new Error('Bluetooth not supported');
    }

    try {
      // Request Mi Watch device
      this.device = await navigator.bluetooth.requestDevice({
        filters: [
          { name: 'Mi Watch' },
          { name: 'Xiaomi Watch' },
          { name: 'Mi Watch Lite' },
          { namePrefix: 'Mi' },
          { services: [this.HEART_RATE_SERVICE] }
        ],
        optionalServices: [
          this.HEART_RATE_SERVICE,
          this.PULSE_OXIMETER_SERVICE,
          '0000180f-0000-1000-8000-00805f9b34fb', // Battery Service
          '0000180a-0000-1000-8000-00805f9b34fb'  // Device Information
        ]
      });

      return [{
        id: this.device.id,
        name: this.device.name || 'Mi Watch',
        connected: false,
        rssi: -60 // Simulated signal strength
      }];
    } catch (error) {
      console.error('Failed to scan for Mi Watch:', error);
      throw new Error('Could not find Mi Watch. Make sure it\'s in pairing mode.');
    }
  }

  async connectToDevice(): Promise<boolean> {
    if (!this.device) {
      throw new Error('No device selected. Call scanForMiWatch() first.');
    }

    try {
      console.log('Connecting to Mi Watch...');
      this.server = this.device.gatt ? await this.device.gatt.connect() : null;
      
      if (!this.server?.connected) {
        throw new Error('Failed to establish GATT connection');
      }

      // Connect to health services
      await this.connectToHealthServices();
      
      console.log('Successfully connected to Mi Watch');
      return true;
    } catch (error) {
      console.error('Failed to connect to Mi Watch:', error);
      throw new Error(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async connectToHealthServices(): Promise<void> {
    if (!this.server) return;

    try {
      // Connect to Heart Rate Service
      this.heartRateService = await this.server.getPrimaryService(this.HEART_RATE_SERVICE);
      console.log('Connected to Heart Rate service');
    } catch (error) {
      console.warn('Heart Rate service not available:', error);
    }

    try {
      // Connect to SpO2 Service (if available)
      this.spo2Service = await this.server.getPrimaryService(this.PULSE_OXIMETER_SERVICE);
      console.log('Connected to SpO2 service');
    } catch (error) {
      console.warn('SpO2 service not available:', error);
    }
  }

  async getRealTimeHeartRate(): Promise<number | null> {
    if (!this.heartRateService) {
      console.warn('Heart rate service not connected');
      return null;
    }

    try {
      const characteristic = await this.heartRateService.getCharacteristic(this.HEART_RATE_MEASUREMENT);
      const value = await characteristic.readValue();
      
      // Parse BLE heart rate measurement format
      const flags = value.getUint8(0);
      let heartRate: number;
      
      if (flags & 0x01) {
        // 16-bit heart rate value
        heartRate = value.getUint16(1, true);
      } else {
        // 8-bit heart rate value
        heartRate = value.getUint8(1);
      }
      
      console.log(`Mi Watch Heart Rate: ${heartRate} BPM`);
      return heartRate;
    } catch (error) {
      console.error('Failed to read heart rate:', error);
      return null;
    }
  }

  async startHeartRateMonitoring(callback: (heartRate: number) => void): Promise<void> {
    if (!this.heartRateService) {
      throw new Error('Heart rate service not available');
    }

    try {
      const characteristic = await this.heartRateService.getCharacteristic(this.HEART_RATE_MEASUREMENT);
      
      await characteristic.startNotifications();
      
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
        if (!value) return;
        
        const flags = value.getUint8(0);
        let heartRate: number;
        
        if (flags & 0x01) {
          heartRate = value.getUint16(1, true);
        } else {
          heartRate = value.getUint8(1);
        }
        
        callback(heartRate);
      });
      
      console.log('Started heart rate monitoring');
    } catch (error) {
      console.error('Failed to start heart rate monitoring:', error);
      throw error;
    }
  }

  async getBloodOxygen(): Promise<number | null> {
    if (!this.spo2Service) {
      console.warn('SpO2 service not connected');
      return null;
    }

    try {
      const characteristic = await this.spo2Service.getCharacteristic(this.SPO2_MEASUREMENT);
      const value = await characteristic.readValue();
      
      // Parse SpO2 measurement (format varies by device)
      const spo2 = value.getUint16(0, true) / 100; // Convert to percentage
      
      console.log(`Mi Watch SpO2: ${spo2}%`);
      return spo2;
    } catch (error) {
      console.error('Failed to read SpO2:', error);
      return null;
    }
  }

  async getBatteryLevel(): Promise<number | null> {
    if (!this.server) return null;

    try {
      const batteryService = await this.server.getPrimaryService('0000180f-0000-1000-8000-00805f9b34fb');
      const batteryCharacteristic = await batteryService.getCharacteristic('00002a19-0000-1000-8000-00805f9b34fb');
      const value = await batteryCharacteristic.readValue();
      
      const batteryLevel = value.getUint8(0);
      console.log(`Mi Watch Battery: ${batteryLevel}%`);
      return batteryLevel;
    } catch (error) {
      console.warn('Could not read battery level:', error);
      return null;
    }
  }

  async disconnect(): Promise<void> {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
      console.log('Disconnected from Mi Watch');
    }
    
    this.device = null;
    this.server = null;
    this.heartRateService = null;
    this.spo2Service = null;
  }

  isConnected(): boolean {
    return this.server?.connected || false;
  }

  getDeviceInfo(): BLEDevice | null {
    if (!this.device) return null;
    
    return {
      id: this.device.id,
      name: this.device.name || 'Mi Watch',
      connected: this.isConnected()
    };
  }
}

// Export singleton instance
export const miWatchBLE = new MiWatchBLEConnector();
