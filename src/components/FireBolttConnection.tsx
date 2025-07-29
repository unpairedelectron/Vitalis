// Fire-Boltt 094 Connection Component for Indian Market
'use client';

import { useState, useEffect } from 'react';
import { 
  WifiIcon, 
  BoltIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface FireBolttConnectionProps {
  onConnectionSuccess: (connectionType: 'ble' | 'app_export') => void;
  onClose: () => void;
}

export default function FireBolttConnection({ onConnectionSuccess, onClose }: FireBolttConnectionProps) {
  const [connectionStep, setConnectionStep] = useState<'method' | 'ble' | 'app_export' | 'connecting' | 'success'>('method');
  const [bleSupported, setBleSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Web Bluetooth is supported
    if (typeof window !== 'undefined' && 'navigator' in window && 'bluetooth' in navigator) {
      setBleSupported(true);
    }
  }, []);

  const handleBLEConnection = async () => {
    setConnectionStep('connecting');
    setError(null);

    try {
      const response = await fetch('/api/health/fire-boltt/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ble_connect' })
      });

      const data = await response.json();

      if (data.success) {
        // Simulate BLE connection process
        setTimeout(() => {
          setConnectionStep('success');
          onConnectionSuccess('ble');
        }, 3000);
      } else {
        setError(data.error || 'BLE connection failed');
        setConnectionStep('ble');
      }
    } catch (err) {
      setError('Failed to initiate BLE connection');
      setConnectionStep('ble');
    }
  };

  const handleAppExport = async () => {
    setConnectionStep('connecting');
    setError(null);

    try {
      const response = await fetch('/api/health/fire-boltt/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'app_export' })
      });

      const data = await response.json();

      if (data.success) {
        setConnectionStep('success');
        onConnectionSuccess('app_export');
      } else {
        setError(data.error || 'App export setup failed');
        setConnectionStep('app_export');
      }
    } catch (err) {
      setError('Failed to setup app export');
      setConnectionStep('app_export');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-orange-500/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-orange-500/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🔥</div>
              <div>
                <h2 className="text-2xl font-bold text-white">Fire-Boltt 094</h2>
                <p className="text-orange-400">Connect Your Indian Smartwatch</p>
              </div>
            </div>
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

        {/* Content */}
        <div className="p-6">
          
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

          {/* Method Selection */}
          {connectionStep === 'method' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Choose Connection Method</h3>
                <p className="text-gray-400">Select how you want to connect your Fire-Boltt 094</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* BLE Direct Connection */}
                <div 
                  className={`border rounded-xl p-6 cursor-pointer transition-all ${
                    bleSupported 
                      ? 'border-orange-500/50 bg-orange-900/20 hover:bg-orange-900/30' 
                      : 'border-gray-500/30 bg-gray-800/30 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={bleSupported ? () => setConnectionStep('ble') : undefined}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <WifiIcon className="h-8 w-8 text-orange-400" />
                    <div>
                      <h4 className="text-white font-semibold">BLE Direct</h4>
                      <p className="text-sm text-gray-400">Real-time connection</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Live heart rate & SpO2</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Instant notifications</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Best for active monitoring</span>
                    </div>
                  </div>

                  {!bleSupported && (
                    <div className="mt-3 text-xs text-gray-500">
                      Bluetooth not supported in this browser
                    </div>
                  )}
                </div>

                {/* App Data Export */}
                <div 
                  className="border border-blue-500/50 bg-blue-900/20 hover:bg-blue-900/30 rounded-xl p-6 cursor-pointer transition-all"
                  onClick={() => setConnectionStep('app_export')}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <DevicePhoneMobileIcon className="h-8 w-8 text-blue-400" />
                    <div>
                      <h4 className="text-white font-semibold">DaFit App Export</h4>
                      <p className="text-sm text-gray-400">Historical data</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Complete history</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Sleep & workout data</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Works on all devices</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <InformationCircleIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Fire-Boltt 094 Features</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>• Heart Rate Monitoring</div>
                  <div>• SpO2 Blood Oxygen</div>
                  <div>• Multi-Sport Tracking</div>
                  <div>• Sleep Analysis</div>
                  <div>• 7-Day Battery Life</div>
                  <div>• IP68 Water Resistant</div>
                </div>
              </div>
            </div>
          )}

          {/* BLE Connection Steps */}
          {connectionStep === 'ble' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Bluetooth Connection</h3>
                <p className="text-gray-400">Follow these steps to connect your Fire-Boltt 094</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="text-white font-medium">Prepare Your Watch</p>
                    <p className="text-gray-400 text-sm">Hold the side button for 3 seconds to enter pairing mode</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="text-white font-medium">Enable Bluetooth</p>
                    <p className="text-gray-400 text-sm">Make sure Bluetooth is enabled on your device</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="text-white font-medium">Start Connection</p>
                    <p className="text-gray-400 text-sm">Click connect and select your Fire-Boltt device</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setConnectionStep('method')}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleBLEConnection}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <BoltIcon className="h-5 w-5" />
                  <span>Connect via BLE</span>
                </button>
              </div>
            </div>
          )}

          {/* App Export Steps */}
          {connectionStep === 'app_export' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">DaFit App Export</h3>
                <p className="text-gray-400">Export your health data from the DaFit mobile app</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="text-white font-medium">Open DaFit App</p>
                    <p className="text-gray-400 text-sm">Launch the DaFit app on your smartphone</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="text-white font-medium">Navigate to Data Export</p>
                    <p className="text-gray-400 text-sm">Go to Profile → Data Export → Health Data Export</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="text-white font-medium">Select Data Range</p>
                    <p className="text-gray-400 text-sm">Choose the date range and data types to export</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <p className="text-white font-medium">Import to Vitalis</p>
                    <p className="text-gray-400 text-sm">Share the exported file with Vitalis for analysis</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setConnectionStep('method')}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleAppExport}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <DevicePhoneMobileIcon className="h-5 w-5" />
                  <span>Setup App Export</span>
                </button>
              </div>
            </div>
          )}

          {/* Connecting State */}
          {connectionStep === 'connecting' && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-pulse">🔥</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Connecting to Fire-Boltt 094</h3>
                <p className="text-gray-400">Please wait while we establish the connection...</p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            </div>
          )}

          {/* Success State */}
          {connectionStep === 'success' && (
            <div className="text-center space-y-6">
              <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fire-Boltt 094 Connected!</h3>
                <p className="text-gray-400">Your smartwatch is now connected and ready for health monitoring</p>
              </div>
              <button
                onClick={onClose}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Start Monitoring
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
