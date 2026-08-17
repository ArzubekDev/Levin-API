import type { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { projectKeys } from "@/entities/project/model/project-keys";
import { authKeys } from "@/features/auth/model/auth-keys";

export async function completeSignIn(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: authKeys.all });
  await queryClient.invalidateQueries({ queryKey: projectKeys.all });
  toast.success("Вы вошли в аккаунт");
}

export async function signOut(queryClient: QueryClient) {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } finally {
    await queryClient.cancelQueries({ queryKey: authKeys.all });
    await queryClient.cancelQueries({ queryKey: projectKeys.all });
    queryClient.setQueryData(authKeys.session(), null);
    queryClient.removeQueries({ queryKey: authKeys.all });
    queryClient.removeQueries({ queryKey: projectKeys.all });
  }
}
