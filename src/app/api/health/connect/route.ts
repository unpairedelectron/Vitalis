// Health API Integration Routes
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { realHealthDataAggregator } from '@/lib/real-health-api';
import { z } from 'zod';

const connectSourceSchema = z.object({
  source: z.enum(['samsung_health', 'fitbit', 'oura', 'apple_health', 'google_fit']),
  credentials: z.object({
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
    userId: z.string().optional(),
    expiresAt: z.string().optional(),
    scope: z.array(z.string()).optional()
  })
});

// Connect a health data source
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
    const validatedData = connectSourceSchema.parse(body);
    
    // Convert expiresAt string to Date if provided
    const credentials = {
      ...validatedData.credentials,
      expiresAt: validatedData.credentials.expiresAt ? 
        new Date(validatedData.credentials.expiresAt) : undefined
    };

    // Connect the health source
    const result = await realHealthDataAggregator.connectHealthSource(
      user.id,
      validatedData.source,
      credentials
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        authUrl: result.authUrl
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully connected ${validatedData.source}`,
      source: validatedData.source
    });

  } catch (error: any) {
    console.error('Connect health source error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to connect health source'
    }, { status: 500 });
  }
}

// Get connected health sources
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

    // Get connected sources from database
    // For now, return mock data
    const connectedSources = [
      {
        source: 'samsung_health',
        connected: true,
        lastSync: new Date().toISOString(),
        status: 'active'
      },
      {
        source: 'fitbit',
        connected: false,
        lastSync: null,
        status: 'disconnected'
      },
      {
        source: 'oura',
        connected: false,
        lastSync: null,
        status: 'disconnected'
      }
    ];

    return NextResponse.json({
      success: true,
      connectedSources
    });

  } catch (error) {
    console.error('Get connected sources error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get connected sources'
    }, { status: 500 });
  }
}
