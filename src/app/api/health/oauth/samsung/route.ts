// OAuth Integration for Samsung Health
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { config } from '@/lib/config';
import { realHealthDataAggregator } from '@/lib/real-health-api';

// Initiate Samsung Health OAuth flow
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

    // Build Samsung Health OAuth URL
    const params = new URLSearchParams({
      client_id: config.healthApis.samsung.clientId,
      response_type: 'code',
      scope: 'shealth.read',
      redirect_uri: `${config.app.baseUrl}/api/health/oauth/samsung/callback`,
      state: user.id // Use user ID as state for security
    });

    const authUrl = `https://account.samsung.com/mobile/oauth2/authorize?${params.toString()}`;

    return NextResponse.json({
      success: true,
      authUrl,
      message: 'Redirect to Samsung Health authorization'
    });

  } catch (error) {
    console.error('Samsung OAuth initiation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to initiate Samsung Health authorization'
    }, { status: 500 });
  }
}

// Handle Samsung Health OAuth callback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, state } = body;

    if (!code || !state) {
      return NextResponse.json({
        success: false,
        error: 'Authorization code and state required'
      }, { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://account.samsung.com/mobile/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: config.healthApis.samsung.clientId,
        client_secret: config.healthApis.samsung.clientSecret,
        redirect_uri: `${config.app.baseUrl}/api/health/oauth/samsung/callback`
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    
    // Connect Samsung Health with the obtained credentials
    const result = await realHealthDataAggregator.connectHealthSource(
      state, // user ID
      'samsung_health',
      {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
        userId: tokenData.user_id || state
      }
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Samsung Health connected successfully',
      source: 'samsung_health'
    });

  } catch (error: any) {
    console.error('Samsung OAuth callback error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to complete Samsung Health authorization'
    }, { status: 500 });
  }
}
