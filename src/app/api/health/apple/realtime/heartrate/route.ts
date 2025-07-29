// Apple Health Real-time Heart Rate API
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate Apple Watch heart rate data
    const heartRate = generateAppleWatchHeartRate();
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      heartRate,
      confidence: 0.98, // Apple Watch typically has high accuracy
      deviceId: 'Apple-Watch-Series-9',
      zone: getHeartRateZone(heartRate),
      source: 'apple_health',
      workoutDetected: Math.random() > 0.8 // 20% chance of workout detection
    });

  } catch (error) {
    console.error('Apple Health heart rate error:', error);
    return NextResponse.json(
      { error: 'Failed to get heart rate data' },
      { status: 500 }
    );
  }
}

function generateAppleWatchHeartRate(): number {
  const baseRate = 72;
  const timeOfDay = new Date().getHours();
  
  // Apple Watch specific patterns
  let adjustment = 0;
  if (timeOfDay >= 7 && timeOfDay <= 9) {
    adjustment = 8; // Morning routine
  } else if (timeOfDay >= 17 && timeOfDay <= 19) {
    adjustment = 12; // Evening activity
  } else if (timeOfDay >= 23 || timeOfDay <= 6) {
    adjustment = -12; // Sleep/rest
  }
  
  // Apple Watch precision (less variation)
  const randomVariation = (Math.random() - 0.5) * 6;
  
  return Math.round(baseRate + adjustment + randomVariation);
}

function getHeartRateZone(heartRate: number): string {
  if (heartRate < 60) return 'resting';
  if (heartRate < 100) return 'fat_burn';
  if (heartRate < 150) return 'cardio';
  return 'peak';
}
