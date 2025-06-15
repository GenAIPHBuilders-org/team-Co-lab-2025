/**
 * Middleware function to handle routing and authentication based on the presence of an access token.
 *
 * @param request - The incoming Next.js request object.
 * @returns A `NextResponse` object that determines the next action (e.g., continue, redirect).
 *
 * This middleware performs the following:
 * - Allows access to public paths if no access token is present.
 * - Redirects to the login page if no access token is found and the path is not public.
 * - Redirects authenticated users away from public paths to the dashboard.
 * - Ensures authenticated users are redirected to the dashboard if they attempt to access other paths.
 *
 * @remarks
 * Improvement Suggestion:
 * - The middleware should be enhanced to validate the `access_token` from the cookie with the backend
 *   to ensure its authenticity and expiration status. This would prevent unauthorized access using
 *   invalid or expired tokens.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/registration"];
const PRIVATE_PATHS = [
  "/dashboard",
  "/dashboard/course",
  "/dashboard/quiz",
  "/dashboard/course-quiz",
  "/dashboard/shop",
  "/dashboard/daily-quest",
  "/dashboard/user-profile",
  "/dashboard/leaderboard",
  "/dashboard/referral",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  if (PUBLIC_PATHS.includes(pathname) && !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && PRIVATE_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (token && !PRIVATE_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
