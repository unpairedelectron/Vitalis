'use client';

import React, { useState } from 'react';

interface DashboardProps {
  userId: string;
  onBackToLanding?: () => void;
}

export function HealthDashboardSimple({ userId, onBackToLanding }: DashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState('heart');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Vitalis Dashboard Test</h1>
        
        {/* Simple button test */}
        <div className="space-y-4">
          <button
            onClick={() => setSelectedMetric('heart')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Heart Rate
          </button>
          
          <button
            onClick={() => setSelectedMetric('sleep')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Sleep
          </button>
          
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Back to Landing
            </button>
          )}
          
          <div className="bg-black/40 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Selected Metric: {selectedMetric}</h2>
            <p>User ID: {userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
