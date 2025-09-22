// src/middleware.js
import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/polls']; // List of routes that require authentication

export function middleware(request) {
  // Get the access token from cookies
  const accessToken = request.cookies.get('access_token');

  // Check if the current path is protected and the user is not authenticated
  if (PROTECTED_ROUTES.includes(request.nextUrl.pathname) && !accessToken) {
    // Redirect to the login page
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Set the paths where this middleware will run
export const config = {
  matcher: ['/polls'],
};