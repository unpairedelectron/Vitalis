// Enhanced Clinical Panels with Beautiful Charts and UI
'use client';

import React from 'react';
import { 
  HeartIcon,
  BoltIcon, 
  TrophyIcon,
  FireIcon,
  BeakerIcon,
  ChartBarIcon,
  LightBulbIcon,
  MoonIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
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

// Enhanced WHO Guidelines Panel
export function EnhancedWHOGuidelinePanel({ data }: { data: any }) {
  const mockData = {
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide group-hover:text-emerald-200">Overall Score</h3>
              <p className="text-3xl font-bold text-white mt-2 group-hover:scale-110 transition-transform">94%</p>
              <p className="text-emerald-400 text-sm">Excellent</p>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-xl group-hover:bg-emerald-500/30 transition-colors">
              <ClipboardDocumentCheckIcon className="h-8 w-8 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide group-hover:text-blue-200">Activity Goal</h3>
              <p className="text-3xl font-bold text-white mt-2 group-hover:scale-110 transition-transform">{mockData.physicalActivity.weeklyMinutes}</p>
              <p className="text-blue-400 text-sm">Minutes/Week</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors">
              <BoltIcon className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide group-hover:text-purple-200">Sleep Score</h3>
              <p className="text-3xl font-bold text-white mt-2 group-hover:scale-110 transition-transform">{mockData.sleepGuidelines.sleepQualityScore}</p>
              <p className="text-purple-400 text-sm">Quality Index</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-xl group-hover:bg-purple-500/30 transition-colors">
              <MoonIcon className="h-8 w-8 text-purple-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-red-300 text-sm font-semibold uppercase tracking-wide group-hover:text-red-200">Heart Risk</h3>
              <p className="text-3xl font-bold text-white mt-2 group-hover:scale-110 transition-transform">{mockData.cardiovascularHealth.framinghamRiskScore}%</p>
              <p className="text-red-400 text-sm">10-Year Risk</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-xl group-hover:bg-red-500/30 transition-colors">
              <HeartIcon className="h-8 w-8 text-red-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content will be properly structured */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Enhanced WHO/ACSM Guidelines Analysis</h2>
        <p className="text-gray-400">Beautiful charts and detailed analysis coming up next...</p>
      </div>
    </div>
  );
}

// Enhanced Performance Panel
export function EnhancedPerformancePanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Performance Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold uppercase tracking-wide">VO2 Max</h3>
              <p className="text-3xl font-bold text-white mt-2">52.3</p>
              <p className="text-yellow-400 text-sm">ml/kg/min</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-xl">
              <TrophyIcon className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-orange-300 text-sm font-semibold uppercase tracking-wide">Lactate Threshold</h3>
              <p className="text-3xl font-bold text-white mt-2">165</p>
              <p className="text-orange-400 text-sm">bpm</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-xl">
              <FireIcon className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-300 text-sm font-semibold uppercase tracking-wide">Power Output</h3>
              <p className="text-3xl font-bold text-white mt-2">285</p>
              <p className="text-green-400 text-sm">watts</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-xl">
              <BoltIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Training Zones Visualization */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Training Zones Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { zone: 'Zone 1\nRecovery', percentage: 45, color: '#10B981' },
            { zone: 'Zone 2\nBase', percentage: 30, color: '#3B82F6' },
            { zone: 'Zone 3\nTempo', percentage: 15, color: '#F59E0B' },
            { zone: 'Zone 4\nThreshold', percentage: 8, color: '#EF4444' },
            { zone: 'Zone 5\nVO2 Max', percentage: 2, color: '#8B5CF6' }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="zone" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Trends */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Performance Trends (6 months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={[
            { month: 'Jan', vo2max: 48.5, power: 265, lactate: 160 },
            { month: 'Feb', vo2max: 49.1, power: 270, lactate: 162 },
            { month: 'Mar', vo2max: 50.2, power: 275, lactate: 163 },
            { month: 'Apr', vo2max: 51.0, power: 280, lactate: 164 },
            { month: 'May', vo2max: 51.8, power: 282, lactate: 164 },
            { month: 'Jun', vo2max: 52.3, power: 285, lactate: 165 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="vo2max" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
              name="VO2 Max"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="power" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              name="Power (W)"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="lactate" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
              name="LT (bpm)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Enhanced Vitals Panel
export function EnhancedVitalsPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Real-time Vital Signs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-red-300 text-sm font-semibold uppercase tracking-wide">Heart Rate</h3>
              <p className="text-3xl font-bold text-white mt-2">72</p>
              <p className="text-red-400 text-sm">bpm</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-xl">
              <HeartIcon className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="mt-3 w-full bg-red-900/30 rounded-full h-2">
            <div className="bg-red-400 h-2 rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">Blood Oxygen</h3>
              <p className="text-3xl font-bold text-white mt-2">98%</p>
              <p className="text-blue-400 text-sm">SpO2</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <FireIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="mt-3 w-full bg-blue-900/30 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full w-full"></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-300 text-sm font-semibold uppercase tracking-wide">HRV</h3>
              <p className="text-3xl font-bold text-white mt-2">45ms</p>
              <p className="text-green-400 text-sm">RMSSD</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-xl">
              <ChartBarIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="mt-3 w-full bg-green-900/30 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Stress Level</h3>
              <p className="text-3xl font-bold text-white mt-2">23</p>
              <p className="text-purple-400 text-sm">Low</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <BoltIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="mt-3 w-full bg-purple-900/30 rounded-full h-2">
            <div className="bg-purple-400 h-2 rounded-full w-1/4"></div>
          </div>
        </div>
      </div>

      {/* Live Vital Signs Chart */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Live Heart Rate Monitor</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[
            { time: '10:00', hr: 68, hrv: 42 },
            { time: '10:05', hr: 72, hrv: 45 },
            { time: '10:10', hr: 75, hrv: 44 },
            { time: '10:15', hr: 71, hrv: 46 },
            { time: '10:20', hr: 69, hrv: 43 },
            { time: '10:25', hr: 73, hrv: 45 },
            { time: '10:30', hr: 72, hrv: 45 }
          ]}>
            <defs>
              <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
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
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="hr" 
              stroke="#EF4444" 
              strokeWidth={3}
              fill="url(#hrGradient)"
              name="Heart Rate (bpm)"
            />
            <Line 
              type="monotone" 
              dataKey="hrv" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="HRV (ms)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Enhanced Blood Analysis Panel
export function EnhancedBloodPanel({ data }: { data: any }) {
  const bloodMarkers = [
    { name: 'Glucose', value: 95, unit: 'mg/dL', range: '70-100', status: 'normal' },
    { name: 'Cholesterol', value: 185, unit: 'mg/dL', range: '<200', status: 'good' },
    { name: 'HDL', value: 58, unit: 'mg/dL', range: '>40', status: 'excellent' },
    { name: 'LDL', value: 105, unit: 'mg/dL', range: '<100', status: 'attention' },
    { name: 'Triglycerides', value: 110, unit: 'mg/dL', range: '<150', status: 'normal' },
    { name: 'HbA1c', value: 5.2, unit: '%', range: '<5.7', status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50';
      case 'good': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      case 'normal': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'attention': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Blood Test Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bloodMarkers.map((marker, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">{marker.name}</h3>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(marker.status)}`}>
                {marker.status.toUpperCase()}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">{marker.value} <span className="text-lg text-gray-400">{marker.unit}</span></div>
              <div className="text-sm text-gray-400">Normal: {marker.range}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Blood Trends Chart */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Blood Marker Trends (6 months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={[
            { month: 'Jan', glucose: 98, cholesterol: 195, hdl: 55, ldl: 120 },
            { month: 'Feb', glucose: 96, cholesterol: 190, hdl: 56, ldl: 115 },
            { month: 'Mar', glucose: 97, cholesterol: 188, hdl: 57, ldl: 110 },
            { month: 'Apr', glucose: 95, cholesterol: 187, hdl: 57, ldl: 108 },
            { month: 'May', glucose: 94, cholesterol: 186, hdl: 58, ldl: 106 },
            { month: 'Jun', glucose: 95, cholesterol: 185, hdl: 58, ldl: 105 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
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
              dataKey="glucose" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
              name="Glucose"
            />
            <Line 
              type="monotone" 
              dataKey="cholesterol" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              name="Total Cholesterol"
            />
            <Line 
              type="monotone" 
              dataKey="hdl" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              name="HDL"
            />
            <Line 
              type="monotone" 
              dataKey="ldl" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
              name="LDL"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* AI Analysis Summary */}
      <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <BeakerIcon className="h-6 w-6 text-purple-400" />
          <span>AI Blood Analysis Summary</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Key Insights</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Excellent glucose control indicating healthy metabolism</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">HDL levels are optimal for cardiovascular protection</span>
              </li>
              <li className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">LDL slightly elevated - consider dietary adjustments</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Recommendations</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Increase omega-3 fatty acids intake</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Continue current exercise routine</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Retest in 3 months</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Cardiovascular Panel
export function EnhancedCardioPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Cardiovascular Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-red-300 text-sm font-semibold uppercase tracking-wide">Risk Score</h3>
              <p className="text-3xl font-bold text-white mt-2">8%</p>
              <p className="text-red-400 text-sm">10-Year Risk</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-xl">
              <HeartIcon className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-300 text-sm font-semibold uppercase tracking-wide">Blood Pressure</h3>
              <p className="text-2xl font-bold text-white mt-2">118/76</p>
              <p className="text-green-400 text-sm">Normal</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-xl">
              <ChartBarIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">Resting HR</h3>
              <p className="text-3xl font-bold text-white mt-2">58</p>
              <p className="text-blue-400 text-sm">bpm</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <BoltIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factor Analysis */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">Cardiovascular Risk Factors</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={[
            { name: 'Age Factor', value: 15, fill: '#3B82F6' },
            { name: 'Cholesterol', value: 25, fill: '#F59E0B' },
            { name: 'Blood Pressure', value: 10, fill: '#10B981' },
            { name: 'Smoking', value: 0, fill: '#EF4444' },
            { name: 'Diabetes', value: 0, fill: '#8B5CF6' },
            { name: 'Family History', value: 20, fill: '#EC4899' }
          ]}>            <RadialBar
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              dataKey="value"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Enhanced HRV Panel
export function EnhancedHRVPanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* HRV Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-300 text-sm font-semibold uppercase tracking-wide">RMSSD</h3>
              <p className="text-3xl font-bold text-white mt-2">45ms</p>
              <p className="text-green-400 text-sm">Good</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-xl">
              <ChartBarIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">pNN50</h3>
              <p className="text-3xl font-bold text-white mt-2">28%</p>
              <p className="text-blue-400 text-sm">Normal</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <HeartIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Recovery Score</h3>
              <p className="text-3xl font-bold text-white mt-2">78</p>
              <p className="text-purple-400 text-sm">High</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <TrophyIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold uppercase tracking-wide">Stress Index</h3>
              <p className="text-3xl font-bold text-white mt-2">23</p>
              <p className="text-yellow-400 text-sm">Low</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-xl">
              <BoltIcon className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* HRV Trends */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">HRV & Recovery Trends (30 days)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={[
            { day: 'Day 1', rmssd: 42, recovery: 75, stress: 25 },
            { day: 'Day 5', rmssd: 44, recovery: 77, stress: 23 },
            { day: 'Day 10', rmssd: 43, recovery: 76, stress: 24 },
            { day: 'Day 15', rmssd: 46, recovery: 79, stress: 21 },
            { day: 'Day 20', rmssd: 45, recovery: 78, stress: 22 },
            { day: 'Day 25', rmssd: 47, recovery: 80, stress: 20 },
            { day: 'Day 30', rmssd: 45, recovery: 78, stress: 23 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
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
              dataKey="recovery" 
              stroke="#10B981" 
              fill="#10B981"
              fillOpacity={0.3}
              name="Recovery Score"
            />
            <Line 
              type="monotone" 
              dataKey="rmssd" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              name="RMSSD (ms)"
            />
            <Line 
              type="monotone" 
              dataKey="stress" 
              stroke="#F59E0B" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              name="Stress Index"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Enhanced Predictive Analytics Panel
export function EnhancedPredictivePanel({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {/* Predictive Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide">Illness Risk</h3>
              <p className="text-3xl font-bold text-white mt-2">12%</p>
              <p className="text-emerald-400 text-sm">Next 30 Days</p>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-xl">
              <LightBulbIcon className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">Injury Risk</h3>
              <p className="text-3xl font-bold text-white mt-2">8%</p>
              <p className="text-blue-400 text-sm">Next 14 Days</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <ExclamationTriangleIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Performance Peak</h3>
              <p className="text-3xl font-bold text-white mt-2">5</p>
              <p className="text-purple-400 text-sm">Days Away</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <TrophyIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Predictions Timeline */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 border border-gray-600/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6">AI Health Predictions (Next 30 Days)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={[
            { day: 'Day 5', illness: 10, injury: 5, performance: 85 },
            { day: 'Day 10', illness: 12, injury: 6, performance: 88 },
            { day: 'Day 15', illness: 15, injury: 8, performance: 92 },
            { day: 'Day 20', illness: 13, injury: 7, performance: 90 },
            { day: 'Day 25', illness: 11, injury: 6, performance: 87 },
            { day: 'Day 30', illness: 12, injury: 8, performance: 89 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Bar dataKey="performance" fill="#10B981" name="Performance %" />
            <Line 
              type="monotone" 
              dataKey="illness" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
              name="Illness Risk %"
            />
            <Line 
              type="monotone" 
              dataKey="injury" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
              name="Injury Risk %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 border border-indigo-500/30 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <LightBulbIcon className="h-6 w-6 text-indigo-400" />
          <span>AI-Powered Recommendations</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-indigo-400 mb-4">Training Adjustments</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Increase recovery time by 20% this week</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Optimal training window: Days 12-18</span>
              </li>
              <li className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Reduce intensity on Day 25-27</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-indigo-400 mb-4">Health Optimization</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Focus on sleep quality for next 5 days</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Increase hydration by 15%</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Schedule stress management session</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
