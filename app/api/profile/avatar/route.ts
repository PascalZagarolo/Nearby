import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users, sessions } from '@/db/schema';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
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
    
    const userId = session.userId;
    
    // Parse the formData
    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const fileType = file.type;
    if (!fileType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }
    
    // Create unique filename
    const fileExtension = fileType.split('/')[1];
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create path for uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');
    const filePath = join(uploadDir, fileName);
    
    // Ensure directory exists
    await ensureDirectoryExists(uploadDir);
    
    // Write file
    await writeFile(filePath, buffer);
    
    // Update user avatar in database
    const avatarUrl = `/uploads/avatars/${fileName}`;
    await db.update(users)
      .set({ avatar: avatarUrl })
      .where(eq(users.id, userId));
    
    return NextResponse.json({
      success: true,
      avatar: avatarUrl
    });
    
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    );
  }
}

// Helper function to ensure directory exists
async function ensureDirectoryExists(dirPath: string) {
  try {
    const { mkdir } = require('fs/promises');
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
} 