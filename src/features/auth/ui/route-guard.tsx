"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  DEFAULT_AUTHENTICATED_ROUTE,
  isGuestOnlyRoute,
  isProtectedRoute,
  LOGIN_ROUTE,
} from "@/features/auth/config/routes";
import { useSession } from "@/features/auth/lib/use-session";
import { syncSessionCookie } from "@/shared/lib/access-token";

function RouteGuardFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
}

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    syncSessionCookie();
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && isGuestOnlyRoute(pathname)) {
      router.replace(DEFAULT_AUTHENTICATED_ROUTE);
      return;
    }

    if (status === "unauthenticated" && isProtectedRoute(pathname)) {
      router.replace(`${LOGIN_ROUTE}?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router, status]);

  if (status === "loading" && (isProtectedRoute(pathname) || isGuestOnlyRoute(pathname))) {
    return <RouteGuardFallback />;
  }

  if (status === "authenticated" && isGuestOnlyRoute(pathname)) {
    return <RouteGuardFallback />;
  }

  if (status === "unauthenticated" && isProtectedRoute(pathname)) {
    return <RouteGuardFallback />;
  }

  return children;
}
