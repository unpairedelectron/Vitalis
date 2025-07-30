// Health Dashboard Component for Vitalis
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  HeartIcon, 
  MoonIcon, 
  BoltIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrophyIcon,
  BeakerIcon,
  FireIcon,
  ChartPieIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ArrowLeftIcon
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
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { HealthMetric, HealthInsight, HealthAlert, TrendAnalysis } from '@/types/health';
import { 
  AdvancedBiomarkerPanel, 
  MilitaryRiskAssessment, 
  PerformanceOptimizationPanel, 
  PredictiveAnalysisPanel,
  AdvancedHealthFeatures 
} from './AdvancedHealthFeatures';
import { HealthCommandCenter } from './HealthCommandCenter';
import { DeviceManager } from './DeviceManager';
import { AITrainingDashboard } from './AITrainingDashboard';
import { UserMenu } from './UserMenu';
import MedicalReportAnalysis from './MedicalReportAnalysis';
import { useRealTimeSensors } from '@/hooks/useRealTimeSensors';

interface DashboardProps {
  userId: string;
  onBackToLanding?: () => void;
}

interface DashboardData {
  healthScore: number;
  insights: HealthInsight[];
  alerts: HealthAlert[];
  trends: TrendAnalysis[];
  heartRateData: any[];
  sleepData: any[];
  activityData: any[];
  advancedFeatures: AdvancedHealthFeatures;
  lastUpdate: Date;
}

