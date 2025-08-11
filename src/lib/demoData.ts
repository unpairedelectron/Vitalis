// Demo data for impressive but realistic health metrics
export const demoHealthMetrics = {
  user: {
    name: "Dr. Arjun Patel",
    age: 34,
    gender: "Male",
    height: 175, // cm
    weight: 72, // kg
    activityLevel: "Very Active",
    lastSync: new Date().toISOString()
  },

  realTimeVitals: {
    heartRate: {
      current: 68,
      trend: "stable",
      zone: "resting",
      quality: "excellent",
      variability: 45, // ms
      history: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
        value: 65 + Math.sin(i * 0.5) * 8 + Math.random() * 6
      }))
    },
    bloodOxygen: {
      current: 98,
      trend: "optimal",
      quality: "excellent",
      history: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
        value: 96 + Math.random() * 3
      }))
    },
    stress: {
      current: 25, // Low stress
      level: "Low",
      trend: "decreasing",
      history: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: 20 + Math.random() * 30
      }))
    },
    sleepScore: 89,
    recoveryScore: 92
  },

  exerciseMetrics: {
    weeklyGoal: 150, // minutes
    completed: 165,
    vo2Max: 52.3, // Excellent for age group
    percentile: 85,
    weeklyStats: {
      totalCalories: 3420,
      activeMinutes: 165,
      steps: 72450,
      distance: 52.8, // km
      workouts: 6
    },
    recentWorkouts: [
      {
        id: 1,
        type: "Running",
        duration: 45,
        calories: 520,
        distance: 8.2,
        avgHeartRate: 152,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        intensity: "High"
      },
      {
        id: 2,
        type: "Strength Training",
        duration: 60,
        calories: 380,
        avgHeartRate: 135,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        intensity: "Moderate"
      },
      {
        id: 3,
        type: "Cycling",
        duration: 75,
        calories: 645,
        distance: 25.5,
        avgHeartRate: 145,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        intensity: "High"
      }
    ]
  },

  healthInsights: {
    riskScore: 15, // Very low risk (0-100 scale)
    riskLevel: "Very Low",
    improvements: [
      {
        metric: "Cardiovascular Risk",
        change: -23,
        timeframe: "2 weeks",
        status: "improved"
      },
      {
        metric: "Sleep Quality",
        change: +12,
        timeframe: "1 week",
        status: "improved"
      },
      {
        metric: "Stress Management",
        change: -18,
        timeframe: "1 month",
        status: "improved"
      }
    ],
    predictions: [
      {
        type: "Cardiovascular Event",
        risk: "Very Low",
        probability: 2.3,
        timeframe: "6 months",
        confidence: 94
      },
      {
        type: "Metabolic Syndrome",
        risk: "Low",
        probability: 8.1,
        timeframe: "1 year",
        confidence: 91
      }
    ],
    recommendations: [
      {
        category: "Exercise",
        title: "Maintain Current Activity Level",
        description: "Your VO2 Max is in the 85th percentile. Continue current routine.",
        priority: "medium",
        impact: "high"
      },
      {
        category: "Sleep",
        title: "Optimize Sleep Schedule",
        description: "Consider sleeping 15 minutes earlier for optimal recovery.",
        priority: "low",
        impact: "medium"
      },
      {
        category: "Nutrition",
        title: "Increase Omega-3 Intake",
        description: "Add 2 servings of fatty fish per week for heart health.",
        priority: "medium",
        impact: "high"
      }
    ]
  },

  clinicalMarkers: {
    bloodPressure: {
      systolic: 118,
      diastolic: 76,
      category: "Normal",
      trend: "stable",
      lastReading: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    restingHeartRate: {
      current: 52, // Athlete level
      category: "Excellent",
      trend: "improving",
      change: -3 // Decreased by 3 bpm over last month
    },
    bodyComposition: {
      bodyFat: 12.5, // %
      muscleMass: 42.8, // kg
      visceralFat: 4, // Level
      bmi: 23.5,
      category: "Normal"
    },
    metabolicHealth: {
      glucoseAvg: 88, // mg/dL - Excellent
      hba1c: 5.1, // % - Normal
      cholesterolRatio: 3.2, // Optimal
      triglycerides: 78 // mg/dL - Normal
    }
  },

  compliance: {
    whoGuidelines: {
      aerobicActivity: {
        required: 150,
        achieved: 165,
        compliance: 110,
        status: "Exceeded"
      },
      strengthTraining: {
        required: 2,
        achieved: 3,
        compliance: 150,
        status: "Exceeded"
      }
    },
    acsm: {
      cardioFitness: {
        category: "Excellent",
        percentile: 85,
        ageBased: true
      },
      strengthFitness: {
        category: "Above Average",
        percentile: 72,
        ageBased: true
      }
    }
  },

  emergencyAlerts: {
    active: [],
    history: [
      {
        id: 1,
        type: "Heart Rate Anomaly",
        severity: "Medium",
        message: "Elevated heart rate detected during rest",
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        resolved: true,
        resolution: "Normal pattern resumed after hydration"
      }
    ]
  },

  deviceStatus: [
    {
      id: "apple-watch-series-9",
      name: "Apple Watch Series 9",
      type: "Smartwatch",
      status: "Connected",
      lastSync: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      batteryLevel: 78,
      dataTypes: ["Heart Rate", "Steps", "Sleep", "Workouts", "Blood Oxygen"]
    },
    {
      id: "oura-ring-gen3",
      name: "Oura Ring Gen 3",
      type: "Smart Ring",
      status: "Connected",
      lastSync: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      batteryLevel: 92,
      dataTypes: ["Sleep", "HRV", "Temperature", "Recovery"]
    },
    {
      id: "fitbit-charge-5",
      name: "Fitbit Charge 5",
      type: "Fitness Tracker",
      status: "Connected",
      lastSync: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      batteryLevel: 45,
      dataTypes: ["Steps", "Heart Rate", "Stress", "GPS"]
    },
    {
      id: "samsung-galaxy-watch-6",
      name: "Samsung Galaxy Watch 6",
      type: "Smartwatch",
      status: "Connected",
      lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      batteryLevel: 67,
      dataTypes: ["Heart Rate", "Blood Pressure", "Body Composition", "Sleep"]
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Cardio Champion",
      description: "Maintained excellent VO2 Max for 3 months",
      icon: "🏃‍♂️",
      earned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Fitness"
    },
    {
      id: 2,
      title: "Heart Health Hero",
      description: "Reduced cardiovascular risk by 23%",
      icon: "❤️",
      earned: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Health"
    },
    {
      id: 3,
      title: "Sleep Master",
      description: "Achieved 85+ sleep score for 2 weeks",
      icon: "😴",
      earned: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Recovery"
    }
  ]
};

