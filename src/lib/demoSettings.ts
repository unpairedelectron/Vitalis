// Demo configuration for optimal presentation experience
export const demoSettings = {
  // Performance settings for smooth demo
  refreshIntervals: {
    vitals: 5000, // 5 seconds for real-time vitals
    dashboard: 30000, // 30 seconds for dashboard updates
    animations: 2000, // 2 seconds for micro-animations
  },

  // Demo user scenarios
  scenarios: {
    resting: {
      heartRate: { min: 60, max: 75 },
      stress: { min: 15, max: 30 },
      activity: "Resting"
    },
    active: {
      heartRate: { min: 120, max: 160 },
      stress: { min: 40, max: 60 },
      activity: "Exercising"
    },
    recovery: {
      heartRate: { min: 80, max: 100 },
      stress: { min: 25, max: 40 },
      activity: "Recovery"
    }
  },

  // Presentation-optimized data
  presentation: {
    showLoadingStates: true,
    enableAnimations: true,
    realtimeUpdates: true,
    showProgressBars: true,
    highlightAlerts: true
  },

  // Demo flow timing (for presentations)
  demoFlow: {
    loadingDuration: 1500, // Show loading for 1.5 seconds
    transitionDelay: 500, // Smooth transitions
    alertDisplayTime: 3000, // Show alerts for 3 seconds
    chartAnimationDuration: 1000 // Chart animations
  }
};

// Impressive demo metrics that showcase platform capabilities
export const impressiveDemoData = {
  aiInsights: [
    {
      type: "prediction",
      title: "Early Warning: Potential Burnout Risk",
      description: "AI detected elevated cortisol patterns suggesting 73% burnout risk in 10 days",
      confidence: 91,
      urgency: "medium",
      recommendations: [
        "Reduce high-intensity workouts by 20%",
        "Increase sleep duration to 8+ hours",
        "Consider meditation or stress management"
      ]
    },
    {
      type: "optimization",
      title: "Peak Performance Window Detected",
      description: "Your biorhythms indicate optimal performance between 10-11 AM today",
      confidence: 85,
      urgency: "low",
      recommendations: [
        "Schedule important meetings during this window",
        "Plan high-intensity workout for 10:30 AM"
      ]
    },
    {
      type: "health",
      title: "Cardiovascular Health: Excellent",
      description: "VO2 Max improvement of 8% over last month indicates superior fitness gains",
      confidence: 96,
      urgency: "positive",
      recommendations: [
        "Maintain current training intensity",
        "Consider adding zone 2 endurance work"
      ]
    }
  ],

  emergencyAlerts: [
    {
      type: "critical",
      title: "Irregular Heart Rhythm Detected",
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      resolved: true,
      action: "Medical consultation recommended"
    }
  ],

  performanceMetrics: {
    healthScore: 92, // Excellent
    fitnessAge: 28, // 6 years younger than actual age
    longevityIndex: 85, // High
    stressResilience: 78, // Good
    metabolicHealth: 91 // Excellent
  }
};

export default demoSettings;