export function HealthDashboard({ userId, onBackToLanding }: DashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'heart' | 'sleep' | 'activity'>('heart');
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);
  const [deviceManagerOpen, setDeviceManagerOpen] = useState(false);
  const [medicalAnalysisOpen, setMedicalAnalysisOpen] = useState(false);
  
  // Real-time sensor integration
  const { realTimeData, connectedDevices, isConnecting } = useRealTimeSensors();

  const loadDashboardData = useCallback(async () => {
    try {
      const response = await fetch(`/api/health/dashboard/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Convert date strings back to Date objects
        data.lastUpdate = new Date(data.lastUpdate);
        if (data.insights) {
          data.insights.forEach((insight: any) => {
            insight.createdAt = new Date(insight.createdAt);
          });
        }
        if (data.alerts) {
          data.alerts.forEach((alert: any) => {
            alert.createdAt = new Date(alert.createdAt);
          });
        }
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadDashboardData();
    
    // Set up polling interval
    const interval = setInterval(loadDashboardData, 10000); // 10 seconds
    
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!dashboardData) {
    return <DashboardError />;
  }

  const criticalAlerts = dashboardData.alerts.filter(alert => 
    alert.severity === 'critical' || alert.severity === 'danger'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-blue-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                {onBackToLanding && (
                  <button
                    onClick={onBackToLanding}
                    className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back to Landing</span>
                  </button>
                )}
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Vitalis Command Center
                </h1>
              </div>
              <p className="text-blue-200 mt-1">
                Last updated: {dashboardData.lastUpdate instanceof Date 
                  ? dashboardData.lastUpdate.toLocaleTimeString() 
                  : new Date(dashboardData.lastUpdate).toLocaleTimeString()}
              </p>
            </div>              <div className="flex items-center space-x-4">
              <HealthScoreIndicator score={dashboardData.healthScore} />
              
              {/* Device Manager Button */}
              <button
                onClick={() => setDeviceManagerOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                <DevicePhoneMobileIcon className="h-5 w-5" />
                <span>Devices ({connectedDevices.filter(d => d.isConnected).length})</span>
              </button>
              
              {/* Command Center Button */}
              <button
                onClick={() => setCommandCenterOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                <ComputerDesktopIcon className="h-5 w-5" />
                <span>Command Center</span>
              </button>
              
              {/* Medical Report Analysis Button */}
              <button
                onClick={() => setMedicalAnalysisOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                <BeakerIcon className="h-5 w-5" />
                <span>AI Report Analysis</span>
              </button>
              
              {criticalAlerts.length > 0 && (
                <div className="flex items-center space-x-2 bg-red-600/20 border border-red-500/50 rounded-lg px-3 py-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                  <span className="text-red-300 font-medium">
                    {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              
              {/* User Menu */}
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Critical Alerts Panel */}
          {criticalAlerts.length > 0 && (
            <div className="lg:col-span-3">
              <CriticalAlertsPanel alerts={criticalAlerts} />
            </div>
          )}

          {/* Main Metrics Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metric Selector */}
            <div className="flex space-x-2 bg-black/30 rounded-lg p-1">
              {[
                { key: 'heart', label: 'Heart Rate', icon: HeartIcon },
                { key: 'sleep', label: 'Sleep', icon: MoonIcon },
                { key: 'activity', label: 'Activity', icon: BoltIcon }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedMetric(key as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                    selectedMetric === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-300 hover:bg-blue-700/30'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Chart Display */}
            <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              {selectedMetric === 'heart' && (
                <HeartRateChart data={dashboardData.heartRateData} />
              )}
              {selectedMetric === 'sleep' && (
                <SleepAnalysisChart data={dashboardData.sleepData} />
              )}
              {selectedMetric === 'activity' && (
                <ActivityChart data={dashboardData.activityData} />
              )}
            </div>

            {/* Military-Grade Analytics Panel */}
            <MilitaryAnalyticsPanel insights={dashboardData.insights} trends={dashboardData.trends} />

            {/* Real-time Vital Signs Monitor */}
            <VitalSignsMonitor 
              heartRate={realTimeData.heartRate || dashboardData.heartRateData[0]} 
              healthScore={dashboardData.healthScore}
              realTimeData={realTimeData}
              isLiveConnected={connectedDevices.some(d => d.isConnected)}
            />
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            <InsightsPanel insights={dashboardData.insights} />
            <AlertsPanel alerts={dashboardData.alerts.filter(a => a.severity !== 'critical')} />
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Military-Grade Advanced Analytics
            </h2>
            <p className="text-blue-200 mt-2">
              Clinical-precision health insights powered by AI and military-grade standards
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AdvancedBiomarkerPanel data={dashboardData.advancedFeatures.biomarkerAnalysis} />
            <MilitaryRiskAssessment risk={dashboardData.advancedFeatures.riskAssessment} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PerformanceOptimizationPanel performance={dashboardData.advancedFeatures.performanceOptimization} />
            <PredictiveAnalysisPanel predictions={dashboardData.advancedFeatures.predictiveInsights} />
          </div>
        </div>
      </div>

      {/* Health Command Center */}
      <HealthCommandCenter 
        isOpen={commandCenterOpen}
        onClose={() => setCommandCenterOpen(false)}
        healthData={dashboardData}
      />

      {/* Device Manager */}
      <DeviceManager 
        isOpen={deviceManagerOpen}
        onClose={() => setDeviceManagerOpen(false)}
      />
      
      {/* Medical Report Analysis */}
      {medicalAnalysisOpen && (
        <MedicalReportAnalysis 
          onClose={() => setMedicalAnalysisOpen(false)}
        />
      )}
    </div>
  );
}

function HealthScoreIndicator({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-600 to-emerald-600';
    if (score >= 60) return 'from-yellow-600 to-amber-600';
    if (score >= 40) return 'from-orange-600 to-red-600';
    return 'from-red-600 to-red-700';
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-700 flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getScoreBackground(score)} flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">{score}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-300">Health Score</div>
        <div className={`text-lg font-semibold ${getScoreColor(score)}`}>
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Attention'}
        </div>
      </div>
    </div>
  );
}

function CriticalAlertsPanel({ alerts }: { alerts: HealthAlert[] }) {
  return (
    <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
        <h2 className="text-xl font-bold text-red-300">Critical Health Alerts</h2>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-black/30 rounded-lg p-4 border border-red-500/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-red-300 font-semibold mb-1">{alert.type.replace('_', ' ').toUpperCase()}</div>
                <div className="text-white">{alert.message}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {alert.createdAt instanceof Date 
                    ? alert.createdAt.toLocaleTimeString() 
                    : new Date(alert.createdAt).toLocaleTimeString()}
                </div>
              </div>
              {alert.actionRequired && (
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">
                  Take Action
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeartRateChart({ data }: { data: any[] }) {
  const chartData = data.slice(0, 12).reverse();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Heart Rate Analysis</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-300">Current: {data[0]?.bpm || 0} BPM</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
            <YAxis domain={[50, 150]} stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area
              type="monotone"
              dataKey="bpm"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#heartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Heart Rate Zones */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3">
          <div className="text-green-400 text-sm font-medium">Rest Zone</div>
          <div className="text-white text-lg font-bold">50-70 BPM</div>
        </div>
        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3">
          <div className="text-yellow-400 text-sm font-medium">Fat Burn</div>
          <div className="text-white text-lg font-bold">70-100 BPM</div>
        </div>
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
          <div className="text-red-400 text-sm font-medium">Cardio</div>
          <div className="text-white text-lg font-bold">100+ BPM</div>
        </div>
      </div>
    </div>
  );
}

function SleepAnalysisChart({ data }: { data: any[] }) {
  const chartData = data.slice(0, 7).reverse();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Sleep Analysis</h3>
        <div className="flex items-center space-x-2">
          <MoonIcon className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-gray-300">7-Day Overview</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="deep" stackId="a" fill="#1e40af" name="Deep Sleep" />
            <Bar dataKey="rem" stackId="a" fill="#3b82f6" name="REM Sleep" />
            <Bar dataKey="light" stackId="a" fill="#60a5fa" name="Light Sleep" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sleep Metrics */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3">
          <div className="text-blue-400 text-sm font-medium">Avg Total</div>
          <div className="text-white text-lg font-bold">
            {(data.reduce((sum, night) => sum + night.total, 0) / data.length).toFixed(1)}h
          </div>
        </div>
        <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-3">
          <div className="text-indigo-400 text-sm font-medium">Deep Sleep</div>
          <div className="text-white text-lg font-bold">
            {(data.reduce((sum, night) => sum + night.deep, 0) / data.length).toFixed(1)}h
          </div>
        </div>
        <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3">
          <div className="text-purple-400 text-sm font-medium">REM Sleep</div>
          <div className="text-white text-lg font-bold">
            {(data.reduce((sum, night) => sum + night.rem, 0) / data.length).toFixed(1)}h
          </div>
        </div>
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3">
          <div className="text-green-400 text-sm font-medium">Sleep Score</div>
          <div className="text-white text-lg font-bold">
            {Math.round(data.reduce((sum, night) => sum + night.score, 0) / data.length)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityChart({ data }: { data: any[] }) {
  const chartData = data.slice(0, 7).reverse();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Activity Performance</h3>
        <div className="flex items-center space-x-2">
          <BoltIcon className="h-5 w-5 text-orange-400" />
          <span className="text-sm text-gray-300">7-Day Overview</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis yAxisId="steps" orientation="left" stroke="#9ca3af" fontSize={12} />
            <YAxis yAxisId="calories" orientation="right" stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Line 
              yAxisId="steps"
              type="monotone" 
              dataKey="steps" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              name="Steps"
            />
            <Line 
              yAxisId="calories"
              type="monotone" 
              dataKey="calories" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Calories"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3">
          <div className="text-orange-400 text-sm font-medium">Avg Steps</div>
          <div className="text-white text-lg font-bold">
            {Math.round(data.reduce((sum, day) => sum + day.steps, 0) / data.length).toLocaleString()}
          </div>
        </div>
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
          <div className="text-red-400 text-sm font-medium">Avg Calories</div>
          <div className="text-white text-lg font-bold">
            {Math.round(data.reduce((sum, day) => sum + day.calories, 0) / data.length)}
          </div>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3">
          <div className="text-blue-400 text-sm font-medium">Avg Distance</div>
          <div className="text-white text-lg font-bold">
            {(data.reduce((sum, day) => sum + day.distance, 0) / data.length).toFixed(1)} km
          </div>
        </div>
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3">
          <div className="text-green-400 text-sm font-medium">Active Time</div>
          <div className="text-white text-lg font-bold">
            {Math.round(data.reduce((sum, day) => sum + day.duration, 0) / data.length)} min
          </div>
        </div>
      </div>
    </div>
  );
}

// Military-Grade Analytics Panel
function MilitaryAnalyticsPanel({ insights, trends }: { insights: HealthInsight[], trends: TrendAnalysis[] }) {
  return (
    <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <ShieldCheckIcon className="h-6 w-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Military-Grade Analytics</h3>
        <div className="flex items-center space-x-2 bg-emerald-600/20 border border-emerald-500/50 rounded-lg px-3 py-1">
          <CpuChipIcon className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-medium">AI-Powered</span>
        </div>
      </div>

      {/* Performance Readiness Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-black/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Combat Readiness</span>
            <TrophyIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400">94%</div>
          <div className="text-xs text-gray-400">Exceptional</div>
        </div>
        
        <div className="bg-black/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Recovery Index</span>
            <BeakerIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">87%</div>
          <div className="text-xs text-gray-400">High</div>
        </div>
        
        <div className="bg-black/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Stress Resilience</span>
            <FireIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400">91%</div>
          <div className="text-xs text-gray-400">Superior</div>
        </div>
      </div>

      {/* Advanced Biomarker Trends */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Advanced Biomarker Analysis</h4>
        {trends.slice(0, 3).map((trend, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{trend.metric}</div>
                <div className="text-sm text-gray-400">{trend.timeframe}</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  trend.direction === 'improving' ? 'text-green-400' : 
                  trend.direction === 'declining' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {trend.direction === 'improving' ? '↗' : trend.direction === 'declining' ? '↘' : '→'} {trend.rate}%
                </div>
                <div className="text-sm text-gray-400 capitalize">{trend.significance}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Real-time Vital Signs Monitor
function VitalSignsMonitor({ 
  heartRate, 
  healthScore, 
  realTimeData, 
  isLiveConnected 
}: { 
  heartRate: any, 
  healthScore: number,
  realTimeData?: any,
  isLiveConnected?: boolean 
}) {
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Use real-time data when available
  const currentHeartRate = realTimeData?.heartRate?.value || heartRate?.bpm || 72;
  const currentSpO2 = realTimeData?.bloodOxygen?.value || 98;
  const currentTemperature = realTimeData?.bodyTemperature?.value || 98.6;

  return (
    <div className="bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-500/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${
              isLiveConnected && isLive ? 'bg-green-400' : 'bg-green-600'
            } transition-colors`}></div>
            {isLiveConnected && (
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
            )}
          </div>
          <h3 className="text-xl font-bold text-white">
            {isLiveConnected ? 'Live' : 'Simulated'} Vital Signs
          </h3>
        </div>
        <div className="text-xs text-gray-400">
          {isLiveConnected ? 'Real-time monitoring' : 'Demo data'}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/40 rounded-lg p-4 text-center">
          <HeartIcon className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{currentHeartRate}</div>
          <div className="text-sm text-gray-400">BPM</div>
          {realTimeData?.heartRate?.source && (
            <div className="text-xs text-blue-400 mt-1 capitalize">
              {realTimeData.heartRate.source.replace('_', ' ')}
            </div>
          )}
        </div>
        
        <div className="bg-black/40 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🫁</div>
          <div className="text-2xl font-bold text-white">{currentSpO2}</div>
          <div className="text-sm text-gray-400">SpO₂ %</div>
          {realTimeData?.bloodOxygen?.source && (
            <div className="text-xs text-blue-400 mt-1 capitalize">
              {realTimeData.bloodOxygen.source.replace('_', ' ')}
            </div>
          )}
        </div>
        
        <div className="bg-black/40 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl font-bold text-white">{currentTemperature}°F</div>
          <div className="text-sm text-gray-400">Body Temp</div>
          {realTimeData?.bodyTemperature?.source && (
            <div className="text-xs text-blue-400 mt-1 capitalize">
              {realTimeData.bodyTemperature.source.replace('_', ' ')}
            </div>
          )}
        </div>
        
        <div className="bg-black/40 rounded-lg p-4 text-center">
          <ChartPieIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{healthScore}</div>
          <div className="text-sm text-gray-400">Health Score</div>
        </div>
      </div>

      {/* Real-time Data Indicators */}
      {isLiveConnected && (
        <div className="mt-6 bg-green-900/30 border border-green-500/50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live sensor data active</span>
            </div>
            <div className="text-xs text-green-300">
              Updated {realTimeData?.heartRate?.timestamp ? 
                new Date(realTimeData.heartRate.timestamp).toLocaleTimeString() : 
                'now'
              }
            </div>
          </div>
        </div>
      )}

      {/* Vital Signs Trend Mini-Charts */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-sm text-gray-300 mb-2">Heart Rate Variability</div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                {time: '1', value: 45}, {time: '2', value: 52}, {time: '3', value: 48}, 
                {time: '4', value: 55}, {time: '5', value: 49}, {time: '6', value: 53}
              ]}>
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-sm text-gray-300 mb-2">Blood Oxygen Trend</div>
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold text-blue-400">{currentSpO2}%</div>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{width: `${currentSpO2}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-gray-700 rounded-xl"></div>
              <div className="h-48 bg-gray-700 rounded-xl"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gray-700 rounded-xl"></div>
              <div className="h-48 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Health Data</h2>
        <p className="text-gray-300 mb-4">Please check your device connections and try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

// Insights and Alerts Panels

function InsightsPanel({ insights }: { insights: HealthInsight[] }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <BeakerIcon className="h-6 w-6 text-green-400" />
        <h3 className="text-lg font-semibold text-white">AI Health Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.slice(0, 2).map((insight) => (
          <div key={insight.id} className="bg-black/30 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  insight.priority === 'high' ? 'bg-red-400' : 
                  insight.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`}></div>
                <span className="text-green-400 font-medium text-sm uppercase tracking-wide">
                  {insight.type}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Confidence: {Math.round(insight.confidence * 100)}%
              </div>
            </div>
            <h4 className="text-white font-semibold mb-2">{insight.title}</h4>
            <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
            {insight.recommendations && insight.recommendations.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Recommendations:</div>
                {insight.recommendations.slice(0, 2).map((rec, index) => (
                  <div key={index} className="text-xs text-green-300 flex items-start space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsPanel({ alerts }: { alerts: HealthAlert[] }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
      <div className="space-y-3">
        {alerts.slice(0, 4).map((alert) => (
          <div key={alert.id} className="bg-black/30 rounded-lg p-3 border border-blue-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">
                {alert.type.replace('_', ' ')}
              </span>
              <span className="text-xs text-gray-500">
                {alert.createdAt instanceof Date 
                  ? alert.createdAt.toLocaleTimeString() 
                  : new Date(alert.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm text-white">{alert.message}</p>
            {alert.actionRequired && (
              <div className="mt-2">
                <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">
                  Take Action
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
