// Health Data Sync API Route
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { realHealthDataAggregator } from '@/lib/real-health-api';
import { z } from 'zod';

const syncRequestSchema = z.object({
  sources: z.array(z.enum(['samsung_health', 'fitbit', 'oura', 'apple_health', 'google_fit'])).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  forceSync: z.boolean().optional().default(false)
});

// Sync health data from connected sources
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const token = request.cookies.get('vitalis-token')?.value;
    const user = token ? await AuthService.verifyToken(token) : null;
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = syncRequestSchema.parse(body);
    
    // Parse dates
    const startDate = validatedData.startDate ? 
      new Date(validatedData.startDate) : 
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      
    const endDate = validatedData.endDate ? 
      new Date(validatedData.endDate) : 
      new Date();

    console.log(`🔄 Starting health data sync for user ${user.id}`);
    console.log(`📅 Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Sync health data
    const syncResults = await realHealthDataAggregator.syncAllHealthData(
      user.id,
      validatedData.sources,
      startDate,
      endDate
    );

    // Calculate overall statistics
    const totalRecords = Object.values(syncResults).reduce(
      (sum, result) => sum + result.recordsProcessed, 0
    );
    
    const successfulSyncs = Object.values(syncResults).filter(
      result => result.success
    ).length;
    
    const totalSyncs = Object.keys(syncResults).length;

    return NextResponse.json({
      success: true,
      message: `Synced ${totalRecords} health records from ${successfulSyncs}/${totalSyncs} sources`,
      syncResults,
      summary: {
        totalRecords,
        successfulSyncs,
        totalSyncs,
        syncedSources: Object.keys(syncResults).filter(source => syncResults[source].success),
        failedSources: Object.keys(syncResults).filter(source => !syncResults[source].success)
      }
    });

  } catch (error: any) {
    console.error('Health data sync error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to sync health data'
    }, { status: 500 });
  }
}

// Get sync status
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const token = request.cookies.get('vitalis-token')?.value;
    const user = token ? await AuthService.verifyToken(token) : null;
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

    // Get sync status for all connected sources
    // For now, return mock status
    const syncStatus = {
      'samsung_health': {
        lastSync: new Date(),
        nextSync: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        status: 'active',
        recordsToday: 1247,
        errors: []
      },
      'fitbit': {
        lastSync: null,
        nextSync: null,
        status: 'disconnected',
        recordsToday: 0,
        errors: []
      },
      'oura': {
        lastSync: null,
        nextSync: null,
        status: 'disconnected',
        recordsToday: 0,
        errors: []
      }
    };

    return NextResponse.json({
      success: true,
      syncStatus,
      overallStatus: 'active',
      totalRecordsToday: Object.values(syncStatus).reduce(
        (sum, status) => sum + status.recordsToday, 0
      )
    });

  } catch (error) {
    console.error('Get sync status error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get sync status'
    }, { status: 500 });
  }
}
