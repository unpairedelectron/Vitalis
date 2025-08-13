'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { demoSettings, impressiveDemoData } from '@/lib/demoSettings';

interface DemoPerformanceMonitorProps {
  isDemo?: boolean;
  showMetrics?: boolean;
}

export const DemoPerformanceMonitor: React.FC<DemoPerformanceMonitorProps> = ({ 
  isDemo = true, 
  showMetrics = false 
}) => {
  const [currentScenario, setCurrentScenario] = useState<'resting' | 'active' | 'recovery'>('resting');
  const [performanceMetrics, setPerformanceMetrics] = useState(impressiveDemoData.performanceMetrics);

  // Cycle through demo scenarios for dynamic presentation
  useEffect(() => {
    if (!isDemo) return;

    const interval = setInterval(() => {
      const scenarios: ('resting' | 'active' | 'recovery')[] = ['resting', 'active', 'recovery'];
      const currentIndex = scenarios.indexOf(currentScenario);
      const nextIndex = (currentIndex + 1) % scenarios.length;
      setCurrentScenario(scenarios[nextIndex]);
    }, 15000); // Change scenario every 15 seconds

    return () => clearInterval(interval);
  }, [currentScenario, isDemo]);

  if (!showMetrics) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg p-4 text-white text-xs z-50"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            currentScenario === 'resting' ? 'bg-green-400' :
            currentScenario === 'active' ? 'bg-orange-400' : 'bg-blue-400'
          }`} />
          <span>Demo Mode: {currentScenario.toUpperCase()}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div>Health Score: {performanceMetrics.healthScore}</div>
            <div>Fitness Age: {performanceMetrics.fitnessAge}</div>
          </div>
          <div>
            <div>Longevity: {performanceMetrics.longevityIndex}</div>
            <div>Stress: {performanceMetrics.stressResilience}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Quick demo control panel for presentations
export const DemoControlPanel: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [currentMode, setCurrentMode] = useState<'presentation' | 'technical' | 'business'>('presentation');

  const modes = {
    presentation: {
      title: "Presentation Mode",
      description: "Optimized for investor/client demos",
      settings: {
        animations: true,
        realTime: true,
        highlights: true
      }
    },
    technical: {
      title: "Technical Demo",
      description: "Show architecture and performance",
      settings: {
        animations: false,
        realTime: true,
        highlights: false
      }
    },
    business: {
      title: "Business Focus",
      description: "Emphasize ROI and market opportunity",
      settings: {
        animations: true,
        realTime: false,
        highlights: true
      }
    }
  };

  return (
    <>
      {/* Demo control trigger */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-4 right-4 bg-blue-600 text-white p-2 rounded-lg shadow-lg z-50 opacity-80 hover:opacity-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎯 Demo
      </motion.button>

      {/* Demo control panel */}
      {showPanel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-16 right-4 bg-white rounded-lg shadow-xl p-4 z-50 w-72"
        >
          <h3 className="font-semibold text-lg mb-3">Demo Control Panel</h3>
          
          <div className="space-y-3">
            {Object.entries(modes).map(([key, mode]) => (
              <motion.button
                key={key}
                onClick={() => setCurrentMode(key as any)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                  currentMode === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{mode.title}</div>
                <div className="text-sm text-gray-600">{mode.description}</div>
              </motion.button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Current: <span className="font-medium">{modes[currentMode].title}</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default DemoPerformanceMonitor;
