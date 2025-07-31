// Clinical Health Data API Endpoint
import { NextRequest, NextResponse } from 'next/server';

// Types and interfaces
interface WHOGuidelineCompliance {
  physicalActivity: {
    weeklyMinutes: number;
    meetsModeratePAGuideline: boolean;
    meetsVigorousPAGuideline: boolean;
    muscleStrengtheningDays: number;
    compliance: string;
    recommendations: string[];
  };
  cardiovascularHealth: {
    restingHeartRate: number;
    bloodPressureCategory: string;
    framinghamRiskScore: number;
    recommendations: string[];
  };
  sleepGuidelines: {
    averageSleepHours: number;
    meetsAdultGuideline: boolean;
    sleepQualityScore: number;
    recommendations: string[];
  };
}

interface PerformanceData {
  vo2Max: number;
  trainingZones: {
    zone1: { min: number; max: number; };
    zone2: { min: number; max: number; };
    zone3: { min: number; max: number; };
    zone4: { min: number; max: number; };
    zone5: { min: number; max: number; };
  };
  powerOutput: {
    ftp: number;
    criticalPower: number;
    maxPower: number;
  };
}

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

function generateClinicalHealthData(userId: string) {
  return {
    whoCompliance: generateWHOCompliance(),
    performance: generatePerformanceData(),
    vitals: generateRealTimeVitals(),
    clinicalAlerts: generateClinicalAlerts(),
    physicianReports: generatePhysicianReports(userId)
  };
}

function generateWHOCompliance(): WHOGuidelineCompliance {
  return {
    physicalActivity: {
      weeklyMinutes: 180 + Math.random() * 120,
      meetsModeratePAGuideline: Math.random() > 0.3,
      meetsVigorousPAGuideline: Math.random() > 0.4,
      muscleStrengtheningDays: Math.floor(Math.random() * 5) + 1,
      compliance: ['excellent', 'good', 'moderate', 'needs_improvement'][Math.floor(Math.random() * 4)],
      recommendations: [
        'Maintain current activity level',
        'Consider adding flexibility training',
        'Increase strength training frequency'
      ]
    },
    cardiovascularHealth: {
      restingHeartRate: 55 + Math.random() * 20,
      bloodPressureCategory: ['normal', 'elevated', 'stage1'][Math.floor(Math.random() * 3)],
      framinghamRiskScore: Math.random() * 20,
      recommendations: [
        'Continue cardio routine',
        'Monitor BP monthly',
        'Consider cardiac consultation'
      ]
    },
    sleepGuidelines: {
      averageSleepHours: 6.5 + Math.random() * 2.5,
      meetsAdultGuideline: Math.random() > 0.4,
      sleepQualityScore: 70 + Math.random() * 30,
      recommendations: [
        'Maintain consistent sleep schedule',
        'Optimize sleep environment',
        'Consider sleep study if issues persist'
      ]
    }
  };
}

function generatePerformanceData(): PerformanceData {
  const baseHR = 60 + Math.random() * 20;
  return {
    vo2Max: 45 + Math.random() * 25,
    trainingZones: {
      zone1: { min: Math.round(baseHR * 0.5), max: Math.round(baseHR * 0.6) },
      zone2: { min: Math.round(baseHR * 0.6), max: Math.round(baseHR * 0.7) },
      zone3: { min: Math.round(baseHR * 0.7), max: Math.round(baseHR * 0.8) },
      zone4: { min: Math.round(baseHR * 0.8), max: Math.round(baseHR * 0.9) },
      zone5: { min: Math.round(baseHR * 0.9), max: Math.round(baseHR * 1.0) }
    },
    powerOutput: {
      ftp: 200 + Math.random() * 150,
      criticalPower: 250 + Math.random() * 200,
      maxPower: 800 + Math.random() * 500
    }
  };
}

function generateRealTimeVitals() {
  return {
    heartRate: 65 + Math.random() * 20,
    bloodOxygen: 95 + Math.random() * 5,
    bodyTemperature: 36.1 + Math.random() * 1.5,
    bloodPressure: {
      systolic: 110 + Math.random() * 30,
      diastolic: 70 + Math.random() * 20
    },
    respiratoryRate: 12 + Math.random() * 8,
    timestamp: new Date().toISOString()
  };
}

function generateClinicalAlerts() {
  const alerts = [
    { severity: 'low', message: 'Heart rate variability within normal range', timestamp: new Date().toISOString() },
    { severity: 'medium', message: 'Sleep quality below optimal level', timestamp: new Date().toISOString() },
    { severity: 'high', message: 'Elevated stress levels detected', timestamp: new Date().toISOString() }
  ];

  return alerts.filter(() => Math.random() > 0.7); // Randomly show some alerts
}

function generatePhysicianReports(userId: string) {
  return {
    lastReport: {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      physician: 'Dr. Sarah Johnson, MD',
      summary: 'Overall health metrics show good improvement in cardiovascular fitness.',
      recommendations: [
        'Continue current exercise regimen',
        'Monitor sleep patterns',
        'Follow up in 3 months'
      ]
    },
    nextAppointment: {
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      physician: 'Dr. Sarah Johnson, MD',
      type: 'Routine checkup'
    }
  };
}
