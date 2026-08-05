export const PUBLIC_ROUTES = ["/", "/docs"] as const;

export const GUEST_ONLY_ROUTES = ["/login"] as const;

export const AUTH_FLOW_ROUTES = ["/login/github/callback"] as const;

function matchesRoute(pathname: string, route: string) {
  if (route === "/") {
    return pathname === "/";
  }

  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => matchesRoute(pathname, route));
}

export function isGuestOnlyRoute(pathname: string) {
  return GUEST_ONLY_ROUTES.some((route) => pathname === route);
}

export function isAuthFlowRoute(pathname: string) {
  return AUTH_FLOW_ROUTES.some((route) => matchesRoute(pathname, route));
}

export function isProtectedRoute(pathname: string) {
  return !isPublicRoute(pathname) && !isGuestOnlyRoute(pathname) && !isAuthFlowRoute(pathname);
}

export const LOGIN_ROUTE = "/login";
export const DEFAULT_AUTHENTICATED_ROUTE = "/dashboard";
