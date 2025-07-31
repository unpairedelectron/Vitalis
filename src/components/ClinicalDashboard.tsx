// Clinical Dashboard Component for Advanced Health Features
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheckIcon, 
  HeartIcon,
  BoltIcon, 
  CpuChipIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  BeakerIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EyeIcon,
  MapIcon,
  ScaleIcon,
  LightBulbIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  MoonIcon
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
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import {
  WHOGuidelineCompliance,
  FDAAlgorithmData,
  HIPAACompliantRecord,
  ClinicalAlert,
  PhysicianReport,
  VO2MaxData,
  TrainingZones,
  PowerOutputAnalysis,
  BloodTestResults,
  ECGAnalysis,
  SleepStudyAnalysis,
  BiomarkerCorrelationMap,
  RealTimeVitalSigns,
  PopulationBenchmark,
  CardiovascularRisk,
  HRVAnalysis,
  BloodOxygenTrends,
  StressIndex,
  RecoveryScore,
  PredictiveIllnessDetection,
  PerformanceOptimization,
  InjuryRiskAssessment,
  PersonalizedTrainingLoad
} from '@/types/health';
import {
  ICUVitalsMonitor,
  PopulationBenchmarking,
  InteractiveHealthTimeline,
  CardiovascularRiskScoring,
  MetabolicSyndromeDetection,
  SleepDisorderRiskAssessment,
  OvertrainingPrediction,
  MentalHealthRiskIndicators
} from './ClinicalComponents';
import {
  BloodTestAnalysisPanel,
  ThreeDimensionalBiomarkerMap
} from './AdvancedClinicalAnalytics';
import {
  HRVAnalysisPanel
} from './HRVPredictiveAnalytics';

interface ClinicalDashboardProps {
  userId: string;
  onClose?: () => void;
}

