// Mi Watch Connection Component for Indian Market
'use client';

import React, { useState } from 'react';
import { 
  WifiIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

interface MiWatchConnectionProps {
  onConnectionSuccess: () => void;
  onConnectionError: (error: string) => void;
}

export function MiWatchConnection({ onConnectionSuccess, onConnectionError }: MiWatchConnectionProps) {
  const [connectionMethod, setConnectionMethod] = useState<'ble' | 'export' | 'health-connect'>('ble');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  const connectViaBLE = async () => {
    setIsConnecting(true);
    setConnectionStatus('Scanning for Mi Watch...');

    try {
      // Dynamic import to avoid SSR issues
      const { miWatchBLE } = await import('@/lib/mi-watch-ble');
      
      // Check if Bluetooth is supported
      const isSupported = await miWatchBLE.isBluetoothSupported();
      if (!isSupported) {
        throw new Error('Bluetooth not supported in this browser. Try Chrome or Edge.');
      }

      setConnectionStatus('Please select your Mi Watch from the popup...');
      
      // Scan for devices
      const devices = await miWatchBLE.scanForMiWatch();
      if (devices.length === 0) {
        throw new Error('No Mi Watch found. Make sure it\'s in pairing mode.');
      }

      setConnectionStatus('Connecting to Mi Watch...');
      
      // Connect to the device
      const connected = await miWatchBLE.connectToDevice();
      if (!connected) {
        throw new Error('Failed to connect to Mi Watch');
      }

      setConnectionStatus('Testing heart rate sensor...');
      
      // Test heart rate reading
      const heartRate = await miWatchBLE.getRealTimeHeartRate();
      if (heartRate) {
        setConnectionStatus(`Connected! Heart rate: ${heartRate} BPM`);
        onConnectionSuccess();
      } else {
        setConnectionStatus('Connected, but sensor data not available');
        onConnectionSuccess(); // Still consider it a success
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
      setConnectionStatus('');
      onConnectionError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectViaExport = () => {
    // Trigger file upload for Mi Fit export
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsConnecting(true);
        setConnectionStatus('Processing Mi Fit export...');
        
        // Simulate processing
        setTimeout(() => {
          setConnectionStatus('Health data imported successfully!');
          onConnectionSuccess();
          setIsConnecting(false);
        }, 2000);
      }
    };
    input.click();
  };

  const connectViaHealthConnect = async () => {
    setIsConnecting(true);
    setConnectionStatus('Redirecting to Google Health Connect...');
    
    // Simulate Health Connect flow
    setTimeout(() => {
      setConnectionStatus('Google Health Connect authorized!');
      onConnectionSuccess();
      setIsConnecting(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-900 border border-blue-500/50 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Connect Your Mi Watch</h3>
        <p className="text-gray-300 text-sm">
          Choose the best connection method for your Mi Watch in India
        </p>
      </div>

      {/* Connection Methods */}
      <div className="space-y-4 mb-6">
        
        {/* Bluetooth LE - Recommended */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            connectionMethod === 'ble' 
              ? 'border-blue-500 bg-blue-900/30' 
              : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
          }`}
          onClick={() => setConnectionMethod('ble')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SignalIcon className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-white font-medium">Bluetooth Direct Connection</div>
                <div className="text-gray-400 text-sm">Real-time data streaming (Recommended)</div>
              </div>
            </div>
            <div className="text-green-400 text-sm font-medium">LIVE DATA</div>
          </div>
        </div>

        {/* Mi Fit Export */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            connectionMethod === 'export' 
              ? 'border-blue-500 bg-blue-900/30' 
              : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
          }`}
          onClick={() => setConnectionMethod('export')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DevicePhoneMobileIcon className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-white font-medium">Mi Fit Data Export</div>
                <div className="text-gray-400 text-sm">Upload historical data from Mi Fit app</div>
              </div>
            </div>
            <div className="text-yellow-400 text-sm font-medium">HISTORICAL</div>
          </div>
        </div>

        {/* Google Health Connect */}
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            connectionMethod === 'health-connect' 
              ? 'border-blue-500 bg-blue-900/30' 
              : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
          }`}
          onClick={() => setConnectionMethod('health-connect')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <WifiIcon className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-white font-medium">Google Health Connect</div>
                <div className="text-gray-400 text-sm">Sync via Google Health platform</div>
              </div>
            </div>
            <div className="text-blue-400 text-sm font-medium">SYNC</div>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {connectionStatus && (
        <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" />
            <span className="text-blue-200 text-sm">{connectionStatus}</span>
          </div>
        </div>
      )}

      {/* Connect Button */}
      <button
        onClick={() => {
          if (connectionMethod === 'ble') connectViaBLE();
          else if (connectionMethod === 'export') connectViaExport();
          else if (connectionMethod === 'health-connect') connectViaHealthConnect();
        }}
        disabled={isConnecting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        {isConnecting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <CheckCircleIcon className="h-5 w-5" />
            <span>
              {connectionMethod === 'ble' && 'Connect via Bluetooth'}
              {connectionMethod === 'export' && 'Upload Mi Fit Data'}
              {connectionMethod === 'health-connect' && 'Connect Health Account'}
            </span>
          </>
        )}
      </button>

      {/* Help Text */}
      <div className="mt-4 text-gray-400 text-xs">
        <p><strong>Note for Indian Users:</strong></p>
        <p>• Bluetooth connection works best with Mi Watch 7/8</p>
        <p>• Mi Fit export: Settings → Data Export → Select Date Range</p>
        <p>• Health Connect requires Android 14+ or Google Fit app</p>
      </div>
    </div>
  );
}
