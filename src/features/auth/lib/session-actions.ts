import type { QueryClient } from "@tanstack/react-query";

import { authKeys } from "@/features/auth/model/auth-keys";
import { clearAccessToken, setAccessToken } from "@/shared/lib/access-token";

export async function completeSignIn(token: string, queryClient: QueryClient) {
  setAccessToken(token);
  await queryClient.invalidateQueries({ queryKey: authKeys.all });
}

export function signOut(queryClient: QueryClient) {
  clearAccessToken();
  queryClient.removeQueries({ queryKey: authKeys.all });
}
