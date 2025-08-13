'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CpuChipIcon,
  HeartIcon,
  EyeIcon,
  LightBulbIcon,
  SparklesIcon,
  ChartBarIcon,
  BeakerIcon,
  FireIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  UserIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ScaleIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface HealthTwinProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  healthData: any;
}

interface DigitalTwin {
  id: string;
  name: string;
  age: number;
  accuracy: number;
  learningProgress: number;
  evolutionStage: 'creating' | 'learning' | 'predicting' | 'mastering' | 'transcending';
  capabilities: string[];
  predictions: TwinPrediction[];
  insights: TwinInsight[];
  biologicalSystems: BiologicalSystem[];
}

interface TwinPrediction {
  id: string;
  category: 'health' | 'performance' | 'longevity' | 'disease' | 'lifestyle';
  prediction: string;
  probability: number;
  timeframe: string;
  preventiveActions: string[];
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface TwinInsight {
  id: string;
  type: 'pattern' | 'anomaly' | 'optimization' | 'warning' | 'breakthrough';
  title: string;
  description: string;
  impact: number;
  actionable: boolean;
  clinicalEvidence: string[];
}

interface BiologicalSystem {
  name: string;
  health: number;
  trends: number[];
  predictions: string[];
  optimization: string[];
}

export function VitalisNeuralHealthTwin({ userId, isOpen, onClose, healthData }: HealthTwinProps) {
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwin | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'predictions' | 'evolution' | 'systems' | 'insights'>('overview');
  const [isCreatingTwin, setIsCreatingTwin] = useState(false);
  const [twinEvolution, setTwinEvolution] = useState(0);
  const [realTimeSync, setRealTimeSync] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Neural Health Twin
  useEffect(() => {
    if (isOpen && !digitalTwin) {
      createDigitalTwin();
    }
  }, [isOpen]);

  // Real-time neural network visualization
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      animateNeuralNetwork();
    }
  }, [isOpen, digitalTwin]);

  const createDigitalTwin = async () => {
    setIsCreatingTwin(true);
    
    // Simulate AI twin creation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const twin: DigitalTwin = {
      id: `twin_${userId}_${Date.now()}`,
      name: 'Your Neural Health Twin',
      age: 0, // Digital age in days
      accuracy: 87.5,
      learningProgress: 73.2,
      evolutionStage: 'learning',
      capabilities: [
        'Real-time health monitoring',
        'Predictive health modeling',
        'Biological system simulation',
        'Personalized optimization',
        'Disease risk assessment',
        'Longevity forecasting',
        'Performance prediction',
        'Recovery optimization'
      ],
      predictions: generateTwinPredictions(),
      insights: generateTwinInsights(),
      biologicalSystems: generateBiologicalSystems()
    };

    setDigitalTwin(twin);
    setIsCreatingTwin(false);
    startTwinEvolution();
  };

  const generateTwinPredictions = (): TwinPrediction[] => [
    {
      id: 'pred_1',
      category: 'health',
      prediction: 'Cardiovascular fitness will improve by 12% over next 8 weeks with current exercise pattern',
      probability: 92.3,
      timeframe: '8 weeks',
      preventiveActions: [
        'Increase high-intensity interval training by 15%',
        'Add 2 strength training sessions per week',
        'Optimize recovery with 8+ hour sleep'
      ],
      confidence: 0.923,
      riskLevel: 'low'
    },
    {
      id: 'pred_2',
      category: 'disease',
      prediction: 'Elevated stress markers detected - 67% risk of metabolic disruption in 3-4 weeks without intervention',
      probability: 67.1,
      timeframe: '3-4 weeks',
      preventiveActions: [
        'Implement daily 20-minute meditation',
        'Reduce caffeine intake after 2 PM',
        'Schedule stress management consultation'
      ],
      confidence: 0.871,
      riskLevel: 'medium'
    },
    {
      id: 'pred_3',
      category: 'longevity',
      prediction: 'Current health trajectory suggests 15.2 year increase in healthy lifespan',
      probability: 88.7,
      timeframe: 'Lifetime',
      preventiveActions: [
        'Maintain current exercise consistency',
        'Continue omega-3 supplementation',
        'Regular biomarker monitoring'
      ],
      confidence: 0.887,
      riskLevel: 'low'
    },
    {
      id: 'pred_4',
      category: 'performance',
      prediction: 'VO2 Max peak performance window opening in 12-16 days based on training adaptation cycles',
      probability: 94.2,
      timeframe: '12-16 days',
      preventiveActions: [
        'Schedule high-intensity training session',
        'Optimize carbohydrate timing',
        'Plan performance test during peak window'
      ],
      confidence: 0.942,
      riskLevel: 'low'
    }
  ];

  const generateTwinInsights = (): TwinInsight[] => [
    {
      id: 'insight_1',
      type: 'pattern',
      title: 'Circadian Rhythm Optimization Detected',
      description: 'Your digital twin has identified a 23% improvement in sleep efficiency when exercise occurs 6-8 hours before bedtime',
      impact: 89,
      actionable: true,
      clinicalEvidence: ['Sleep Medicine Journal 2024', 'Circadian Biology Research']
    },
    {
      id: 'insight_2',
      type: 'breakthrough',
      title: 'Metabolic Flexibility Breakthrough',
      description: 'Twin modeling shows you\'ve achieved rare metabolic flexibility - can efficiently burn both carbs and fats',
      impact: 95,
      actionable: true,
      clinicalEvidence: ['Metabolic Research Institute', 'Journal of Applied Physiology']
    },
    {
      id: 'insight_3',
      type: 'optimization',
      title: 'HRV-Stress Correlation Discovery',
      description: 'Unique pattern: Your HRV improves 34% when stress management occurs within 2 hours of detection',
      impact: 76,
      actionable: true,
      clinicalEvidence: ['Autonomic Neuroscience Journal', 'Stress Medicine Research']
    }
  ];

  const generateBiologicalSystems = (): BiologicalSystem[] => [
    {
      name: 'Cardiovascular',
      health: 92,
      trends: [88, 89, 91, 92, 93],
      predictions: ['Continued improvement', 'Peak efficiency in 3 weeks'],
      optimization: ['Increase Zone 2 training', 'Monitor HRV daily']
    },
    {
      name: 'Metabolic',
      health: 87,
      trends: [85, 86, 87, 87, 88],
      predictions: ['Stable optimization', 'Insulin sensitivity improving'],
      optimization: ['Time-restricted eating', 'Cold exposure therapy']
    },
    {
      name: 'Neurological',
      health: 91,
      trends: [89, 90, 91, 92, 91],
      predictions: ['Cognitive enhancement', 'Memory consolidation improving'],
      optimization: ['Omega-3 optimization', 'Sleep deep phase extension']
    },
    {
      name: 'Immune',
      health: 84,
      trends: [82, 83, 84, 85, 84],
      predictions: ['Strengthening phase', 'Viral resistance high'],
      optimization: ['Vitamin D optimization', 'Stress reduction protocol']
    }
  ];

  const startTwinEvolution = () => {
    const interval = setInterval(() => {
      setTwinEvolution(prev => {
        const newValue = prev + Math.random() * 2;
        if (newValue >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newValue;
      });
    }, 200);

    // Update twin capabilities over time
    setTimeout(() => {
      setDigitalTwin(prev => prev ? {
        ...prev,
        evolutionStage: 'predicting',
        accuracy: prev.accuracy + 5.2,
        learningProgress: prev.learningProgress + 15.8
      } : null);
    }, 5000);
  };

  const animateNeuralNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      connections: []
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] h-[85vh] overflow-hidden mx-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-b border-green-500/30 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <CpuChipIcon className="h-10 w-10 text-green-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Neural Health Twin</h1>
                <p className="text-green-300">Your AI-powered biological digital replica</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-900/50 border-b border-gray-700/50 p-4">
          <div className="flex space-x-6">
            {[
              { id: 'overview', label: 'Twin Overview', icon: EyeIcon },
              { id: 'predictions', label: 'Future Predictions', icon: ChartBarIcon },
              { id: 'evolution', label: 'AI Evolution', icon: ArrowPathIcon },
              { id: 'systems', label: 'Biological Systems', icon: BeakerIcon },
              { id: 'insights', label: 'Twin Insights', icon: LightBulbIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === tab.id 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-[calc(85vh-180px)] overflow-y-auto">
          {isCreatingTwin ? (
            <TwinCreationView />
          ) : digitalTwin ? (
            <>
              {activeView === 'overview' && <TwinOverviewView twin={digitalTwin} canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>} />}
              {activeView === 'predictions' && <TwinPredictionsView predictions={digitalTwin.predictions} />}
              {activeView === 'evolution' && <TwinEvolutionView twin={digitalTwin} evolution={twinEvolution} />}
              {activeView === 'systems' && <BiologicalSystemsView systems={digitalTwin.biologicalSystems} />}
              {activeView === 'insights' && <TwinInsightsView insights={digitalTwin.insights} />}
            </>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

// Twin Creation View
function TwinCreationView() {
  return (
    <div className="text-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 mx-auto mb-8"
      >
        <CpuChipIcon className="w-full h-full text-green-400" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-4">Creating Your Neural Health Twin</h2>
      <p className="text-gray-300 text-lg mb-8">Analyzing your biological data and building your digital replica...</p>
      <div className="w-64 mx-auto bg-gray-800 rounded-full h-4">
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3 }}
        />
      </div>
    </div>
  );
}

// Twin Overview View
function TwinOverviewView({ twin, canvasRef }: { twin: DigitalTwin, canvasRef: React.RefObject<HTMLCanvasElement> }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Neural Network Visualization */}
      <div className="bg-black/60 border border-green-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <CpuChipIcon className="h-6 w-6 text-green-400" />
          <span>Neural Network Activity</span>
        </h3>
        <canvas 
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full h-64 border border-gray-700 rounded-lg"
        />
        <div className="mt-4 text-center">
          <p className="text-green-300 text-sm">Real-time AI processing your health data</p>
        </div>
      </div>

      {/* Twin Stats */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Twin Intelligence</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{twin.accuracy}%</div>
              <div className="text-gray-400 text-sm">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{twin.learningProgress}%</div>
              <div className="text-gray-400 text-sm">Learning Progress</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Evolution Stage</h3>
          <div className="flex items-center space-x-3 mb-3">
            <SparklesIcon className="h-6 w-6 text-emerald-400" />
            <span className="text-emerald-300 font-medium capitalize">{twin.evolutionStage}</span>
          </div>
          <p className="text-gray-300 text-sm">
            Your twin is continuously evolving, learning from your unique biological patterns
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Capabilities</h3>
          <div className="space-y-2">
            {twin.capabilities.slice(0, 4).map((capability, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Twin Predictions View
function TwinPredictionsView({ predictions }: { predictions: TwinPrediction[] }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Future Health Predictions</h2>
        <p className="text-gray-300">Your neural twin's forecasts based on biological modeling</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map(prediction => (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-xl p-6 ${
              prediction.riskLevel === 'critical' ? 'bg-red-900/30 border-red-500/50' :
              prediction.riskLevel === 'high' ? 'bg-orange-900/30 border-orange-500/50' :
              prediction.riskLevel === 'medium' ? 'bg-yellow-900/30 border-yellow-500/50' :
              'bg-green-900/30 border-green-500/50'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  prediction.riskLevel === 'critical' ? 'bg-red-500' :
                  prediction.riskLevel === 'high' ? 'bg-orange-500' :
                  prediction.riskLevel === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <span className="text-gray-300 text-sm font-medium capitalize">{prediction.category}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{prediction.probability}%</div>
                <div className="text-gray-400 text-xs">{prediction.timeframe}</div>
              </div>
            </div>

            <h3 className="text-white font-semibold mb-3">{prediction.prediction}</h3>

            <div className="space-y-2">
              <h4 className="text-gray-300 text-sm font-medium">Preventive Actions:</h4>
              {prediction.preventiveActions.map((action, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <LightBulbIcon className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{action}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-400 text-xs">Confidence: {(prediction.confidence * 100).toFixed(1)}%</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View Details →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Twin Evolution View
function TwinEvolutionView({ twin, evolution }: { twin: DigitalTwin, evolution: number }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">AI Evolution Progress</h2>
        <p className="text-gray-300">Watching your digital twin learn and evolve</p>
      </div>

      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-purple-400 mb-2">{evolution.toFixed(1)}%</div>
          <div className="text-gray-300">Evolution Progress</div>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-6 mb-6">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${evolution}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <AcademicCapIcon className="h-12 w-12 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Learning Phase</h3>
            <p className="text-gray-300 text-sm">Analyzing biological patterns</p>
          </div>
          <div className="text-center">
            <MagnifyingGlassIcon className="h-12 w-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Pattern Recognition</h3>
            <p className="text-gray-300 text-sm">Identifying health correlations</p>
          </div>
          <div className="text-center">
            <SparklesIcon className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Prediction Engine</h3>
            <p className="text-gray-300 text-sm">Forecasting health outcomes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Biological Systems View
function BiologicalSystemsView({ systems }: { systems: BiologicalSystem[] }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Biological Systems Analysis</h2>
        <p className="text-gray-300">Your twin's simulation of major body systems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {systems.map((system, index) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-gray-600/50 rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{system.name} System</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  system.health >= 90 ? 'bg-green-500' :
                  system.health >= 75 ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`} />
                <span className="text-white font-bold">{system.health}%</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Health Score</span>
                <span>{system.health}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    system.health >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    system.health >= 75 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}
                  style={{ width: `${system.health}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-gray-300 font-medium mb-2">Predictions</h4>
                {system.predictions.map((prediction, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-1">
                    <ChartBarIcon className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{prediction}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-gray-300 font-medium mb-2">Optimization</h4>
                {system.optimization.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-1">
                    <BoltIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Twin Insights View
function TwinInsightsView({ insights }: { insights: TwinInsight[] }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Neural Twin Insights</h2>
        <p className="text-gray-300">Breakthrough discoveries from your digital twin</p>
      </div>

      <div className="space-y-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-xl p-6 ${
              insight.type === 'breakthrough' ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50' :
              insight.type === 'warning' ? 'bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/50' :
              insight.type === 'optimization' ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/50' :
              'bg-gradient-to-r from-gray-900/50 to-black/50 border-gray-600/50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {insight.type === 'breakthrough' && <SparklesIcon className="h-6 w-6 text-purple-400" />}
                {insight.type === 'warning' && <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />}
                {insight.type === 'optimization' && <BoltIcon className="h-6 w-6 text-green-400" />}
                {insight.type === 'pattern' && <MagnifyingGlassIcon className="h-6 w-6 text-blue-400" />}
                {insight.type === 'anomaly' && <EyeIcon className="h-6 w-6 text-orange-400" />}
                <div>
                  <h3 className="text-white font-bold text-lg">{insight.title}</h3>
                  <span className="text-gray-400 text-sm capitalize">{insight.type} Discovery</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{insight.impact}%</div>
                <div className="text-gray-400 text-xs">Impact Score</div>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{insight.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insight.actionable ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                  {insight.actionable ? 'Actionable' : 'Informational'}
                </div>
                <div className="text-gray-400 text-xs">
                  {insight.clinicalEvidence.length} clinical references
                </div>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View Evidence →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
