// Premium Health Dashboard - Enhanced UI/UX
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
  ArrowLeftIcon,
  Cog6ToothIcon,
  BellIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  CpuChipIcon
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
  RadialBar,
  Legend
} from 'recharts';
import { HealthCommandCenter } from './HealthCommandCenter';
import { RealTimeHealthAnalytics } from './RealTimeHealthAnalytics';

interface HealthDashboardPremiumProps {
  userId: string;
  onBackToLanding?: () => void;
}

export function HealthDashboardPremium({ userId, onBackToLanding }: HealthDashboardPremiumProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'vitals' | 'wellness' | 'insights'>('overview');
  const [clinicalModalOpen, setClinicalModalOpen] = useState(false);
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);
  const [realTimeAnalyticsOpen, setRealTimeAnalyticsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const data = {
        user: {
          name: "Alex Johnson",
          age: 28,
          plan: "Premium"
        },
        healthScore: 87,
        lastUpdate: new Date(),
        criticalAlerts: [],
        metrics: {
          heartRate: { current: 72, resting: 65, max: 185, trend: 'stable', status: 'excellent', change: 2 },
          sleep: { hours: 7.8, quality: 89, efficiency: 92, trend: 'improving', deepSleep: 1.5, remSleep: 2.1 },
          activity: { steps: 12420, calories: 2340, distance: 8.7, activeMinutes: 85, trend: 'active' },
          nutrition: { score: 78, calories: 2340, protein: 125, carbs: 280, fats: 89, hydration: 2.1, target: 2.5 },
          stress: { level: 32, trend: 'low', recovery: 85 },
          temperature: { current: 98.2, avg: 98.1, trend: 'normal' }
        },
        insights: [
          { type: 'positive', message: 'Excellent sleep quality this week! Keep it up.', priority: 'high' },
          { type: 'warning', message: 'Heart rate variability slightly low today.', priority: 'medium' },
          { type: 'info', message: 'You\'re 85% towards your weekly activity goal.', priority: 'low' }
        ],
        chartData: {
          heartRateToday: Array.from({ length: 24 }, (_, i) => ({
            time: `${i.toString().padStart(2, '0')}:00`,
            value: 65 + Math.sin(i / 24 * 2 * Math.PI) * 15 + Math.random() * 10
          })),
          sleepWeek: [
            { day: 'Mon', hours: 7.2, quality: 82, deep: 1.3, rem: 1.8 },
            { day: 'Tue', hours: 6.8, quality: 78, deep: 1.1, rem: 1.6 },
            { day: 'Wed', hours: 8.1, quality: 91, deep: 1.7, rem: 2.2 },
            { day: 'Thu', hours: 7.8, quality: 89, deep: 1.5, rem: 2.1 },
            { day: 'Fri', hours: 7.0, quality: 80, deep: 1.2, rem: 1.8 },
            { day: 'Sat', hours: 8.5, quality: 94, deep: 1.8, rem: 2.4 },
            { day: 'Sun', hours: 8.2, quality: 88, deep: 1.6, rem: 2.0 }
          ],
          activityWeek: [
            { day: 'Mon', steps: 8500, calories: 2200, distance: 6.2 },
            { day: 'Tue', steps: 11200, calories: 2500, distance: 8.1 },
            { day: 'Wed', steps: 9100, calories: 2300, distance: 6.8 },
            { day: 'Thu', steps: 12420, calories: 2340, distance: 8.7 },
            { day: 'Fri', steps: 7800, calories: 2180, distance: 5.9 },
            { day: 'Sat', steps: 15000, calories: 2800, distance: 11.2 },
            { day: 'Sun', steps: 6500, calories: 2000, distance: 4.8 }
          ]
        }
      };
      
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 60000);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!dashboardData) {
    return <ErrorState onRetry={loadDashboardData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
      {/* Clinical Modal */}
      {clinicalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <BeakerIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Clinical Analysis</h3>
              </div>
              <button
                onClick={() => setClinicalModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Health Score</span>
                  </div>
                  <p className="text-3xl font-bold text-emerald-900">{dashboardData.healthScore}/100</p>
                  <p className="text-emerald-700 text-sm mt-1">Excellent overall health</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <SparklesIcon className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-blue-800">AI Insights</span>
                  </div>
                  <p className="text-blue-700 text-sm">Advanced analysis shows optimal cardiovascular health patterns</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Advanced Features (Coming Soon)</h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>WHO/ACSM Guidelines Compliance Analysis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Advanced Biomarker Correlation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Predictive Health Risk Assessment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Clinical-Grade PDF Reports</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setClinicalModalOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {onBackToLanding && (
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.history.back();
                    }
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-xl hover:bg-gray-100"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Back</span>
                </button>
              )}
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Vitalis Health
                </h1>
                <p className="text-gray-500 text-sm">
                  Welcome back, {dashboardData.user.name} • Last updated: {dashboardData.lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Health Score Badge */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl px-6 py-3 shadow-lg">
                <ShieldCheckIcon className="h-6 w-6" />
                <div>
                  <span className="text-emerald-100 text-xs font-medium">Health Score</span>
                  <div className="font-bold text-xl">{dashboardData.healthScore}</div>
                </div>
              </div>
              
              {/* Notifications */}
              <button className="relative p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
                {dashboardData.criticalAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {dashboardData.criticalAlerts.length}
                  </span>
                )}
              </button>
              
              {/* Clinical Analysis Button */}
              <button
                onClick={() => setClinicalModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Clinical Analysis
              </button>
              
              {/* Command Center Button */}
              <button
                onClick={() => setCommandCenterOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <ComputerDesktopIcon className="h-5 w-5" />
                <span>Command Center</span>
              </button>
              
              {/* Real-Time Analytics Button */}
              <button
                onClick={() => setRealTimeAnalyticsOpen(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <CpuChipIcon className="h-5 w-5" />
                <span>Predictive Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-sm">
          {[
            { key: 'overview', label: 'Overview', icon: ChartBarIcon },
            { key: 'vitals', label: 'Vitals', icon: HeartIcon },
            { key: 'wellness', label: 'Wellness', icon: SparklesIcon },
            { key: 'insights', label: 'AI Insights', icon: BeakerIcon }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key as any)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === key
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {selectedTab === 'overview' && <OverviewTab data={dashboardData} />}
          {selectedTab === 'vitals' && <VitalsTab data={dashboardData} />}
          {selectedTab === 'wellness' && <WellnessTab data={dashboardData} />}
          {selectedTab === 'insights' && <InsightsTab data={dashboardData} />}
        </div>
      </div>

      {/* Health Command Center */}
      <HealthCommandCenter 
        isOpen={commandCenterOpen}
        onClose={() => setCommandCenterOpen(false)}
        healthData={dashboardData}
      />

      {/* Real-Time Health Analytics */}
      <RealTimeHealthAnalytics
        isOpen={realTimeAnalyticsOpen}
        onClose={() => setRealTimeAnalyticsOpen(false)}
        userId={userId}
      />
    </div>
  );
}

// Overview Tab - Key metrics and summary
function OverviewTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Heart Rate"
          value={`${data.metrics.heartRate.current}`}
          unit="BPM"
          status={data.metrics.heartRate.status}
          change={data.metrics.heartRate.change}
          icon={HeartIcon}
          color="rose"
        />
        
        <MetricCard
          title="Sleep Score"
          value={`${data.metrics.sleep.quality}`}
          unit="/100"
          status="excellent"
          change={5}
          icon={MoonIcon}
          color="purple"
        />
        
        <MetricCard
          title="Daily Steps"
          value={`${(data.metrics.activity.steps / 1000).toFixed(1)}`}
          unit="K steps"
          status="active"
          change={12}
          icon={BoltIcon}
          color="emerald"
        />
        
        <MetricCard
          title="Stress Level"
          value={`${data.metrics.stress.level}`}
          unit="/100"
          status="low"
          change={-8}
          icon={SparklesIcon}
          color="blue"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heart Rate Today */}
        <ChartCard title="Heart Rate Today" subtitle="Real-time monitoring">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.chartData.heartRateToday}>
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#EF4444" 
                fillOpacity={1} 
                fill="url(#heartGradient)"
                strokeWidth={2}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Weekly Activity */}
        <ChartCard title="Weekly Activity" subtitle="Steps and calories burned">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chartData.activityWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="steps" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Sleep Quality Chart */}
      <ChartCard title="Sleep Quality This Week" subtitle="Hours and quality score">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.chartData.sleepWeek}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
              name="Sleep Hours"
            />
            <Line 
              type="monotone" 
              dataKey="quality" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              name="Quality Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

// Vitals Tab - Detailed health metrics
function VitalsTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heart Rate Details */}
        <div className="lg:col-span-2">
          <ChartCard title="Heart Rate Analysis" subtitle="24-hour monitoring">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data.chartData.heartRateToday}>
                <defs>
                  <linearGradient id="heartDetailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#EF4444" 
                  fillOpacity={1} 
                  fill="url(#heartDetailGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        
        {/* Heart Rate Stats */}
        <div className="space-y-6">
          <StatsCard title="Heart Rate Stats" color="rose">
            <div className="space-y-4">
              <StatItem label="Current" value={`${data.metrics.heartRate.current} BPM`} />
              <StatItem label="Resting" value={`${data.metrics.heartRate.resting} BPM`} />
              <StatItem label="Maximum" value={`${data.metrics.heartRate.max} BPM`} />
              <StatItem label="Status" value={data.metrics.heartRate.status} status />
            </div>
          </StatsCard>
          
          <StatsCard title="Heart Rate Zones" color="orange">
            <div className="space-y-3">
              <ZoneBar label="Fat Burn" percentage={65} color="blue" />
              <ZoneBar label="Cardio" percentage={45} color="orange" />
              <ZoneBar label="Peak" percentage={25} color="red" />
            </div>
          </StatsCard>
        </div>
      </div>
    </div>
  );
}

