// Health Dashboard API Route
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Generate mock health data for demonstration
    const mockData = generateMockHealthData();

    // Format data for dashboard
    const dashboardData = {
      healthScore: 84,
      insights: mockData.insights,
      alerts: mockData.alerts,
      trends: mockData.trends,
      heartRateData: mockData.heartRateData,
      sleepData: mockData.sleepData,
      activityData: mockData.activityData,
      advancedFeatures: mockData.advancedFeatures,
      lastUpdate: new Date()
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard data' },
      { status: 500 }
    );
  }
}

// Generate mock health data for demonstration
function generateMockHealthData() {
  const heartRateData = [
    { time: '00:00', bpm: 65, zone: 'rest' },
    { time: '02:00', bpm: 62, zone: 'rest' },
    { time: '04:00', bpm: 60, zone: 'rest' },
    { time: '06:00', bpm: 68, zone: 'rest' },
    { time: '08:00', bpm: 75, zone: 'fat_burn' },
    { time: '10:00', bpm: 82, zone: 'fat_burn' },
    { time: '12:00', bpm: 88, zone: 'cardio' },
    { time: '14:00', bpm: 92, zone: 'cardio' },
    { time: '16:00', bpm: 85, zone: 'fat_burn' },
    { time: '18:00', bpm: 78, zone: 'fat_burn' },
    { time: '20:00', bpm: 72, zone: 'rest' },
    { time: '22:00', bpm: 70, zone: 'rest' }
  ];
  
  const sleepData = [
    { date: 'Mon', deep: 1.2, rem: 1.8, light: 4.5, total: 7.5, score: 85 },
    { date: 'Tue', deep: 1.5, rem: 2.1, light: 4.2, total: 7.8, score: 88 },
    { date: 'Wed', deep: 1.1, rem: 1.6, light: 4.8, total: 7.5, score: 82 },
    { date: 'Thu', deep: 1.3, rem: 1.9, light: 4.6, total: 7.8, score: 86 },
    { date: 'Fri', deep: 0.9, rem: 1.4, light: 5.2, total: 7.5, score: 78 },
    { date: 'Sat', deep: 1.6, rem: 2.2, light: 4.4, total: 8.2, score: 92 },
    { date: 'Sun', deep: 1.4, rem: 2.0, light: 4.3, total: 7.7, score: 89 }
  ];
  
  const activityData = [
    { date: 'Mon', steps: 8234, calories: 2150, distance: 5.8, duration: 85 },
    { date: 'Tue', steps: 12456, calories: 2380, distance: 8.7, duration: 120 },
    { date: 'Wed', steps: 6789, calories: 1980, distance: 4.7, duration: 65 },
    { date: 'Thu', steps: 10234, calories: 2290, distance: 7.2, duration: 95 },
    { date: 'Fri', steps: 9876, calories: 2210, distance: 6.9, duration: 90 },
    { date: 'Sat', steps: 15432, calories: 2650, distance: 10.8, duration: 150 },
    { date: 'Sun', steps: 7654, calories: 2050, distance: 5.4, duration: 75 }
  ];
  
  const insights = [
    {
      id: 'insight_1',
      type: 'recommendation',
      priority: 'medium',
      title: 'Sleep Quality Optimization',
      description: 'Your sleep efficiency has improved by 12% this week. Deep sleep phases are well within optimal ranges (20-25% of total sleep).',
      recommendations: [
        'Maintain current bedtime routine (22:30 average)',
        'Consider reducing caffeine after 14:00 to improve REM sleep',
        'Target 7.5-8.5 hours total sleep for optimal recovery'
      ],
      confidence: 0.87,
      evidence: [],
      createdAt: new Date()
    },
    {
      id: 'insight_2',
      type: 'alert',
      priority: 'high',
      title: 'Cardiovascular Pattern Analysis',
      description: 'Heart rate variability shows excellent recovery patterns. Resting HR decreased by 3 bpm, indicating improved cardiovascular fitness.',
      recommendations: [
        'Continue current exercise intensity (Zone 2: 65-75% max HR)',
        'Add 2 high-intensity intervals per week',
        'Monitor morning HRV for overtraining prevention'
      ],
      confidence: 0.92,
      evidence: [],
      createdAt: new Date()
    }
  ];
  
  const alerts = [
    {
      id: 'alert_1',
      type: 'routine_reminder',
      severity: 'info',
      message: 'Hydration reminder: Aim for 8-10 glasses of water today based on your activity level.',
      actionRequired: false,
      autoResolve: true,
      createdAt: new Date()
    },
    {
      id: 'alert_2',
      type: 'goal_milestone',
      severity: 'info',
      message: 'Achievement unlocked: 7-day streak of 7+ hours sleep! Keep up the excellent sleep hygiene.',
      actionRequired: false,
      autoResolve: true,
      createdAt: new Date()
    }
  ];
  
  const trends = [
    {
      metric: 'Sleep Quality',
      direction: 'improving',
      rate: 8.5,
      significance: 'medium',
      timeframe: '7-day comparison'
    },
    {
      metric: 'Heart Rate Variability',
      direction: 'improving',
      rate: 12.3,
      significance: 'high',
      timeframe: '14-day comparison'
    },
    {
      metric: 'Daily Steps',
      direction: 'stable',
      rate: 2.1,
      significance: 'low',
      timeframe: '7-day comparison'
    },
    {
      metric: 'Recovery Score',
      direction: 'improving',
      rate: 15.7,
      significance: 'high',
      timeframe: '30-day comparison'
    }
  ];

  const advancedFeatures = {
    biomarkerAnalysis: {
      vo2Max: 58.5,
      lactateThreshold: 82,
      metabolicEfficiency: 91,
      cardiovascularFitness: 94,
      muscleOxygenation: 87,
      cortisolLevels: 12.3
    },
    riskAssessment: {
      cardiovascularRisk: 15,
      injuryRisk: 22,
      burnoutRisk: 18,
      immuneSystemStrength: 89,
      overtrainingRisk: 25
    },
    performanceOptimization: {
      explosivePower: 92,
      enduranceCapacity: 88,
      recoveryRate: 94,
      sleepEfficiency: 87,
      stressResilience: 91
    },
    predictiveInsights: [
      {
        metric: 'Sleep Quality',
        prediction: 'Your sleep quality is predicted to improve by 15% over the next 2 weeks if you maintain current bedtime routine and reduce screen time after 9 PM.',
        confidence: 0.91,
        timeframe: '2 weeks',
        actionable: true
      },
      {
        metric: 'VO₂ Max',
        prediction: 'Based on current training patterns, your VO₂ max could increase by 3-5% within 6 weeks with targeted interval training.',
        confidence: 0.87,
        timeframe: '6 weeks',
        actionable: true
      },
      {
        metric: 'Injury Risk',
        prediction: 'Low probability of overuse injury in the next month. Continue current recovery protocols.',
        confidence: 0.93,
        timeframe: '1 month',
        actionable: false
      }
    ]
  };

  return { heartRateData, sleepData, activityData, insights, alerts, trends, advancedFeatures };
}
