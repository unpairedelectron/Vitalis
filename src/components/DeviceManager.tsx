'use client';

import React, { useState, useEffect } from 'react';

interface Device {
  id: string;
  deviceType: string;
  deviceName: string;
  isConnected: boolean;
  lastSyncAt?: string;
  manufacturer: string;
  model?: string;
}

interface DeviceManagerProps {
  userId: string;
}

export const DeviceManager: React.FC<DeviceManagerProps> = ({ userId }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, [userId]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/health/devices/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      
      const data = await response.json();
      setDevices(data.devices || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load devices');
    } finally {
      setLoading(false);
    }
  };

  const connectDevice = async (deviceType: string) => {
    try {
      // Handle different device connection flows
      switch (deviceType.toLowerCase()) {
        case 'fitbit':
          window.location.href = `/api/health/oauth/fitbit?userId=${userId}`;
          break;
        case 'oura':
          window.location.href = `/api/health/oauth/oura?userId=${userId}`;
          break;
        default:
          setError(`${deviceType} connection not yet implemented`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect device');
    }
  };

  const disconnectDevice = async (deviceId: string) => {
    try {
      const response = await fetch(`/api/health/devices/device/${deviceId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to disconnect device');
      }
      
      // Refresh device list
      await fetchDevices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect device');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading devices...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Connected Devices</h3>
        <button
          onClick={fetchDevices}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {devices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No devices connected yet</p>
            <div className="space-y-2">
              <button
                onClick={() => connectDevice('fitbit')}
                className="block w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Connect Fitbit
              </button>
              <button
                onClick={() => connectDevice('oura')}
                className="block w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Connect Oura Ring
              </button>
            </div>
          </div>
        ) : (
          devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${device.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{device.deviceName}</h4>
                  <p className="text-sm text-gray-500">
                    {device.manufacturer} {device.model && `• ${device.model}`}
                  </p>
                  {device.lastSyncAt && (
                    <p className="text-xs text-gray-400">
                      Last sync: {new Date(device.lastSyncAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => disconnectDevice(device.id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-md transition-colors"
              >
                Disconnect
              </button>
            </div>
          ))
        )}
      </div>

      {devices.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <button
              onClick={() => connectDevice('fitbit')}
              className="block w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              Add Another Fitbit Device
            </button>
            <button
              onClick={() => connectDevice('oura')}
              className="block w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm"
            >
              Add Oura Ring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceManager;