// Wellness Tab - Sleep, nutrition, stress
function WellnessTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sleep Analysis */}
        <ChartCard title="Sleep Analysis" subtitle="Quality and duration tracking">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chartData.sleepWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="hours" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Nutrition Overview */}
        <StatsCard title="Nutrition Today" color="green">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Calories</span>
              <span className="font-bold text-gray-900">{data.metrics.nutrition.calories} / 2500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">{data.metrics.nutrition.protein}g</p>
                <p className="text-sm text-gray-600">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{data.metrics.nutrition.carbs}g</p>
                <p className="text-sm text-gray-600">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{data.metrics.nutrition.fats}g</p>
                <p className="text-sm text-gray-600">Fats</p>
              </div>
            </div>
          </div>
        </StatsCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Hydration" color="blue">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">{data.metrics.nutrition.hydration}L</p>
            <p className="text-gray-600 mb-4">of {data.metrics.nutrition.target}L target</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </StatsCard>

        <StatsCard title="Stress Level" color="purple">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 mb-2">{data.metrics.stress.level}%</p>
            <p className="text-gray-600 mb-4">Low stress level</p>
            <div className="text-sm text-gray-500">Recovery: {data.metrics.stress.recovery}%</div>
          </div>
        </StatsCard>

        <StatsCard title="Body Temperature" color="orange">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 mb-2">{data.metrics.temperature.current}°F</p>
            <p className="text-gray-600 mb-4">Average: {data.metrics.temperature.avg}°F</p>
            <div className="text-sm text-gray-500">Status: {data.metrics.temperature.trend}</div>
          </div>
        </StatsCard>
      </div>
    </div>
  );
}

