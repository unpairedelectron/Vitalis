// Demo Health Data for Vitalis Testing
export const demoHealthData = {
  heartRateData: [
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
  ],
  
  sleepData: [
    { date: 'Mon', deep: 1.2, rem: 1.8, light: 4.5, total: 7.5, score: 85 },
    { date: 'Tue', deep: 1.5, rem: 2.1, light: 4.2, total: 7.8, score: 88 },
    { date: 'Wed', deep: 1.1, rem: 1.6, light: 4.8, total: 7.5, score: 82 },
    { date: 'Thu', deep: 1.3, rem: 1.9, light: 4.6, total: 7.8, score: 86 },
    { date: 'Fri', deep: 0.9, rem: 1.4, light: 5.2, total: 7.5, score: 78 },
    { date: 'Sat', deep: 1.6, rem: 2.2, light: 4.4, total: 8.2, score: 92 },
    { date: 'Sun', deep: 1.4, rem: 2.0, light: 4.3, total: 7.7, score: 89 }
  ],
  
  activityData: [
    { date: 'Mon', steps: 8234, calories: 2150, distance: 5.8, duration: 85 },
    { date: 'Tue', steps: 12456, calories: 2380, distance: 8.7, duration: 120 },
    { date: 'Wed', steps: 6789, calories: 1980, distance: 4.7, duration: 65 },
    { date: 'Thu', steps: 10234, calories: 2290, distance: 7.2, duration: 95 },
    { date: 'Fri', steps: 9876, calories: 2210, distance: 6.9, duration: 90 },
    { date: 'Sat', steps: 15432, calories: 2650, distance: 10.8, duration: 150 },
    { date: 'Sun', steps: 7654, calories: 2050, distance: 5.4, duration: 75 }
  ],
  
  insights: [
    {
      id: 'insight_1',
      type: 'recommendation' as const,
      priority: 'medium' as const,
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
      type: 'alert' as const,
      priority: 'high' as const,
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
    },
    {
      id: 'insight_3',
      type: 'trend' as const,
      priority: 'low' as const,
      title: 'Activity Consistency Improving',
      description: 'Daily step count variance reduced by 28%. Consistent activity levels support metabolic health and circadian rhythm regulation.',
      recommendations: [
        'Aim for 8,000+ steps on rest days',
        'Maintain 10,000+ step target on active days',
        'Consider adding evening walk to improve sleep onset'
      ],
      confidence: 0.84,
      evidence: [],
      createdAt: new Date()
    }
  ],
  
  alerts: [
    {
      id: 'alert_1',
      type: 'routine_reminder' as const,
      severity: 'info' as const,
      message: 'Hydration reminder: Aim for 8-10 glasses of water today based on your activity level.',
      actionRequired: false,
      autoResolve: true,
      createdAt: new Date()
    },
    {
      id: 'alert_2',
      type: 'goal_milestone' as const,
      severity: 'info' as const,
      message: 'Achievement unlocked: 7-day streak of 7+ hours sleep! Keep up the excellent sleep hygiene.',
      actionRequired: false,
      autoResolve: true,
      createdAt: new Date()
    }
  ],
  
  trends: [
    {
      metric: 'Sleep Quality',
      direction: 'improving' as const,
      rate: 8.5,
      significance: 'medium' as const,
      timeframe: '7-day comparison'
    },
    {
      metric: 'Heart Rate Variability',
      direction: 'improving' as const,
      rate: 12.3,
      significance: 'high' as const,
      timeframe: '14-day comparison'
    },
    {
      metric: 'Daily Steps',
      direction: 'stable' as const,
      rate: 2.1,
      significance: 'low' as const,
      timeframe: '7-day comparison'
    },
    {
      metric: 'Recovery Score',
      direction: 'improving' as const,
      rate: 15.7,
      significance: 'high' as const,
      timeframe: '30-day comparison'
    }
  ]
};

export const healthScoreBreakdown = {
  overall: 84,
  sleep: 87,
  activity: 82,
  recovery: 89,
  stress: 78
};