// Chart data for impressive visualizations
export const chartData = {
  heartRateVariability: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    hrv: 35 + Math.sin(i * 0.2) * 8 + Math.random() * 10,
    sleep: 7 + Math.sin(i * 0.15) * 1.5 + Math.random() * 1,
    stress: 30 - Math.sin(i * 0.25) * 15 + Math.random() * 10
  })),

  weeklyProgress: [
    { day: 'Mon', steps: 8420, calories: 520, active: 45 },
    { day: 'Tue', steps: 12340, calories: 720, active: 65 },
    { day: 'Wed', steps: 9680, calories: 580, active: 38 },
    { day: 'Thu', steps: 15200, calories: 890, active: 75 },
    { day: 'Fri', steps: 11540, calories: 640, active: 52 },
    { day: 'Sat', steps: 14800, calories: 820, active: 88 },
    { day: 'Sun', steps: 10450, calories: 600, active: 42 }
  ],

  riskReduction: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
    cardiovascular: Math.max(5, 45 - i * 3 + Math.random() * 5),
    metabolic: Math.max(3, 35 - i * 2.5 + Math.random() * 4),
    overall: Math.max(4, 40 - i * 2.8 + Math.random() * 4.5)
  })),

  biomarkerCorrelation: {
    nodes: [
      { id: 'hr', label: 'Heart Rate', x: 50, y: 30, value: 68, status: 'optimal' },
      { id: 'hrv', label: 'HRV', x: 80, y: 60, value: 45, status: 'excellent' },
      { id: 'sleep', label: 'Sleep Quality', x: 20, y: 80, value: 89, status: 'excellent' },
      { id: 'stress', label: 'Stress Level', x: 70, y: 20, value: 25, status: 'low' },
      { id: 'recovery', label: 'Recovery', x: 40, y: 70, value: 92, status: 'excellent' },
      { id: 'vo2', label: 'VO2 Max', x: 60, y: 45, value: 52.3, status: 'excellent' }
    ],
    connections: [
      { from: 'hr', to: 'hrv', strength: 0.8, type: 'positive' },
      { from: 'sleep', to: 'recovery', strength: 0.9, type: 'positive' },
      { from: 'stress', to: 'hrv', strength: 0.7, type: 'negative' },
      { from: 'recovery', to: 'vo2', strength: 0.6, type: 'positive' },
      { from: 'sleep', to: 'stress', strength: 0.5, type: 'negative' }
    ]
  }
};

// Real-time simulation functions
export const simulateRealTimeData = () => {
  const baseHeartRate = 68;
  const variation = Math.sin(Date.now() / 10000) * 3 + Math.random() * 2;
  
  return {
    heartRate: Math.round(baseHeartRate + variation),
    bloodOxygen: Math.round(97 + Math.random() * 2),
    stress: Math.round(20 + Math.random() * 15),
    timestamp: new Date().toISOString()
  };
};

export const generateDemoReport = () => ({
  title: "Weekly Health Intelligence Report",
  period: `${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
  summary: {
    overallScore: 94,
    trend: "improving",
    keyInsights: [
      "Cardiovascular fitness reached 85th percentile",
      "Sleep quality improved by 12% this week",
      "Stress levels decreased by 18% compared to last month",
      "VO2 Max increased to 52.3 ml/kg/min (Excellent)"
    ]
  },
  recommendations: [
    "Continue current exercise routine - you're in the top 15% for your age group",
    "Consider adding 15 minutes of meditation to further reduce stress",
    "Optimal hydration detected - maintain current intake"
  ],
  riskAssessment: {
    overall: "Very Low Risk",
    cardiovascular: "2.3% (Excellent)",
    metabolic: "8.1% (Good)",
    nextCheckup: "3 months recommended"
  }
});
