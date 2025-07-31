import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      console.error('Fitbit OAuth error:', error);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=fitbit_auth_failed`);
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
    const tokenResponse = await fetch('https://api.fitbit.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        client_id: process.env.FITBIT_CLIENT_ID!,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/health/oauth/fitbit`,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Fitbit token exchange failed:', errorData);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=token_exchange_failed`);
    }

    const tokenData = await tokenResponse.json();

    // Get user profile from Fitbit
    const profileResponse = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error('Failed to fetch Fitbit profile');
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=profile_fetch_failed`);
    }

    const profileData = await profileResponse.json();

    // Store device connection in database
    const db = prisma;
    await db.deviceConnection.upsert({
      where: {
        userId_deviceId: {
          userId,
          deviceId: `fitbit_${profileData.user.encodedId}`,
        },
      },
      update: {
        isConnected: true,
        lastSyncAt: new Date(),
        connectionData: JSON.stringify({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
          userId: profileData.user.encodedId,
          scopes: tokenData.scope?.split(' ') || [],
        }),
      },
      create: {
        userId,
        deviceType: 'FITBIT',
        deviceId: `fitbit_${profileData.user.encodedId}`,
        deviceName: 'Fitbit Account',
        manufacturer: 'Fitbit',
        connectionType: 'API',
        isConnected: true,
        lastSyncAt: new Date(),
        dataTypes: 'heart_rate,steps,sleep,calories',
        connectionData: JSON.stringify({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
          userId: profileData.user.encodedId,
          scopes: tokenData.scope?.split(' ') || [],
        }),
      },
    });

    console.log(`Fitbit connected successfully for user ${userId}`);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?success=fitbit_connected`);

  } catch (error) {
    console.error('Fitbit OAuth error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=fitbit_connection_failed`);
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

    // Build Fitbit authorization URL
    const authUrl = new URL('https://www.fitbit.com/oauth2/authorize');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', process.env.FITBIT_CLIENT_ID!);
    authUrl.searchParams.set('redirect_uri', `${process.env.NEXTAUTH_URL}/api/health/oauth/fitbit`);
    authUrl.searchParams.set('scope', 'activity heartrate sleep profile');
    authUrl.searchParams.set('state', state);

    return NextResponse.json({ authUrl: authUrl.toString() });

  } catch (error) {
    console.error('Error generating Fitbit auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate authorization URL' }, { status: 500 });
  }
}