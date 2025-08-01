// Health Command Center - Military-Grade Real-time Health Monitoring
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ComputerDesktopIcon,
  SignalIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BoltIcon,
  HeartIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ChartBarIcon,
  EyeIcon,
  FireIcon,
  LightBulbIcon,
  SpeakerWaveIcon,
  CpuChipIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  healthData: any;
}

interface VitalSign {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdate: Date;
}

interface EmergencyProtocol {
  id: string;
  type: 'cardiac' | 'respiratory' | 'neurological' | 'metabolic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actions: string[];
  activatedAt: Date;
}

interface PredictiveAlert {
  id: string;
  type: 'injury_risk' | 'illness_onset' | 'performance_decline' | 'recovery_needed';
  probability: number;
  timeframe: string;
  description: string;
  preventiveActions: string[];
}

export function HealthCommandCenter({ isOpen, onClose, healthData }: CommandCenterProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('operational');
  const [alertCount, setAlertCount] = useState(0);
  
  // Enhanced state management
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const [emergencyProtocols, setEmergencyProtocols] = useState<EmergencyProtocol[]>([]);
  const [predictiveAlerts, setPredictiveAlerts] = useState<PredictiveAlert[]>([]);
  const [missionReadiness, setMissionReadiness] = useState(94);
  const [threatLevel, setThreatLevel] = useState<'green' | 'yellow' | 'orange' | 'red'>('green');
  const [aiProcessingLoad, setAiProcessingLoad] = useState(0);

  // Simulate real-time vital signs monitoring
  const simulateVitalSigns = useCallback(() => {
    const baseHeartRate = 72;
    const heartRateVariation = Math.sin(Date.now() / 10000) * 8;
    const currentHeartRate = Math.round(baseHeartRate + heartRateVariation + (Math.random() - 0.5) * 4);
    
    const vitalData: VitalSign[] = [
      {
        id: 'heart_rate',
        name: 'Heart Rate',
        value: currentHeartRate,
        unit: 'BPM',
        status: currentHeartRate > 100 ? 'warning' : currentHeartRate > 120 ? 'critical' : 'normal',
        trend: currentHeartRate > 75 ? 'up' : currentHeartRate < 68 ? 'down' : 'stable',
        lastUpdate: new Date()
      },
      {
        id: 'spo2',
        name: 'Blood Oxygen',
        value: Math.round(98 + Math.random() * 2),
        unit: '%',
        status: 'normal',
        trend: 'stable',
        lastUpdate: new Date()
      },
      {
        id: 'temperature',
        name: 'Core Temperature',
        value: parseFloat((98.6 + (Math.random() - 0.5) * 1.2).toFixed(1)),
        unit: '°F',
        status: 'normal',
        trend: 'stable',
        lastUpdate: new Date()
      },
      {
        id: 'hrv',
        name: 'HRV (RMSSD)',
        value: Math.round(45 + (Math.random() - 0.5) * 20),
        unit: 'ms',
        status: 'normal',
        trend: 'stable',
        lastUpdate: new Date()
      },
      {
        id: 'stress',
        name: 'Stress Index',
        value: Math.round(25 + Math.random() * 30),
        unit: '/100',
        status: 'normal',
        trend: 'stable',
        lastUpdate: new Date()
      },
      {
        id: 'bp_systolic',
        name: 'Blood Pressure',
        value: Math.round(120 + (Math.random() - 0.5) * 10),
        unit: 'mmHg',
        status: 'normal',
        trend: 'stable',
        lastUpdate: new Date()
      }
    ];
    
    setVitalSigns(vitalData);
  }, []);

  // Generate predictive health alerts
  const generatePredictiveAlerts = useCallback(() => {
    const alerts: PredictiveAlert[] = [
      {
        id: 'fatigue_prediction',
        type: 'performance_decline',
        probability: 0.23,
        timeframe: '6-8 hours',
        description: 'Elevated HRV variance suggests potential performance decline',
        preventiveActions: ['Reduce training intensity', 'Increase rest periods', 'Monitor hydration']
      },
      {
        id: 'recovery_needed',
        type: 'recovery_needed',
        probability: 0.67,
        timeframe: '2-3 days',
        description: 'Sleep debt accumulation detected - recovery window recommended',
        preventiveActions: ['Prioritize 8+ hours sleep', 'Reduce high-intensity workouts', 'Focus on stress management']
      },
      {
        id: 'injury_risk',
        type: 'injury_risk',
        probability: 0.15,
        timeframe: '1-2 weeks',
        description: 'Movement asymmetry patterns detected in recent activity data',
        preventiveActions: ['Schedule mobility assessment', 'Incorporate corrective exercises', 'Monitor movement quality']
      }
    ];
    
    setPredictiveAlerts(alerts);
  }, []);

  // Simulate AI processing load
  const updateAiProcessing = useCallback(() => {
    setAiProcessingLoad(prev => {
      const newLoad = Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15));
      return Math.round(newLoad);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      simulateVitalSigns();
      updateAiProcessing();
    }, 2000);

    // Initialize predictive alerts
    generatePredictiveAlerts();

    return () => clearInterval(timer);
  }, [simulateVitalSigns, generatePredictiveAlerts, updateAiProcessing]);

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400 border-green-500/30';
      case 'warning': return 'text-yellow-400 border-yellow-500/30';
      case 'critical': return 'text-red-400 border-red-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-7xl h-[95vh] overflow-hidden shadow-2xl">
        {/* Enhanced Command Center Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border-b border-blue-500/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ComputerDesktopIcon className="h-8 w-8 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Vitalis Military Command Center</h2>
                <p className="text-blue-200">Advanced Predictive Health Monitoring • AI-Powered Emergency Response</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* AI Processing Indicator */}
              <div className="flex items-center space-x-2">
                <CpuChipIcon className="h-5 w-5 text-purple-400" />
                <div className="flex flex-col">
                  <span className="text-purple-400 text-xs font-medium">AI PROCESSING</span>
                  <div className="w-24 bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-purple-400 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${aiProcessingLoad}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Mission Status */}
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg">{missionReadiness}%</div>
                <div className="text-yellow-300 text-xs">READY</div>
              </div>
              
              {/* Current Time */}
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

        {/* Enhanced Command Center Content */}
        <div className="p-6 h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-black/50">
          <div className="grid grid-cols-12 gap-6 h-full">
            
            {/* Left Panel - System Status & Devices */}
            <div className="col-span-3 space-y-4">
              {/* System Status */}
              <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">SYSTEMS OPERATIONAL</span>
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
                    <span className="text-gray-400">Emergency Proto</span>
                    <span className="text-green-400">✓ Ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predictive AI</span>
                    <span className="text-purple-400">✓ Learning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Sync</span>
                    <span className="text-green-400">✓ 100%</span>
                  </div>
                </div>
              </div>

              {/* Connected Devices */}
              <div className="bg-black/60 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <SignalIcon className="h-4 w-4 text-blue-400" />
                  <span>Active Devices</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">Galaxy Watch 6</span>
                    </div>
                    <span className="text-blue-400 text-xs">LIVE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">Oura Ring Gen 3</span>
                    </div>
                    <span className="text-green-400 text-xs">SYNC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">Apple Watch</span>
                    </div>
                    <span className="text-purple-400 text-xs">CONN</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300">Fitbit Sense 2</span>
                    </div>
                    <span className="text-yellow-400 text-xs">IDLE</span>
                  </div>
                </div>
              </div>

              {/* Predictive Alerts */}
              <div className="bg-black/60 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <LightBulbIcon className="h-4 w-4 text-purple-400" />
                  <span>Predictive Alerts</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {predictiveAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="border-l-2 border-purple-400/50 pl-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-purple-300 font-medium">{Math.round(alert.probability * 100)}%</span>
                        <span className="text-gray-400">{alert.timeframe}</span>
                      </div>
                      <div className="text-gray-300">{alert.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Protocols */}
              <div className="bg-black/60 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />
                  <span>Emergency Status</span>
                </h3>
                <div className="text-center">
                  <ShieldCheckIcon className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-green-400 font-semibold">ALL CLEAR</div>
                  <div className="text-xs text-gray-400 mt-2">
                    No emergency protocols active
                  </div>
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cardiac</span>
                      <span className="text-green-400">✓ Normal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Respiratory</span>
                      <span className="text-green-400">✓ Normal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Neurological</span>
                      <span className="text-green-400">✓ Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel - Enhanced Live Data */}
            <div className="col-span-6 space-y-4">
              {/* Real-time Vital Signs Grid */}
              <div className="grid grid-cols-3 gap-4">
                {vitalSigns.slice(0, 6).map((vital) => (
                  <div key={vital.id} className={`bg-black/60 border rounded-lg p-4 text-center backdrop-blur-sm ${getStatusColor(vital.status)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl">
                        {vital.id === 'heart_rate' && '❤️'}
                        {vital.id === 'spo2' && '🫁'}
                        {vital.id === 'temperature' && '🌡️'}
                        {vital.id === 'hrv' && '⚡'}
                        {vital.id === 'stress' && '🧠'}
                        {vital.id === 'bp_systolic' && '🩸'}
                      </div>
                      <span className="text-sm">{getTrendIcon(vital.trend)}</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{vital.value}</div>
                    <div className={`text-sm mb-1 ${getStatusColor(vital.status).split(' ')[0]}`}>
                      {vital.unit}
                    </div>
                    <div className="text-xs text-gray-400">{vital.name}</div>
                  </div>
                ))}
              </div>

              {/* Advanced Live Vitals Stream */}
              <div className="bg-black/60 border border-gray-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center space-x-2">
                    <ChartBarIcon className="h-5 w-5 text-green-400" />
                    <span>Live Biometric Stream</span>
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">STREAMING</span>
                    </div>
                    <div className="text-gray-400 text-sm">{new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
                
                {/* Enhanced ECG Visualization */}
                <div className="h-48 flex items-end justify-center space-x-1 mb-4">
                  {Array.from({ length: 60 }, (_, i) => {
                    const heartbeatPattern = Math.abs(Math.sin(i * 0.3) * Math.cos(i * 0.1)) * 80 + 20;
                    const isHeartbeat = i % 15 === 0;
                    return (
                      <div
                        key={i}
                        className={`w-1 transition-all duration-200 ${
                          isHeartbeat ? 'bg-red-400' : 'bg-green-400'
                        }`}
                        style={{
                          height: `${isHeartbeat ? heartbeatPattern * 1.5 : heartbeatPattern}px`,
                          opacity: 1 - (i * 0.015)
                        }}
                      ></div>
                    );
                  })}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-green-400 font-semibold">Normal Sinus Rhythm</div>
                    <div className="text-gray-400">QRS: 98ms</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-semibold">HRV Analysis</div>
                    <div className="text-gray-400">RMSSD: {vitalSigns.find(v => v.id === 'hrv')?.value || 45}ms</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-semibold">Recovery Status</div>
                    <div className="text-gray-400">Optimal</div>
                  </div>
                </div>
              </div>

              {/* AI Analysis Engine */}
              <div className="bg-black/60 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <BeakerIcon className="h-5 w-5 text-purple-400" />
                  <span>AI Analysis Engine</span>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-400 text-sm">PROCESSING</span>
                  </div>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Cardiovascular patterns: OPTIMAL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 text-sm">Sleep quality prediction: HIGH (92%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-yellow-400 text-sm">Recovery optimization: ACTIVE</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-orange-400 text-sm">Injury risk assessment: LOW (15%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                      <span className="text-pink-400 text-sm">Performance prediction: ANALYZING</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-cyan-400 text-sm">Stress correlation: MONITORING</span>
                    </div>
                  </div>
                </div>
                
                {/* AI Processing Progress */}
                <div className="mt-4 p-3 bg-black/40 rounded border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-300 text-sm">Neural Network Processing</span>
                    <span className="text-purple-400 text-sm">{aiProcessingLoad}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${aiProcessingLoad}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Mission Readiness & Advanced Analytics */}
            <div className="col-span-3 space-y-4">
              {/* Mission Readiness */}
              <div className="bg-black/60 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <RocketLaunchIcon className="h-4 w-4 text-yellow-400" />
                  <span>Mission Readiness</span>
                </h3>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#facc15"
                        strokeWidth="2"
                        strokeDasharray={`${missionReadiness}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-400">{missionReadiness}%</span>
                    </div>
                  </div>
                  <div className="text-yellow-400 font-semibold">COMBAT READY</div>
                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Physical Readiness</span>
                      <span className="text-green-400">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mental Acuity</span>
                      <span className="text-green-400">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recovery Status</span>
                      <span className="text-green-400">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Injury Risk</span>
                      <span className="text-yellow-400">15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Intelligence */}
              <div className="bg-black/60 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <EyeIcon className="h-4 w-4 text-blue-400" />
                  <span>Intelligence Feed</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-300">Sleep architecture optimized</div>
                      <div className="text-gray-500">REM: 94 min • Deep: 87 min</div>
                      <div className="text-green-400">2m ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-300">HRV baseline established</div>
                      <div className="text-gray-500">Morning RMSSD: 47ms</div>
                      <div className="text-blue-400">15m ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-300">Predictive model updated</div>
                      <div className="text-gray-500">Performance forecast: +12%</div>
                      <div className="text-purple-400">28m ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-300">Hydration optimization</div>
                      <div className="text-gray-500">Electrolyte balance ideal</div>
                      <div className="text-yellow-400">45m ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-300">Training load calculated</div>
                      <div className="text-gray-500">Weekly TSS: 287 (optimal)</div>
                      <div className="text-orange-400">1h ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Threat Assessment */}
              <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                  <span>Threat Assessment</span>
                </h3>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center border-2 border-green-400">
                      <ShieldCheckIcon className="h-8 w-8 text-green-400" />
                    </div>
                    <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="text-green-400 font-semibold">ALL CLEAR</div>
                  <div className="text-xs text-gray-400 mt-1">
                    No immediate health threats detected
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Cardiovascular</span>
                      <span className="text-green-400 font-medium">SECURE</span>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Respiratory</span>
                      <span className="text-green-400 font-medium">SECURE</span>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Neurological</span>
                      <span className="text-green-400 font-medium">SECURE</span>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Recovery Debt</span>
                      <span className="text-yellow-400 font-medium">CAUTION</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Response Ready */}
              <div className="bg-black/60 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <SpeakerWaveIcon className="h-4 w-4 text-red-400" />
                  <span>Emergency Response</span>
                </h3>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50">
                    <FireIcon className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="text-red-400 font-semibold text-sm">STANDBY</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Auto-response protocols armed
                  </div>
                  <div className="mt-3 text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-red-400">&lt; 30s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Emergency Contacts</span>
                      <span className="text-red-400">3 Active</span>
                    </div>
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
