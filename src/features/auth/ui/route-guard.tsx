"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  DEFAULT_AUTHENTICATED_ROUTE,
  isGuestOnlyRoute,
  isProtectedRoute,
  LOGIN_ROUTE,
} from "@/features/auth/config/routes";
import { useSession } from "@/features/auth/lib/use-session";
import { Button } from "@/shared/components/ui/button";
import { AnimatedBoltIcon } from "@/shared/ui/AnimatedBoltIcon";

function RouteGuardFallback() {
  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center">
      <AnimatedBoltIcon size={40} variant="loader" />
    </div>
  );
}

function RouteGuardUnavailable({
  isRetrying,
  onRetry,
}: {
  isRetrying: boolean;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="fixed inset-0 z-110 flex flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center"
    >
      <AnimatedBoltIcon size={40} variant="loader" />
      <div className="space-y-2">
        <p className="text-lg font-semibold text-white">Сервис временно недоступен</p>
        <p className="max-w-sm text-sm text-slate-400">
          Не удалось проверить сессию. Попробуйте ещё раз через несколько секунд.
        </p>
      </div>
      <Button
        className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        disabled={isRetrying}
        onClick={onRetry}
      >
        {isRetrying ? "Повтор…" : "Повторить"}
      </Button>
    </div>
  );
}

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status, isFetching, refetch } = useSession();

  useEffect(() => {
    if (status === "loading" || status === "unavailable") return;

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

  if (status === "unavailable" && isProtectedRoute(pathname)) {
    return <RouteGuardUnavailable isRetrying={isFetching} onRetry={() => void refetch()} />;
  }

  if (status === "authenticated" && isGuestOnlyRoute(pathname)) {
    return <RouteGuardFallback />;
  }

  if (status === "unauthenticated" && isProtectedRoute(pathname)) {
    return <RouteGuardFallback />;
  }

  return children;
}
