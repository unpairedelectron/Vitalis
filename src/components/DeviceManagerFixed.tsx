'use client';

import React, { useState } from 'react';
import { 
  Smartphone, 
  Watch, 
  Activity, 
  Heart, 
  Wifi, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Zap,
  Signal,
  X
} from 'lucide-react';

interface DeviceConnection {
  id: string;
  deviceType: string;
  deviceId: string;
  deviceName: string;
  isConnected: boolean;
  lastSync: string;
  source: string;
  batteryLevel?: number;
  signalStrength?: number;
}

interface DeviceManagerProps {
  userId: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const mockConnectedDevices: DeviceConnection[] = [
  {
    id: '1',
    deviceType: 'smartwatch',
    deviceId: 'mi-watch-001',
    deviceName: 'Mi Watch Pro',
    isConnected: true,
    lastSync: new Date().toISOString(),
    source: 'mi-watch',
    batteryLevel: 85,
    signalStrength: 95
  }
];

const availableDevices = [
  { id: 'samsung-health', name: 'Samsung Health', type: 'smartphone', icon: Smartphone },
  { id: 'mi-watch', name: 'Mi Watch', type: 'smartwatch', icon: Watch },
  { id: 'fitbit', name: 'Fitbit', type: 'wearable', icon: Activity },
  { id: 'oura', name: 'Oura Ring', type: 'ring', icon: Heart }
];

export function DeviceManagerFixed({ userId, isOpen = true, onClose }: DeviceManagerProps) {
  const [connectedDevices, setConnectedDevices] = useState<DeviceConnection[]>(mockConnectedDevices);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (deviceId: string) => {
    setIsConnecting(true);
    setSelectedDevice(deviceId);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add mock device
      const newDevice: DeviceConnection = {
        id: Date.now().toString(),
        deviceType: 'smartwatch',
        deviceId: `${deviceId}-${Date.now()}`,
        deviceName: availableDevices.find(d => d.id === deviceId)?.name || 'Unknown Device',
        isConnected: true,
        lastSync: new Date().toISOString(),
        source: deviceId,
        batteryLevel: Math.floor(Math.random() * 100),
        signalStrength: Math.floor(Math.random() * 100)
      };

      setConnectedDevices(prev => [...prev, newDevice]);
    } catch (err) {
      setError('Failed to connect device');
    } finally {
      setIsConnecting(false);
      setSelectedDevice(null);
    }
  };

  const handleDisconnect = async (deviceId: string) => {
    setConnectedDevices(prev => prev.filter(device => device.source !== deviceId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Device Manager</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Connected Devices */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            Connected Devices ({connectedDevices.length})
          </h3>

          {connectedDevices.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {connectedDevices.map((device) => {
                const DeviceIcon = availableDevices.find(d => d.id === device.source)?.icon || Watch;
                return (
                  <div
                    key={device.id}
                    className="border border-green-500 bg-green-900/20 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <DeviceIcon className="h-6 w-6 text-green-400 mr-2" />
                        <div>
                          <h4 className="font-medium text-white">{device.deviceName}</h4>
                          <p className="text-sm text-green-400">Connected</p>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {device.batteryLevel && (
                        <div className="text-center">
                          <Zap className="h-4 w-4 text-green-400 mx-auto mb-1" />
                          <div className="text-xs text-white">{device.batteryLevel}%</div>
                        </div>
                      )}
                      {device.signalStrength && (
                        <div className="text-center">
                          <Signal className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                          <div className="text-xs text-white">{device.signalStrength}%</div>
                        </div>
                      )}
                      <div className="text-center">
                        <Wifi className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                        <div className="text-xs text-white">
                          {new Date(device.lastSync).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDisconnect(device.source)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Smartphone className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No devices connected</p>
            </div>
          )}
        </div>

        {/* Available Devices */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 text-blue-400 mr-2" />
            Available Devices
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {availableDevices.map((device) => {
              const isConnected = connectedDevices.some(d => d.source === device.id);
              const isCurrentlyConnecting = selectedDevice === device.id && isConnecting;
              const DeviceIcon = device.icon;

              return (
                <div
                  key={device.id}
                  className={`border rounded-lg p-4 ${
                    isConnected 
                      ? 'border-green-500 bg-green-900/20' 
                      : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="text-center mb-4">
                    <DeviceIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white">{device.name}</h4>
                    <p className="text-sm text-gray-400 capitalize">{device.type}</p>
                  </div>

                  {isConnected ? (
                    <div className="text-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
                      <p className="text-sm text-green-400">Connected</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(device.id)}
                      disabled={isConnecting}
                      className={`w-full py-2 px-4 rounded text-sm transition-colors ${
                        isConnecting
                          ? 'bg-blue-700 text-white cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isCurrentlyConnecting ? (
                        <div className="flex items-center justify-center">
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                          Connecting...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Plus className="h-4 w-4 mr-2" />
                          Connect
                        </div>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
