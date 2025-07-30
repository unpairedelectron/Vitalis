// Sign In API Route
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = signInSchema.parse(body);
    
    // Get user agent and IP for session tracking
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     undefined;
    
    // Authenticate user
    const { user, tokens } = await AuthService.signIn(
      validatedData.email,
      validatedData.password,
      userAgent,
      ipAddress
    );
    
    // Set HTTP-only cookies for security
    const response = NextResponse.json({
      success: true,
      message: 'Signed in successfully',
      user
    });
    
    response.cookies.set('vitalis-token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: tokens.expiresAt
    });
    
    response.cookies.set('vitalis-refresh-token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
    
    return response;
    
  } catch (error: any) {
    console.error('SignIn API error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to sign in'
    }, { status: 401 });
  }
}
