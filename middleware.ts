import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/verify-email',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/auth/register',
  '/api/auth/session',
  '/api/auth/verify-email',
  '/api/auth/two-factor',
];

// Check if a route is public
const isPublicRoute = (path: string): boolean => {
  return publicRoutes.some(route => path.startsWith(route)) || 
         path.includes('/_next') ||
         path.includes('/favicon.ico') ||
         path.includes('.') || // Static files
         path.startsWith('/api/public');
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for public routes
  if (isPublicRoute(path)) {
    return NextResponse.next();
  }
  
  // Check for session cookie
  const sessionId = request.cookies.get('sessionId')?.value;
  
  if (!sessionId) {
    // Redirect to sign in if no session
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  try {
    // Validate session on the server
    const response = await fetch(`${request.nextUrl.origin}/api/auth/session?sessionId=${sessionId}`, {
      headers: {
        'Cookie': `sessionId=${sessionId}`,
      },
    });
    
    if (!response.ok) {
      // Session is invalid - clear cookie and redirect to sign in
      const redirectResponse = NextResponse.redirect(new URL('/auth/signin', request.url));
      redirectResponse.cookies.delete('sessionId');
      return redirectResponse;
    }
    
    // Session is valid, continue
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, fail safe by redirecting to sign in
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 