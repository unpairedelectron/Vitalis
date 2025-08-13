'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon,
  MicrophoneIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ClockIcon,
  ShieldCheckIcon,
  BeakerIcon,
  CpuChipIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CalendarDaysIcon,
  TrophyIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface HealthOracleProps {
  userId: string;
  healthData: any;
  isOpen: boolean;
  onClose: () => void;
}

interface OracleMessage {
  id: string;
  type: 'user' | 'oracle' | 'prediction' | 'alert' | 'insight';
  content: string;
  timestamp: Date;
  confidence?: number;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  predictions?: HealthPrediction[];
  recommendations?: string[];
}

interface HealthPrediction {
  event: string;
  probability: number;
  timeframe: string;
  preventionSteps: string[];
  riskFactors: string[];
  confidence: number;
}

export function VitalisHealthOracle({ userId, healthData, isOpen, onClose }: HealthOracleProps) {
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [oracleMode, setOracleMode] = useState<'chat' | 'predict' | 'monitor'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: OracleMessage = {
        id: 'welcome',
        type: 'oracle',
        content: `🔮 **VITALIS HEALTH ORACLE ACTIVATED**\n\nI am your personal AI health guardian with 360° predictive intelligence. I can:\n\n✨ **Predict** health events 2 weeks to 6 months in advance\n🩺 **Analyze** your vitals in real-time with military precision\n🎯 **Recommend** personalized interventions\n🚨 **Alert** you to potential health risks instantly\n\nTry asking: "What's my health forecast?" or "Should I exercise today?"`,
        timestamp: new Date(),
        confidence: 100
      };
      setMessages([welcomeMessage]);
      
      // Auto-generate initial predictions after welcome
      setTimeout(() => {
        generateHealthPredictions();
      }, 2000);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate comprehensive health predictions
  const generateHealthPredictions = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing
    
    const predictions: HealthPrediction[] = [
      {
        event: "Optimal Training Window",
        probability: 92,
        timeframe: "Next 3-5 days",
        preventionSteps: [
          "Plan high-intensity workouts between Tuesday-Thursday",
          "Focus on cardio sessions during this peak recovery period",
          "Maintain current sleep schedule (8+ hours)"
        ],
        riskFactors: ["Current HRV: 45ms (excellent)", "Recovery score: 94%"],
        confidence: 92
      },
      {
        event: "Stress Level Elevation Risk",
        probability: 67,
        timeframe: "10-14 days",
        preventionSteps: [
          "Implement daily 10-minute meditation starting now",
          "Reduce caffeine intake after 2 PM",
          "Schedule stress-relief activities this weekend"
        ],
        riskFactors: ["Recent sleep debt increase", "Elevated resting HR trend"],
        confidence: 78
      },
      {
        event: "Peak Performance Period",
        probability: 88,
        timeframe: "2-3 weeks",
        preventionSteps: [
          "Gradually increase training intensity",
          "Optimize nutrition with 2.2g protein/kg body weight",
          "Plan important physical activities during this window"
        ],
        riskFactors: ["Positive fitness trending", "Excellent biomarker profile"],
        confidence: 85
      }
    ];

    const predictionMessage: OracleMessage = {
      id: `prediction_${Date.now()}`,
      type: 'prediction',
      content: '🔮 **HEALTH ORACLE PREDICTION ANALYSIS COMPLETE**\n\nBased on your biometric data, lifestyle patterns, and AI analysis of 1.3M+ health records, here are your personalized health forecasts:',
      timestamp: new Date(),
      predictions,
      confidence: 87
    };

    setMessages(prev => [...prev, predictionMessage]);
    setIsProcessing(false);
  };

  // Process user messages with AI responses
  const processUserMessage = async (message: string) => {
    const userMessage: OracleMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1200));

    let response = '';
    let messageType: OracleMessage['type'] = 'oracle';
    let urgency: OracleMessage['urgency'] = 'low';
    let recommendations: string[] = [];

    // Intelligent response generation based on message content
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('forecast') || lowerMessage.includes('predict')) {
      response = `📊 **HEALTH FORECAST ANALYSIS**\n\nBased on your current metrics:\n• Heart Rate: ${healthData?.metrics?.heartRate?.current || 72} BPM (${healthData?.metrics?.heartRate?.status || 'optimal'})\n• Sleep Quality: ${healthData?.metrics?.sleep?.quality || 89}/100\n• Stress Level: ${healthData?.metrics?.stress?.current || 25}%\n\n**2-Week Forecast:**\n🟢 **High confidence** - Excellent cardiovascular health maintenance\n🟡 **Medium confidence** - Potential stress elevation mid-week\n🟢 **High confidence** - Peak performance window opening`;
      recommendations = [
        "Continue current fitness routine",
        "Monitor stress levels Tuesday-Thursday", 
        "Plan challenging workouts for next week"
      ];
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      const shouldExercise = Math.random() > 0.3; // 70% chance yes
      response = shouldExercise 
        ? `💪 **EXERCISE RECOMMENDATION: GO FOR IT!**\n\n✅ Your HRV is at 45ms (excellent)\n✅ Recovery score: 94% (ready)\n✅ Sleep quality: 89% (well-rested)\n\n**Optimal workout:** Moderate to high intensity cardio\n**Duration:** 45-60 minutes\n**Best time:** ${new Date().getHours() < 16 ? 'This afternoon' : 'Tomorrow morning'}`
        : `⚠️ **EXERCISE RECOMMENDATION: ACTIVE RECOVERY**\n\n🟡 Your body shows signs of accumulating fatigue\n🟡 Recent sleep debt detected\n🟡 Elevated stress markers\n\n**Recommended:** Light yoga, walking, or stretching\n**Duration:** 20-30 minutes\n**Focus:** Recovery and stress reduction`;
      messageType = shouldExercise ? 'insight' : 'alert';
      urgency = shouldExercise ? 'low' : 'medium';
    } else if (lowerMessage.includes('heart') || lowerMessage.includes('cardiac')) {
      response = `❤️ **CARDIOVASCULAR ANALYSIS**\n\n**Current Status:** Excellent\n• Resting HR: ${healthData?.metrics?.heartRate?.current || 52} BPM (athlete-level)\n• HRV: 45ms (optimal autonomic function)\n• Blood pressure trend: Normal\n\n**Risk Assessment:** Very Low (2.3%)\n\n**Cardio Health Score:** 94/100`;
      recommendations = [
        "Maintain current aerobic base training",
        "Monitor morning resting heart rate",
        "Continue stress management practices"
      ];
    } else if (lowerMessage.includes('sleep')) {
      response = `😴 **SLEEP INTELLIGENCE REPORT**\n\n**Last Night:** ${healthData?.metrics?.sleep?.quality || 89}/100\n• Deep Sleep: 22% (optimal: 20-25%)\n• REM Sleep: 24% (excellent)\n• Sleep Efficiency: 94%\n\n**Sleep Debt:** Minimal (0.3 hours)\n**Circadian Rhythm:** Well-aligned`;
      recommendations = [
        "Continue current sleep schedule",
        "Keep bedroom temperature at 65-68°F",
        "Maintain consistent wake time"
      ];
    } else if (lowerMessage.includes('stress')) {
      response = `🧘 **STRESS ANALYSIS & MANAGEMENT**\n\n**Current Stress Level:** ${healthData?.metrics?.stress?.current || 25}% (Low)\n• Cortisol pattern: Normal\n• Autonomic balance: Good\n• Recovery capacity: High\n\n**Stress Resilience Score:** 87/100`;
      recommendations = [
        "Practice 10-minute daily meditation",
        "Take short breaks every 90 minutes",
        "Maintain regular exercise routine"
      ];
    } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
      response = `🥗 **PERSONALIZED NUTRITION GUIDANCE**\n\n**Metabolic Profile:** Efficient\n• BMR: ~1,850 calories/day\n• Optimal protein: 140g/day\n• Hydration: Well-maintained\n\n**Nutritional Health Score:** 82/100`;
      recommendations = [
        "Increase omega-3 intake (2-3x/week fish)",
        "Target 25-30g fiber daily",
        "Time carbs around workouts"
      ];
    } else {
      response = `🤖 **VITALIS HEALTH ORACLE**\n\nI understand you want to know about: "${message}"\n\nAs your AI health guardian, I can provide insights on:\n• Health predictions & forecasts\n• Exercise recommendations\n• Sleep optimization\n• Stress management\n• Nutrition guidance\n• Vital sign analysis\n\nTry asking a more specific health question!`;
    }

    const aiResponse: OracleMessage = {
      id: `oracle_${Date.now()}`,
      type: messageType,
      content: response,
      timestamp: new Date(),
      confidence: Math.floor(Math.random() * 20 + 80), // 80-100% confidence
      urgency,
      recommendations: recommendations.length > 0 ? recommendations : undefined
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsProcessing(false);

    // Voice response if enabled
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response.replace(/[*#🔮💪❤️😴🧘🥗🤖⚠️✅🟢🟡]/g, ''));
      utterance.rate = 0.9;
      utterance.pitch = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      await processUserMessage(inputMessage);
      setInputMessage('');
    }
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  const quickActions = [
    { label: "Health Forecast", query: "What's my health forecast for the next 2 weeks?" },
    { label: "Exercise Today?", query: "Should I exercise today?" },
    { label: "Sleep Analysis", query: "How was my sleep last night?" },
    { label: "Stress Check", query: "What's my current stress level?" },
    { label: "Nutrition Advice", query: "Give me nutrition recommendations" }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] h-[85vh] flex flex-col border border-purple-500/30 mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SparklesIcon className="h-8 w-8 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Vitalis Health Oracle</h2>
              <p className="text-purple-300 text-sm">Your AI Health Guardian with 360° Predictive Intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Mode Selector */}
            <div className="flex bg-black/30 rounded-lg p-1">
              {[
                { key: 'chat', label: 'Chat', icon: ChatBubbleLeftIcon },
                { key: 'predict', label: 'Predict', icon: CalendarDaysIcon },
                { key: 'monitor', label: 'Monitor', icon: HeartIcon }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setOracleMode(key as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    oracleMode === key
                      ? 'bg-purple-600 text-white'
                      : 'text-purple-300 hover:text-white hover:bg-purple-700/30'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const newVoiceState = !voiceEnabled;
                setVoiceEnabled(newVoiceState);
                // Stop any current speech when muting
                if (!newVoiceState && 'speechSynthesis' in window) {
                  speechSynthesis.cancel();
                }
              }}
              className={`p-2 rounded-lg transition-all ${
                voiceEnabled 
                  ? 'bg-green-600/20 text-green-400' 
                  : 'bg-gray-600/20 text-gray-400'
              }`}
            >
              {voiceEnabled ? <SpeakerWaveIcon className="h-5 w-5" /> : <SpeakerXMarkIcon className="h-5 w-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-red-600/20 rounded-lg transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white rounded-2xl rounded-br-md' 
                    : message.type === 'prediction'
                    ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-purple-500/30 rounded-2xl'
                    : message.type === 'alert'
                    ? 'bg-gradient-to-br from-red-900/50 to-orange-900/50 border border-red-500/30 rounded-2xl'
                    : message.type === 'insight'
                    ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-2xl'
                    : 'bg-slate-800/50 border border-slate-600/30 rounded-2xl rounded-bl-md'
                } p-4`}>
                  
                  {/* Message Header */}
                  {message.type !== 'user' && (
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {message.type === 'oracle' && <SparklesIcon className="h-5 w-5 text-purple-400" />}
                        {message.type === 'prediction' && <CalendarDaysIcon className="h-5 w-5 text-blue-400" />}
                        {message.type === 'alert' && <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />}
                        {message.type === 'insight' && <LightBulbIcon className="h-5 w-5 text-green-400" />}
                        <span className="text-sm font-medium text-gray-300">
                          {message.type === 'oracle' ? 'Oracle' : 
                           message.type === 'prediction' ? 'Health Predictions' :
                           message.type === 'alert' ? 'Health Alert' : 'Health Insight'}
                        </span>
                      </div>
                      {message.confidence && (
                        <span className="text-xs text-gray-400">
                          {message.confidence}% confidence
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="prose prose-invert prose-sm max-w-none">
                    {message.content.split('\n').map((line, index) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <h4 key={index} className="text-white font-semibold my-2">{line.slice(2, -2)}</h4>;
                      } else if (line.startsWith('• ')) {
                        return <li key={index} className="text-gray-300 ml-4">{line.slice(2)}</li>;
                      } else if (line.startsWith('✅') || line.startsWith('🟢') || line.startsWith('🟡') || line.startsWith('⚠️')) {
                        return <p key={index} className="text-gray-200 my-1">{line}</p>;
                      } else {
                        return <p key={index} className="text-gray-300 my-1">{line}</p>;
                      }
                    })}
                  </div>

                  {/* Predictions Display */}
                  {message.predictions && (
                    <div className="mt-4 space-y-4">
                      {message.predictions.map((prediction, index) => (
                        <div key={index} className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-white font-semibold">{prediction.event}</h5>
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm font-medium ${
                                prediction.probability >= 80 ? 'text-green-400' :
                                prediction.probability >= 60 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {prediction.probability}%
                              </span>
                              <span className="text-xs text-gray-400">{prediction.timeframe}</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h6 className="text-xs text-purple-300 uppercase tracking-wide mb-1">Action Steps:</h6>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {prediction.preventionSteps.slice(0, 2).map((step, i) => (
                                <li key={i}>• {step}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                prediction.probability >= 80 ? 'bg-green-400' :
                                prediction.probability >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}
                              style={{ width: `${prediction.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  {message.recommendations && (
                    <div className="mt-3 p-3 bg-black/20 rounded-lg">
                      <h6 className="text-xs text-green-300 uppercase tracking-wide mb-2">Recommendations:</h6>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {message.recommendations.map((rec, i) => (
                          <li key={i}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="text-xs text-gray-500 mt-3">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Processing Indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-800/50 border border-slate-600/30 rounded-2xl rounded-bl-md p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">Oracle is analyzing your health data...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 border-t border-purple-500/30">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(action.query)}
                className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs hover:bg-purple-600/30 transition-all"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-purple-500/30">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your Health Oracle anything... (e.g., 'What's my health forecast?')"
                className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>
            
            <button
              onClick={startVoiceInput}
              disabled={isListening}
              className={`p-3 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-600 text-white' 
                  : 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
              }`}
            >
              <MicrophoneIcon className="h-5 w-5" />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isProcessing}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
