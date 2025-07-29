import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const mockData = {
    healthScore: 84,
    insights: [
      {
        id: 'insight_1',
        type: 'recommendation',
        priority: 'medium',
        title: 'Sleep Quality Optimization',
        description: 'Your sleep efficiency has improved by 12% this week.',
        recommendations: ['Maintain current bedtime routine', 'Reduce caffeine after 14:00'],
        confidence: 0.87,
        evidence: [],
        createdAt: new Date()
      }
    ],
    alerts: [
      {
        id: 'alert_1',
        type: 'routine_reminder',
        severity: 'info',
        message: 'Hydration reminder: Aim for 8-10 glasses of water today.',
        actionRequired: false,
        autoResolve: true,
        createdAt: new Date()
      }
    ],
    trends: [
      {
        metric: 'Sleep Quality',
        direction: 'improving',
        rate: 8.5,
        significance: 'medium',
        timeframe: '7-day comparison'
      }
    ],
    heartRateData: [
      { time: '08:00', bpm: 75, zone: 'fat_burn' },
      { time: '12:00', bpm: 88, zone: 'cardio' },
      { time: '16:00', bpm: 85, zone: 'fat_burn' },
      { time: '20:00', bpm: 72, zone: 'rest' }
    ],
    sleepData: [
      { date: 'Mon', deep: 1.2, rem: 1.8, light: 4.5, score: 85 },
      { date: 'Tue', deep: 1.5, rem: 2.1, light: 4.2, score: 88 }
    ],
    activityData: [
      { date: 'Mon', steps: 8234, calories: 2150 },
      { date: 'Tue', steps: 12456, calories: 2380 }
    ],
    lastUpdate: new Date()
  };

  return NextResponse.json(mockData);
}
