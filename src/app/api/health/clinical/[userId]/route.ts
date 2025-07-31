// Clinical Health Data API Endpoint
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Generate or fetch clinical data for the user
    const clinicalData = generateClinicalHealthData(userId);
    
    return NextResponse.json({
      success: true,
      data: clinicalData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Clinical data fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clinical data' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Process clinical data update
    console.log('Updating clinical data for user:', userId, body);
    
    return NextResponse.json({
      success: true,
      message: 'Clinical data updated successfully'
    });
    
  } catch (error) {
    console.error('Clinical data update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update clinical data' },
      { status: 500 }
    );
  }
}

// Types and interfaces
import {
  WHOGuidelineCompliance,
  VO2MaxData,
  TrainingZones,
  PowerOutputAnalysis,
  BloodTestResults,
  ECGAnalysis,
  BiomarkerCorrelationMap,
  RealTimeVitalSigns,
  CardiovascularRisk,
  HRVAnalysis,
  BloodOxygenTrends,
  StressIndex,
  RecoveryScore,
  PredictiveIllnessDetection,
  PerformanceOptimization,
  InjuryRiskAssessment,
  PersonalizedTrainingLoad,
  ClinicalAlert,
  PhysicianReport
} from '@/types/health';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
    // Simulate clinical data generation
    const clinicalData = generateClinicalHealthData(userId);
    
    return NextResponse.json({
      success: true,
      data: clinicalData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Clinical data API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch clinical data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function generateClinicalHealthData(userId: string) {
  return {
    whoCompliance: generateWHOCompliance(),
    performance: generatePerformanceData(),
    bloodTests: generateBloodTestData(),
    biomarkers: generateBiomarkerData(),
    vitals: generateRealTimeVitals(),
    cardiovascular: generateCardiovascularRisk(),
    hrv: generateHRVData(),
    predictive: generatePredictiveAnalytics(),
    clinicalAlerts: generateClinicalAlerts(),
    physicianReports: generatePhysicianReports(userId)
  };
}

function generateWHOCompliance(): WHOGuidelineCompliance {
  return {
    physicalActivity: {
      weeklyMinutes: 180 + Math.random() * 120, // 180-300 minutes
      meetsModeratePAGuideline: Math.random() > 0.3,
      meetsVigorousPAGuideline: Math.random() > 0.4,
      muscleStrengtheningDays: Math.floor(Math.random() * 5) + 1,
      compliance: ['excellent', 'good', 'moderate', 'needs_improvement'][Math.floor(Math.random() * 4)] as any,
      recommendations: [
        'Maintain current activity level',
        'Consider adding flexibility training',
        'Increase strength training frequency',
        'Add variety to cardio routine'
      ]
    },
    cardiovascularHealth: {
      restingHeartRate: 55 + Math.random() * 20, // 55-75 bpm
      bloodPressureCategory: ['normal', 'elevated', 'stage1'][Math.floor(Math.random() * 3)] as any,
      framinghamRiskScore: Math.random() * 20, // 0-20%
      recommendations: [
        'Continue cardio routine',
        'Monitor BP monthly',
        'Consider cardiac consultation',
        'Optimize diet for heart health'
      ]
    },
    sleepGuidelines: {
      averageSleepHours: 6.5 + Math.random() * 2.5, // 6.5-9 hours
      meetsAdultGuideline: Math.random() > 0.4,
      sleepQualityScore: 70 + Math.random() * 30, // 70-100
      recommendations: [
        'Maintain consistent sleep schedule',
        'Optimize sleep environment',
        'Consider sleep study if issues persist'
      ]
    }
  };
}

function generatePerformanceData() {
  const vo2Max: VO2MaxData = {
    estimatedVO2Max: 40 + Math.random() * 25, // 40-65 ml/kg/min
    estimationMethod: ['sub_maximal_test', 'heart_rate_reserve', 'cooper_test', 'ml_prediction'][Math.floor(Math.random() * 4)] as any,
    accuracyMetrics: {
      standardError: 1.5 + Math.random() * 2, // 1.5-3.5
      confidenceInterval: [45, 58] as [number, number],
      reliability: 0.85 + Math.random() * 0.14 // 0.85-0.99
    },
    agePercentile: 60 + Math.random() * 35, // 60-95
    genderPercentile: 55 + Math.random() * 40, // 55-95
    athleteComparison: ['recreational', 'trained', 'well_trained', 'national'][Math.floor(Math.random() * 4)] as any,
    lastUpdated: new Date()
  };

  const trainingZones: TrainingZones = {
    zone1_recovery: { minHR: 115, maxHR: 135, description: 'Active Recovery & Base Building' },
    zone2_aerobic: { minHR: 135, maxHR: 150, description: 'Aerobic Base & Fat Burning' },
    zone3_tempo: { minHR: 150, maxHR: 160, description: 'Tempo & Threshold' },
    zone4_lactate: { minHR: 160, maxHR: 170, description: 'Lactate Threshold' },
    zone5_neuromuscular: { minHR: 170, maxHR: 185, description: 'Neuromuscular Power' },
    basedOn: 'vo2Max',
    updatedAt: new Date()
  };

  const powerOutput: PowerOutputAnalysis = {
    functionalThresholdPower: 250 + Math.random() * 100, // 250-350W
    peakPowerOutput: 1000 + Math.random() * 400, // 1000-1400W
    sustainedPowerOutput: 200 + Math.random() * 80, // 200-280W
    powerToWeightRatio: 3.5 + Math.random() * 1.5, // 3.5-5.0 W/kg
    lactateThreshold: {
      power: 240 + Math.random() * 80,
      heartRate: 160 + Math.random() * 15,
      percentageOfMax: 85 + Math.random() * 10
    },
    sport: ['cycling', 'running'][Math.floor(Math.random() * 2)] as any,
    testDate: new Date()
  };

  return {
    vo2Max,
    trainingZones,
    powerOutput,
    lactateThreshold: {
      estimatedLT: 165 + Math.random() * 15,
      percentageHRMax: 85 + Math.random() * 10,
      confidence: 0.8 + Math.random() * 0.15
    },
    periodization: {
      currentPhase: ['base', 'build', 'peak', 'recovery'][Math.floor(Math.random() * 4)],
      recommendedTrainingLoad: 60 + Math.random() * 30,
      peakingStrategy: 'Progressive overload with structured recovery'
    }
  };
}

function generateBloodTestData() {
  const mockBloodMarkers = [
    { name: 'Total Cholesterol', value: 180, unit: 'mg/dL', referenceRange: { min: 100, max: 200 }, status: 'normal' },
    { name: 'HDL Cholesterol', value: 55, unit: 'mg/dL', referenceRange: { min: 40, max: 100 }, status: 'normal' },
    { name: 'LDL Cholesterol', value: 110, unit: 'mg/dL', referenceRange: { min: 0, max: 130 }, status: 'normal' },
    { name: 'Triglycerides', value: 120, unit: 'mg/dL', referenceRange: { min: 50, max: 150 }, status: 'normal' },
    { name: 'Glucose (Fasting)', value: 88, unit: 'mg/dL', referenceRange: { min: 70, max: 99 }, status: 'normal' },
    { name: 'HbA1c', value: 5.2, unit: '%', referenceRange: { min: 4.0, max: 5.6 }, status: 'normal' },
    { name: 'Vitamin D', value: 32, unit: 'ng/mL', referenceRange: { min: 30, max: 100 }, status: 'normal' },
    { name: 'B12', value: 450, unit: 'pg/mL', referenceRange: { min: 200, max: 900 }, status: 'normal' },
    { name: 'Iron', value: 85, unit: 'μg/dL', referenceRange: { min: 60, max: 170 }, status: 'normal' },
    { name: 'Ferritin', value: 125, unit: 'ng/mL', referenceRange: { min: 15, max: 200 }, status: 'normal' }
  ];

  return {
    latestResults: {
      testId: 'BT-' + Date.now(),
      testDate: new Date(),
      labName: 'Vitalis Clinical Labs',
      results: mockBloodMarkers.map(marker => ({
        ...marker,
        clinicalSignificance: 'Within normal limits',
        trend: ['improving', 'stable', 'worsening'][Math.floor(Math.random() * 3)]
      })),
      aiInterpretation: {
        overallAssessment: 'Blood chemistry panel shows excellent metabolic health with all major markers within optimal ranges.',
        keyFindings: [
          'Lipid profile indicates low cardiovascular risk',
          'Glucose metabolism is optimal',
          'Micronutrient levels are adequate'
        ],
        riskMarkers: [],
        recommendations: [
          'Continue current lifestyle habits',
          'Maintain regular monitoring schedule'
        ],
        correlations: [],
        confidence: 0.92
      },
      physicianReview: false,
      flaggedValues: []
    },
    ecgAnalysis: generateECGData(),
    sleepStudy: generateSleepStudyData(),
    medicationInteractions: []
  };
}

function generateECGData(): ECGAnalysis {
  return {
    recordingId: 'ECG-' + Date.now(),
    timestamp: new Date(),
    duration: 30,
    heartRate: 65 + Math.random() * 20,
    rhythm: ['sinus', 'sinus', 'sinus', 'afib'][Math.floor(Math.random() * 4)] as any,
    arrhythmiaDetected: Math.random() < 0.1,
    arrhythmiaTypes: [],
    qrsDuration: 90 + Math.random() * 20,
    qtInterval: 380 + Math.random() * 40,
    stChanges: false,
    clinicalInterpretation: 'Normal sinus rhythm with no significant abnormalities detected.',
    urgencyLevel: 'routine',
    fdaAlgorithm: {
      algorithmName: 'Vitalis-ECG-AI',
      fdaClearanceNumber: 'K200001',
      validationStudy: 'Multi-center validation study',
      accuracyMetrics: {
        sensitivity: 0.95,
        specificity: 0.92,
        ppv: 0.88,
        npv: 0.97
      },
      clinicalValidation: true
    }
  };
}

function generateSleepStudyData() {
  return {
    studyId: 'SS-' + Date.now(),
    studyDate: new Date(),
    studyType: 'wearable' as const,
    sleepEfficiency: 80 + Math.random() * 15,
    apneaHypopneaIndex: Math.random() * 10,
    oxygenDesaturationIndex: Math.random() * 5,
    sleepStages: {
      n1: 15 + Math.random() * 10,
      n2: 180 + Math.random() * 60,
      n3: 90 + Math.random() * 30,
      rem: 100 + Math.random() * 40,
      wake: 20 + Math.random() * 15
    },
    sleepDisorders: [],
    recommendations: [
      'Maintain consistent sleep schedule',
      'Optimize bedroom environment',
      'Consider sleep hygiene improvements'
    ]
  };
}

function generateBiomarkerData(): BiomarkerCorrelationMap {
  return {
    correlations: [
      {
        biomarkerX: 'Heart Rate Variability',
        biomarkerY: 'Sleep Quality',
        correlationCoefficient: 0.72,
        pValue: 0.001,
        sampleSize: 1000,
        clinicalMeaning: 'Strong positive correlation between HRV and sleep quality indicates good autonomic balance'
      },
      {
        biomarkerX: 'VO2 Max',
        biomarkerY: 'Resting Heart Rate',
        correlationCoefficient: -0.65,
        pValue: 0.003,
        sampleSize: 800,
        clinicalMeaning: 'Inverse relationship shows cardiovascular fitness efficiency'
      }
    ],
    visualizationData: {
      xAxis: { label: 'HRV (RMSSD)', values: [20, 30, 40, 50, 60, 70] },
      yAxis: { label: 'Sleep Score', values: [60, 70, 75, 80, 85, 90] },
      zAxis: { label: 'Stress Level', values: [1, 2, 3, 4, 5, 6] },
      dataPoints: Array.from({ length: 50 }, (_, i) => ({
        x: 20 + Math.random() * 50,
        y: 60 + Math.random() * 30,
        z: 1 + Math.random() * 5,
        timestamp: new Date(),
        label: `Point ${i + 1}`
      }))
    },
    statisticalSignificance: {
      rSquared: 0.68,
      pValue: 0.001,
      confidenceInterval: [0.55, 0.78] as [number, number],
      standardError: 0.05,
      degreesOfFreedom: 48,
      significanceLevel: 0.05
    },
    timeSeriesAnalysis: [
      {
        timelag: 24,
        correlation: 0.45,
        significance: true,
        leadingIndicator: 'Sleep Quality',
        laggingIndicator: 'Next Day HRV'
      }
    ]
  };
}

function generateRealTimeVitals(): RealTimeVitalSigns {
  return {
    timestamp: new Date(),
    heartRate: 70 + Math.random() * 20,
    bloodPressure: { 
      systolic: 110 + Math.random() * 20, 
      diastolic: 70 + Math.random() * 15 
    },
    oxygenSaturation: 96 + Math.random() * 3,
    respiratoryRate: 14 + Math.random() * 6,
    temperature: 98.2 + Math.random() * 1.5,
    alertStatus: ['normal', 'caution', 'warning'][Math.floor(Math.random() * 3)] as any,
    trends: [
      {
        parameter: 'Heart Rate',
        direction: 'stable',
        rate: 0.5 + Math.random() * 2,
        alertThreshold: false
      }
    ]
  };
}

function generateCardiovascularRisk(): CardiovascularRisk {
  return {
    framinghamScore: 8 + Math.random() * 12,
    reynoldsScore: 5 + Math.random() * 10,
    aiEnhancedScore: 6 + Math.random() * 8,
    riskCategory: ['low', 'intermediate', 'high'][Math.floor(Math.random() * 3)] as any,
    tenYearRisk: 5 + Math.random() * 15,
    lifetimeRisk: 20 + Math.random() * 30,
    contributingFactors: [
      {
        factor: 'Age',
        value: 35,
        weight: 0.2,
        modifiable: false,
        timeframe: 'N/A'
      },
      {
        factor: 'LDL Cholesterol',
        value: 110,
        weight: 0.15,
        modifiable: true,
        timeframe: '3-6 months'
      }
    ],
    protectiveFactors: [
      {
        factor: 'Regular Exercise',
        protectionLevel: 0.3,
        evidence: 'Strong evidence from multiple RCTs'
      }
    ],
    recommendations: [
      {
        intervention: 'Continue current exercise routine',
        priority: 'medium',
        expectedBenefit: '15% risk reduction',
        timeframe: 'Ongoing',
        category: 'lifestyle'
      }
    ]
  };
}

function generateHRVData(): HRVAnalysis {
  return {
    timestamp: new Date(),
    rmssd: 35 + Math.random() * 25,
    pnn50: 15 + Math.random() * 20,
    sdnn: 45 + Math.random() * 30,
    triangularIndex: 8 + Math.random() * 7,
    stressIndex: 100 + Math.random() * 200,
    recoveryScore: 70 + Math.random() * 30,
    readinessScore: 75 + Math.random() * 25,
    interpretation: {
      autonomicTone: ['low', 'balanced', 'high'][Math.floor(Math.random() * 3)] as any,
      stressLevel: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)] as any,
      recoveryStatus: ['poor', 'fair', 'good', 'excellent'][Math.floor(Math.random() * 4)] as any,
      trainingReadiness: ['high', 'moderate', 'low'][Math.floor(Math.random() * 3)] as any,
      recommendations: [
        'Consider meditation or breathing exercises',
        'Ensure adequate sleep duration',
        'Monitor training load'
      ]
    },
    trends: [
      {
        parameter: 'RMSSD',
        direction: 'improving',
        duration: '2 weeks',
        significance: 'moderate'
      }
    ]
  };
}

