import { NextResponse } from 'next/server';
import { db } from '@/db';

import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

// Define the request type
interface VerifyEmailRequest {
  email: string;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: VerifyEmailRequest = await request.json();
    
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Find the user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email)
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update user's email verification status
    await db.update(users)
      .set({ 
        emailVerified: true,
        updatedAt: new Date()
      })
      .where(eq(users.id, user.id));
    
    return NextResponse.json(
      { 
        message: 'Email verified successfully',
        emailVerified: true
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Manual email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 