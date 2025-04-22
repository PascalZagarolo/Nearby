import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { serviceProviders, users, serviceSeekers } from '@/db/schema';
import { sessions } from '@/db/schema';

// GET - Retrieve user profile data
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    // Get session for auth check
    const sessionId = request.cookies.get('sessionId')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify session
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
    });
    
    if (!session || new Date() > session.expiresAt) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }
    
    // Get user
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get additional profile data based on role
    let additionalData = {};
    
    if (user.role === 'service_provider') {
      const providerData = await db.query.serviceProviders.findFirst({
        where: eq(serviceProviders.userId, userId),
      });
      
      if (providerData) {
        additionalData = {
          skills: providerData.skills || [],
          languages: providerData.languages || [],
          education: providerData.education || [],
          certifications: providerData.certifications || [],
          location: providerData.location || '',
        };
      }
    } else {
      const seekerData = await db.query.serviceSeekers.findFirst({
        where: eq(serviceSeekers.userId, userId),
      });
      
      if (seekerData) {
        additionalData = {
          location: seekerData.location || '',
          preferences: seekerData.preferences || {},
        };
      }
    }
    
    // Combine and return data
    return NextResponse.json({
      ...user,
      ...additionalData,
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve profile data' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile data
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    // Get session for auth check
    const sessionId = request.cookies.get('sessionId')?.value;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify session
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
    });
    
    if (!session || new Date() > session.expiresAt) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }
    
    // Check authorization (only update own profile)
    if (session.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to update this profile' },
        { status: 403 }
      );
    }
    
    // Parse request body
    const profileData = await request.json();
    
    // Get user
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update basic user info
    await db.update(users)
      .set({
        name: profileData.name,
        bio: profileData.bio,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
    
    // Update role-specific info
    if (user.role === 'service_provider') {
      // Get or create provider profile
      const providerExists = await db.query.serviceProviders.findFirst({
        where: eq(serviceProviders.userId, userId),
      });
      
      if (providerExists) {
        // Update existing provider profile
        await db.update(serviceProviders)
          .set({
            skills: profileData.skills || [],
            languages: profileData.languages || [],
            education: profileData.education || [],
            certifications: profileData.certifications || [],
            location: profileData.location || '',
            updatedAt: new Date(),
          })
          .where(eq(serviceProviders.userId, userId));
      } else {
        // Create new provider profile
        await db.insert(serviceProviders)
          .values({
            userId,
            title: profileData.name,
            description: profileData.bio || '',
            skills: profileData.skills || [],
            languages: profileData.languages || [],
            education: profileData.education || [],
            certifications: profileData.certifications || [],
            location: profileData.location || '',
          });
      }
    } else {
      // Get or create seeker profile
      const seekerExists = await db.query.serviceSeekers.findFirst({
        where: eq(serviceSeekers.userId, userId),
      });
      
      if (seekerExists) {
        // Update existing seeker profile
        await db.update(serviceSeekers)
          .set({
            location: profileData.location || '',
            updatedAt: new Date(),
          })
          .where(eq(serviceSeekers.userId, userId));
      } else {
        // Create new seeker profile
        await db.insert(serviceSeekers)
          .values({
            userId,
            location: profileData.location || '',
          });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile data' },
      { status: 500 }
    );
  }
} 