// Simplified Clinical Dashboard Component
'use client';

import React, { useState } from 'react';
import { 
  ShieldCheckIcon, 
  HeartIcon,
  BoltIcon, 
  TrophyIcon,
  BeakerIcon,
  ChartBarIcon,
  LightBulbIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface ClinicalDashboardProps {
  userId: string;
  onClose?: () => void;
}

export function ClinicalDashboard({ userId, onClose }: ClinicalDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('guidelines');

  const tabs = [
    { id: 'guidelines', label: 'WHO/ACSM Guidelines', icon: ShieldCheckIcon, color: 'emerald' },
    { id: 'performance', label: 'Performance Analytics', icon: TrophyIcon, color: 'blue' },
    { id: 'clinical', label: 'Clinical Analysis', icon: HeartIcon, color: 'red' },
    { id: 'biomarkers', label: 'Biomarker Correlation', icon: BeakerIcon, color: 'purple' },
    { id: 'realtime', label: 'Real-time Vitals', icon: BoltIcon, color: 'yellow' },
    { id: 'predictive', label: 'Predictive Analytics', icon: LightBulbIcon, color: 'amber' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Clinical Health Dashboard</h1>
            <p className="text-gray-300">Advanced health analytics with clinical-grade precision</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300'
                    : 'bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-gray-300">
            Clinical-grade health analysis and monitoring features coming soon. 
            This dashboard will provide comprehensive health insights with medical precision.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClinicalDashboard;
