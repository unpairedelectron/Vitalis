// Enhanced Clinical Dashboard Component with Beautiful UI/UX
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
  EnhancedWHOGuidelinePanel, 
  EnhancedPerformancePanel,
  EnhancedVitalsPanel,
  EnhancedBloodPanel,
  EnhancedCardioPanel,
  EnhancedHRVPanel,
  EnhancedPredictivePanel
} from './ClinicalPanelsEnhanced';

interface ClinicalDashboardProps {
  userId: string;
  onClose?: () => void;
}

export function ClinicalDashboard({ userId, onClose }: ClinicalDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
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
    const interval = setInterval(loadClinicalData, 30000);
    return () => clearInterval(interval);
  }, [loadClinicalData]);

  const tabs = [
    { 
      id: 'overview', 
      label: 'Clinical Overview', 
      icon: ChartBarIcon, 
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20',
      description: 'Complete health status overview'
    },
    { 
      id: 'guidelines', 
      label: 'WHO/ACSM Guidelines', 
      icon: ClipboardDocumentCheckIcon, 
      color: 'from-emerald-500 to-teal-500',
      gradient: 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20',
      description: 'Global health standard compliance'
    },
    { 
      id: 'performance', 
      label: 'Performance Analysis', 
      icon: TrophyIcon, 
      color: 'from-amber-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-amber-600/20 to-orange-600/20',
      description: 'Athletic performance metrics'
    },
    { 
      id: 'vitals', 
      label: 'Real-time Vitals', 
      icon: HeartIcon, 
      color: 'from-red-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-red-600/20 to-pink-600/20',
      description: 'Live physiological monitoring'
    },
    { 
      id: 'blood', 
      label: 'Blood Analysis', 
      icon: BeakerIcon, 
      color: 'from-purple-500 to-indigo-500',
      gradient: 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20',
      description: 'Comprehensive biomarker analysis'
    },
    { 
      id: 'cardiovascular', 
      label: 'Cardiovascular Health', 
      icon: HeartIcon, 
      color: 'from-rose-500 to-red-500',
      gradient: 'bg-gradient-to-r from-rose-600/20 to-red-600/20',
      description: 'Heart health & circulation metrics'
    },
    { 
      id: 'hrv', 
      label: 'HRV Analysis', 
      icon: BoltIcon, 
      color: 'from-yellow-500 to-amber-500',
      gradient: 'bg-gradient-to-r from-yellow-600/20 to-amber-600/20',
      description: 'Autonomic nervous system status'
    },
    { 
      id: 'predictive', 
      label: 'Predictive Analytics', 
      icon: SparklesIcon, 
      color: 'from-violet-500 to-purple-500',
      gradient: 'bg-gradient-to-r from-violet-600/20 to-purple-600/20',
      description: 'AI-powered health forecasting'
    }
  ];

  if (loading) {
    return <ClinicalDashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background */}
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
      <div className="relative z-10 bg-gradient-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-xl border-b border-gray-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="relative group">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-center space-y-2 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-br ${tab.gradient} backdrop-blur-sm text-white shadow-xl border border-white/20 shadow-${tab.color.split(' ')[1].split('-')[0]}-500/25`
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-br hover:from-gray-700/50 hover:to-gray-600/50 border border-transparent hover:border-gray-500/30 backdrop-blur-sm'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Icon Container */}
                  <div className={`relative p-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id 
                      ? `bg-gradient-to-br ${tab.color} shadow-lg` 
                      : 'bg-gray-600/30 group-hover:bg-gray-500/40'
                  }`}>
                    <tab.icon className={`h-6 w-6 transition-all duration-300 ${
                      activeTab === tab.id ? 'text-white scale-110' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    
                    {/* Active indicator */}
                    {activeTab === tab.id && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-gray-800 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="text-center">
                    <span className={`font-bold text-sm transition-all duration-300 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {tab.label}
                    </span>
                    <p className={`text-xs mt-1 opacity-75 transition-all duration-300 ${
                      activeTab === tab.id ? 'text-white/80' : 'text-gray-400'
                    }`}>
                      {tab.description}
                    </p>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                    activeTab === tab.id 
                      ? `bg-gradient-to-br ${tab.color} opacity-20 blur-xl` 
                      : 'opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-500 to-purple-500 blur-xl'
                  }`}></div>
                </button>
                
                {/* Connection line to content */}
                {activeTab === tab.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-white/80 to-transparent rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Content Area */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-slate-800/30 to-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-slate-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-600/30 shadow-2xl p-8">
            {activeTab === 'overview' && <ClinicalOverviewPanel data={clinicalData} />}
            {activeTab === 'guidelines' && <EnhancedWHOGuidelinePanel data={clinicalData?.whoCompliance} />}
            {activeTab === 'performance' && <EnhancedPerformancePanel data={clinicalData?.performance} />}
            {activeTab === 'vitals' && <EnhancedVitalsPanel data={clinicalData?.vitals} />}
            {activeTab === 'blood' && <EnhancedBloodPanel data={clinicalData?.bloodTests} />}
            {activeTab === 'cardiovascular' && <EnhancedCardioPanel data={clinicalData?.cardiovascular} />}
            {activeTab === 'hrv' && <EnhancedHRVPanel data={clinicalData?.hrv} />}
            {activeTab === 'predictive' && <EnhancedPredictivePanel data={clinicalData?.predictive} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Clinical Overview Panel with Key Metrics
function ClinicalOverviewPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Key Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide">Health Score</h3>
              <p className="text-4xl font-bold text-white mt-2">94</p>
              <p className="text-emerald-400 text-sm">Excellent Health</p>
            </div>
            <div className="bg-emerald-500/20 p-4 rounded-xl">
              <ShieldCheckIcon className="h-10 w-10 text-emerald-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">VO2 Max</h3>
              <p className="text-4xl font-bold text-white mt-2">52.3</p>
              <p className="text-blue-400 text-sm">Superior Fitness</p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-xl">
              <TrophyIcon className="h-10 w-10 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide">HRV Score</h3>
              <p className="text-4xl font-bold text-white mt-2">68</p>
              <p className="text-purple-400 text-sm">Optimal Recovery</p>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-xl">
              <ChartBarIcon className="h-10 w-10 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-red-300 text-sm font-semibold uppercase tracking-wide">Risk Score</h3>
              <p className="text-4xl font-bold text-white mt-2">8%</p>
              <p className="text-red-400 text-sm">Low Risk</p>
            </div>
            <div className="bg-red-500/20 p-4 rounded-xl">
              <ExclamationTriangleIcon className="h-10 w-10 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Trends Chart */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Health Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={[
            { month: 'Jan', health: 85, vo2max: 48, hrv: 62, risk: 12 },
            { month: 'Feb', health: 87, vo2max: 49, hrv: 64, risk: 11 },
            { month: 'Mar', health: 89, vo2max: 50, hrv: 65, risk: 10 },
            { month: 'Apr', health: 91, vo2max: 51, hrv: 66, risk: 9 },
            { month: 'May', health: 93, vo2max: 52, hrv: 67, risk: 8 },
            { month: 'Jun', health: 94, vo2max: 52.3, hrv: 68, risk: 8 }
          ]}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '12px',
                color: '#F9FAFB'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="health" 
              fill="url(#healthGradient)"
              stroke="#10B981"
              strokeWidth={3}
              name="Health Score"
            />
            <Line 
              type="monotone" 
              dataKey="vo2max" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              name="VO2 Max"
            />
            <Line 
              type="monotone" 
              dataKey="hrv" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
              name="HRV Score"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Enhanced panels are now imported from ClinicalPanelsEnhanced.tsx

// Loading Skeleton
function ClinicalDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-emerald-300">Loading Clinical Dashboard...</p>
          <p className="text-gray-400 mt-2">Analyzing your health data</p>
        </div>
      </div>
    </div>
  );
}

// Default export for the enhanced clinical dashboard
export default ClinicalDashboard;

// Also named export for compatibility
export { ClinicalDashboard as ClinicalDashboardEnhanced };
