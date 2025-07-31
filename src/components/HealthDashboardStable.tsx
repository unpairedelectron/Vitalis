'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  HeartIcon, 
  MoonIcon, 
  BoltIcon, 
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

interface DashboardProps {
  userId: string;
  onBackToLanding?: () => void;
}

interface DashboardData {
  healthScore: number;
  lastUpdate: Date | string;
  heartRateData: any[];
  sleepData: any[];
  activityData: any[];
  insights: any[];
  alerts: any[];
  trends: any[];
}

export function HealthDashboardStable({ userId, onBackToLanding }: DashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'heart' | 'sleep' | 'activity'>('heart');

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/health/dashboard/${userId}`);
      if (response.ok) {
        let data = await response.json();
        
        // Handle wrapped data
        if (data.data) {
          data = data.data;
        }
        
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Set fallback data
      setDashboardData({
        healthScore: 85,
        lastUpdate: new Date(),
        heartRateData: [
          { time: '6:00', bpm: 65 },
          { time: '9:00', bpm: 72 },
          { time: '12:00', bpm: 68 },
          { time: '15:00', bpm: 75 },
          { time: '18:00', bpm: 70 },
          { time: '21:00', bpm: 64 }
        ],
        sleepData: [
          { date: 'Mon', deep: 2.1, rem: 1.8, light: 3.5, total: 7.4 },
          { date: 'Tue', deep: 1.9, rem: 2.2, light: 3.8, total: 7.9 },
          { date: 'Wed', deep: 2.3, rem: 1.6, light: 3.2, total: 7.1 }
        ],
        activityData: [
          { date: 'Mon', steps: 8500, calories: 320 },
          { date: 'Tue', steps: 9200, calories: 380 },
          { date: 'Wed', steps: 7800, calories: 290 }
        ],
        insights: [],
        alerts: [],
        trends: []
      });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-200">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load dashboard data</p>
          <button 
            onClick={loadDashboardData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                  Vitalis Health Dashboard
                </h1>
              </div>
              <p className="text-blue-200 mt-1">
                Last updated: {dashboardData.lastUpdate instanceof Date 
                  ? dashboardData.lastUpdate.toLocaleTimeString() 
                  : new Date(dashboardData.lastUpdate).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Health Score */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg px-6 py-3">
                <div className="text-white text-sm font-medium">Health Score</div>
                <div className="text-white text-2xl font-bold">{dashboardData.healthScore}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
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

            {/* Chart Display */}
            <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              {selectedMetric === 'heart' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Heart Rate Analysis</h3>
                  <div className="space-y-4">
                    {dashboardData.heartRateData?.map((data, index) => (
                      <div key={index} className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                        <span className="text-gray-300">{data.time}</span>
                        <span className="text-red-400 font-bold">{data.bpm} BPM</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedMetric === 'sleep' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Sleep Analysis</h3>
                  <div className="space-y-4">
                    {dashboardData.sleepData?.map((data, index) => (
                      <div key={index} className="bg-black/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">{data.date}</span>
                          <span className="text-blue-400 font-bold">{data.total}h total</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-blue-300">Deep: {data.deep}h</div>
                          <div className="text-purple-300">REM: {data.rem}h</div>
                          <div className="text-cyan-300">Light: {data.light}h</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedMetric === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Activity Performance</h3>
                  <div className="space-y-4">
                    {dashboardData.activityData?.map((data, index) => (
                      <div key={index} className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                        <span className="text-gray-300">{data.date}</span>
                        <div className="text-right">
                          <div className="text-orange-400 font-bold">{data.steps.toLocaleString()} steps</div>
                          <div className="text-red-400 text-sm">{data.calories} cal</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg Heart Rate</span>
                  <span className="text-red-400 font-bold">70 BPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sleep Quality</span>
                  <span className="text-blue-400 font-bold">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Daily Steps</span>
                  <span className="text-orange-400 font-bold">8,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Calories Burned</span>
                  <span className="text-red-400 font-bold">330</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Data Sync: Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">AI Analysis: Running</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Device: Connecting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
