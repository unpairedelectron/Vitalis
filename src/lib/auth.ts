// Enhanced Authentication for Vitalis Health Platform
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { DatabaseHelpers, prisma } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret';
const JWT_EXPIRES_IN = '7d';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  preferences?: any;
  lastLoginAt?: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

// Legacy interface for backward compatibility
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Explorer' | 'Guardian' | 'Platinum';
  joinDate: string;
  verified: boolean;
}

export class AuthService {
  // Sign Up
  static async signUp(userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    try {
      // Check if user already exists
      const existingUser = await DatabaseHelpers.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Validate password strength
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Create user
      const user = await DatabaseHelpers.createUser(userData);
      
      // Generate tokens
      const tokens = await this.generateTokens(user.id);
      
      // Create session
      await DatabaseHelpers.createSession(user.id, {
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt
      });

      return {
        user: this.formatUser(user),
        tokens
      };
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  }

  // Sign In
  static async signIn(email: string, password: string, userAgent?: string, ipAddress?: string): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    try {
      // Get user by email
      const user = await DatabaseHelpers.getUserByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate tokens
      const tokens = await this.generateTokens(user.id);
      
      // Create session
      await DatabaseHelpers.createSession(user.id, {
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
        userAgent,
        ipAddress
      });

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });

      return {
        user: this.formatUser(user),
        tokens
      };
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  }

  // Sign Out
  static async signOut(token: string): Promise<void> {
    try {
      // Decode token to get user ID
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Remove refresh token from database
      await prisma.session.deleteMany({
        where: {
          userId: decoded.userId
        }
      });
    } catch (error) {
      // Token might be invalid, but that's okay for sign out
      console.log('Sign out error:', error);
    }
  }

  // Verify Token
  static async verifyToken(token: string): Promise<AuthUser | null> {
    try {
      // Verify JWT
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      
      // Get session from database
      const session = await DatabaseHelpers.getValidSession(token);
      if (!session || !session.user) {
        return null;
      }

      return this.formatUser(session.user);
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }

  // Private Helper Methods
  private static async generateTokens(userId: string): Promise<AuthTokens> {
    const accessToken = jwt.sign(
      { userId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    return {
      accessToken,
      refreshToken,
      expiresAt
    };
  }

  private static formatUser(user: any): AuthUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      preferences: user.preferences,
      lastLoginAt: user.lastLoginAt
    };
  }
}

// Middleware Helper
export async function getAuthenticatedUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return null;
    }

    return await AuthService.verifyToken(token);
  } catch (error) {
    console.error('Auth middleware error:', error);
    return null;
  }
}

// Demo user creation for development
export async function createDemoUser(): Promise<{ user: AuthUser; tokens: AuthTokens }> {
  const demoEmail = 'demo@vitalis.ai';
  
  try {
    // Check if demo user already exists
    const existingUser = await DatabaseHelpers.getUserByEmail(demoEmail);
    if (existingUser) {
      // Sign in existing demo user
      return await AuthService.signIn(demoEmail, 'demo123456');
    }

    // Create new demo user
    return await AuthService.signUp({
      email: demoEmail,
      password: 'demo123456',
      firstName: 'Demo',
      lastName: 'User'
    });
  } catch (error) {
    console.error('Demo user creation error:', error);
    throw error;
  }
}

// Legacy functions for backward compatibility
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('vitalis-auth-token');
  const user = localStorage.getItem('vitalis-user');
  
  return !!(token && user);
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStr = localStorage.getItem('vitalis-user');
    if (!userStr) return null;
    
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('vitalis-auth-token');
  localStorage.removeItem('vitalis-user');
  
  // Redirect to home page
  window.location.href = '/';
}

export function requireAuth(): void {
  if (typeof window === 'undefined') return;
  
  if (!isAuthenticated()) {
    // Store the current page so we can redirect back after login
    localStorage.setItem('vitalis-redirect-after-login', window.location.pathname);
    window.location.href = '/signin';
  }
}
