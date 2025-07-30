// User Profile API Route
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { DatabaseHelpers } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('vitalis-token')?.value;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 });
    }
    
    // Verify token and get user
    const user = await AuthService.verifyToken(token);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid token'
      }, { status: 401 });
    }
    
    // Get full user profile
    const fullUser = await DatabaseHelpers.getUserById(user.id);
    
    if (!fullUser) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }
    
    // Return user profile (excluding password)
    const userProfile = {
      id: fullUser.id,
      email: fullUser.email,
      firstName: fullUser.firstName,
      lastName: fullUser.lastName,
      avatar: fullUser.avatar,
      dateOfBirth: fullUser.dateOfBirth,
      gender: fullUser.gender,
      height: fullUser.height,
      weight: fullUser.weight,
      timezone: fullUser.timezone,
      language: fullUser.language,
      country: fullUser.country,
      preferences: fullUser.preferences,
      deviceConnections: fullUser.deviceConnections,
      medicalHistory: fullUser.medicalHistory,
      emergencyContact: fullUser.emergencyContact,
      createdAt: fullUser.createdAt,
      lastLoginAt: fullUser.lastLoginAt
    };
    
    return NextResponse.json({
      success: true,
      user: userProfile
    });
    
  } catch (error: any) {
    console.error('Profile API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to get user profile'
    }, { status: 500 });
  }
}
