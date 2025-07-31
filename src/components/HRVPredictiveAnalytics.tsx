// HRV Analysis and Predictive Analytics Components
'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  LightBulbIcon,
  HeartIcon,
  BoltIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  BeakerIcon,
  TrophyIcon,
  UserGroupIcon,
  SparklesIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';

// Heart Rate Variability Analysis with RMSSD/pNN50
export function HRVAnalysisPanel({ hrvData }: { hrvData: any }) {
  const mockHRVData = {
    current: {
      rmssd: 42.5,
      pnn50: 18.2,
      sdnn: 48.3,
      triangularIndex: 12.1,
      stressIndex: 145,
      recoveryScore: 78,
      readinessScore: 82
    },
    trends: [
      { date: '2024-01-01', rmssd: 35, pnn50: 15, stress: 180, recovery: 65 },
      { date: '2024-01-08', rmssd: 38, pnn50: 16, stress: 165, recovery: 70 },
      { date: '2024-01-15', rmssd: 41, pnn50: 17, stress: 155, recovery: 75 },
      { date: '2024-01-22', rmssd: 43, pnn50: 18, stress: 145, recovery: 78 },
      { date: '2024-01-29', rmssd: 42, pnn50: 18, stress: 150, recovery: 76 }
    ],
    interpretation: {
      autonomicTone: 'balanced',
      stressLevel: 'moderate',
      recoveryStatus: 'good',
      trainingReadiness: 'high'
    }
  };

  const getHRVColor = (value: number, metric: string) => {
    switch (metric) {
      case 'rmssd':
        return value > 40 ? 'text-green-400' : value > 25 ? 'text-yellow-400' : 'text-red-400';
      case 'pnn50':
        return value > 15 ? 'text-green-400' : value > 8 ? 'text-yellow-400' : 'text-red-400';
      case 'recovery':
        return value > 75 ? 'text-green-400' : value > 60 ? 'text-yellow-400' : 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Main HRV Metrics */}
      <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 border border-violet-500/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <ChartBarIcon className="h-5 w-5 text-violet-400" />
          <span>Heart Rate Variability Analysis</span>
          <div className="bg-violet-600/20 border border-violet-500/50 rounded-lg px-3 py-1">
            <span className="text-violet-300 text-sm font-medium">Clinical Grade</span>
          </div>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* RMSSD */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-violet-400 text-sm font-medium mb-1">RMSSD</div>
            <div className={`text-2xl font-bold ${getHRVColor(mockHRVData.current.rmssd, 'rmssd')}`}>
              {mockHRVData.current.rmssd}
            </div>
            <div className="text-xs text-gray-400 mb-2">ms</div>
            <div className="text-xs text-green-400">+2.1 vs last week</div>
          </div>

          {/* pNN50 */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-1">pNN50</div>
            <div className={`text-2xl font-bold ${getHRVColor(mockHRVData.current.pnn50, 'pnn50')}`}>
              {mockHRVData.current.pnn50}%
            </div>
            <div className="text-xs text-gray-400 mb-2">percentage</div>
            <div className="text-xs text-green-400">+1.2% vs last week</div>
          </div>

          {/* Recovery Score */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-emerald-400 text-sm font-medium mb-1">Recovery</div>
            <div className={`text-2xl font-bold ${getHRVColor(mockHRVData.current.recoveryScore, 'recovery')}`}>
              {mockHRVData.current.recoveryScore}
            </div>
            <div className="text-xs text-gray-400 mb-2">score</div>
            <div className="text-xs text-green-400">Good recovery</div>
          </div>

          {/* Training Readiness */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-orange-400 text-sm font-medium mb-1">Readiness</div>
            <div className="text-2xl font-bold text-orange-400">
              {mockHRVData.current.readinessScore}
            </div>
            <div className="text-xs text-gray-400 mb-2">score</div>
            <div className="text-xs text-orange-400">High readiness</div>
          </div>
        </div>

        {/* HRV Trend Chart */}
        <div className="bg-black/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-4">HRV Trends (4 weeks)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mockHRVData.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="rmssd" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.2}
                  name="RMSSD"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="recovery" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Recovery Score"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Blood Oxygen Saturation Trends */}
      <BloodOxygenTrendsPanel />
      
      {/* Stress Index Analysis */}
      <StressIndexPanel />
      
      {/* Recovery Score Correlation */}
      <RecoveryCorrelationPanel />
      
      {/* Metabolic Efficiency */}
      <MetabolicEfficiencyPanel />
    </div>
  );
}

// Blood Oxygen Saturation with Altitude Compensation
function BloodOxygenTrendsPanel() {
  const oxygenData = {
    current: {
      restingSpO2: 98.2,
      exerciseSpO2: 96.8,
      sleepSpO2: 97.1,
      altitude: 1200, // feet
      compensatedSpO2: 98.7
    },
    trends: [
      { time: '00:00', spO2: 97.8, context: 'sleep' },
      { time: '06:00', spO2: 98.2, context: 'wake' },
      { time: '10:00', spO2: 96.5, context: 'exercise' },
      { time: '12:00', spO2: 98.1, context: 'rest' },
      { time: '18:00', spO2: 97.9, context: 'rest' },
      { time: '22:00', spO2: 97.6, context: 'sleep' }
    ],
    alerts: [
      { time: '10:15', spO2: 94.2, duration: 45, severity: 'mild', context: 'intense exercise' }
    ]
  };

  return (
    <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <BeakerIcon className="h-5 w-5 text-cyan-400" />
        <span>Blood Oxygen Saturation Trends</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-cyan-400 text-sm font-medium mb-1">Resting SpO₂</div>
          <div className="text-2xl font-bold text-green-400">{oxygenData.current.restingSpO2}%</div>
          <div className="text-xs text-green-400">Excellent</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-medium mb-1">Exercise SpO₂</div>
          <div className="text-2xl font-bold text-blue-400">{oxygenData.current.exerciseSpO2}%</div>
          <div className="text-xs text-blue-400">Normal</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-purple-400 text-sm font-medium mb-1">Sleep SpO₂</div>
          <div className="text-2xl font-bold text-purple-400">{oxygenData.current.sleepSpO2}%</div>
          <div className="text-xs text-purple-400">Good</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-orange-400 text-sm font-medium mb-1">Altitude Adjusted</div>
          <div className="text-2xl font-bold text-orange-400">{oxygenData.current.compensatedSpO2}%</div>
          <div className="text-xs text-gray-400">{oxygenData.current.altitude}ft elevation</div>
        </div>
      </div>

      {/* SpO2 Trend Chart */}
      <div className="bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">24-Hour SpO₂ Trends</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={oxygenData.trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis domain={[94, 99]} stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="spO2" 
                stroke="#06B6D4" 
                fill="#06B6D4" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      {oxygenData.alerts.length > 0 && (
        <div className="mt-4 bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-yellow-400 font-medium mb-2">Desaturation Events</h4>
          {oxygenData.alerts.map((alert, index) => (
            <div key={index} className="text-sm text-gray-300">
              {alert.time}: SpO₂ dropped to {alert.spO2}% for {alert.duration}s during {alert.context}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Stress Index using Multiple Data Points
function StressIndexPanel() {
  const stressData = {
    overallStress: 35,
    components: [
      { source: 'HRV', value: 25, weight: 40, status: 'low' },
      { source: 'Sleep Quality', value: 40, weight: 25, status: 'moderate' },
      { source: 'Activity Level', value: 45, weight: 20, status: 'moderate' },
      { source: 'Subjective Survey', value: 30, weight: 15, status: 'low' }
    ],
    recommendations: [
      'Consider meditation or breathing exercises',
      'Maintain consistent sleep schedule',
      'Monitor training load progression'
    ]
  };

  return (
    <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
        <span>Multi-Modal Stress Index</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Stress Score */}
        <div className="bg-black/30 rounded-lg p-6 text-center">
          <div className="text-yellow-400 text-sm font-medium mb-2">Overall Stress Level</div>
          <div className="text-4xl font-bold text-white mb-4">{stressData.overallStress}</div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full"
              style={{ width: `${stressData.overallStress}%` }}
            ></div>
          </div>
          <div className="text-sm text-green-400">LOW STRESS</div>
        </div>

        {/* Stress Components */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Stress Contributors</h4>
          <div className="space-y-3">
            {stressData.components.map((component, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{component.source}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    component.status === 'low' ? 'bg-green-600/20 text-green-300' :
                    component.status === 'moderate' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {component.status}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        component.status === 'low' ? 'bg-green-400' :
                        component.status === 'moderate' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${component.value}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {component.weight}% weight
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Stress Management Recommendations</h4>
        <div className="space-y-2">
          {stressData.recommendations.map((rec, index) => (
            <div key={index} className="flex items-center space-x-2">
              <SparklesIcon className="h-4 w-4 text-yellow-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Recovery Score with Sleep + HRV Correlation
function RecoveryCorrelationPanel() {
  const recoveryData = {
    overallScore: 78,
    components: {
      sleepRecovery: 82,
      hrvRecovery: 75,
      activityRecovery: 70,
      nutritionRecovery: 85,
      hydrationRecovery: 80
    },
    correlation: 0.74, // Sleep-HRV correlation
    trend: 'improving'
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ShieldCheckIcon className="h-5 w-5 text-emerald-400" />
        <span>Recovery Score Analysis</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Recovery */}
        <div className="bg-black/30 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="text-emerald-400 text-sm font-medium mb-2">Overall Recovery</div>
            <div className="text-4xl font-bold text-white">{recoveryData.overallScore}</div>
            <div className="text-sm text-emerald-400 mt-2">GOOD RECOVERY</div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-emerald-400 h-3 rounded-full"
              style={{ width: `${recoveryData.overallScore}%` }}
            ></div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400 capitalize">{recoveryData.trend}</span>
            </div>
          </div>
        </div>

        {/* Recovery Components */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Recovery Factors</h4>
          <div className="space-y-3">
            {Object.entries(recoveryData.components).map(([key, value], index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-white font-medium text-sm">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="text-emerald-400 font-bold">{value}</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-emerald-400 h-1.5 rounded-full"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sleep-HRV Correlation */}
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Sleep-HRV Correlation Analysis</h4>
        <div className="flex items-center justify-between">
          <div className="text-gray-300">
            Strong positive correlation between sleep quality and HRV recovery
          </div>
          <div className="text-emerald-400 font-bold text-xl">
            r = {recoveryData.correlation}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Optimizing sleep duration and quality directly improves autonomic recovery
        </div>
      </div>
    </div>
  );
}

// Metabolic Efficiency Calculation
function MetabolicEfficiencyPanel() {
  const metabolicData = {
    fatOxidationRate: 0.45, // g/min
    carbohydrateOxidationRate: 2.1, // g/min
    metabolicFlexibility: 78,
    restingMetabolicRate: 1850, // kcal/day
    exerciseEfficiency: 85,
    recommendations: [
      'Zone 2 training to improve fat oxidation',
      'Periodized nutrition timing',
      'Consider fasted training sessions'
    ]
  };

  return (
    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <FireIcon className="h-5 w-5 text-green-400" />
        <span>Metabolic Efficiency Analysis</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-green-400 text-sm font-medium mb-1">Fat Oxidation</div>
          <div className="text-2xl font-bold text-white">{metabolicData.fatOxidationRate}</div>
          <div className="text-xs text-gray-400">g/min</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-orange-400 text-sm font-medium mb-1">Carb Oxidation</div>
          <div className="text-2xl font-bold text-white">{metabolicData.carbohydrateOxidationRate}</div>
          <div className="text-xs text-gray-400">g/min</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-medium mb-1">Flexibility</div>
          <div className="text-2xl font-bold text-white">{metabolicData.metabolicFlexibility}</div>
          <div className="text-xs text-gray-400">score</div>
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Optimization Strategies</h4>
        <div className="space-y-2">
          {metabolicData.recommendations.map((rec, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FireIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Predictive Analytics Panel
export function PredictiveAnalyticsPanel({ predictiveData }: { predictiveData: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border border-amber-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <LightBulbIcon className="h-6 w-6 text-amber-400" />
          <span>Predictive Analytics & Early Warning</span>
        </h2>
        <div className="text-gray-300 mb-6">
          24-48 hour early illness detection with performance optimization and injury risk assessment.
        </div>
      </div>
      
      {/* Predictive Illness Detection */}
      <PredictiveIllnessPanel />
      
      {/* Performance Optimization */}
      <PerformanceOptimizationPanel />
      
      {/* Injury Risk Assessment */}
      <InjuryRiskPanel />
      
      {/* Personalized Training Load */}
      <PersonalizedTrainingLoadPanel />
    </div>
  );
}

// Predictive Illness Detection (24-48 hour early warning)
function PredictiveIllnessPanel() {
  const illnessData = {
    riskScore: 18,
    timeframe: '48h',
    confidence: 85,
    earlyWarningSignals: [
      { signal: 'Elevated Resting HR', detected: true, severity: 'mild' },
      { signal: 'Decreased HRV', detected: true, severity: 'moderate' },
      { signal: 'Sleep Disruption', detected: false, severity: 'none' },
      { signal: 'Subjective Fatigue', detected: true, severity: 'mild' }
    ],
    preventativeActions: [
      'Increase hydration intake',
      'Prioritize sleep quality',
      'Reduce training intensity',
      'Consider immune support supplements'
    ]
  };

  return (
    <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        <span>Predictive Illness Detection</span>
        <div className="bg-red-600/20 border border-red-500/50 rounded-lg px-3 py-1">
          <span className="text-red-300 text-sm font-medium">{illnessData.confidence}% Confidence</span>
        </div>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <div className="bg-black/30 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="text-red-400 text-sm font-medium mb-2">Illness Risk</div>
            <div className="text-4xl font-bold text-white">{illnessData.riskScore}%</div>
            <div className="text-sm text-green-400 mt-2">LOW RISK</div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full"
              style={{ width: `${illnessData.riskScore}%` }}
            ></div>
          </div>

          <div className="text-center text-sm text-gray-300">
            Prediction window: {illnessData.timeframe}
          </div>
        </div>

        {/* Early Warning Signals */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Early Warning Signals</h4>
          <div className="space-y-3">
            {illnessData.earlyWarningSignals.map((signal, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">{signal.signal}</div>
                  <div className="flex items-center space-x-2">
                    {signal.detected ? (
                      <ExclamationTriangleIcon className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <CheckCircleIcon className="h-4 w-4 text-green-400" />
                    )}
                    <span className={`text-xs px-2 py-1 rounded ${
                      signal.severity === 'none' ? 'bg-green-600/20 text-green-300' :
                      signal.severity === 'mild' ? 'bg-yellow-600/20 text-yellow-300' :
                      'bg-red-600/20 text-red-300'
                    }`}>
                      {signal.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preventative Actions */}
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Preventative Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {illnessData.preventativeActions.map((action, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Performance Optimization Recommendations
function PerformanceOptimizationPanel() {
  const performanceData = {
    currentLevel: 82,
    opportunities: [
      { area: 'Aerobic Capacity', potential: 12, effort: 'medium', timeframe: '8-12 weeks' },
      { area: 'Recovery Efficiency', potential: 18, effort: 'low', timeframe: '2-4 weeks' },
      { area: 'Power Output', potential: 8, effort: 'high', timeframe: '12-16 weeks' },
      { area: 'Metabolic Flexibility', potential: 15, effort: 'medium', timeframe: '6-8 weeks' }
    ]
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <TrophyIcon className="h-5 w-5 text-blue-400" />
        <span>Performance Optimization</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {performanceData.opportunities.map((opportunity, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-2">{opportunity.area}</div>
            <div className="text-2xl font-bold text-white mb-1">+{opportunity.potential}%</div>
            <div className="text-xs text-gray-400 mb-2">potential gain</div>
            <div className={`px-2 py-1 rounded text-xs font-medium mb-2 ${
              opportunity.effort === 'low' ? 'bg-green-600/20 text-green-300' :
              opportunity.effort === 'medium' ? 'bg-yellow-600/20 text-yellow-300' :
              'bg-red-600/20 text-red-300'
            }`}>
              {opportunity.effort} effort
            </div>
            <div className="text-xs text-gray-400">{opportunity.timeframe}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Injury Risk Assessment with Confidence Intervals
function InjuryRiskPanel() {
  const injuryData = {
    overallRisk: 22,
    confidenceInterval: [18, 26],
    bodyPartRisks: [
      { part: 'Knee', risk: 28, factors: ['Training load', 'Previous injury'] },
      { part: 'Lower Back', risk: 15, factors: ['Sitting posture', 'Core strength'] },
      { part: 'Shoulder', risk: 12, factors: ['Overuse', 'Mobility'] },
      { part: 'Ankle', risk: 8, factors: ['Balance', 'Proprioception'] }
    ]
  };

  return (
    <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ShieldCheckIcon className="h-5 w-5 text-orange-400" />
        <span>Injury Risk Assessment</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 rounded-lg p-6 text-center">
          <div className="text-orange-400 text-sm font-medium mb-2">Overall Risk</div>
          <div className="text-4xl font-bold text-white">{injuryData.overallRisk}%</div>
          <div className="text-sm text-yellow-400 mt-2">MODERATE RISK</div>
          <div className="text-xs text-gray-400 mt-2">
            CI: {injuryData.confidenceInterval[0]}%-{injuryData.confidenceInterval[1]}%
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Risk by Body Part</h4>
          <div className="space-y-3">
            {injuryData.bodyPartRisks.map((bodyPart, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{bodyPart.part}</div>
                  <div className="text-orange-400 font-bold">{bodyPart.risk}%</div>
                </div>
                <div className="text-xs text-gray-300">
                  Risk factors: {bodyPart.factors.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Personalized Training Load Recommendations
function PersonalizedTrainingLoadPanel() {
  const trainingData = {
    currentLoad: 68,
    optimalLoad: 75,
    recommendation: {
      direction: 'increase',
      magnitude: 10,
      rationale: 'Good recovery metrics support progressive overload'
    },
    adaptation: 85,
    fatigue: 25
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <BoltIcon className="h-5 w-5 text-purple-400" />
        <span>Personalized Training Load</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-purple-400 text-sm font-medium mb-1">Current Load</div>
          <div className="text-3xl font-bold text-white">{trainingData.currentLoad}</div>
          <div className="text-xs text-gray-400">TSS/week</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-medium mb-1">Optimal Load</div>
          <div className="text-3xl font-bold text-white">{trainingData.optimalLoad}</div>
          <div className="text-xs text-gray-400">target TSS</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-green-400 text-sm font-medium mb-1">Recommendation</div>
          <div className="text-xl font-bold text-green-400">
            {trainingData.recommendation.direction === 'increase' ? '↗' : '↘'} {trainingData.recommendation.magnitude}%
          </div>
          <div className="text-xs text-gray-400">adjustment</div>
        </div>
      </div>

      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <div className="text-white font-medium mb-2">Rationale:</div>
        <div className="text-sm text-gray-300">{trainingData.recommendation.rationale}</div>
      </div>
    </div>
  );
}
