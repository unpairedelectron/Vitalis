// Sign Out API Route
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('vitalis-token')?.value;
    
    if (token) {
      // Revoke the session
      await AuthService.signOut(token);
    }
    
    // Clear cookies
    const response = NextResponse.json({
      success: true,
      message: 'Signed out successfully'
    });
    
    response.cookies.delete('vitalis-token');
    response.cookies.delete('vitalis-refresh-token');
    
    return response;
    
  } catch (error: any) {
    console.error('SignOut API error:', error);
    
    // Still clear cookies even if there's an error
    const response = NextResponse.json({
      success: true,
      message: 'Signed out'
    });
    
    response.cookies.delete('vitalis-token');
    response.cookies.delete('vitalis-refresh-token');
    
    return response;
  }
}
