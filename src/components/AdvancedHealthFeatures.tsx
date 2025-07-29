// Advanced Health Features for Vitalis
'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  CpuChipIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export interface AdvancedHealthFeatures {
  biomarkerAnalysis: BiometricsData;
  riskAssessment: RiskProfile;
  performanceOptimization: PerformanceMetrics;
  predictiveInsights: PredictiveAnalysis[];
}

interface BiometricsData {
  vo2Max: number;
  lactateThreshold: number;
  metabolicEfficiency: number;
  cardiovascularFitness: number;
  muscleOxygenation: number;
  cortisolLevels: number;
}

interface RiskProfile {
  cardiovascularRisk: number;
  injuryRisk: number;
  burnoutRisk: number;
  immuneSystemStrength: number;
  overtrainingRisk: number;
}

interface PerformanceMetrics {
  explosivePower: number;
  enduranceCapacity: number;
  recoveryRate: number;
  sleepEfficiency: number;
  stressResilience: number;
}

interface PredictiveAnalysis {
  metric: string;
  prediction: string;
  confidence: number;
  timeframe: string;
  actionable: boolean;
}

export function AdvancedBiomarkerPanel({ data }: { data: BiometricsData }) {
  return (
    <div className="bg-gradient-to-r from-emerald-900/50 to-teal-800/50 border border-emerald-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BeakerIcon className="h-6 w-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Advanced Biomarker Analysis</h3>
        <div className="bg-emerald-600/20 border border-emerald-500/50 rounded-lg px-3 py-1">
          <span className="text-emerald-300 text-sm font-medium">Clinical Grade</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-emerald-400 text-sm font-medium mb-1">VO₂ Max</div>
          <div className="text-2xl font-bold text-white">{data.vo2Max}</div>
          <div className="text-xs text-gray-400">ml/kg/min</div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-emerald-400 h-2 rounded-full" 
                style={{width: `${Math.min(data.vo2Max / 60 * 100, 100)}%`}}
              ></div>
            </div>
            <span className="text-xs text-emerald-400">Elite</span>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-medium mb-1">Lactate Threshold</div>
          <div className="text-2xl font-bold text-white">{data.lactateThreshold}</div>
          <div className="text-xs text-gray-400">% VO₂ Max</div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full" 
                style={{width: `${data.lactateThreshold}%`}}
              ></div>
            </div>
            <span className="text-xs text-blue-400">Optimal</span>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-purple-400 text-sm font-medium mb-1">Metabolic Efficiency</div>
          <div className="text-2xl font-bold text-white">{data.metabolicEfficiency}%</div>
          <div className="text-xs text-gray-400">Fat oxidation</div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full" 
                style={{width: `${data.metabolicEfficiency}%`}}
              ></div>
            </div>
            <span className="text-xs text-purple-400">Superior</span>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-red-400 text-sm font-medium mb-1">Cardiovascular Fitness</div>
          <div className="text-2xl font-bold text-white">{data.cardiovascularFitness}%</div>
          <div className="text-xs text-gray-400">Age-adjusted</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-yellow-400 text-sm font-medium mb-1">Muscle Oxygenation</div>
          <div className="text-2xl font-bold text-white">{data.muscleOxygenation}%</div>
          <div className="text-xs text-gray-400">SmO₂</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-orange-400 text-sm font-medium mb-1">Cortisol Levels</div>
          <div className="text-2xl font-bold text-white">{data.cortisolLevels}</div>
          <div className="text-xs text-gray-400">μg/dL</div>
        </div>
      </div>
    </div>
  );
}

