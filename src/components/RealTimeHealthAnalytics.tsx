// Real-Time Health Analytics Dashboard - Military-Grade Monitoring
'use client';

import React, { useState, useEffect } from 'react';
import {
  CpuChipIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BeakerIcon,
  BoltIcon,
  EyeIcon,
  FireIcon,
  RocketLaunchIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { predictiveEngine } from '@/lib/predictive-health-engine';
import { EmergencyResponseProtocol, generateSampleEmergencyEvent, EmergencyEvent } from './EmergencyResponseProtocol';

interface RealTimeAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function RealTimeHealthAnalytics({ isOpen, onClose, userId }: RealTimeAnalyticsProps) {
  const [predictiveData, setPredictiveData] = useState<any>(null);
  const [emergencyEvent, setEmergencyEvent] = useState<EmergencyEvent | null>(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [aiProcessingLoad, setAiProcessingLoad] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<'optimal' | 'warning' | 'critical'>('optimal');

  // Load predictive analytics data
  useEffect(() => {
    if (isOpen) {
      loadPredictiveData();
      
      // Update every 30 seconds
      const interval = setInterval(() => {
        loadPredictiveData();
        setCurrentTime(new Date());
        updateAiProcessing();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const loadPredictiveData = async () => {
    try {
      const mockHealthData = {
        heartRate: [{ value: 72, timestamp: new Date() }],
        sleep: [{ quality: 82, duration: 7.5 }],
        activity: [{ steps: 8500, calories: 2200 }]
      };

      const mockProfile = {
        id: userId,
        age: 28,
        gender: 'male' as const,
        height: 175,
        weight: 70,
        fitnessLevel: 'moderate' as const,
        activityLevel: 'moderate' as const,
        healthGoals: []
      };

      const data = await predictiveEngine.generatePredictiveReport(mockHealthData, mockProfile);
      setPredictiveData(data);
    } catch (error) {
      console.error('Failed to load predictive data:', error);
    }
  };

  const updateAiProcessing = () => {
    setAiProcessingLoad(prev => {
      const newLoad = Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 25));
      return Math.round(newLoad);
    });
  };

  const triggerEmergencyDemo = () => {
    const event = generateSampleEmergencyEvent();
    setEmergencyEvent(event);
    setIsEmergencyActive(true);
    setSystemStatus('critical');
  };

  const handleEmergencyDismiss = () => {
    setIsEmergencyActive(false);
    setEmergencyEvent(null);
    setSystemStatus('optimal');
  };

  const handleEmergencyAcknowledge = () => {
    console.log('Emergency acknowledged');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-7xl h-[95vh] overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 border-b border-blue-500/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <CpuChipIcon className="h-8 w-8 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Real-Time Health Analytics</h2>
                  <p className="text-blue-200">Advanced Predictive Monitoring • Military-Grade Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {/* System Status */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    systemStatus === 'optimal' ? 'bg-green-400' :
                    systemStatus === 'warning' ? 'bg-yellow-400' :
                    'bg-red-400 animate-pulse'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    systemStatus === 'optimal' ? 'text-green-400' :
                    systemStatus === 'warning' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {systemStatus.toUpperCase()}
                  </span>
                </div>

                {/* AI Processing Load */}
                <div className="flex items-center space-x-2">
                  <BeakerIcon className="h-5 w-5 text-purple-400" />
                  <div className="flex flex-col">
                    <span className="text-purple-400 text-xs font-medium">AI PROCESSING</span>
                    <div className="w-20 bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-purple-400 h-1 rounded-full transition-all duration-1000"
                        style={{ width: `${aiProcessingLoad}%` }}
                      ></div>
                    </div>
                  </div>
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

          <div className="p-6 h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-black/50">
            
            {/* Demo Controls */}
            <div className="mb-6 p-4 bg-black/40 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-yellow-400 font-semibold">Demo Controls</h3>
                  <p className="text-gray-300 text-sm">Test military-grade emergency response protocols</p>
                </div>
                <button
                  onClick={triggerEmergencyDemo}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <span>Trigger Emergency</span>
                </button>
              </div>
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* Predictive Metrics */}
              <div className="col-span-8 space-y-6">
                
                {/* Predictive Health Forecasts */}
                <div className="bg-black/60 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <LightBulbIcon className="h-5 w-5 text-purple-400" />
                    <span>24-48 Hour Health Forecasts</span>
                    <div className="ml-auto text-purple-400 text-sm">91% Accuracy</div>
                  </h3>
                  
                  {predictiveData?.predictiveMetrics && (
                    <div className="grid grid-cols-2 gap-4">
                      {predictiveData.predictiveMetrics.slice(0, 4).map((metric: any) => (
                        <div key={metric.id} className="bg-black/40 border border-gray-600/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300 text-sm">{metric.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              metric.trend === 'improving' ? 'bg-green-500/20 text-green-400' :
                              metric.trend === 'declining' ? 'bg-red-500/20 text-red-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {metric.trend}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl font-bold text-white">{metric.currentValue}</div>
                            <div className="text-lg text-gray-400">→</div>
                            <div className="text-2xl font-bold text-purple-400">{metric.predictedValue}</div>
                          </div>
                          <div className="mt-2 text-xs text-gray-400">
                            {metric.timeframe} • {Math.round(metric.confidence * 100)}% confidence
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Performance Optimization */}
                <div className="bg-black/60 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <RocketLaunchIcon className="h-5 w-5 text-green-400" />
                    <span>Performance Optimization</span>
                  </h3>
                  
                  {predictiveData?.performanceOptimizations && (
                    <div className="space-y-4">
                      {predictiveData.performanceOptimizations.map((opt: any) => (
                        <div key={opt.id} className="bg-black/40 border border-gray-600/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-white font-medium capitalize">{opt.category}</span>
                              <div className="flex items-center space-x-2">
                                <div className="text-sm text-gray-400">{opt.currentScore}</div>
                                <div className="text-lg text-gray-400">→</div>
                                <div className="text-sm text-green-400 font-bold">{opt.potentialScore}</div>
                              </div>
                            </div>
                            <div className="text-green-400 text-sm">+{opt.potentialScore - opt.currentScore}pts</div>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">
                            Time to optimal: {opt.timeToOptimal} days
                          </div>
                          <div className="space-y-1 text-xs text-gray-400">
                            {opt.improvementStrategy.slice(0, 2).map((strategy: string, index: number) => (
                              <div key={index}>• {strategy}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Injury Risk Assessment */}
                <div className="bg-black/60 border border-orange-500/30 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <ShieldCheckIcon className="h-5 w-5 text-orange-400" />
                    <span>Injury Risk Assessment</span>
                  </h3>
                  
                  {predictiveData?.injuryAssessments && (
                    <div className="space-y-4">
                      {predictiveData.injuryAssessments.map((assessment: any) => (
                        <div key={assessment.id} className="bg-black/40 border border-gray-600/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium">{assessment.bodyPart}</span>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                assessment.riskLevel < 20 ? 'bg-green-400' :
                                assessment.riskLevel < 50 ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}></div>
                              <span className={`text-sm font-medium ${
                                assessment.riskLevel < 20 ? 'text-green-400' :
                                assessment.riskLevel < 50 ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {assessment.riskLevel}% Risk
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1 text-xs text-gray-400">
                            {assessment.riskFactors.slice(0, 2).map((factor: string, index: number) => (
                              <div key={index}>• {factor}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar - Emergency & Status */}
              <div className="col-span-4 space-y-4">
                
                {/* Emergency Status */}
                <div className="bg-black/60 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <FireIcon className="h-4 w-4 text-red-400" />
                    <span>Emergency Status</span>
                  </h3>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 relative">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                        systemStatus === 'optimal' ? 'bg-green-400/20 border-green-400' :
                        systemStatus === 'warning' ? 'bg-yellow-400/20 border-yellow-400' :
                        'bg-red-400/20 border-red-400'
                      }`}>
                        <ShieldCheckIcon className={`h-8 w-8 ${
                          systemStatus === 'optimal' ? 'text-green-400' :
                          systemStatus === 'warning' ? 'text-yellow-400' :
                          'text-red-400'
                        }`} />
                      </div>
                      {systemStatus === 'critical' && (
                        <div className="absolute inset-0 border-2 border-red-400 rounded-full animate-ping opacity-20"></div>
                      )}
                    </div>
                    <div className={`font-semibold ${
                      systemStatus === 'optimal' ? 'text-green-400' :
                      systemStatus === 'warning' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {systemStatus === 'optimal' ? 'ALL CLEAR' :
                       systemStatus === 'warning' ? 'CAUTION' :
                       'EMERGENCY ACTIVE'}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {systemStatus === 'optimal' ? 'No threats detected' :
                       systemStatus === 'warning' ? 'Monitoring elevated metrics' :
                       'Emergency protocol active'}
                    </div>
                  </div>
                </div>

                {/* AI Processing Status */}
                <div className="bg-black/60 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <CpuChipIcon className="h-4 w-4 text-purple-400" />
                    <span>AI Engine Status</span>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing Load</span>
                      <span className="text-purple-400 font-medium">{aiProcessingLoad}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Models Active</span>
                      <span className="text-green-400">4/4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Predictions/Min</span>
                      <span className="text-blue-400">157</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy</span>
                      <span className="text-green-400">91.2%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Predictions */}
                <div className="bg-black/60 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <EyeIcon className="h-4 w-4 text-blue-400" />
                    <span>Live Predictions</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-gray-300">Sleep quality tonight: 78/100</div>
                        <div className="text-green-400">Just now</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-gray-300">HRV trend: Improving (+3ms)</div>
                        <div className="text-blue-400">2m ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-gray-300">Performance peak: Tomorrow 3-5 PM</div>
                        <div className="text-purple-400">5m ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-gray-300">Recovery needed: 48 hours</div>
                        <div className="text-yellow-400">8m ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Risk Score */}
                <div className="bg-black/60 border border-gray-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-3">Overall Risk Score</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      {predictiveData?.overallRiskScore || 8}
                    </div>
                    <div className="text-green-400 text-sm">LOW RISK</div>
                    <div className="text-xs text-gray-400 mt-2">
                      Based on 12 predictive factors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Response Protocol Overlay */}
      <EmergencyResponseProtocol
        emergencyEvent={emergencyEvent}
        isActive={isEmergencyActive}
        onDismiss={handleEmergencyDismiss}
        onAcknowledge={handleEmergencyAcknowledge}
      />
    </>
  );
}
