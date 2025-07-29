// Health Command Center - Real-time monitoring for Vitalis
'use client';

import React, { useState, useEffect } from 'react';
import { 
  ComputerDesktopIcon,
  SignalIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BoltIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  healthData: any;
}

export function HealthCommandCenter({ isOpen, onClose, healthData }: CommandCenterProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('operational');
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
        {/* Command Center Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border-b border-blue-500/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ComputerDesktopIcon className="h-8 w-8 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Vitalis Command Center</h2>
                <p className="text-blue-200">Real-time Health Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-white font-mono text-lg">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-blue-200 text-sm">
                  {currentTime.toLocaleDateString()}
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
        </div>

        {/* Command Center Content */}
        <div className="p-6 h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-6 h-full">
            
            {/* Left Panel - System Status */}
            <div className="col-span-3 space-y-4">
              <div className="bg-black/40 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">SYSTEM OPERATIONAL</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Health APIs</span>
                    <span className="text-green-400">✓ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Engine</span>
                    <span className="text-green-400">✓ Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Real-time Monitor</span>
                    <span className="text-green-400">✓ Streaming</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Sync</span>
                    <span className="text-green-400">✓ 100%</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Active Devices</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Samsung Galaxy Watch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Oura Ring Gen 3</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Fitbit Sense 2</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Alert Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Critical</span>
                    <span className="text-red-400 font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warning</span>
                    <span className="text-yellow-400 font-bold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Info</span>
                    <span className="text-blue-400 font-bold">5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel - Live Data */}
            <div className="col-span-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/40 border border-red-500/30 rounded-lg p-4 text-center">
                  <HeartIcon className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">72</div>
                  <div className="text-red-400 text-sm">BPM</div>
                  <div className="text-xs text-gray-400 mt-1">Resting</div>
                </div>
                
                <div className="bg-black/40 border border-blue-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🫁</div>
                  <div className="text-3xl font-bold text-white">98</div>
                  <div className="text-blue-400 text-sm">SpO₂ %</div>
                  <div className="text-xs text-gray-400 mt-1">Optimal</div>
                </div>
                
                <div className="bg-black/40 border border-green-500/30 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🌡️</div>
                  <div className="text-3xl font-bold text-white">98.6</div>
                  <div className="text-green-400 text-sm">°F</div>
                  <div className="text-xs text-gray-400 mt-1">Normal</div>
                </div>
              </div>

              {/* Real-time Charts */}
              <div className="bg-black/40 border border-gray-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4">Live Vitals Stream</h3>
                <div className="h-48 flex items-end justify-center space-x-1">
                  {/* Simulated ECG Wave */}
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-green-400 w-2 transition-all duration-100"
                      style={{
                        height: `${Math.abs(Math.sin(i * 0.5) * 100) + 20}px`,
                        opacity: 1 - (i * 0.02)
                      }}
                    ></div>
                  ))}
                </div>
                <div className="text-center text-gray-400 text-sm mt-2">
                  Electrocardiogram - Normal Sinus Rhythm
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">AI Analysis Engine</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Cardiovascular patterns: NORMAL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-sm">Sleep quality prediction: HIGH</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-yellow-400 text-sm">Recovery optimization: ANALYZING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Mission Status */}
            <div className="col-span-3 space-y-4">
              <div className="bg-black/40 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Mission Readiness</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">94%</div>
                  <div className="text-yellow-400 text-sm">COMBAT READY</div>
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Physical</span>
                      <span className="text-green-400">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mental</span>
                      <span className="text-green-400">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recovery</span>
                      <span className="text-green-400">94%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Recent Events</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-gray-300">Sleep cycle completed</div>
                      <div className="text-gray-500">2m ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-gray-300">Morning HRV measured</div>
                      <div className="text-gray-500">15m ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-gray-300">Hydration reminder</div>
                      <div className="text-gray-500">32m ago</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Threat Assessment</h3>
                <div className="text-center">
                  <ShieldCheckIcon className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-green-400 font-semibold">ALL CLEAR</div>
                  <div className="text-xs text-gray-400 mt-2">
                    No health threats detected
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
