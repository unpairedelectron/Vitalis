// Fire-Boltt 094 Real-time SpO2 API
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate real-time SpO2 data from Fire-Boltt 094
    // Fire-Boltt 094 has a dedicated SpO2 sensor
    
    const now = new Date();
    
    // Simulate realistic SpO2 values (95-100% for healthy individuals)
    const baseSpO2 = 97;
    const variation = Math.floor(Math.random() * 4); // 0-3% variation
    const spO2 = Math.min(100, baseSpO2 + variation);
    
    // Fire-Boltt 094 SpO2 specific data
    const sensorData = {
      deviceId: 'fire-boltt-094',
      deviceName: 'Fire-Boltt 094',
      timestamp: now.toISOString(),
      spO2: spO2,
      unit: '%',
      confidence: 0.85, // SpO2 sensors typically less accurate than HR
      measurementDuration: 30, // seconds
      sensorType: 'Pulse Oximetry',
      batteryLevel: Math.floor(Math.random() * 30) + 60,
      connectionType: 'BLE',
      firmware: '1.2.3',
      status: getSpO2Status(spO2),
      metadata: {
        sensorLocation: 'wrist',
        ambientLight: 'controlled',
        skinTone: 'adaptive',
        motionArtifact: 'minimal',
        signalStrength: Math.floor(Math.random() * 20) + 80
      },
      recommendations: getSpO2Recommendations(spO2)
    };

    return NextResponse.json({
      success: true,
      data: sensorData,
      message: 'Fire-Boltt 094 SpO2 data retrieved successfully'
    });

  } catch (error) {
    console.error('Fire-Boltt SpO2 error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get SpO2 data from Fire-Boltt 094'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { command } = body;

    if (command === 'start_measurement') {
      return NextResponse.json({
        success: true,
        message: 'SpO2 measurement started on Fire-Boltt 094',
        measurementId: `fb094_spo2_${Date.now()}`,
        estimatedDuration: 30000, // 30 seconds
        instructions: [
          'Keep your wrist steady',
          'Avoid movement during measurement',
          'Ensure good skin contact',
          'Wait for completion signal'
        ]
      });
    }

    if (command === 'stop_measurement') {
      return NextResponse.json({
        success: true,
        message: 'SpO2 measurement stopped on Fire-Boltt 094'
      });
    }

    if (command === 'calibrate') {
      return NextResponse.json({
        success: true,
        message: 'Fire-Boltt 094 SpO2 sensor calibration started',
        calibrationSteps: [
          'Remove watch from wrist',
          'Clean sensor area with soft cloth',
          'Put watch back on snugly',
          'Wait 2 minutes for stabilization'
        ]
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid command'
    }, { status: 400 });

  } catch (error) {
    console.error('Fire-Boltt SpO2 command error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to execute SpO2 command'
    }, { status: 500 });
  }
}

function getSpO2Status(spO2: number): string {
  if (spO2 >= 95) return 'normal';
  if (spO2 >= 90) return 'mild_low';
  if (spO2 >= 85) return 'moderate_low';
  return 'critically_low';
}

function getSpO2Recommendations(spO2: number): string[] {
  if (spO2 >= 97) {
    return [
      'Excellent oxygen saturation',
      'Continue regular exercise',
      'Maintain healthy lifestyle'
    ];
  } else if (spO2 >= 95) {
    return [
      'Good oxygen saturation',
      'Consider deep breathing exercises',
      'Stay hydrated'
    ];
  } else if (spO2 >= 90) {
    return [
      'Below normal range',
      'Practice breathing exercises',
      'Consider consulting healthcare provider',
      'Avoid strenuous activity'
    ];
  } else {
    return [
      'Critically low oxygen saturation',
      'Seek immediate medical attention',
      'Do not ignore this reading',
      'Contact healthcare provider now'
    ];
  }
}
