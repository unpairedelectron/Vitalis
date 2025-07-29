// Fire-Boltt 094 Real-time Heart Rate API
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate real-time heart rate data from Fire-Boltt 094
    // In production, this would connect to the actual device via BLE
    
    const now = new Date();
    const timeOfDay = now.getHours();
    
    // Simulate realistic heart rate based on time of day
    let baseHeartRate = 70;
    if (timeOfDay >= 6 && timeOfDay <= 9) {
      baseHeartRate = 65; // Morning resting rate
    } else if (timeOfDay >= 10 && timeOfDay <= 17) {
      baseHeartRate = 75; // Daytime activity
    } else if (timeOfDay >= 18 && timeOfDay <= 22) {
      baseHeartRate = 80; // Evening activity
    } else {
      baseHeartRate = 60; // Night/sleep rate
    }
    
    // Add some realistic variation
    const heartRate = baseHeartRate + Math.floor(Math.random() * 20) - 10;
    
    // Fire-Boltt 094 specific data format
    const sensorData = {
      deviceId: 'fire-boltt-094',
      deviceName: 'Fire-Boltt 094',
      timestamp: now.toISOString(),
      heartRate: Math.max(45, Math.min(200, heartRate)), // Safe bounds
      unit: 'bpm',
      confidence: 0.88, // Fire-Boltt 094 typical accuracy
      sensorType: 'PPG', // Photoplethysmography
      batteryLevel: Math.floor(Math.random() * 30) + 60,
      connectionType: 'BLE',
      firmware: '1.2.3',
      zone: getHeartRateZone(heartRate),
      metadata: {
        sensorLocation: 'wrist',
        ambientLight: 'moderate',
        motionStatus: 'stationary',
        signalQuality: 'good'
      }
    };

    return NextResponse.json({
      success: true,
      data: sensorData,
      message: 'Fire-Boltt 094 heart rate data retrieved successfully'
    });

  } catch (error) {
    console.error('Fire-Boltt heart rate error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get heart rate data from Fire-Boltt 094'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command } = body;

    if (command === 'start_monitoring') {
      return NextResponse.json({
        success: true,
        message: 'Heart rate monitoring started on Fire-Boltt 094',
        monitoringId: `fb094_hr_${Date.now()}`,
        interval: 5000, // 5 seconds
        duration: 300000 // 5 minutes max
      });
    }

    if (command === 'stop_monitoring') {
      return NextResponse.json({
        success: true,
        message: 'Heart rate monitoring stopped on Fire-Boltt 094'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid command'
    }, { status: 400 });

  } catch (error) {
    console.error('Fire-Boltt heart rate command error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to execute heart rate command'
    }, { status: 500 });
  }
}

function getHeartRateZone(heartRate: number): string {
  if (heartRate < 60) return 'below_target';
  if (heartRate < 100) return 'fat_burn';
  if (heartRate < 140) return 'cardio';
  if (heartRate < 170) return 'peak';
  return 'maximum';
}
