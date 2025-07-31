// Clean and Organized Health Dashboard
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
  XMarkIcon
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
  Cell
} from 'recharts';

interface HealthDashboardCleanProps {
  userId: string;
  onBackToLanding?: () => void;
}

export function HealthDashboardClean({ userId, onBackToLanding }: HealthDashboardCleanProps) {
  const [selectedMetric, setSelectedMetric] = useState<'overview' | 'heart' | 'sleep' | 'activity' | 'nutrition'>('overview');
  const [clinicalModalOpen, setClinicalModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    try {
      // Simulate API call with realistic health data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = {
        healthScore: 87,
        lastUpdate: new Date(),
        criticalAlerts: [],
        metrics: {
          heartRate: { current: 72, trend: 'stable', status: 'good' },
          sleep: { hours: 7.5, quality: 85, trend: 'improving' },
          activity: { steps: 8420, calories: 2340, trend: 'active' },
          nutrition: { score: 78, hydration: 82, trend: 'good' }
        },
        chartData: {
          heartRate: [
            { time: '00:00', value: 65 },
            { time: '06:00', value: 68 },
            { time: '12:00', value: 75 },
            { time: '18:00', value: 72 },
            { time: '24:00', value: 70 }
          ],
          sleep: [
            { day: 'Mon', hours: 7.2, quality: 82 },
            { day: 'Tue', hours: 6.8, quality: 78 },
            { day: 'Wed', hours: 8.1, quality: 89 },
            { day: 'Thu', hours: 7.5, quality: 85 },
            { day: 'Fri', hours: 7.0, quality: 80 },
            { day: 'Sat', hours: 8.5, quality: 92 },
            { day: 'Sun', hours: 8.0, quality: 88 }
          ],
          activity: [
            { day: 'Mon', steps: 7500, calories: 2200 },
            { day: 'Tue', steps: 9200, calories: 2500 },
            { day: 'Wed', steps: 8100, calories: 2300 },
            { day: 'Thu', steps: 8420, calories: 2340 },
            { day: 'Fri', steps: 7800, calories: 2180 },
            { day: 'Sat', steps: 12000, calories: 2800 },
            { day: 'Sun', steps: 6500, calories: 2000 }
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
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!dashboardData) {
    return <ErrorState onRetry={loadDashboardData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Clinical Modal Placeholder */}
      {clinicalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Clinical Analysis</h3>
              <button
                onClick={() => setClinicalModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              Advanced clinical analysis features coming soon. This will include:
            </p>
            <ul className="text-gray-400 text-sm space-y-2 mb-6">
              <li>• WHO/ACSM Guidelines Compliance</li>
              <li>• Advanced Biomarker Analysis</li>
              <li>• Predictive Health Analytics</li>
              <li>• Clinical-Grade Reports</li>
            </ul>
            <button
              onClick={() => setClinicalModalOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-blue-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {onBackToLanding && (
                <button
                  onClick={onBackToLanding}
                  className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-blue-500/20"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Back</span>
                </button>
              )}
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Vitalis Health Dashboard
                </h1>
                <p className="text-blue-200 text-sm">
                  Last updated: {dashboardData.lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Health Score */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-xl px-4 py-2">
                <ShieldCheckIcon className="h-6 w-6 text-emerald-400" />
                <div>
                  <span className="text-emerald-300 text-xs font-medium">Health Score</span>
                  <div className="text-white font-bold text-lg">{dashboardData.healthScore}</div>
                </div>
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-blue-300 hover:text-white transition-colors rounded-lg hover:bg-blue-500/20">
                <BellIcon className="h-6 w-6" />
                {dashboardData.criticalAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {dashboardData.criticalAlerts.length}
                  </span>
                )}
              </button>
              
              {/* Clinical Dashboard Button */}
              <button
                onClick={() => setClinicalModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Clinical Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-black/30 backdrop-blur-sm rounded-2xl p-2 border border-gray-600/30">
          {[
            { key: 'overview', label: 'Overview', icon: ChartBarIcon },
            { key: 'heart', label: 'Heart Rate', icon: HeartIcon },
            { key: 'sleep', label: 'Sleep', icon: MoonIcon },
            { key: 'activity', label: 'Activity', icon: BoltIcon },
            { key: 'nutrition', label: 'Nutrition', icon: BeakerIcon }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                selectedMetric === key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {selectedMetric === 'overview' && <OverviewPanel data={dashboardData} />}
          {selectedMetric === 'heart' && <HeartRatePanel data={dashboardData} />}
          {selectedMetric === 'sleep' && <SleepPanel data={dashboardData} />}
          {selectedMetric === 'activity' && <ActivityPanel data={dashboardData} />}
          {selectedMetric === 'nutrition' && <NutritionPanel data={dashboardData} />}
        </div>
      </div>
    </div>
  );
}

// Overview Panel Component
function OverviewPanel({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Key Metrics Cards */}
      <MetricCard
        title="Heart Rate"
        value={`${data.metrics.heartRate.current} BPM`}
        status={data.metrics.heartRate.status}
        trend={data.metrics.heartRate.trend}
        icon={HeartIcon}
        color="red"
      />
      
      <MetricCard
        title="Sleep Quality"
        value={`${data.metrics.sleep.hours}h`}
        status="good"
        trend={data.metrics.sleep.trend}
        icon={MoonIcon}
        color="purple"
      />
      
      <MetricCard
        title="Daily Steps"
        value={data.metrics.activity.steps.toLocaleString()}
        status="good"
        trend={data.metrics.activity.trend}
        icon={BoltIcon}
        color="green"
      />
      
      <MetricCard
        title="Nutrition Score"
        value={`${data.metrics.nutrition.score}%`}
        status="good"
        trend={data.metrics.nutrition.trend}
        icon={BeakerIcon}
        color="blue"
      />
      
      {/* Weekly Summary Chart */}
      <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Health Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.chartData.sleep}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '12px',
                color: '#F9FAFB'
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
              name="Sleep Quality"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Heart Rate Panel Component
function HeartRatePanel({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Heart Rate Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data.chartData.heartRate}>
            <defs>
              <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
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
              dataKey="value" 
              stroke="#EF4444" 
              fillOpacity={1} 
              fill="url(#heartRateGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6">
          <h4 className="text-red-300 font-semibold mb-4">Current Status</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Current HR</span>
              <span className="text-white font-bold">{data.metrics.heartRate.current} BPM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Resting HR</span>
              <span className="text-white font-bold">65 BPM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Max HR</span>
              <span className="text-white font-bold">185 BPM</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-6">
          <h4 className="text-white font-semibold mb-4">Heart Rate Zones</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Fat Burn</span>
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Cardio</span>
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Peak</span>
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sleep Panel Component
function SleepPanel({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Sleep Duration</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.chartData.sleep}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '12px',
                color: '#F9FAFB'
              }}
            />
            <Bar dataKey="hours" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Sleep Quality</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.chartData.sleep}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '12px',
                color: '#F9FAFB'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="quality" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Activity Panel Component
function ActivityPanel({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Daily Steps</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.chartData.activity}>
            <defs>
              <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
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
              dataKey="steps" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#stepsGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Calories Burned</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.chartData.activity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '12px',
                color: '#F9FAFB'
              }}
            />
            <Bar dataKey="calories" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Nutrition Panel Component
function NutritionPanel({ data }: { data: any }) {
  const nutritionData = [
    { name: 'Protein', value: 30, color: '#EF4444' },
    { name: 'Carbs', value: 45, color: '#F59E0B' },
    { name: 'Fats', value: 25, color: '#10B981' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Macronutrient Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={nutritionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {nutritionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6">
          <h4 className="text-blue-300 font-semibold mb-4">Daily Goals</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Calories</span>
              <span className="text-white font-bold">2340 / 2500</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6">
          <h4 className="text-green-300 font-semibold mb-4">Hydration</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Water Intake</span>
              <span className="text-white font-bold">2.1L / 2.5L</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, status, trend, icon: Icon, color }: {
  title: string;
  value: string;
  status: string;
  trend: string;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    red: 'from-red-600/20 to-red-800/20 border-red-500/30 text-red-300',
    blue: 'from-blue-600/20 to-blue-800/20 border-blue-500/30 text-blue-300',
    green: 'from-green-600/20 to-green-800/20 border-green-500/30 text-green-300',
    purple: 'from-purple-600/20 to-purple-800/20 border-purple-500/30 text-purple-300'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-xl rounded-2xl p-6 transition-all hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8" />
        <span className="text-xs font-medium uppercase tracking-wide opacity-75">{trend}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-blue-300">Loading Dashboard...</p>
      </div>
    </div>
  );
}

// Error State
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
        <p className="text-xl font-semibold text-white mb-4">Failed to load dashboard</p>
        <button 
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