function generatePredictiveAnalytics() {
  const illnessDetection: PredictiveIllnessDetection = {
    riskScore: Math.random() * 30, // 0-30% risk
    timeframe: ['24h', '48h', '72h'][Math.floor(Math.random() * 3)] as any,
    confidenceLevel: 0.75 + Math.random() * 0.2,
    riskFactors: [
      {
        factor: 'Elevated Resting HR',
        currentValue: 75,
        normalRange: [55, 70],
        trendDirection: 'increasing',
        contributionToRisk: 25
      }
    ],
    earlyWarningSignals: [
      {
        signal: 'Decreased HRV',
        detected: Math.random() < 0.3,
        severity: 'mild',
        timeDetected: new Date(),
        pattern: 'Gradual decline over 48 hours'
      }
    ],
    preventativeActions: [
      {
        action: 'Increase hydration',
        category: 'immediate',
        priority: 'medium',
        expectedBenefit: 'Reduce dehydration stress',
        implementationDifficulty: 'easy'
      }
    ],
    monitoringPlan: {
      frequency: 'hourly',
      parameters: ['Heart Rate', 'HRV', 'Temperature'],
      alertThresholds: [
        {
          parameter: 'Heart Rate',
          threshold: 80,
          direction: 'above',
          severity: 'warning'
        }
      ],
      escalationPlan: [
        {
          step: 1,
          trigger: 'Sustained elevated HR >85 bpm',
          action: 'Increase monitoring frequency',
          responsibleParty: 'system',
          timeframe: '1 hour'
        }
      ]
    }
  };

  const performanceOptimization: PerformanceOptimization = {
    currentPerformanceLevel: 75 + Math.random() * 20,
    optimizationOpportunities: [
      {
        area: 'Recovery',
        currentStatus: 'Good',
        potentialGain: 15,
        effort: 'medium',
        timeframe: '2-4 weeks',
        priority: 'high'
      }
    ],
    trainingRecommendations: [
      {
        type: 'endurance',
        recommendation: 'Increase Zone 2 training volume by 20%',
        frequency: '3-4 times per week',
        intensity: 'moderate',
        duration: '45-60 minutes',
        expectedBenefit: 'Improved aerobic capacity',
        progressMarkers: ['Lower HR at same pace', 'Improved recovery metrics']
      }
    ],
    recoveryOptimization: {
      sleepOptimization: ['Maintain 7-9 hours sleep', 'Cool room temperature'],
      nutritionTiming: ['Protein within 30min post-workout', 'Carbs for glycogen replenishment'],
      activeRecovery: ['Light yoga', '20-minute walk'],
      stressManagement: ['Meditation', 'Deep breathing exercises'],
      hydrationStrategy: ['2-3L daily', 'Electrolyte balance']
    },
    nutritionOptimization: {
      macronutrientBalance: {
        carbs: 50,
        protein: 25,
        fat: 25
      },
      mealTiming: ['Pre-workout fuel', 'Post-workout recovery'],
      hydrationNeeds: 2.5,
      supplementRecommendations: [
        {
          supplement: 'Vitamin D3',
          dosage: '2000 IU',
          timing: 'With breakfast',
          reason: 'Low baseline levels',
          evidence: 'strong',
          duration: '3 months'
        }
      ],
      deficiencyRisks: ['Iron', 'B12']
    },
    performancePredictions: [
      {
        metric: 'VO2 Max',
        currentValue: 52,
        predictedValue: 55,
        timeframe: '3 months',
        confidence: 0.8,
        factors: ['Consistent training', 'Improved recovery'],
        interventions: ['Zone 2 training', 'Sleep optimization']
      }
    ]
  };

  const injuryRisk: InjuryRiskAssessment = {
    overallRisk: 15 + Math.random() * 20,
    riskByBodyPart: [
      {
        bodyPart: 'Knee',
        riskScore: 20,
        commonInjuries: ['Patellofemoral pain', 'IT band syndrome'],
        riskFactors: ['Training load increase', 'Previous injury'],
        preventionFocus: ['Strengthening', 'Mobility work']
      }
    ],
    riskFactors: [
      {
        factor: 'Training Load Increase',
        value: 25,
        riskContribution: 40,
        modifiable: true,
        interventions: ['Gradual progression', 'Recovery monitoring']
      }
    ],
    preventionStrategies: [
      {
        strategy: 'Strength Training',
        targetRisk: 'Overuse injuries',
        implementation: '2-3x per week',
        frequency: 'Weekly',
        effectiveness: 75,
        evidence: 'strong'
      }
    ],
    monitoringParameters: ['Training load', 'Recovery metrics', 'Subjective wellness'],
    confidenceInterval: [10, 30] as [number, number]
  };

  return {
    illnessDetection,
    performanceOptimization,
    injuryRisk,
    personalizedTrainingLoad: {
      currentLoad: 65,
      optimalLoad: 70,
      loadTolerance: 85,
      adaptationRate: 0.8,
      fatigueLevel: 25,
      recommendedAdjustment: {
        direction: 'increase',
        magnitude: 8,
        rationale: 'Good recovery metrics support load increase',
        timeframe: '1 week'
      },
      periodizationPhase: 'Base building',
      nextAssessment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  };
}

function generateClinicalAlerts(): ClinicalAlert[] {
  const alerts: ClinicalAlert[] = [];
  
  // Add some random alerts
  if (Math.random() < 0.3) {
    alerts.push({
      id: 'alert-' + Date.now(),
      type: 'anomaly_detected',
      severity: 'warning',
      message: 'Elevated resting heart rate detected (78 bpm vs typical 58 bpm)',
      actionRequired: true,
      autoResolve: false,
      createdAt: new Date(),
      clinicalSeverity: 'routine',
      protocolRequired: false,
      physicianNotification: false,
      triageLevel: 'self_care',
      evidenceLevel: 'B',
      followUpRequired: true,
      followUpTimeframe: '3 days'
    });
  }

  return alerts;
}

function generatePhysicianReports(userId: string): PhysicianReport[] {
  return [
    {
      reportId: 'PR-' + Date.now(),
      patientId: userId,
      generatedAt: new Date(),
      reportType: 'comprehensive',
      clinicalSummary: {
        chiefConcerns: ['General wellness optimization', 'Performance monitoring'],
        keyFindings: [
          {
            finding: 'Excellent cardiovascular fitness',
            severity: 'normal',
            confidence: 0.95,
            supportingData: [],
            clinicalSignificance: 'Low cardiovascular risk profile',
            trend: 'stable'
          }
        ],
        recommendations: [
          {
            category: 'lifestyle',
            priority: 'medium',
            recommendation: 'Continue current exercise routine',
            rationale: 'Maintaining excellent fitness levels',
            timeframe: 'Ongoing',
            followUp: false
          }
        ],
        riskAssessment: {
          cardiovascularRisk: {
            framinghamScore: 8,
            aiEnhancedScore: 6,
            riskCategory: 'low',
            tenYearRisk: 8,
            lifetimeRisk: 25,
            contributingFactors: [],
            protectiveFactors: [],
            recommendations: []
          },
          metabolicRisk: {
            metabolicSyndromeRisk: 5,
            diabetesRisk: 3,
            insulinResistance: 1.2,
            metabolicAge: 28,
            riskFactors: [],
            recommendations: []
          },
          mentalHealthRisk: {
            stressLevel: 25,
            burnoutRisk: 15,
            depressionRisk: 10,
            anxietyLevel: 20,
            sleepImpact: 15,
            socialSupport: 85,
            recommendations: []
          },
          overallRiskScore: 15
        }
      },
      dataQuality: {
        completeness: 92,
        reliability: 89,
        timespan: '3 months',
        sources: ['samsung_health', 'apple_health', 'vitalis_ai']
      },
      attachments: {
        charts: ['hrv_trend.png', 'sleep_analysis.png'],
        rawData: ['raw_hrv_data.csv', 'activity_log.csv'],
        comparativeAnalysis: ['population_comparison.pdf']
      }
    }
  ];
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await request.json();
    
    // Handle clinical data updates, report generation, etc.
    console.log('Clinical data update for user:', userId, body);
    
    return NextResponse.json({
      success: true,
      message: 'Clinical data updated successfully'
    });
    
  } catch (error) {
    console.error('Clinical data update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update clinical data' },
      { status: 500 }
    );
  }
}
