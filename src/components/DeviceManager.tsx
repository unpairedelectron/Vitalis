// Device Connection Manager for Vitalis
'use client';

import React, { useState } from 'react';
import { 
  DevicePhoneMobileIcon,
  WifiIcon,
  BoltIcon,
  SignalIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useRealTimeSensors, useDeviceManagement } from '@/hooks/useRealTimeSensors';
import { MiWatchConnection } from './MiWatchConnection';
import FireBolttConnection from './FireBolttConnection';

interface DeviceManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceManager({ isOpen, onClose }: DeviceManagerProps) {
  const { 
    connectedDevices, 
    isConnecting, 
    error, 
    connectToDevice, 
    disconnectFromDevice, 
    refreshConnections 
  } = useRealTimeSensors();
  
  const { availableDevices } = useDeviceManagement();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showMiWatchSetup, setShowMiWatchSetup] = useState(false);
  const [showFireBolttSetup, setShowFireBolttSetup] = useState(false);

  if (!isOpen) return null;

  const handleConnect = async (source: string) => {
    // Special handling for Xiaomi Mi Watch in Indian market
    if (source === 'xiaomi_health') {
      setShowMiWatchSetup(true);
      return;
    }
    
    // Special handling for Fire-Boltt 094 in Indian market
    if (source === 'fire_boltt') {
      setShowFireBolttSetup(true);
      return;
    }
    
    setSelectedDevice(source);
    const success = await connectToDevice(source);
    if (success) {
      setSelectedDevice(null);
    }
  };

  const handleDisconnect = async (source: string) => {
    await disconnectFromDevice(source);
  };

  const getDeviceIcon = (source: string) => {
    const icons = {
      samsung_health: '⌚',
      apple_health: '⌚',
      fitbit: '🏃',
      oura: '💍',
      google_fit: '📱',
      garmin: '⌚',
      whoop: '📿',
      xiaomi_health: '🔵', // Mi Watch icon
      fire_boltt: '🔥' // Fire-Boltt icon
    };
    return icons[source as keyof typeof icons] || '📱';
  };

  const getDeviceColor = (source: string, isConnected: boolean) => {
    if (!isConnected) return 'border-gray-500/50 bg-gray-900/50';
    
    const colors = {
      samsung_health: 'border-blue-500/50 bg-blue-900/30',
      apple_health: 'border-gray-400/50 bg-gray-800/30',
      fitbit: 'border-green-500/50 bg-green-900/30',
      oura: 'border-purple-500/50 bg-purple-900/30',
      google_fit: 'border-red-500/50 bg-red-900/30',
      garmin: 'border-yellow-500/50 bg-yellow-900/30',
      whoop: 'border-pink-500/50 bg-pink-900/30',
      xiaomi_health: 'border-blue-500/50 bg-blue-900/30',
      fire_boltt: 'border-orange-500/50 bg-orange-900/30' // Fire-Boltt orange theme
    };
    return colors[source as keyof typeof colors] || 'border-blue-500/50 bg-blue-900/30';
  };

  const getDeviceDisplayName = (source: string) => {
    const displayNames = {
      samsung_health: 'Samsung Galaxy Watch',
      apple_health: 'Apple Watch',
      fitbit: 'Fitbit Device',
      oura: 'Oura Ring',
      google_fit: 'Google Fit',
      garmin: 'Garmin Watch',
      whoop: 'WHOOP Strap',
      xiaomi_health: 'Xiaomi Mi Watch',
      fire_boltt: 'Fire-Boltt 094' // Your Indian smartwatch!
    };
    return displayNames[source as keyof typeof displayNames] || 
           source.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border-b border-blue-500/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DevicePhoneMobileIcon className="h-8 w-8 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Device Manager</h2>
                <p className="text-blue-200">Connect and manage your health devices</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshConnections}
                disabled={isConnecting}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <ArrowPathIcon className={`h-4 w-4 ${isConnecting ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <span className="text-red-300 font-medium">Connection Error</span>
              </div>
              <p className="text-red-200 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Connected Devices */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Connected Devices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectedDevices.filter(device => device.isConnected).map((device) => (
                <div
                  key={device.deviceId}
                  className={`border rounded-lg p-4 ${getDeviceColor(device.source, true)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getDeviceIcon(device.source)}</div>
                      <div>
                        <div className="text-white font-medium">{device.deviceName}</div>
                        <div className="text-sm text-gray-400">{device.deviceId}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {device.batteryLevel && (
                      <div className="text-center">
                        <BoltIcon className="h-5 w-5 text-green-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Battery</div>
                        <div className="text-sm text-white font-medium">{device.batteryLevel}%</div>
                      </div>
                    )}
                    
                    {device.signalStrength && (
                      <div className="text-center">
                        <SignalIcon className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Signal</div>
                        <div className="text-sm text-white font-medium">{device.signalStrength}%</div>
                      </div>
                    )}

                    <div className="text-center">
                      <WifiIcon className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-400">Last Sync</div>
                      <div className="text-sm text-white font-medium">
                        {device.lastSync.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDisconnect(device.source)}
                    className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 py-2 rounded-lg font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ))}
            </div>

            {connectedDevices.filter(device => device.isConnected).length === 0 && (
              <div className="text-center py-8">
                <DevicePhoneMobileIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No devices connected</p>
                <p className="text-gray-500 text-sm">Connect your smartwatch or fitness tracker below</p>
              </div>
            )}
          </div>

          {/* Available Devices */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Available Devices 
              <span className="text-sm text-gray-400 ml-2">({availableDevices.length} detected)</span>
            </h3>
            
            {/* Debug: Show device list */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
                Debug: {availableDevices.join(', ')}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDevices.map((source) => {
                const isConnected = connectedDevices.some(device => device.source === source && device.isConnected);
                const isConnecting = selectedDevice === source;
                
                if (isConnected) return null;

                return (
                  <div
                    key={source}
                    className={`border rounded-lg p-4 ${getDeviceColor(source, false)}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getDeviceIcon(source)}</div>
                        <div>
                          <div className="text-white font-medium">
                            {getDeviceDisplayName(source)}
                          </div>
                          <div className="text-sm text-gray-400">Health tracking device</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleConnect(source)}
                      disabled={isConnecting || isConnecting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      {isConnecting ? (
                        <>
                          <ArrowPathIcon className="h-4 w-4 animate-spin" />
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          <PlusIcon className="h-4 w-4" />
                          <span>Connect</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="mt-8 bg-black/30 border border-gray-500/30 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Setup Instructions</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                <div>
                  <strong>Enable health data sharing</strong> on your smartwatch or fitness tracker
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                <div>
                  <strong>Click "Connect"</strong> next to your device to start the authorization process
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                <div>
                  <strong>Authorize Vitalis</strong> to access your health data when prompted
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                <div>
                  <strong>Real-time monitoring</strong> will begin automatically once connected
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mi Watch Special Setup */}
      {showMiWatchSetup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Mi Watch Setup for India</h3>
                <button
                  onClick={() => setShowMiWatchSetup(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <MiWatchConnection 
                onConnectionSuccess={() => {
                  setShowMiWatchSetup(false);
                  refreshConnections();
                }}
                onConnectionError={(error) => {
                  console.error('Mi Watch connection error:', error);
                  // Keep the modal open to let user try again
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fire-Boltt 094 Connection Modal */}
      {showFireBolttSetup && (
        <FireBolttConnection
          onConnectionSuccess={(connectionType) => {
            console.log(`Fire-Boltt 094 connected via ${connectionType}`);
            setShowFireBolttSetup(false);
            refreshConnections();
          }}
          onClose={() => setShowFireBolttSetup(false)}
        />
      )}
    </div>
  );
}
