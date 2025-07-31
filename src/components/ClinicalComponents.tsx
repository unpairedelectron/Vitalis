// Advanced Clinical Components for Vitalis
'use client';

import React, { useState, useEffect } from 'react';
import { 
  HeartIcon,
  BeakerIcon,
  MapIcon,
  ChartBarIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  TrophyIcon,
  BoltIcon,
  ClockIcon,
  EyeIcon,
  UserGroupIcon,
  FireIcon,
  CpuChipIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';

// Real-time ICU-style Vitals Monitor
export function ICUVitalsMonitor({ vitalsData }: { vitalsData: any }) {
  const [currentVitals, setCurrentVitals] = useState({
    heartRate: 72,
    bloodPressure: { systolic: 118, diastolic: 78 },
    oxygenSaturation: 98,
    respiratoryRate: 16,
    temperature: 98.6,
    alertStatus: 'normal' as const
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVitals(prev => ({
        ...prev,
        heartRate: prev.heartRate + (Math.random() - 0.5) * 4,
        oxygenSaturation: Math.max(95, Math.min(100, prev.oxygenSaturation + (Math.random() - 0.5) * 0.5)),
        respiratoryRate: Math.max(12, Math.min(20, prev.respiratoryRate + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getVitalColor = (vital: string, value: number) => {
    switch (vital) {
      case 'heartRate':
        return value > 100 || value < 60 ? 'text-red-400' : 
               value > 90 || value < 65 ? 'text-yellow-400' : 'text-green-400';
      case 'oxygenSaturation':
        return value < 95 ? 'text-red-400' : value < 97 ? 'text-yellow-400' : 'text-green-400';
      case 'bloodPressure':
        return value > 140 || value < 90 ? 'text-red-400' : 
               value > 130 || value < 100 ? 'text-yellow-400' : 'text-green-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-gray-900 border border-gray-600 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <HeartIcon className="h-6 w-6 text-red-400" />
          <span>Real-time Vital Signs Monitor</span>
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          currentVitals.alertStatus === 'normal' ? 'bg-green-600/20 text-green-300' :
          currentVitals.alertStatus === 'caution' ? 'bg-yellow-600/20 text-yellow-300' :
          'bg-red-600/20 text-red-300'
        }`}>
          {currentVitals.alertStatus.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Heart Rate */}
        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Heart Rate</div>
          <div className={`text-3xl font-bold ${getVitalColor('heartRate', currentVitals.heartRate)}`}>
            {Math.round(currentVitals.heartRate)}
          </div>
          <div className="text-xs text-gray-500">bpm</div>
          <div className="mt-2 h-1 bg-gray-700 rounded">
            <div 
              className="h-1 bg-red-400 rounded animate-pulse" 
              style={{ width: `${(currentVitals.heartRate / 120) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Blood Pressure</div>
          <div className={`text-2xl font-bold ${getVitalColor('bloodPressure', currentVitals.bloodPressure.systolic)}`}>
            {Math.round(currentVitals.bloodPressure.systolic)}/{Math.round(currentVitals.bloodPressure.diastolic)}
          </div>
          <div className="text-xs text-gray-500">mmHg</div>
        </div>

        {/* Oxygen Saturation */}
        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">SpO₂</div>
          <div className={`text-3xl font-bold ${getVitalColor('oxygenSaturation', currentVitals.oxygenSaturation)}`}>
            {currentVitals.oxygenSaturation.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Oxygen Sat</div>
        </div>

        {/* Respiratory Rate */}
        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Resp Rate</div>
          <div className="text-3xl font-bold text-blue-400">
            {Math.round(currentVitals.respiratoryRate)}
          </div>
          <div className="text-xs text-gray-500">breaths/min</div>
        </div>

        {/* Temperature */}
        <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Temperature</div>
          <div className="text-3xl font-bold text-orange-400">
            {currentVitals.temperature.toFixed(1)}°
          </div>
          <div className="text-xs text-gray-500">Fahrenheit</div>
        </div>
      </div>

      {/* Waveform Display */}
      <div className="mt-6 bg-black/30 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">ECG Waveform (Simulated)</div>
        <div className="h-20 bg-black rounded flex items-center justify-center">
          <div className="text-green-400 font-mono">
            ═══╤═══╤═══╤═══╤═══╤═══╤═══╤═══
          </div>
        </div>
      </div>
    </div>
  );
}

// Population Benchmarking Component
export function PopulationBenchmarking({ userMetrics }: { userMetrics: any }) {
  const benchmarkData = [
    { metric: 'VO₂ Max', userValue: 52, percentile: 85, population: 'Age 25-35' },
    { metric: 'Resting HR', userValue: 58, percentile: 92, population: 'Active Adults' },
    { metric: 'Sleep Score', userValue: 85, percentile: 78, population: 'General Pop' },
    { metric: 'HRV', userValue: 45, percentile: 88, population: 'Athletes' },
    { metric: 'Body Fat %', userValue: 12, percentile: 95, population: 'Fitness Enth.' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <UserGroupIcon className="h-6 w-6 text-blue-400" />
        <span>Population Benchmarking</span>
      </h3>

      <div className="space-y-4">
        {benchmarkData.map((item, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="text-white font-medium">{item.metric}</div>
                <div className="text-sm text-gray-400">vs {item.population}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{item.userValue}</div>
                <div className="text-xs text-blue-400">{item.percentile}th percentile</div>
              </div>
            </div>
            
            <div className="relative w-full bg-gray-700 rounded-full h-3">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
              <div 
                className="absolute top-0 w-2 h-3 bg-white border-2 border-blue-400 rounded-full transform -translate-x-1"
                style={{ left: `${item.percentile}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0th</span>
              <span>50th</span>
              <span>100th</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Health Timeline with Annotations
export function InteractiveHealthTimeline({ timelineData }: { timelineData: any }) {
  const [selectedPeriod, setSelectedPeriod] = useState('3M');
  const [showAnnotations, setShowAnnotations] = useState(true);

  const mockEvents = [
    { date: '2024-01-15', type: 'milestone', title: 'VO₂ Max Personal Best', value: '52.3 ml/kg/min', category: 'achievement' },
    { date: '2024-02-03', type: 'concern', title: 'Elevated Resting HR', value: '78 bpm', category: 'anomaly' },
    { date: '2024-02-20', type: 'improvement', title: 'Sleep Quality Improved', value: '85/100', category: 'recovery' },
    { date: '2024-03-10', type: 'goal', title: 'Weight Loss Target Met', value: '-5 lbs', category: 'achievement' },
    { date: '2024-03-25', type: 'activity', title: 'Marathon Completed', value: '3:45:22', category: 'performance' }
  ];

  const getEventColor = (category: string) => {
    switch (category) {
      case 'achievement': return 'bg-green-500';
      case 'anomaly': return 'bg-red-500';
      case 'recovery': return 'bg-blue-500';
      case 'performance': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone': return TrophyIcon;
      case 'concern': return ExclamationTriangleIcon;
      case 'improvement': return CheckCircleIcon;
      case 'goal': return CheckCircleIcon;
      case 'activity': return BoltIcon;
      default: return ClockIcon;
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 border border-gray-500/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <ClockIcon className="h-6 w-6 text-gray-400" />
          <span>Interactive Health Timeline</span>
        </h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['1M', '3M', '6M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              showAnnotations
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Annotations
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
        
        {/* Events */}
        <div className="space-y-6">
          {mockEvents.map((event, index) => {
            const IconComponent = getEventIcon(event.type);
            return (
              <div key={index} className="relative flex items-start space-x-4">
                {/* Event Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getEventColor(event.category)} flex items-center justify-center relative z-10`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
                
                {/* Event Content */}
                <div className="flex-1 bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-white">{event.title}</div>
                    <div className="text-sm text-gray-400">{event.date}</div>
                  </div>
                  <div className="text-lg font-bold text-blue-400 mb-1">{event.value}</div>
                  <div className="text-sm text-gray-300 capitalize">{event.category}</div>
                  
                  {showAnnotations && (
                    <div className="mt-3 p-2 bg-blue-600/10 border border-blue-500/30 rounded">
                      <div className="text-xs text-blue-300">
                        AI Insight: This event correlates with improved overall health metrics.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Cardiovascular Risk Scoring with Framingham + AI
export function CardiovascularRiskScoring({ riskData }: { riskData: any }) {
  const mockRiskData = {
    framinghamScore: 8.5,
    aiEnhancedScore: 6.2,
    riskCategory: 'low',
    tenYearRisk: 8.5,
    lifetimeRisk: 25,
    riskReduction: 2.3 // AI improvement
  };

  const riskFactors = [
    { factor: 'Age', contribution: 25, modifiable: false, status: 'normal' },
    { factor: 'Blood Pressure', contribution: 15, modifiable: true, status: 'optimal' },
    { factor: 'Cholesterol', contribution: 20, modifiable: true, status: 'borderline' },
    { factor: 'Smoking', contribution: 0, modifiable: true, status: 'none' },
    { factor: 'Diabetes', contribution: 0, modifiable: true, status: 'none' },
    { factor: 'Family History', contribution: 10, modifiable: false, status: 'present' },
    { factor: 'Physical Activity', contribution: -15, modifiable: true, status: 'protective' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': case 'none': case 'protective': return 'text-green-400';
      case 'normal': return 'text-blue-400';
      case 'borderline': case 'present': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <HeartIcon className="h-6 w-6 text-red-400" />
        <span>Cardiovascular Risk Assessment</span>
        <div className="bg-red-600/20 border border-red-500/50 rounded-lg px-3 py-1">
          <span className="text-red-300 text-sm font-medium">Framingham + AI</span>
        </div>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Traditional Framingham Score */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-red-400 text-sm font-medium mb-1">Framingham Score</div>
          <div className="text-3xl font-bold text-white">{mockRiskData.framinghamScore}%</div>
          <div className="text-xs text-gray-400">10-year risk</div>
        </div>

        {/* AI-Enhanced Score */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-medium mb-1">AI-Enhanced Score</div>
          <div className="text-3xl font-bold text-white">{mockRiskData.aiEnhancedScore}%</div>
          <div className="text-xs text-green-400">-{mockRiskData.riskReduction}% vs Framingham</div>
        </div>

        {/* Risk Category */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-green-400 text-sm font-medium mb-1">Risk Category</div>
          <div className="text-2xl font-bold text-white capitalize">{mockRiskData.riskCategory}</div>
          <div className="text-xs text-gray-400">Overall assessment</div>
        </div>
      </div>

      {/* Risk Factors Breakdown */}
      <div className="bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Risk Factors Analysis</h4>
        <div className="space-y-3">
          {riskFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-white font-medium">{factor.factor}</div>
                <div className={`text-sm ${getStatusColor(factor.status)}`}>
                  {factor.status.replace('_', ' ')}
                </div>
                {!factor.modifiable && (
                  <div className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">
                    Non-modifiable
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-sm font-medium ${
                  factor.contribution > 0 ? 'text-red-400' : 
                  factor.contribution < 0 ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {factor.contribution > 0 ? '+' : ''}{factor.contribution}%
                </div>
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      factor.contribution > 0 ? 'bg-red-400' : 
                      factor.contribution < 0 ? 'bg-green-400' : 'bg-gray-400'
                    }`}
                    style={{ width: `${Math.abs(factor.contribution) * 2}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Metabolic Syndrome Detection
export function MetabolicSyndromeDetection({ metabolicData }: { metabolicData: any }) {
  const criteria = [
    { 
      name: 'Waist Circumference', 
      value: 32, 
      threshold: 35, 
      unit: 'inches', 
      status: 'normal',
      description: 'Abdominal obesity indicator'
    },
    { 
      name: 'Triglycerides', 
      value: 120, 
      threshold: 150, 
      unit: 'mg/dL', 
      status: 'normal',
      description: 'Lipid metabolism marker'
    },
    { 
      name: 'HDL Cholesterol', 
      value: 55, 
      threshold: 50, 
      unit: 'mg/dL', 
      status: 'good',
      description: 'Good cholesterol levels'
    },
    { 
      name: 'Blood Pressure', 
      value: 118, 
      threshold: 130, 
      unit: 'mmHg', 
      status: 'normal',
      description: 'Systolic blood pressure'
    },
    { 
      name: 'Fasting Glucose', 
      value: 88, 
      threshold: 100, 
      unit: 'mg/dL', 
      status: 'normal',
      description: 'Blood sugar regulation'
    }
  ];

  const metCriteria = criteria.filter(c => c.status !== 'normal').length;
  const syndromeRisk = metCriteria >= 3 ? 'high' : metCriteria >= 2 ? 'moderate' : 'low';

  return (
    <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <BeakerIcon className="h-6 w-6 text-yellow-400" />
        <span>Metabolic Syndrome Detection</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Risk Assessment */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-white mb-2">{metCriteria}/5</div>
            <div className="text-sm text-gray-400">Criteria Met</div>
            <div className={`text-lg font-semibold mt-2 ${
              syndromeRisk === 'high' ? 'text-red-400' :
              syndromeRisk === 'moderate' ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {syndromeRisk.toUpperCase()} RISK
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-300 mb-2">Risk Assessment</div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${
                  syndromeRisk === 'high' ? 'bg-red-400' :
                  syndromeRisk === 'moderate' ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ width: `${(metCriteria / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Criteria Details */}
        <div className="space-y-3">
          {criteria.map((criterion, index) => (
            <div key={index} className="bg-black/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-white font-medium text-sm">{criterion.name}</div>
                <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                  criterion.status === 'good' ? 'bg-green-600/20 text-green-300' :
                  criterion.status === 'normal' ? 'bg-blue-600/20 text-blue-300' :
                  'bg-red-600/20 text-red-300'
                }`}>
                  {criterion.status}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">{criterion.description}</div>
                <div className="text-white font-bold">
                  {criterion.value} {criterion.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sleep Disorder Risk Assessment
export function SleepDisorderRiskAssessment({ sleepData }: { sleepData: any }) {
  const riskFactors = [
    { factor: 'Sleep Apnea Risk', score: 15, max: 100, category: 'low' },
    { factor: 'Insomnia Risk', score: 25, max: 100, category: 'moderate' },
    { factor: 'Restless Leg Syndrome', score: 5, max: 100, category: 'low' },
    { factor: 'Circadian Rhythm Disorder', score: 20, max: 100, category: 'low' }
  ];

  const sleepMetrics = [
    { metric: 'Sleep Efficiency', value: 85, optimal: '85-95%', status: 'optimal' },
    { metric: 'Sleep Latency', value: 12, optimal: '5-15 min', status: 'optimal' },
    { metric: 'Wake Episodes', value: 2, optimal: '0-3', status: 'normal' },
    { metric: 'REM %', value: 22, optimal: '20-25%', status: 'optimal' }
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ClockIcon className="h-6 w-6 text-indigo-400" />
        <span>Sleep Disorder Risk Assessment</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Disorder Risk Scores</h4>
          <div className="space-y-3">
            {riskFactors.map((risk, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{risk.factor}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    risk.category === 'low' ? 'bg-green-600/20 text-green-300' :
                    risk.category === 'moderate' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {risk.category}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        risk.category === 'low' ? 'bg-green-400' :
                        risk.category === 'moderate' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${(risk.score / risk.max) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-white font-bold text-sm">
                    {risk.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sleep Metrics */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Sleep Quality Metrics</h4>
          <div className="space-y-3">
            {sleepMetrics.map((metric, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{metric.metric}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    metric.status === 'optimal' ? 'bg-green-600/20 text-green-300' :
                    metric.status === 'normal' ? 'bg-blue-600/20 text-blue-300' :
                    'bg-yellow-600/20 text-yellow-300'
                  }`}>
                    {metric.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">Optimal: {metric.optimal}</div>
                  <div className="text-white font-bold">
                    {metric.value}{metric.metric.includes('%') ? '%' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Overtraining Syndrome Prediction
export function OvertrainingPrediction({ trainingData }: { trainingData: any }) {
  const indicators = [
    { name: 'Training Load', value: 75, threshold: 80, status: 'caution', trend: 'increasing' },
    { name: 'HRV Decline', value: 15, threshold: 20, status: 'normal', trend: 'stable' },
    { name: 'Sleep Quality', value: 82, threshold: 70, status: 'good', trend: 'improving' },
    { name: 'Subjective Fatigue', value: 6, threshold: 7, status: 'normal', trend: 'stable' },
    { name: 'Performance Decline', value: 3, threshold: 10, status: 'normal', trend: 'stable' },
    { name: 'Mood Score', value: 7, threshold: 5, status: 'good', trend: 'stable' }
  ];

  const overallRisk = 25; // Calculated risk score

  return (
    <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-6 w-6 text-orange-400" />
        <span>Overtraining Syndrome Prediction</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Risk Score */}
        <div className="bg-black/30 rounded-lg p-4 text-center">
          <div className="text-orange-400 text-sm font-medium mb-2">Overtraining Risk</div>
          <div className="text-4xl font-bold text-white mb-2">{overallRisk}%</div>
          <div className="text-sm text-green-400">LOW RISK</div>
          
          <div className="mt-4 w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full"
              style={{ width: `${overallRisk}%` }}
            ></div>
          </div>
        </div>

        {/* Key Indicators */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold text-white mb-4">Risk Indicators</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {indicators.map((indicator, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium text-sm">{indicator.name}</div>
                  <div className={`w-2 h-2 rounded-full ${
                    indicator.status === 'good' ? 'bg-green-400' :
                    indicator.status === 'caution' ? 'bg-yellow-400' :
                    indicator.status === 'normal' ? 'bg-blue-400' : 'bg-red-400'
                  }`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white font-bold">{indicator.value}</div>
                  <div className={`text-xs ${
                    indicator.trend === 'improving' ? 'text-green-400' :
                    indicator.trend === 'stable' ? 'text-blue-400' : 'text-yellow-400'
                  }`}>
                    {indicator.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Prevention Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-green-400 font-medium text-sm">Maintain Current Approach:</div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Current training load is manageable</li>
              <li>• Sleep quality is supporting recovery</li>
              <li>• HRV levels are stable</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-yellow-400 font-medium text-sm">Monitor Closely:</div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Watch for training load increases</li>
              <li>• Weekly HRV trend assessment</li>
              <li>• Subjective wellness tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mental Health Risk Indicators
export function MentalHealthRiskIndicators({ mentalHealthData }: { mentalHealthData: any }) {
  const riskScores = [
    { category: 'Stress Level', score: 35, max: 100, status: 'moderate' },
    { category: 'Burnout Risk', score: 20, max: 100, status: 'low' },
    { category: 'Depression Screen', score: 8, max: 27, status: 'low' },
    { category: 'Anxiety Level', score: 12, max: 21, status: 'mild' },
    { category: 'Sleep Impact', score: 25, max: 100, status: 'moderate' }
  ];

  const protectiveFactors = [
    { factor: 'Social Support', strength: 85, description: 'Strong social connections' },
    { factor: 'Exercise Regularity', strength: 90, description: 'Consistent physical activity' },
    { factor: 'Sleep Quality', strength: 80, description: 'Generally good sleep' },
    { factor: 'Mindfulness Practice', strength: 45, description: 'Occasional meditation' }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <SparklesIcon className="h-6 w-6 text-purple-400" />
        <span>Mental Health Risk Indicators</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Risk Assessment</h4>
          <div className="space-y-3">
            {riskScores.map((risk, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{risk.category}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    risk.status === 'low' ? 'bg-green-600/20 text-green-300' :
                    risk.status === 'mild' || risk.status === 'moderate' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {risk.status}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        risk.status === 'low' ? 'bg-green-400' :
                        risk.status === 'mild' || risk.status === 'moderate' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${(risk.score / risk.max) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-white font-bold text-sm">
                    {risk.score}/{risk.max}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protective Factors */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Protective Factors</h4>
          <div className="space-y-3">
            {protectiveFactors.map((factor, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">{factor.factor}</div>
                  <div className="text-green-400 font-bold text-sm">
                    {factor.strength}%
                  </div>
                </div>
                <div className="mb-2">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: `${factor.strength}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-300">{factor.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Wellness Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-green-400 font-medium mb-2">Stress Management</div>
            <div className="text-sm text-gray-300">
              Consider mindfulness apps, breathing exercises, or yoga
            </div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-medium mb-2">Sleep Optimization</div>
            <div className="text-sm text-gray-300">
              Maintain consistent sleep schedule and bedtime routine
            </div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-medium mb-2">Social Connection</div>
            <div className="text-sm text-gray-300">
              Continue nurturing strong social relationships
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
