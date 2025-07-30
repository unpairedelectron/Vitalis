'use client';

import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Watch, 
  Activity, 
  Heart, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Settings,
  Trash2
} from 'lucide-react';

interface DeviceConnection {
  id: string;
  deviceType: string;
  deviceId: string;
  deviceName: string;
  isConnected: boolean;
  lastSync: string;
  connectionData?: any;
}

interface DeviceManagerProps {
  userId: string;
}

const SUPPORTED_DEVICES = [
  {
    id: 'samsung',
    name: 'Samsung Health',
    icon: Smartphone,
    color: 'blue',
    description: 'Connect your Samsung Galaxy Watch and Health app'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: Watch,
    color: 'green',
    description: 'Sync data from your Fitbit device'
  },
  {
    id: 'oura',
    name: 'Oura Ring',
    icon: Activity,
    color: 'purple',
    description: 'Import sleep and recovery data from Oura'
  },
  {
    id: 'apple',
    name: 'Apple Health',
    icon: Heart,
    color: 'red',
    description: 'Connect Apple Watch and HealthKit data'
  }
];

export default function DeviceManager({ userId }: DeviceManagerProps) {
  const [devices, setDevices] = useState<DeviceConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchConnectedDevices();
  }, [userId]);

  const fetchConnectedDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/health/devices/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setDevices(data.devices || []);
      }
    } catch (err) {
      console.error('Failed to fetch devices:', err);
      setError('Failed to load connected devices');
    } finally {
      setLoading(false);
    }
  };

  const connectDevice = async (deviceType: string) => {
    try {
      setConnecting(deviceType);
      setError(null);

      const response = await fetch(`/api/health/oauth/${deviceType.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const { authUrl } = await response.json();
        window.location.href = authUrl;
      } else {
        throw new Error('Failed to initiate connection');
      }
    } catch (err) {
      console.error(`Failed to connect ${deviceType}:`, err);
      setError(`Failed to connect ${deviceType}. Please try again.`);
    } finally {
      setConnecting(null);
    }
  };

  const syncDevice = async (deviceId: string, deviceType: string) => {
    try {
      setSyncing(deviceId);
      setError(null);

      const response = await fetch('/api/health/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId, 
          deviceType: deviceType.toUpperCase(),
          forceSync: true 
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(`Synced ${result.recordsCount || 0} records from ${deviceType}`);
        
        // Update last sync time
        setDevices(prev => prev.map(device => 
          device.id === deviceId 
            ? { ...device, lastSync: new Date().toISOString() }
            : device
        ));
      } else {
        throw new Error('Sync failed');
      }
    } catch (err) {
      console.error(`Failed to sync ${deviceType}:`, err);
      setError(`Failed to sync ${deviceType}. Please try again.`);
    } finally {
      setSyncing(null);
    }
  };

  const disconnectDevice = async (deviceId: string, deviceType: string) => {
    if (!confirm(`Are you sure you want to disconnect ${deviceType}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/health/devices/${deviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDevices(prev => prev.filter(device => device.id !== deviceId));
        setSuccess(`${deviceType} disconnected successfully`);
      } else {
        throw new Error('Failed to disconnect device');
      }
    } catch (err) {
      console.error(`Failed to disconnect ${deviceType}:`, err);
      setError(`Failed to disconnect ${deviceType}. Please try again.`);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    const device = SUPPORTED_DEVICES.find(d => d.id === deviceType.toLowerCase());
    return device?.icon || Activity;
  };

  const getDeviceColor = (deviceType: string) => {
    const device = SUPPORTED_DEVICES.find(d => d.id === deviceType.toLowerCase());
    return device?.color || 'gray';
  };

  const isDeviceConnected = (deviceType: string) => {
    return devices.some(device => 
      device.deviceType.toLowerCase() === deviceType.toLowerCase() && 
      device.isConnected
    );
  };

  const getConnectedDevice = (deviceType: string) => {
    return devices.find(device => 
      device.deviceType.toLowerCase() === deviceType.toLowerCase() && 
      device.isConnected
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Connected Devices</h2>
          <button
            onClick={fetchConnectedDevices}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          </div>
        )}

        {/* Connected Devices Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{devices.length}</div>
            <div className="text-sm text-blue-700">Connected Devices</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {devices.filter(d => d.isConnected).length}
            </div>
            <div className="text-sm text-green-700">Active Connections</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {devices.filter(d => {
                const lastSync = new Date(d.lastSync);
                const hoursSinceSync = (Date.now() - lastSync.getTime()) / (1000 * 60 * 60);
                return hoursSinceSync < 24;
              }).length}
            </div>
            <div className="text-sm text-purple-700">Synced Today</div>
          </div>
        </div>
      </div>

      {/* Available Devices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Devices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPORTED_DEVICES.map((deviceInfo) => {
            const isConnected = isDeviceConnected(deviceInfo.id);
            const connectedDevice = getConnectedDevice(deviceInfo.id);
            const Icon = deviceInfo.icon;
            
            return (
              <div
                key={deviceInfo.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  isConnected 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-${deviceInfo.color}-100 mr-3`}>
                      <Icon className={`w-6 h-6 text-${deviceInfo.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{deviceInfo.name}</h4>
                      <p className="text-sm text-gray-600">{deviceInfo.description}</p>
                      {isConnected && connectedDevice && (
                        <p className="text-xs text-green-600 mt-1">
                          Last sync: {new Date(connectedDevice.lastSync).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <>
                        <Wifi className="w-4 h-4 text-green-500" />
                        <button
                          onClick={() => connectedDevice && syncDevice(connectedDevice.id, deviceInfo.id)}
                          disabled={syncing === connectedDevice?.id}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
                        >
                          {syncing === connectedDevice?.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            'Sync'
                          )}
                        </button>
                        <button
                          onClick={() => connectedDevice && disconnectDevice(connectedDevice.id, deviceInfo.name)}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-4 h-4 text-gray-400" />
                        <button
                          onClick={() => connectDevice(deviceInfo.id)}
                          disabled={connecting === deviceInfo.id}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
                        >
                          {connecting === deviceInfo.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                          Connect
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Devices Details */}
      {devices.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Device Details</h3>
          
          <div className="space-y-4">
            {devices.map((device) => {
              const Icon = getDeviceIcon(device.deviceType);
              const color = getDeviceColor(device.deviceType);
              
              return (
                <div
                  key={device.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg bg-${color}-100 mr-3`}>
                        <Icon className={`w-5 h-5 text-${color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{device.deviceName}</h4>
                        <p className="text-sm text-gray-600">Device ID: {device.deviceId}</p>
                        <p className="text-xs text-gray-500">
                          Last synced: {new Date(device.lastSync).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {device.isConnected ? (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Connected
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Disconnected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
