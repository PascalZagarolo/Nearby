import { NextResponse } from 'next/server';
import { db } from '@/db';

import { eq, lt  } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { sessions, users } from '@/db/schema';

// Define request types
interface CreateSessionRequest {
  email: string;
  password: string;
}



// Helper function to add days to a date
function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

// Create a new session (login)
export async function POST(request: Request) {
  try {
    // Parse request body
    const body: CreateSessionRequest = await request.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Email not verified. Please verify your email before logging in.' },
        { status: 403 }
      );
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Get client info
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Generate session ID
    const sessionId = randomUUID();
    
    // Set session expiry (30 days from now)
    const expiresAt = addDays(new Date(), 30);
    
    // Create session
    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt,
      createdAt: new Date(),
      userAgent,
      ipAddress: ip.toString(),
      data: {
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
    
    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      return NextResponse.json(
        {
          requiresTwoFactor: true,
          userId: user.id,
          sessionId
        },
        { status: 200 }
      );
    }
    
    // Return session info (excluding sensitive data)
    return NextResponse.json(
      {
        sessionId,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        expiresAt
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// Validate a session
export async function GET(request: Request) {
  try {
    // Get session ID from query params
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    // Find the session
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          }
        }
      }
    });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }
    
    // Check if session is expired
    if (new Date() > session.expiresAt) {
      // Delete expired session
      await db.delete(sessions)
        .where(eq(sessions.id, sessionId));
        
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      );
    }
    
    // Return session info
    return NextResponse.json(
      {
        valid: true,
        session: {
          id: session.id,
          userId: session.userId,
          expiresAt: session.expiresAt,
          data: session.data
        },
        user: session.user
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate session' },
      { status: 500 }
    );
  }
}

// Destroy a session (logout)
export async function DELETE(request: Request) {
  try {
    // Get session ID from query params
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    // Delete the session
    await db.delete(sessions)
      .where(eq(sessions.id, sessionId));
    
    return NextResponse.json(
      { message: 'Session destroyed successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Session destruction error:', error);
    return NextResponse.json(
      { error: 'Failed to destroy session' },
      { status: 500 }
    );
  }
}

// Cleanup expired sessions (can be called via a scheduled job)
export async function PATCH() {
  try {
    // Delete all expired sessions
    await db.delete(sessions)
      .where(lt(sessions.expiresAt, new Date()));
    
    return NextResponse.json(
      { message: 'Expired sessions cleaned up' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to clean up expired sessions' },
      { status: 500 }
    );
  }
} 