export function MilitaryRiskAssessment({ risk }: { risk: RiskProfile }) {
  const getRiskColor = (riskLevel: number) => {
    if (riskLevel < 20) return 'text-green-400';
    if (riskLevel < 50) return 'text-yellow-400';
    if (riskLevel < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRiskBgColor = (riskLevel: number) => {
    if (riskLevel < 20) return 'bg-green-900/30 border-green-500/50';
    if (riskLevel < 50) return 'bg-yellow-900/30 border-yellow-500/50';
    if (riskLevel < 80) return 'bg-orange-900/30 border-orange-500/50';
    return 'bg-red-900/30 border-red-500/50';
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/50 to-gray-800/50 border border-slate-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <ShieldCheckIcon className="h-6 w-6 text-slate-400" />
        <h3 className="text-xl font-bold text-white">Military Risk Assessment</h3>
        <div className="bg-slate-600/20 border border-slate-500/50 rounded-lg px-3 py-1">
          <span className="text-slate-300 text-sm font-medium">Tactical Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-lg p-4 border ${getRiskBgColor(risk.cardiovascularRisk)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Cardiovascular Risk</span>
            <span className={`text-lg font-bold ${getRiskColor(risk.cardiovascularRisk)}`}>
              {risk.cardiovascularRisk}%
            </span>
          </div>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                risk.cardiovascularRisk < 20 ? 'bg-green-400' :
                risk.cardiovascularRisk < 50 ? 'bg-yellow-400' :
                risk.cardiovascularRisk < 80 ? 'bg-orange-400' : 'bg-red-400'
              }`}
              style={{width: `${risk.cardiovascularRisk}%`}}
            ></div>
          </div>
        </div>

        <div className={`rounded-lg p-4 border ${getRiskBgColor(risk.injuryRisk)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Injury Risk</span>
            <span className={`text-lg font-bold ${getRiskColor(risk.injuryRisk)}`}>
              {risk.injuryRisk}%
            </span>
          </div>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                risk.injuryRisk < 20 ? 'bg-green-400' :
                risk.injuryRisk < 50 ? 'bg-yellow-400' :
                risk.injuryRisk < 80 ? 'bg-orange-400' : 'bg-red-400'
              }`}
              style={{width: `${risk.injuryRisk}%`}}
            ></div>
          </div>
        </div>

        <div className={`rounded-lg p-4 border ${getRiskBgColor(risk.burnoutRisk)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Burnout Risk</span>
            <span className={`text-lg font-bold ${getRiskColor(risk.burnoutRisk)}`}>
              {risk.burnoutRisk}%
            </span>
          </div>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                risk.burnoutRisk < 20 ? 'bg-green-400' :
                risk.burnoutRisk < 50 ? 'bg-yellow-400' :
                risk.burnoutRisk < 80 ? 'bg-orange-400' : 'bg-red-400'
              }`}
              style={{width: `${risk.burnoutRisk}%`}}
            ></div>
          </div>
        </div>

        <div className={`rounded-lg p-4 border ${getRiskBgColor(100 - risk.immuneSystemStrength)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Immune System</span>
            <span className={`text-lg font-bold ${getRiskColor(100 - risk.immuneSystemStrength)}`}>
              {risk.immuneSystemStrength}%
            </span>
          </div>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full"
              style={{width: `${risk.immuneSystemStrength}%`}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PerformanceOptimizationPanel({ performance }: { performance: PerformanceMetrics }) {
  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-indigo-800/50 border border-blue-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrophyIcon className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Performance Optimization</h3>
        <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg px-3 py-1">
          <span className="text-blue-300 text-sm font-medium">Elite Training</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <BoltIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">Explosive Power</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">{performance.explosivePower}%</div>
          <div className="text-sm text-gray-400">Peak anaerobic capacity</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <FireIcon className="h-5 w-5 text-red-400" />
            <span className="text-white font-medium">Endurance</span>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">{performance.enduranceCapacity}%</div>
          <div className="text-sm text-gray-400">Aerobic efficiency</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <ClockIcon className="h-5 w-5 text-green-400" />
            <span className="text-white font-medium">Recovery Rate</span>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">{performance.recoveryRate}%</div>
          <div className="text-sm text-gray-400">Post-exercise recovery</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-blue-400">😴</div>
            <span className="text-white font-medium">Sleep Efficiency</span>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-2">{performance.sleepEfficiency}%</div>
          <div className="text-sm text-gray-400">Recovery optimization</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <ShieldCheckIcon className="h-5 w-5 text-purple-400" />
            <span className="text-white font-medium">Stress Resilience</span>
          </div>
          <div className="text-3xl font-bold text-purple-400 mb-2">{performance.stressResilience}%</div>
          <div className="text-sm text-gray-400">Mental fortitude</div>
        </div>
      </div>
    </div>
  );
}

export function PredictiveAnalysisPanel({ predictions }: { predictions: PredictiveAnalysis[] }) {
  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-800/50 border border-purple-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <CpuChipIcon className="h-6 w-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">AI Predictive Analysis</h3>
        <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg px-3 py-1">
          <span className="text-purple-300 text-sm font-medium">Future Insights</span>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5 text-purple-400" />
                <span className="text-white font-medium">{prediction.metric}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-gray-400">{prediction.timeframe}</div>
                <div className="bg-purple-600/30 rounded-full px-2 py-1">
                  <span className="text-xs text-purple-300">
                    {Math.round(prediction.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-3">{prediction.prediction}</p>
            {prediction.actionable && (
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-300">Actionable insights available</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
