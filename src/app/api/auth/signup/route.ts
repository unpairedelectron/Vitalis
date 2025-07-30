// Sign Up API Route
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = signUpSchema.parse(body);
    
    // Create user and generate tokens
    const { user, tokens } = await AuthService.signUp(validatedData);
    
    // Set HTTP-only cookie for security
    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully',
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
    console.error('SignUp API error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create account'
    }, { status: 400 });
  }
}
