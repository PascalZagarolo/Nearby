import { NextResponse } from 'next/server';
import { db } from '@/db';

import { eq, lt } from 'drizzle-orm';
import { emailVerifications, users } from '@/db/schema';

// Define the request type
interface VerifyEmailRequest {
  token: string;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: VerifyEmailRequest = await request.json();
    
    if (!body.token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    // Find the verification record with basic query
    const verification = await db.query.emailVerifications.findFirst({
      where: eq(emailVerifications.token, body.token)
    });
    
    if (!verification) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }
    
    // Check if token is expired
    if (new Date() > verification.expires) {
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }
    
    // Update user's email verification status
    await db.update(users)
      .set({ 
        emailVerified: true,
        updatedAt: new Date()
      })
      .where(eq(users.id, verification.userId));
    
    // Delete the verification token (optional, you might want to keep it for audit purposes)
    await db.delete(emailVerifications)
      .where(eq(emailVerifications.id, verification.id));
    
    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}

// Cleanup expired tokens (can be called via a scheduled job)
export async function DELETE() {
  try {
    // Delete all expired verification tokens
    await db.delete(emailVerifications)
      .where(lt(emailVerifications.expires, new Date()));
    
    return NextResponse.json(
      { message: 'Expired verification tokens cleaned up' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to clean up expired tokens' },
      { status: 500 }
    );
  }
} 