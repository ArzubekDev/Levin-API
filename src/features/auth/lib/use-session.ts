"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useSyncExternalStore } from "react";

import { authKeys } from "@/features/auth/model/auth-keys";
import { signOut as performSignOut } from "@/features/auth/lib/session-actions";
import { api, type User } from "@/shared/lib/api";
import { getAccessToken, subscribeAccessToken } from "@/shared/lib/access-token";

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export function useSession() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = useSyncExternalStore(subscribeAccessToken, getAccessToken, () => null);

  const sessionQuery = useQuery({
    queryKey: authKeys.session(token),
    queryFn: () => api.get<User>("/auth/me"),
    enabled: Boolean(token),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const status = useMemo<SessionStatus>(() => {
    if (!token) return "unauthenticated";
    if (sessionQuery.isPending) return "loading";
    if (sessionQuery.data) return "authenticated";
    if (sessionQuery.isError) return "unauthenticated";
    return "loading";
  }, [token, sessionQuery.isPending, sessionQuery.data, sessionQuery.isError]);

  const signOut = useCallback(async () => {
    performSignOut(queryClient);
    router.replace("/");
  }, [queryClient, router]);

  return {
    user: sessionQuery.data ?? null,
    token,
    status,
    isAuthenticated: status === "authenticated",
    signOut,
  };
}
