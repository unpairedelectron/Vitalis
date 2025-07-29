// Samsung Health Real-time Heart Rate API
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.split(' ')[1];
    
    // Validate token (in production, verify with Samsung Health API)
    if (!accessToken.startsWith('mock_samsung_')) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Simulate real-time heart rate data
    const heartRate = generateRealisticHeartRate();
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      heartRate,
      confidence: 0.95,
      deviceId: 'SM-R890-Galaxy-Watch',
      zone: getHeartRateZone(heartRate),
      source: 'samsung_health'
    });

  } catch (error) {
    console.error('Samsung Health heart rate error:', error);
    return NextResponse.json(
      { error: 'Failed to get heart rate data' },
      { status: 500 }
    );
  }
}

function generateRealisticHeartRate(): number {
  const baseRate = 70;
  const timeOfDay = new Date().getHours();
  
  // Simulate circadian rhythm
  let adjustment = 0;
  if (timeOfDay >= 6 && timeOfDay <= 10) {
    adjustment = 10; // Morning elevation
  } else if (timeOfDay >= 14 && timeOfDay <= 18) {
    adjustment = 15; // Afternoon activity
  } else if (timeOfDay >= 22 || timeOfDay <= 5) {
    adjustment = -10; // Night time lower
  }
  
  // Add some random variation
  const randomVariation = (Math.random() - 0.5) * 10;
  
  return Math.round(baseRate + adjustment + randomVariation);
}

function getHeartRateZone(heartRate: number): string {
  if (heartRate < 60) return 'resting';
  if (heartRate < 100) return 'fat_burn';
  if (heartRate < 150) return 'cardio';
  return 'peak';
}
