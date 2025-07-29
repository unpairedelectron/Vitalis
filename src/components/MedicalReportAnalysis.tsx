// Medical Report Analysis Dashboard - Revolutionary AI Health Insights
'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  DocumentArrowUpIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  BeakerIcon,
  ChartBarIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { MedicalReport, MedicalAIAnalysis } from '@/types/medical-report';

interface MedicalReportAnalysisProps {
  onClose?: () => void;
}

export default function MedicalReportAnalysis({ onClose }: MedicalReportAnalysisProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'analysis'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<MedicalAIAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setUploadedFile(file);
    setCurrentStep('processing');
    setIsProcessing(true);
    setError(null);

    try {
      // Process the uploaded file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/medical/analyze-report', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to process medical report');
      }

      const result = await response.json();
      setAnalysis(result.analysis);
      setCurrentStep('analysis');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setCurrentStep('upload');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const getHealthScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHealthScoreGradient = (score: number) => {
    if (score >= 85) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    if (score >= 50) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-900/30 border-red-500/50 text-red-300';
      case 'high': return 'bg-orange-900/30 border-orange-500/50 text-orange-300';
      case 'medium': return 'bg-yellow-900/30 border-yellow-500/50 text-yellow-300';
      default: return 'bg-blue-900/30 border-blue-500/50 text-blue-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-500/50 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🔬</div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Medical Report Analysis</h2>
                <p className="text-blue-400">Revolutionary health insights powered by advanced AI</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500/50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <span className="text-red-300 font-medium">Analysis Error</span>
              </div>
              <p className="text-red-200 text-sm mt-1">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setCurrentStep('upload');
                }}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Upload Step */}
          {currentStep === 'upload' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Upload Your Medical Report</h3>
                <p className="text-gray-400">Get AI-powered insights and recommendations from your medical data</p>
              </div>

              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-blue-500/50 rounded-xl p-8 text-center hover:border-blue-400/70 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <DocumentArrowUpIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Drop your medical report here</h4>
                <p className="text-gray-400 mb-4">or click to select file</p>
                <p className="text-sm text-gray-500">Supports PDF, images (JPG, PNG), and text files</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Supported Report Types */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <BeakerIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-medium">Blood Tests</p>
                  <p className="text-gray-400 text-sm">CBC, Lipid, Metabolic</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <HeartIcon className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <p className="text-white font-medium">Cardiac</p>
                  <p className="text-gray-400 text-sm">ECG, Stress Tests</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <ChartBarIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-white font-medium">Imaging</p>
                  <p className="text-gray-400 text-sm">X-ray, MRI, CT</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <DocumentTextIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-white font-medium">General</p>
                  <p className="text-gray-400 text-sm">Check-ups, Specialist</p>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                  <span className="text-green-300 font-medium">Privacy & Security</span>
                </div>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Your medical data is encrypted and secure</li>
                  <li>• Reports are processed locally when possible</li>
                  <li>• No data is stored permanently without consent</li>
                  <li>• HIPAA compliant processing</li>
                </ul>
              </div>
            </div>
          )}

          {/* Processing Step */}
          {currentStep === 'processing' && (
            <div className="text-center space-y-8 py-12">
              <div className="relative">
                <div className="text-6xl animate-pulse">🔬</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Medical Report</h3>
                <p className="text-gray-400 mb-6">Our advanced AI is processing your data...</p>
                
                <div className="space-y-3 max-w-md mx-auto text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    <span className="text-green-300">Report uploaded successfully</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-yellow-400 animate-spin" />
                    <span className="text-yellow-300">Extracting medical data...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Running AI analysis...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Generating recommendations...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {currentStep === 'analysis' && analysis && (
            <div className="space-y-8">
              
              {/* Overall Health Score */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Overall Health Assessment</h3>
                  <div className={`text-4xl font-bold ${getHealthScoreColor(analysis.overallAssessment.healthScore)}`}>
                    {analysis.overallAssessment.healthScore}/100
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Health Score</span>
                        <span className="text-white">{analysis.overallAssessment.healthScore}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getHealthScoreGradient(analysis.overallAssessment.healthScore)}`}
                          style={{ width: `${analysis.overallAssessment.healthScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      analysis.overallAssessment.status === 'excellent' ? 'bg-green-900/30 text-green-300' :
                      analysis.overallAssessment.status === 'good' ? 'bg-blue-900/30 text-blue-300' :
                      analysis.overallAssessment.status === 'fair' ? 'bg-yellow-900/30 text-yellow-300' :
                      analysis.overallAssessment.status === 'concerning' ? 'bg-orange-900/30 text-orange-300' :
                      'bg-red-900/30 text-red-300'
                    }`}>
                      {analysis.overallAssessment.status.charAt(0).toUpperCase() + analysis.overallAssessment.status.slice(1)}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-300 mb-4">{analysis.overallAssessment.summary}</p>
                    <ul className="space-y-2">
                      {analysis.overallAssessment.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Red Flags - Show first if any exist */}
              {analysis.redFlags && analysis.redFlags.length > 0 && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                    <h3 className="text-xl font-bold text-red-300">Critical Attention Required</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {analysis.redFlags.map((flag, index) => (
                      <div key={index} className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                            flag.severity === 'critical' ? 'bg-red-500' :
                            flag.severity === 'urgent' ? 'bg-orange-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="text-red-300 font-semibold mb-1">{flag.finding}</h4>
                            <p className="text-red-200 text-sm mb-2">{flag.action}</p>
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4 text-red-400" />
                              <span className="text-red-300 text-sm font-medium">{flag.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Findings */}
              {analysis.keyFindings && analysis.keyFindings.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <MagnifyingGlassIcon className="h-6 w-6 text-blue-400" />
                    <span>Key Findings</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.keyFindings.map((finding, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                            finding.significance === 'critical' ? 'bg-red-500' :
                            finding.significance === 'high' ? 'bg-orange-500' :
                            finding.significance === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold">{finding.category}</h4>
                              {finding.actionRequired && (
                                <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded">Action Needed</span>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{finding.finding}</p>
                            <p className="text-gray-400 text-xs">{finding.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Recommendations */}
              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <LightBulbIcon className="h-6 w-6 text-yellow-400" />
                    <span>AI Recommendations</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className={`rounded-lg p-4 border ${getPriorityColor(rec.priority)}`}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{rec.category.charAt(0).toUpperCase() + rec.category.slice(1)}</h4>
                              <span className={`text-xs px-2 py-1 rounded ${
                                rec.priority === 'urgent' ? 'bg-red-500/20 text-red-300' :
                                rec.priority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                                rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-blue-500/20 text-blue-300'
                              }`}>
                                {rec.priority}
                              </span>
                            </div>
                            <p className="mb-2">{rec.recommendation}</p>
                            <p className="text-xs opacity-75 mb-2">{rec.rationale}</p>
                            <div className="flex items-center space-x-2">
                              <ClockIcon className="h-4 w-4" />
                              <span className="text-xs font-medium">{rec.timeline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setCurrentStep('upload');
                    setAnalysis(null);
                    setUploadedFile(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Analyze Another Report
                </button>
                
                <button
                  onClick={() => {
                    // Download analysis as PDF
                    console.log('Downloading analysis report...');
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Download Analysis
                </button>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-300 font-semibold mb-2">Important Medical Disclaimer</h4>
                <ul className="text-yellow-200 text-sm space-y-1">
                  {analysis.disclaimers.map((disclaimer, index) => (
                    <li key={index}>• {disclaimer}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
