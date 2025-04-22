import { NextResponse } from 'next/server';
import { db } from '@/db';

import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { emailVerifications, serviceProviders, serviceSeekers, users } from '@/db/schema';

// Define the registration request type
interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'service_provider';
}

// Helper function to generate a token
function generateToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

// Helper function to add hours to a date
function addHours(date: Date, hours: number): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: RegistrationRequest = await request.json();
    
    // Validate input
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if user with this email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    
    // Create a unique ID for the user
    const userId = randomUUID();
    
    // Create the user record
    const newUser = await db.insert(users).values({
      id: userId,
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role === 'service_provider' ? 'service_provider' : 'user',
      emailVerified: false,
      twoFactorEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    
    // Create email verification token
    const verificationToken = generateToken();
    const expiresAt = addHours(new Date(), 24); // Token expires in 24 hours
    
    await db.insert(emailVerifications).values({
      id: randomUUID(),
      userId: userId,
      token: verificationToken,
      type: 'email',
      expires: expiresAt,
      createdAt: new Date(),
    });
    
    // If the role is service_provider, create a service provider record
    if (body.role === 'service_provider') {
      await db.insert(serviceProviders).values({
        id: randomUUID(),
        userId: userId,
        title: `${body.name}'s Services`,
        description: 'Welcome to my services page!',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      // Create a service seeker record for all users by default
      await db.insert(serviceSeekers).values({
        id: randomUUID(),
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    // Remove the password from the response
    const userResponse = {
      id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
      role: newUser[0].role,
      emailVerified: newUser[0].emailVerified,
    };
    
    // In a real application, you would send an email with the verification link here
    // The link would include the verification token
    
    return NextResponse.json(
      { 
        message: 'User registered successfully. Please check your email to verify your account.',
        user: userResponse,
        // Include token in response for demo/development purposes
        // In production, you would NOT include this in the response
        verificationToken 
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 