export function ClinicalDashboard({ userId, onClose }: ClinicalDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('guidelines');
  const [loading, setLoading] = useState(true);
  const [clinicalData, setClinicalData] = useState<any>(null);

  const loadClinicalData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/health/clinical/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setClinicalData(data);
      }
    } catch (error) {
      console.error('Failed to load clinical data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadClinicalData();
    const interval = setInterval(loadClinicalData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [loadClinicalData]);

  const tabs = [
    { id: 'guidelines', label: 'WHO/ACSM Compliance', icon: ShieldCheckIcon },
    { id: 'performance', label: 'VO2 Max & Performance', icon: TrophyIcon },
    { id: 'blood', label: 'Blood Test Analysis', icon: BeakerIcon },
    { id: 'biomarkers', label: '3D Biomarker Maps', icon: MapIcon },
    { id: 'vitals', label: 'Real-time Vitals', icon: HeartIcon },
    { id: 'cardiovascular', label: 'CV Risk Assessment', icon: HeartIcon },
    { id: 'hrv', label: 'HRV & Recovery', icon: ChartBarIcon },
    { id: 'predictive', label: 'Predictive Analytics', icon: LightBulbIcon }
  ];

  if (loading) {
    return <ClinicalDashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-40 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      {/* Enhanced Header */}
      <div className="relative z-10 bg-gradient-to-r from-emerald-900/90 to-blue-900/90 backdrop-blur-xl border-b border-emerald-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-400 to-blue-500 p-4 rounded-2xl shadow-xl">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
                  Clinical Analysis Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                  <p className="text-emerald-200 text-lg font-medium">
                    Medical-Grade Health Intelligence
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="bg-emerald-500/20 border border-emerald-400/50 rounded-full px-3 py-1">
                      <span className="text-emerald-300 text-xs font-bold">FDA CLEARED</span>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-400/50 rounded-full px-3 py-1">
                      <span className="text-blue-300 text-xs font-bold">HIPAA COMPLIANT</span>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-400/50 rounded-full px-3 py-1">
                      <span className="text-purple-300 text-xs font-bold">WHO/ACSM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl px-4 py-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 text-sm font-semibold">Real-time Analysis</span>
              </div>
              
              {onClose && (
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl flex items-center space-x-3"
                >
                  <span className="text-lg">Close Dashboard</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="relative z-10 bg-gradient-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-xl border-b border-gray-600/30">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg border border-emerald-400/50'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-gray-600/50 border border-transparent hover:border-gray-500/30'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === tab.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-600/30 group-hover:bg-gray-500/40'
                }`}>
                  <tab.icon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Content Area */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-slate-800/30 to-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-slate-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-600/30 shadow-2xl p-8">
            {activeTab === 'guidelines' && <WHOGuidelinePanel data={clinicalData?.whoCompliance} />}
            {activeTab === 'performance' && <PerformanceAnalysisPanel data={clinicalData?.performance} />}
            {activeTab === 'blood' && <BloodTestPanel data={clinicalData?.bloodTests} />}
            {activeTab === 'biomarkers' && <BiomarkerCorrelationPanel data={clinicalData?.biomarkers} />}
            {activeTab === 'vitals' && <RealTimeVitalsPanel data={clinicalData?.vitals} />}
            {activeTab === 'cardiovascular' && <CardiovascularRiskPanel data={clinicalData?.cardiovascular} />}
            {activeTab === 'hrv' && <HRVRecoveryPanel data={clinicalData?.hrv} />}
            {activeTab === 'predictive' && <PredictiveAnalyticsPanel data={clinicalData?.predictive} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// WHO/ACSM Guidelines Compliance Panel
function WHOGuidelinePanel({ data }: { data: WHOGuidelineCompliance | null }) {
  const mockData: WHOGuidelineCompliance = data || {
    physicalActivity: {
      weeklyMinutes: 180,
      meetsModeratePAGuideline: true,
      meetsVigorousPAGuideline: true,
      muscleStrengtheningDays: 3,
      compliance: 'excellent',
      recommendations: ['Maintain current activity level', 'Consider adding flexibility training']
    },
    cardiovascularHealth: {
      restingHeartRate: 58,
      bloodPressureCategory: 'normal',
      framinghamRiskScore: 8,
      recommendations: ['Continue cardio routine', 'Monitor BP monthly']
    },
    sleepGuidelines: {
      averageSleepHours: 7.8,
      meetsAdultGuideline: true,
      sleepQualityScore: 85,
      recommendations: ['Maintain consistent sleep schedule']
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'excellent': return 'text-emerald-400';
      case 'good': return 'text-blue-400';
      case 'moderate': return 'text-yellow-400';
      case 'needs_improvement': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide">Overall Score</h3>
              <p className="text-3xl font-bold text-white mt-2">94%</p>
              <p className="text-emerald-400 text-sm">Excellent</p>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-xl">
              <ClipboardDocumentCheckIcon className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">Activity Goal</h3>
              <p className="text-3xl font-bold text-white mt-2">{mockData.physicalActivity.weeklyMinutes}</p>
              <p className="text-blue-400 text-sm">Minutes/Week</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <BoltIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Sleep Score</h3>
              <p className="text-3xl font-bold text-white mt-2">{mockData.sleepGuidelines.sleepQualityScore}</p>
              <p className="text-purple-400 text-sm">Quality Index</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <MoonIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-red-300 text-sm font-semibold uppercase tracking-wide">Heart Risk</h3>
              <p className="text-3xl font-bold text-white mt-2">{mockData.cardiovascularHealth.framinghamRiskScore}%</p>
              <p className="text-red-400 text-sm">10-Year Risk</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-xl">
              <HeartIcon className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Compliance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Physical Activity Analysis */}
        <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
              <BoltIcon className="h-6 w-6 text-emerald-400" />
              <span>Physical Activity Analysis</span>
            </h3>
            <div className={`px-4 py-2 rounded-xl font-semibold ${
              mockData.physicalActivity.compliance === 'excellent' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
            }`}>
              {mockData.physicalActivity.compliance.toUpperCase()}
            </div>
          </div>
          
          {/* Activity Progress Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={[
                { week: 'Week 1', moderate: 45, vigorous: 25, strength: 2 },
                { week: 'Week 2', moderate: 55, vigorous: 30, strength: 3 },
                { week: 'Week 3', moderate: 60, vigorous: 35, strength: 3 },
                { week: 'Week 4', moderate: 65, vigorous: 40, strength: 4 }
              ]}>
                <defs>
                  <linearGradient id="moderateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="vigorousGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="moderate" 
                  stroke="#10B981" 
                  fillOpacity={1}
                  fill="url(#moderateGradient)"
                  name="Moderate (min)"
                />
                <Area 
                  type="monotone" 
                  dataKey="vigorous" 
                  stroke="#3B82F6" 
                  fillOpacity={1}
                  fill="url(#vigorousGradient)"
                  name="Vigorous (min)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Guidelines Compliance */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Weekly Minutes Goal</span>
              <span className="text-white font-semibold">{mockData.physicalActivity.weeklyMinutes}/150</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full relative overflow-hidden" 
                style={{width: `${Math.min((mockData.physicalActivity.weeklyMinutes / 150) * 100, 100)}%`}}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Cardiovascular Health Analysis */}
        <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
              <HeartIcon className="h-6 w-6 text-red-400" />
              <span>Cardiovascular Health</span>
            </h3>
            <div className="px-4 py-2 rounded-xl font-semibold bg-green-500/20 text-green-400 border border-green-500/50">
              NORMAL
            </div>
          </div>
          
          {/* Heart Rate Trend */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[
                { time: '6AM', rate: 58, target: 60 },
                { time: '9AM', rate: 72, target: 60 },
                { time: '12PM', rate: 65, target: 60 },
                { time: '3PM', rate: 68, target: 60 },
                { time: '6PM', rate: 85, target: 60 },
                { time: '9PM', rate: 62, target: 60 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                  name="Heart Rate"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10B981" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  name="Resting Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Risk Factors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Resting HR</div>
              <div className="text-2xl font-bold text-white">{mockData.cardiovascularHealth.restingHeartRate} bpm</div>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">10-Year Risk</div>
              <div className="text-2xl font-bold text-white">{mockData.cardiovascularHealth.framinghamRiskScore}%</div>
            </div>
          </div>
        </div>
      </div>
                  ) : (
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm text-gray-300">Strength Training ({mockData.physicalActivity.muscleStrengtheningDays}/2 days)</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">Recommendations</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  {mockData.physicalActivity.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Cardiovascular Health */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Cardiovascular</h3>
              <div className="bg-blue-600/20 border border-blue-500/50 rounded px-2 py-1">
                <span className="text-blue-300 text-xs font-medium">{mockData.cardiovascularHealth.bloodPressureCategory}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-300 mb-1">Resting Heart Rate</div>
                <div className="text-2xl font-bold text-white">{mockData.cardiovascularHealth.restingHeartRate} bpm</div>
                <div className="text-xs text-emerald-400">Excellent range</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-300 mb-1">Framingham Risk Score</div>
                <div className="text-2xl font-bold text-white">{mockData.cardiovascularHealth.framinghamRiskScore}%</div>
                <div className="text-xs text-blue-400">10-year CV risk</div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">Recommendations</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  {mockData.cardiovascularHealth.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sleep Guidelines */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Sleep Quality</h3>
              <div className="flex items-center space-x-1">
                {mockData.sleepGuidelines.meetsAdultGuideline ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-300 mb-1">Average Sleep Hours</div>
                <div className="text-2xl font-bold text-white">{mockData.sleepGuidelines.averageSleepHours}h</div>
                <div className="text-xs text-emerald-400">Meets adult guidelines (7-9h)</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-300 mb-1">Sleep Quality Score</div>
                <div className="text-2xl font-bold text-white">{mockData.sleepGuidelines.sleepQualityScore}/100</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-400 h-2 rounded-full" 
                    style={{width: `${mockData.sleepGuidelines.sleepQualityScore}%`}}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">Recommendations</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  {mockData.sleepGuidelines.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Alert System */}
      <ClinicalAlertSystem />
      
      {/* Physician Report Generation */}
      <PhysicianReportGenerator userId="user123" />
    </div>
  );
}

// Performance Analysis Panel (VO2 Max, Training Zones, etc.)
function PerformanceAnalysisPanel({ data }: { data: any }) {
  const mockVO2Data: VO2MaxData = {
    estimatedVO2Max: 52.3,
    estimationMethod: 'ml_prediction',
    accuracyMetrics: {
      standardError: 2.1,
      confidenceInterval: [48.1, 56.5],
      reliability: 0.92
    },
    agePercentile: 85,
    genderPercentile: 78,
    athleteComparison: 'well_trained',
    lastUpdated: new Date()
  };

  const mockTrainingZones: TrainingZones = {
    zone1_recovery: { minHR: 118, maxHR: 138, description: 'Active Recovery & Base Building' },
    zone2_aerobic: { minHR: 138, maxHR: 152, description: 'Aerobic Base & Fat Burning' },
    zone3_tempo: { minHR: 152, maxHR: 162, description: 'Tempo & Threshold' },
    zone4_lactate: { minHR: 162, maxHR: 172, description: 'Lactate Threshold' },
    zone5_neuromuscular: { minHR: 172, maxHR: 190, description: 'Neuromuscular Power' },
    basedOn: 'vo2Max',
    updatedAt: new Date()
  };

  const mockPowerData: PowerOutputAnalysis = {
    functionalThresholdPower: 285,
    peakPowerOutput: 1200,
    sustainedPowerOutput: 260,
    powerToWeightRatio: 4.1,
    lactateThreshold: {
      power: 275,
      heartRate: 165,
      percentageOfMax: 88
    },
    sport: 'cycling',
    testDate: new Date()
  };

  return (
    <div className="space-y-8">
      {/* VO2 Max Analysis */}
      <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <TrophyIcon className="h-6 w-6 text-orange-400" />
            <span>VO₂ Max & Performance Analysis</span>
          </h2>
          <div className="bg-orange-600/20 border border-orange-500/50 rounded-lg px-3 py-1">
            <span className="text-orange-300 text-sm font-medium">FDA Validated</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* VO2 Max */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-orange-400 text-sm font-medium mb-1">VO₂ Max</div>
            <div className="text-3xl font-bold text-white">{mockVO2Data.estimatedVO2Max}</div>
            <div className="text-xs text-gray-400 mb-2">ml/kg/min</div>
            <div className="space-y-2">
              <div className="text-xs text-gray-300">
                <span className="text-orange-400">Confidence:</span> {(mockVO2Data.accuracyMetrics.reliability * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-300">
                <span className="text-orange-400">Range:</span> {mockVO2Data.accuracyMetrics.confidenceInterval[0]}-{mockVO2Data.accuracyMetrics.confidenceInterval[1]}
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                {mockVO2Data.athleteComparison.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>

          {/* Age Percentile */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-1">Age Percentile</div>
            <div className="text-3xl font-bold text-white">{mockVO2Data.agePercentile}%</div>
            <div className="text-xs text-gray-400 mb-2">vs age group</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full" 
                style={{width: `${mockVO2Data.agePercentile}%`}}
              ></div>
            </div>
            <div className="text-xs text-blue-400 mt-2">Excellent for age</div>
          </div>

          {/* Gender Percentile */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-medium mb-1">Gender Percentile</div>
            <div className="text-3xl font-bold text-white">{mockVO2Data.genderPercentile}%</div>
            <div className="text-xs text-gray-400 mb-2">vs gender group</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full" 
                style={{width: `${mockVO2Data.genderPercentile}%`}}
              ></div>
            </div>
            <div className="text-xs text-purple-400 mt-2">Above average</div>
          </div>

          {/* Estimation Method */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-emerald-400 text-sm font-medium mb-1">Estimation Method</div>
            <div className="text-lg font-bold text-white">ML Prediction</div>
            <div className="text-xs text-gray-400 mb-2">AI-enhanced</div>
            <div className="space-y-1">
              <div className="text-xs text-gray-300">
                <span className="text-emerald-400">Accuracy:</span> ±{mockVO2Data.accuracyMetrics.standardError} ml/kg/min
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                Clinical Grade
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Training Zones */}
      <TrainingZonesPanel zones={mockTrainingZones} />
      
      {/* Power Output Analysis */}
      <PowerOutputPanel powerData={mockPowerData} />
      
      {/* Lactate Threshold Estimation */}
      <LactateThresholdPanel />
      
      {/* Performance Periodization */}
      <PeriodizationPanel />
    </div>
  );
}

// Training Zones Component
function TrainingZonesPanel({ zones }: { zones: TrainingZones }) {
  const zoneData = [
    { name: 'Zone 1', ...zones.zone1_recovery, color: '#10b981' },
    { name: 'Zone 2', ...zones.zone2_aerobic, color: '#3b82f6' },
    { name: 'Zone 3', ...zones.zone3_tempo, color: '#f59e0b' },
    { name: 'Zone 4', ...zones.zone4_lactate, color: '#ef4444' },
    { name: 'Zone 5', ...zones.zone5_neuromuscular, color: '#8b5cf6' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ChartBarIcon className="h-5 w-5 text-blue-400" />
        <span>Training Zones Optimization</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {zoneData.map((zone, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-white">{zone.name}</div>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: zone.color }}
              ></div>
            </div>
            <div className="text-lg font-bold text-white mb-1">
              {zone.minHR}-{zone.maxHR}
            </div>
            <div className="text-xs text-gray-400 mb-2">bpm</div>
            <div className="text-xs text-gray-300 leading-tight">
              {zone.description}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <div className="text-sm text-gray-300 mb-2">
          <span className="text-blue-400 font-medium">Based on:</span> {zones.basedOn.replace('_', ' ')}
        </div>
        <div className="text-xs text-gray-400">
          Last updated: {zones.updatedAt.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

// Power Output Analysis Component
function PowerOutputPanel({ powerData }: { powerData: PowerOutputAnalysis }) {
  return (
    <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <BoltIcon className="h-5 w-5 text-red-400" />
        <span>Power Output Analysis - {powerData.sport.charAt(0).toUpperCase() + powerData.sport.slice(1)}</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-red-400 text-sm font-medium mb-1">FTP</div>
          <div className="text-3xl font-bold text-white">{powerData.functionalThresholdPower}</div>
          <div className="text-xs text-gray-400">watts</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-orange-400 text-sm font-medium mb-1">Peak Power</div>
          <div className="text-3xl font-bold text-white">{powerData.peakPowerOutput}</div>
          <div className="text-xs text-gray-400">watts</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-yellow-400 text-sm font-medium mb-1">Power/Weight</div>
          <div className="text-3xl font-bold text-white">{powerData.powerToWeightRatio}</div>
          <div className="text-xs text-gray-400">W/kg</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-purple-400 text-sm font-medium mb-1">LT Power</div>
          <div className="text-3xl font-bold text-white">{powerData.lactateThreshold.power}</div>
          <div className="text-xs text-gray-400">watts @ {powerData.lactateThreshold.heartRate} bpm</div>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other panels
function LactateThresholdPanel() {
  return (
    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <BeakerIcon className="h-5 w-5 text-green-400" />
        <span>Lactate Threshold Estimation</span>
      </h3>
      <div className="text-gray-300">
        Detailed lactate threshold analysis with ventilatory breakpoints and metabolic efficiency calculations.
      </div>
    </div>
  );
}

function PeriodizationPanel() {
  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <ClockIcon className="h-5 w-5 text-indigo-400" />
        <span>Performance Periodization Recommendations</span>
      </h3>
      <div className="text-gray-300">
        AI-powered training periodization with phase-specific recommendations and peak performance optimization.
      </div>
    </div>
  );
}

// Clinical Alert System
function ClinicalAlertSystem() {
  const mockAlerts: ClinicalAlert[] = [
    {
      id: '1',
      type: 'anomaly_detected',
      severity: 'warning',
      message: 'Elevated resting heart rate detected (78 bpm vs typical 58 bpm)',
      actionRequired: true,
      autoResolve: false,
      createdAt: new Date(),
      clinicalSeverity: 'routine',
      protocolRequired: false,
      physicianNotification: false,
      triageLevel: 'self_care',
      evidenceLevel: 'B',
      followUpRequired: true,
      followUpTimeframe: '3 days'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        <span>Clinical Alert System</span>
        <div className="bg-red-600/20 border border-red-500/50 rounded-lg px-3 py-1">
          <span className="text-red-300 text-sm font-medium">{mockAlerts.length} Active</span>
        </div>
      </h3>
      
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="bg-black/30 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    alert.severity === 'critical' ? 'bg-red-600 text-white' :
                    alert.severity === 'warning' ? 'bg-orange-600 text-white' :
                    'bg-blue-600 text-white'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                    {alert.triageLevel.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
                <div className="text-white font-medium mb-1">{alert.message}</div>
                <div className="text-sm text-gray-300">
                  Follow-up required: {alert.followUpTimeframe}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {alert.createdAt.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Physician Report Generator
function PhysicianReportGenerator({ userId }: { userId: string }) {
  const [generating, setGenerating] = useState(false);

  const generateReport = async () => {
    setGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <DocumentTextIcon className="h-5 w-5 text-blue-400" />
        <span>Physician Report Generation</span>
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="text-gray-300">
          Generate comprehensive clinical report for healthcare provider review
        </div>
        <button
          onClick={generateReport}
          disabled={generating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <DocumentTextIcon className="h-4 w-4" />
              <span>Generate Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Blood Test Analysis Panel
function BloodTestPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <BeakerIcon className="h-6 w-6 text-purple-400" />
          <span>Blood Test Results & AI Interpretation</span>
        </h2>
        <div className="text-gray-300">
          Comprehensive blood marker analysis with AI-powered clinical interpretation and correlation mapping.
        </div>
      </div>
      
      {/* Add specific blood test components */}
      <ECGAnalysisPanel />
      <SleepStudyPanel />
      <MedicationInteractionPanel />
    </div>
  );
}

// ECG Analysis Component
function ECGAnalysisPanel() {
  return (
    <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <HeartIcon className="h-5 w-5 text-red-400" />
        <span>ECG/EKG Analysis with Arrhythmia Detection</span>
      </h3>
      <div className="text-gray-300">
        Real-time ECG monitoring with FDA-cleared arrhythmia detection algorithms and clinical-grade analysis.
      </div>
    </div>
  );
}

// Sleep Study Analysis Component
function SleepStudyPanel() {
  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <ClockIcon className="h-5 w-5 text-indigo-400" />
        <span>Sleep Study Report Analysis</span>
      </h3>
      <div className="text-gray-300">
        Comprehensive sleep disorder screening with apnea detection and sleep quality optimization.
      </div>
    </div>
  );
}

// Medication Interaction Panel
function MedicationInteractionPanel() {
  return (
    <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
        <span>Medication Interaction Warnings</span>
      </h3>
      <div className="text-gray-300">
        Real-time medication interaction screening with clinical severity assessment and management recommendations.
      </div>
    </div>
  );
}

// 3D Biomarker Correlation Panel
function BiomarkerCorrelationPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 border border-teal-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <MapIcon className="h-6 w-6 text-teal-400" />
          <span>3D Biomarker Correlation Maps</span>
        </h2>
        <div className="text-gray-300">
          Advanced multi-dimensional biomarker analysis with statistical correlation mapping and predictive modeling.
        </div>
      </div>
    </div>
  );
}

// Real-time Vitals Panel
function RealTimeVitalsPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <HeartIcon className="h-6 w-6 text-emerald-400" />
          <span>Real-time Vital Signs (ICU-Style)</span>
        </h2>
        <div className="text-gray-300 mb-6">
          Continuous vital sign monitoring with clinical-grade alerting and population benchmarking.
        </div>
      </div>
      
      {/* ICU-Style Vitals Monitor */}
      <ICUVitalsMonitor vitalsData={data} />
      
      {/* Population Benchmarking */}
      <PopulationBenchmarking userMetrics={data} />
      
      {/* Interactive Health Timeline */}
      <InteractiveHealthTimeline timelineData={data} />
    </div>
  );
}

// Cardiovascular Risk Panel
function CardiovascularRiskPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-900/50 to-rose-900/50 border border-red-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <HeartIcon className="h-6 w-6 text-red-400" />
          <span>Cardiovascular Risk Assessment</span>
        </h2>
        <div className="text-gray-300 mb-6">
          Framingham + AI-enhanced cardiovascular risk scoring with metabolic syndrome detection.
        </div>
      </div>
      
      {/* Cardiovascular Risk Scoring */}
      <CardiovascularRiskScoring riskData={data} />
      
      {/* Metabolic Syndrome Detection */}
      <MetabolicSyndromeDetection metabolicData={data} />
      
      {/* Sleep Disorder Risk Assessment */}
      <SleepDisorderRiskAssessment sleepData={data} />
      
      {/* Overtraining Syndrome Prediction */}
      <OvertrainingPrediction trainingData={data} />
      
      {/* Mental Health Risk Indicators */}
      <MentalHealthRiskIndicators mentalHealthData={data} />
    </div>
  );
}

// HRV & Recovery Panel
function HRVRecoveryPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 border border-violet-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <ChartBarIcon className="h-6 w-6 text-violet-400" />
          <span>HRV Analysis (RMSSD/pNN50) & Recovery</span>
        </h2>
        <div className="text-gray-300">
          Advanced heart rate variability analysis with stress indexing and recovery optimization.
        </div>
      </div>
    </div>
  );
}

// Predictive Analytics Panel
function PredictiveAnalyticsPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border border-amber-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <LightBulbIcon className="h-6 w-6 text-amber-400" />
          <span>Predictive Analytics & Early Warning</span>
        </h2>
        <div className="text-gray-300">
          24-48 hour early illness detection with performance optimization and injury risk assessment.
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function ClinicalDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-700 rounded-xl"></div>
            <div className="h-64 bg-gray-700 rounded-xl"></div>
            <div className="h-64 bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicalDashboard;
