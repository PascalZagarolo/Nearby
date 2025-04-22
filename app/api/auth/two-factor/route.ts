import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sessions, twoFactorAuth, users } from '@/db/schema';
import { randomUUID } from 'crypto';
import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';

// Define the request types
interface GenerateTokenRequest {
  userId: string;
}

interface VerifyTokenRequest {
  token: string;
}

// Helper function to generate a token
function generateToken(length = 6): string {
  // Generate a random numeric token (for simplicity)
  // In production, you might want to use a proper TOTP library
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to add minutes to a date
function addMinutes(date: Date, minutes: number): Date {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}

// Generate 2FA token
export async function POST(request: Request) {
  try {
    // Parse request body
    const body: GenerateTokenRequest = await request.json();
    
    if (!body.userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.id, body.userId),
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if 2FA is enabled for this user
    if (!user.twoFactorEnabled) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not enabled for this user' },
        { status: 400 }
      );
    }
    
    // Generate a new 2FA token
    const token = generateToken();
    const expiresAt = addMinutes(new Date(), 10); // Token expires in 10 minutes
    
    // Get client info
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Create a new 2FA record
    await db.insert(twoFactorAuth).values({
      id: randomUUID(),
      userId: user.id,
      token: token,
      valid: true,
      expires: expiresAt,
      ip: ip.toString(),
      userAgent,
      createdAt: new Date(),
    });
    
    // In a real application, you would send this token via email or SMS
    // For demo purposes, we'll return it in the response
    return NextResponse.json(
      { 
        message: 'Two-factor authentication token generated',
        // Include token in response for demo/development purposes
        // In production, you would NOT include this in the response
        token,
        expires: expiresAt
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Two-factor token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate two-factor token' },
      { status: 500 }
    );
  }
}

// Verify 2FA token
export async function PUT(request: Request) {
  try {
    // Parse request body
    const body: VerifyTokenRequest = await request.json();
    
    if (!body.token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }
    
    // Find the 2FA record
    const twoFactorRecord = await db.query.twoFactorAuth.findFirst({
      where: eq(twoFactorAuth.token, body.token),
    });
    
    if (!twoFactorRecord) {
      return NextResponse.json(
        { error: 'Invalid two-factor token' },
        { status: 400 }
      );
    }
    
    // Check if token is valid
    if (!twoFactorRecord.valid) {
      return NextResponse.json(
        { error: 'Token has already been used' },
        { status: 400 }
      );
    }
    
    // Check if token is expired
    if (new Date() > twoFactorRecord.expires) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }
    
    // Mark the token as used
    await db.update(twoFactorAuth)
      .set({ valid: false })
      .where(eq(twoFactorAuth.id, twoFactorRecord.id));
    
    return NextResponse.json(
      { message: 'Two-factor authentication successful' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Two-factor verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify two-factor token' },
      { status: 500 }
    );
  }
} 