// // src/middleware.js
// import { NextResponse } from 'next/server';

// const PROTECTED_ROUTES = ['/polls']; // List of routes that require authentication

// export function middleware(request) {
//   // Get the access token from cookies
//   const accessToken = request.cookies.get('access_token');

//   // Check if the current path is protected and the user is not authenticated
//   if (PROTECTED_ROUTES.includes(request.nextUrl.pathname) && !accessToken) {
//     // Redirect to the login page
//     const loginUrl = new URL('/auth/login', request.nextUrl.origin);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Continue to the requested page
//   return NextResponse.next();
// }

// // Set the paths where this middleware will run
// export const config = {
//   matcher: ['/polls'],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/polls", "/dashboard", "/profile"]; 

export function middleware(request: NextRequest) {
  const { nextUrl: url, cookies,  } = request;
  const pathname = url.pathname;

  // Try common cookie names for access token
  const token =
    cookies.get("access_token")?.value ??
    cookies.get("accessToken")?.value ??
    cookies.get("token")?.value ??
    undefined;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isProtected && !token) {
    const loginUrl = url.clone();
    loginUrl.pathname = "/auth/login";
    // preserve original path so you can redirect back after login
    loginUrl.searchParams.set("returnTo", pathname + url.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher should match the protected paths (include :path* to cover nested routes)
  matcher: ["/polls/:path*", "/dashboard/:path*", "/profile/:path*"],
};