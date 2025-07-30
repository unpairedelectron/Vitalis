import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      console.error('Oura OAuth error:', error);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=oura_auth_failed`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=missing_auth_params`);
    }

    // Verify state parameter contains valid JWT
    let userId: string;
    try {
      const decoded = jwt.verify(state, process.env.JWT_SECRET!) as { userId: string };
      userId = decoded.userId;
    } catch (err) {
      console.error('Invalid state parameter:', err);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=invalid_state`);
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://api.ouraring.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/health/oauth/oura`,
        client_id: process.env.OURA_CLIENT_ID!,
        client_secret: process.env.OURA_CLIENT_SECRET!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Oura token exchange failed:', errorData);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=token_exchange_failed`);
    }

    const tokenData = await tokenResponse.json();

    // Get user info from Oura
    const userResponse = await fetch('https://api.ouraring.com/v2/usercollection/personal_info', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    let ouraUserId = 'oura_user'; // Default fallback
    if (userResponse.ok) {
      const userData = await userResponse.json();
      ouraUserId = userData.id || 'oura_user';
    }

    // Store device connection in database
    const db = getDatabase();
    await db.deviceConnection.upsert({
      where: {
        userId_deviceType: {
          userId,
          deviceType: 'OURA',
        },
      },
      update: {
        isConnected: true,
        lastSync: new Date(),
        connectionData: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
          userId: ouraUserId,
          scopes: ['personal', 'daily'],
        },
      },
      create: {
        userId,
        deviceType: 'OURA',
        deviceId: ouraUserId,
        deviceName: 'Oura Ring',
        isConnected: true,
        lastSync: new Date(),
        connectionData: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
          userId: ouraUserId,
          scopes: ['personal', 'daily'],
        },
      },
    });

    console.log(`Oura connected successfully for user ${userId}`);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?success=oura_connected`);

  } catch (error) {
    console.error('Oura OAuth error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=oura_connection_failed`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Generate state parameter with user ID
    const state = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '10m' });

    // Build Oura authorization URL
    const authUrl = new URL('https://cloud.ouraring.com/oauth/authorize');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', process.env.OURA_CLIENT_ID!);
    authUrl.searchParams.set('redirect_uri', `${process.env.NEXTAUTH_URL}/api/health/oauth/oura`);
    authUrl.searchParams.set('scope', 'personal daily');
    authUrl.searchParams.set('state', state);

    return NextResponse.json({ authUrl: authUrl.toString() });

  } catch (error) {
    console.error('Error generating Oura auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate authorization URL' }, { status: 500 });
  }
}