// AI Insights Tab
function InsightsTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.insights.map((insight: any, index: number) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </div>

      <ChartCard title="Health Trends" subtitle="AI-powered analysis of your health patterns">
        <div className="text-center py-12">
          <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Advanced AI insights coming soon</p>
          <p className="text-gray-400 text-sm">Our AI engine is learning your patterns to provide personalized health recommendations.</p>
        </div>
      </ChartCard>
    </div>
  );
}

// Component Building Blocks
function MetricCard({ title, value, unit, status, change, icon: Icon, color }: {
  title: string;
  value: string;
  unit: string;
  status: string;
  change?: number;
  icon: React.ComponentType<any>;
  color: 'rose' | 'blue' | 'emerald' | 'purple' | 'orange';
}) {
  const colorClasses = {
    rose: 'from-rose-50 to-pink-100 border-rose-200 text-rose-600',
    blue: 'from-blue-50 to-indigo-100 border-blue-200 text-blue-600',
    emerald: 'from-emerald-50 to-green-100 border-emerald-200 text-emerald-600',
    purple: 'from-purple-50 to-violet-100 border-purple-200 text-purple-600',
    orange: 'from-orange-50 to-amber-100 border-orange-200 text-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8" />
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? (
              <ArrowTrendingUpIcon className="h-4 w-4" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function StatsCard({ title, color, children }: { 
  title: string; 
  color: 'rose' | 'blue' | 'emerald' | 'green' | 'purple' | 'orange'; 
  children: React.ReactNode;
}) {
  const colorClasses = {
    rose: 'from-rose-50 to-pink-100 border-rose-200',
    blue: 'from-blue-50 to-indigo-100 border-blue-200',
    emerald: 'from-emerald-50 to-green-100 border-emerald-200',
    green: 'from-green-50 to-emerald-100 border-green-200',
    purple: 'from-purple-50 to-violet-100 border-purple-200',
    orange: 'from-orange-50 to-amber-100 border-orange-200'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm rounded-2xl p-6 shadow-sm`}>
      <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
      {children}
    </div>
  );
}

function StatItem({ label, value, status }: { label: string; value: string; status?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${status ? 'text-green-600' : 'text-gray-900'}`}>{value}</span>
    </div>
  );
}

function ZoneBar({ label, percentage, color }: { 
  label: string; 
  percentage: number; 
  color: 'blue' | 'orange' | 'red'; 
}) {
  const colorClasses = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600 text-sm">{label}</span>
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${colorClasses[color]} rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="text-xs text-gray-500 w-8">{percentage}%</span>
      </div>
    </div>
  );
}

function InsightCard({ insight }: { 
  insight: {
    type: 'positive' | 'warning' | 'info';
    message: string;
    priority: 'high' | 'medium' | 'low';
  };
}) {
  const typeStyles = {
    positive: 'from-green-50 to-emerald-100 border-green-200 text-green-800',
    warning: 'from-yellow-50 to-orange-100 border-yellow-200 text-yellow-800',
    info: 'from-blue-50 to-indigo-100 border-blue-200 text-blue-800'
  };

  const icons = {
    positive: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    info: SparklesIcon
  };

  const Icon = icons[insight.type];

  return (
    <div className={`bg-gradient-to-br ${typeStyles[insight.type]} border backdrop-blur-sm rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-start space-x-3">
        <Icon className="h-6 w-6 flex-shrink-0 mt-1" />
        <div>
          <p className="font-medium">{insight.message}</p>
          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
            insight.priority === 'high' ? 'bg-red-100 text-red-700' :
            insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {insight.priority} priority
          </span>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-blue-600">Loading Your Health Dashboard...</p>
        <p className="text-gray-500 text-sm mt-2">Analyzing your latest health data</p>
      </div>
    </div>
  );
}

// Error State
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md mx-4">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-900 mb-4">Unable to Load Dashboard</p>
        <p className="text-gray-600 mb-6">We're having trouble connecting to your health data. Please try again.</p>
        <button 
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default HealthDashboardPremium;
