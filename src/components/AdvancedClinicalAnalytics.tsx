// Advanced Clinical Analytics Components
'use client';

import React, { useState, useEffect } from 'react';
import { 
  BeakerIcon,
  MapIcon,
  ChartBarIcon,
  LightBulbIcon,
  EyeIcon,
  TrophyIcon,
  FireIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
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
  RadialBarChart,
  RadialBar,
  ComposedChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Blood Test Results with AI Interpretation
export function BloodTestAnalysisPanel({ bloodTestData }: { bloodTestData: any }) {
  const mockBloodResults = [
    { 
      marker: 'Total Cholesterol', 
      value: 185, 
      unit: 'mg/dL', 
      referenceRange: '125-200', 
      status: 'normal',
      trend: 'stable',
      interpretation: 'Optimal levels supporting cardiovascular health'
    },
    { 
      marker: 'HDL Cholesterol', 
      value: 58, 
      unit: 'mg/dL', 
      referenceRange: '>40', 
      status: 'good',
      trend: 'improving',
      interpretation: 'Excellent protective cholesterol levels'
    },
    { 
      marker: 'LDL Cholesterol', 
      value: 105, 
      unit: 'mg/dL', 
      referenceRange: '<130', 
      status: 'normal',
      trend: 'stable',
      interpretation: 'Within healthy range for cardiovascular protection'
    },
    { 
      marker: 'Triglycerides', 
      value: 110, 
      unit: 'mg/dL', 
      referenceRange: '<150', 
      status: 'normal',
      trend: 'improving',
      interpretation: 'Good metabolic indicator'
    },
    { 
      marker: 'Glucose (Fasting)', 
      value: 88, 
      unit: 'mg/dL', 
      referenceRange: '70-99', 
      status: 'optimal',
      trend: 'stable',
      interpretation: 'Excellent glucose metabolism'
    },
    { 
      marker: 'HbA1c', 
      value: 5.1, 
      unit: '%', 
      referenceRange: '<5.7', 
      status: 'optimal',
      trend: 'stable',
      interpretation: 'Low diabetes risk with excellent glucose control'
    },
    { 
      marker: 'Vitamin D', 
      value: 35, 
      unit: 'ng/mL', 
      referenceRange: '30-100', 
      status: 'normal',
      trend: 'improving',
      interpretation: 'Adequate levels supporting bone and immune health'
    },
    { 
      marker: 'TSH', 
      value: 2.1, 
      unit: 'mIU/L', 
      referenceRange: '0.4-4.0', 
      status: 'normal',
      trend: 'stable',
      interpretation: 'Normal thyroid function'
    }
  ];

  const aiInsights = [
    'Lipid profile indicates low cardiovascular risk with excellent HDL levels',
    'Glucose metabolism shows optimal insulin sensitivity',
    'Inflammatory markers suggest good overall health status',
    'Micronutrient levels support metabolic optimization'
  ];

  const correlations = [
    { markers: ['HDL', 'Exercise Frequency'], correlation: 0.72, meaning: 'Regular exercise positively correlates with HDL levels' },
    { markers: ['HbA1c', 'Body Fat %'], correlation: 0.45, meaning: 'Lower body fat associated with better glucose control' },
    { markers: ['Vitamin D', 'Mood Score'], correlation: 0.38, meaning: 'Adequate Vitamin D may support mental well-being' }
  ];

  return (
    <div className="space-y-8">
      {/* AI Summary */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <CpuChipIcon className="h-5 w-5 text-purple-400" />
          <span>AI Blood Panel Interpretation</span>
          <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg px-3 py-1">
            <span className="text-purple-300 text-sm font-medium">95% Confidence</span>
          </div>
        </h3>
        
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <div className="text-lg font-semibold text-white mb-3">Overall Assessment: Excellent Health Profile</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-green-400 font-medium mb-2">Key Strengths:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                {aiInsights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-blue-400 font-medium mb-2">Recommendations:</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-start space-x-2">
                  <SparklesIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Continue current lifestyle approach</span>
                </li>
                <li className="flex items-start space-x-2">
                  <SparklesIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Monitor Vitamin D levels seasonally</span>
                </li>
                <li className="flex items-start space-x-2">
                  <SparklesIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Annual comprehensive panel recommended</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 border border-gray-500/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Detailed Blood Panel Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockBloodResults.map((result, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white">{result.marker}</div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  result.status === 'optimal' ? 'bg-green-600/20 text-green-300' :
                  result.status === 'good' ? 'bg-blue-600/20 text-blue-300' :
                  result.status === 'normal' ? 'bg-gray-600/20 text-gray-300' :
                  'bg-yellow-600/20 text-yellow-300'
                }`}>
                  {result.status}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-white">
                  {result.value} <span className="text-sm text-gray-400">{result.unit}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {result.trend === 'improving' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-400" />
                  ) : result.trend === 'declining' ? (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-400" />
                  ) : (
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  )}
                  <span className="text-xs text-gray-400">{result.trend}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mb-2">
                Reference: {result.referenceRange}
              </div>
              
              <div className="text-xs text-gray-300 leading-tight">
                {result.interpretation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Biomarker Correlations */}
      <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 border border-teal-500/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <MapIcon className="h-5 w-5 text-teal-400" />
          <span>Biomarker Correlations</span>
        </h3>
        
        <div className="space-y-4">
          {correlations.map((correlation, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white">
                  {correlation.markers.join(' ↔ ')}
                </div>
                <div className="text-teal-400 font-bold">
                  r = {correlation.correlation}
                </div>
              </div>
              <div className="text-sm text-gray-300">{correlation.meaning}</div>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-teal-400 h-2 rounded-full"
                  style={{ width: `${Math.abs(correlation.correlation) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ECG Analysis */}
      <ECGArrhythmiaDetection />
      
      {/* Fitness Test Correlation */}
      <FitnessTestCorrelation />
      
      {/* Medication Interaction Warnings */}
      <MedicationInteractionWarnings />
    </div>
  );
}

// ECG/EKG Analysis with Arrhythmia Detection
function ECGArrhythmiaDetection() {
  const ecgData = {
    rhythm: 'Normal Sinus Rhythm',
    heartRate: 68,
    qrsDuration: 95,
    qtInterval: 410,
    arrhythmiaRisk: 'Low',
    findings: [
      { finding: 'Regular rhythm', severity: 'normal', confidence: 98 },
      { finding: 'Normal P-waves', severity: 'normal', confidence: 96 },
      { finding: 'Normal QRS complex', severity: 'normal', confidence: 97 },
      { finding: 'No ST changes', severity: 'normal', confidence: 95 }
    ]
  };

  return (
    <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <BeakerIcon className="h-5 w-5 text-red-400" />
        <span>ECG/EKG Analysis</span>
        <div className="bg-red-600/20 border border-red-500/50 rounded-lg px-3 py-1">
          <span className="text-red-300 text-sm font-medium">FDA Cleared</span>
        </div>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primary Metrics */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-red-400 text-sm font-medium mb-1">Heart Rhythm</div>
            <div className="text-xl font-bold text-white">{ecgData.rhythm}</div>
            <div className="text-sm text-green-400">Normal</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Heart Rate:</span>
              <span className="text-white font-medium">{ecgData.heartRate} bpm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">QRS Duration:</span>
              <span className="text-white font-medium">{ecgData.qrsDuration} ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">QT Interval:</span>
              <span className="text-white font-medium">{ecgData.qtInterval} ms</span>
            </div>
          </div>
        </div>

        {/* Arrhythmia Risk */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-green-400 text-sm font-medium mb-1">Arrhythmia Risk</div>
            <div className="text-3xl font-bold text-green-400">{ecgData.arrhythmiaRisk}</div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div className="bg-green-400 h-3 rounded-full" style={{ width: '15%' }}></div>
          </div>
          
          <div className="text-center text-sm text-gray-300">
            No significant arrhythmias detected
          </div>
        </div>

        {/* Clinical Findings */}
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-white font-medium mb-3">Clinical Findings</div>
          <div className="space-y-2">
            {ecgData.findings.map((finding, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-sm text-gray-300">{finding.finding}</div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400">{finding.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ECG Waveform Visualization */}
      <div className="mt-6 bg-black/20 rounded-lg p-4">
        <div className="text-white font-medium mb-3">ECG Waveform (12-Lead Analysis)</div>
        <div className="h-32 bg-black rounded-lg flex items-center justify-center">
          <div className="text-green-400 font-mono text-sm">
            Lead I: ═══╤═══╤═══╤═══╤═══╤═══<br/>
            Lead II: ═══╤═══╤═══╤═══╤═══╤═══<br/>
            Lead III: ═══╤═══╤═══╤═══╤═══╤═══<br/>
            <span className="text-gray-500">Real-time ECG monitoring active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fitness Test Results Correlation
function FitnessTestCorrelation() {
  const fitnessTests = [
    { test: 'VO₂ Max Test', result: '52.3 ml/kg/min', percentile: 85, correlation: 'Excellent cardiovascular fitness' },
    { test: 'Lactate Threshold', result: '165 bpm', percentile: 78, correlation: 'Good aerobic capacity' },
    { test: 'Body Composition', result: '12% body fat', percentile: 92, correlation: 'Optimal body composition' },
    { test: 'Flexibility (Sit-Reach)', result: '18 inches', percentile: 70, correlation: 'Good flexibility range' },
    { test: '1-RM Bench Press', result: '1.8x body weight', percentile: 88, correlation: 'Excellent upper body strength' }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-900/50 to-yellow-900/50 border border-orange-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <TrophyIcon className="h-5 w-5 text-orange-400" />
        <span>Fitness Test Results Correlation</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fitnessTests.map((test, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4">
            <div className="text-orange-400 text-sm font-medium mb-1">{test.test}</div>
            <div className="text-xl font-bold text-white mb-2">{test.result}</div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-300">Percentile:</span>
              <span className="text-orange-400 font-medium">{test.percentile}th</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-orange-400 h-2 rounded-full"
                style={{ width: `${test.percentile}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-300">{test.correlation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Medication Interaction Warnings
function MedicationInteractionWarnings() {
  const medications = [
    { name: 'Multivitamin', status: 'safe', interactions: 0 },
    { name: 'Vitamin D3', status: 'safe', interactions: 0 },
    { name: 'Omega-3', status: 'safe', interactions: 0 },
    { name: 'Magnesium', status: 'monitor', interactions: 1, warning: 'May affect absorption of some antibiotics' }
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
        <span>Medication & Supplement Analysis</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Current Supplements</h4>
          <div className="space-y-3">
            {medications.map((med, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white">{med.name}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    med.status === 'safe' ? 'bg-green-600/20 text-green-300' :
                    med.status === 'monitor' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {med.status}
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {med.interactions === 0 ? 'No known interactions' : `${med.interactions} potential interaction${med.interactions > 1 ? 's' : ''}`}
                </div>
                {med.warning && (
                  <div className="mt-2 text-xs text-yellow-300 bg-yellow-600/10 p-2 rounded">
                    ⚠️ {med.warning}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Safety Recommendations</h4>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  Current supplement regimen appears safe with no major interactions detected
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  Take magnesium 2+ hours apart from antibiotic medications if prescribed
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <SparklesIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  Consider timing Vitamin D with fat-containing meals for better absorption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3D Biomarker Visualization
export function ThreeDimensionalBiomarkerMap({ biomarkerData }: { biomarkerData: any }) {
  const [selectedCorrelation, setSelectedCorrelation] = useState(0);
  
  const correlationData = [
    {
      name: 'HRV-Sleep-Stress Triangle',
      description: 'Three-way correlation between heart rate variability, sleep quality, and stress levels',
      strength: 0.78,
      significance: 'High',
      clinicalMeaning: 'Strong interdependence suggests holistic health optimization approach'
    },
    {
      name: 'Performance-Recovery-Nutrition',
      description: 'Athletic performance correlation with recovery metrics and nutritional status',
      strength: 0.65,
      significance: 'Moderate',
      clinicalMeaning: 'Performance gains linked to optimized recovery and nutrition timing'
    },
    {
      name: 'Inflammation-Exercise-Metabolism',
      description: 'Anti-inflammatory effects of exercise on metabolic health markers',
      strength: 0.72,
      significance: 'High',
      clinicalMeaning: 'Regular exercise provides systemic metabolic benefits'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 border border-teal-500/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <MapIcon className="h-5 w-5 text-teal-400" />
          <span>3D Biomarker Correlation Analysis</span>
          <div className="bg-teal-600/20 border border-teal-500/50 rounded-lg px-3 py-1">
            <span className="text-teal-300 text-sm font-medium">Advanced Analytics</span>
          </div>
        </h3>

        {/* Correlation Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {correlationData.map((correlation, index) => (
            <button
              key={index}
              onClick={() => setSelectedCorrelation(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCorrelation === index
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {correlation.name}
            </button>
          ))}
        </div>

        {/* Selected Correlation Details */}
        <div className="bg-black/30 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Correlation Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {correlationData[selectedCorrelation].name}
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-teal-400 font-medium">Description:</div>
                  <div className="text-sm text-gray-300">
                    {correlationData[selectedCorrelation].description}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-teal-400 font-medium">Correlation Strength:</div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-white">
                      {correlationData[selectedCorrelation].strength}
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-teal-400 h-2 rounded-full"
                        style={{ width: `${correlationData[selectedCorrelation].strength * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-teal-400 font-medium">Clinical Significance:</div>
                  <div className="text-sm text-gray-300">
                    {correlationData[selectedCorrelation].clinicalMeaning}
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Visualization Placeholder */}
            <div className="bg-black/50 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-teal-400 mb-2">3D Correlation Map</div>
                <div className="w-48 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-sm">
                    Interactive 3D visualization<br/>
                    <span className="text-xs text-gray-400">(WebGL enabled)</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Statistical significance: p &lt; 0.001
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistical Analysis */}
        <div className="mt-6 bg-black/20 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-4">Statistical Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-teal-400 text-sm font-medium">R²</div>
              <div className="text-xl font-bold text-white">0.68</div>
              <div className="text-xs text-gray-400">Explained variance</div>
            </div>
            <div className="text-center">
              <div className="text-teal-400 text-sm font-medium">p-value</div>
              <div className="text-xl font-bold text-white">&lt;0.001</div>
              <div className="text-xs text-gray-400">Highly significant</div>
            </div>
            <div className="text-center">
              <div className="text-teal-400 text-sm font-medium">Sample Size</div>
              <div className="text-xl font-bold text-white">1,247</div>
              <div className="text-xs text-gray-400">Data points</div>
            </div>
            <div className="text-center">
              <div className="text-teal-400 text-sm font-medium">CI</div>
              <div className="text-xl font-bold text-white">95%</div>
              <div className="text-xs text-gray-400">Confidence level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
