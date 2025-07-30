import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const db = prisma;
    
    // Fetch all device connections for the user
    const devices = await db.deviceConnection.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        lastSync: 'desc',
      },
    });

    // Transform the data for the frontend
    const transformedDevices = devices.map((device: any) => ({
      id: device.id,
      deviceType: device.deviceType,
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      isConnected: device.isConnected,
      lastSync: device.lastSync.toISOString(),
      connectionData: device.connectionData,
    }));

    return NextResponse.json({
      success: true,
      devices: transformedDevices,
      count: transformedDevices.length,
    });

  } catch (error) {
    console.error('Error fetching user devices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const { deviceType, deviceId, deviceName, connectionData } = await request.json();

    if (!userId || !deviceType || !deviceId) {
      return NextResponse.json(
        { error: 'User ID, device type, and device ID are required' },
        { status: 400 }
      );
    }

    const db = prisma;
    
    // Create or update device connection
    const device = await db.deviceConnection.upsert({
      where: {
        userId_deviceType: {
          userId,
          deviceType,
        },
      },
      update: {
        deviceId,
        deviceName: deviceName || `${deviceType} Device`,
        isConnected: true,
        lastSync: new Date(),
        connectionData: connectionData || {},
      },
      create: {
        userId,
        deviceType,
        deviceId,
        deviceName: deviceName || `${deviceType} Device`,
        isConnected: true,
        lastSync: new Date(),
        connectionData: connectionData || {},
      },
    });

    return NextResponse.json({
      success: true,
      device: {
        id: device.id,
        deviceType: device.deviceType,
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        isConnected: device.isConnected,
        lastSync: device.lastSync.toISOString(),
      },
    });

  } catch (error) {
    console.error('Error creating/updating device connection:', error);
    return NextResponse.json(
      { error: 'Failed to create/update device connection' },
      { status: 500 }
    );
  }
}
