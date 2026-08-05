import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  DEFAULT_AUTHENTICATED_ROUTE,
  isGuestOnlyRoute,
  isProtectedRoute,
  LOGIN_ROUTE,
} from "@/features/auth/config/routes";
import { SESSION_COOKIE } from "@/shared/lib/session-cookie";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (hasSession && isGuestOnlyRoute(pathname)) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_ROUTE, request.url));
  }

  if (!hasSession && isProtectedRoute(pathname)) {
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|backend|.*\\..*).*)"],
};
