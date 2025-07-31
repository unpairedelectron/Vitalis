import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> }
) {
  try {
    const { deviceId } = await params;

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 });
    }

    const db = prisma;
    
    // Find the device connection
    const device = await db.deviceConnection.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }

    // Delete the device connection
    await db.deviceConnection.delete({
      where: { id: deviceId },
    });

    // Optionally, also delete associated health data
    // This depends on your data retention policy
    // await db.healthData.deleteMany({
    //   where: { 
    //     userId: device.userId,
    //     source: device.deviceType 
    //   },
    // });

    return NextResponse.json({
      success: true,
      message: `${device.deviceName} disconnected successfully`,
      deviceType: device.deviceType,
    });

  } catch (error) {
    console.error('Error deleting device connection:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect device' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> }
) {
  try {
    const { deviceId } = await params;
    const { isConnected, deviceName, connectionData } = await request.json();

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 });
    }

    const db = prisma;
    
    // Update the device connection
    const device = await db.deviceConnection.update({
      where: { id: deviceId },
      data: {
        ...(isConnected !== undefined && { isConnected }),
        ...(deviceName && { deviceName }),
        ...(connectionData && { connectionData }),
        lastSync: new Date(),
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
        lastSync: device.lastSyncAt?.toISOString(),
      },
    });

  } catch (error) {
    console.error('Error updating device connection:', error);
    return NextResponse.json(
      { error: 'Failed to update device connection' },
      { status: 500 }
    );
  }
}
