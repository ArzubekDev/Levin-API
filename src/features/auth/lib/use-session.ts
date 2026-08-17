"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import type { User } from "@/entities/user";
import {
  resolveSessionStatus,
  type SessionStatus,
} from "@/features/auth/lib/resolve-session-status";
import { signOut as performSignOut } from "@/features/auth/lib/session-actions";
import { authKeys } from "@/features/auth/model/auth-keys";
import { fetchClient } from "@/shared/lib/fetch-client";
import type { FetchError } from "@/shared/lib/fetch-error";
import { isUnauthorizedError } from "@/shared/lib/fetch-error";

export type { SessionStatus };

const SESSION_PROBE_TIMEOUT_MS = 10_000;

export function useSession() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sessionQuery = useQuery<User, FetchError>({
    queryKey: authKeys.session(),
    queryFn: () =>
      fetchClient.get<User>("/auth/me", {
        clearSessionOn401: false,
        signal: AbortSignal.timeout(SESSION_PROBE_TIMEOUT_MS),
      }),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const status = useMemo<SessionStatus>(
    () =>
      resolveSessionStatus({
        isPending: sessionQuery.isPending,
        hasUser: Boolean(sessionQuery.data),
        isError: sessionQuery.isError,
        isUnauthorized: isUnauthorizedError(sessionQuery.error),
      }),
    [sessionQuery.isPending, sessionQuery.data, sessionQuery.isError, sessionQuery.error],
  );

  const signOut = useCallback(async () => {
    await performSignOut(queryClient);
    router.replace("/");
  }, [queryClient, router]);

  return {
    user: sessionQuery.data ?? null,
    status,
    isAuthenticated: status === "authenticated",
    isFetching: sessionQuery.isFetching,
    refetch: sessionQuery.refetch,
    signOut,
  };
}
