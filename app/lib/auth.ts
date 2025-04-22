'use server';

import { cookies } from 'next/headers';
import { db } from '@/db';
import { sessions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  isAuthenticated: boolean;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const sessionId = cookies().get('sessionId')?.value;
    
    if (!sessionId) {
      return null;
    }
    
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
    
    if (!session || new Date() > session.expiresAt) {
      return null;
    }
    
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      avatar: session.user.avatar,
      isAuthenticated: true
    };
    
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Client-side version using fetch API
export async function getCurrentUserClient(): Promise<CurrentUser | null> {
  try {
    // Get session ID from cookie
    const sessionId = document.cookie
      .split('; ')
      .find(row => row.startsWith('sessionId='))
      ?.split('=')[1];
    
    if (!sessionId) {
      return null;
    }
    
    // Validate session with the API
    const response = await fetch(`/api/auth/session?sessionId=${sessionId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (!data.valid) {
      return null;
    }
    
    // Return user info
    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      avatar: data.user.avatar,
      isAuthenticated: true
    };
    
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
} 