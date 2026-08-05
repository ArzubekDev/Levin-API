import { api, type User } from "@/shared/lib/api";

export async function signInWithGoogle(credential: string) {
  return api.post<{ token: string; user: User }>("/auth/google", { credential });
}

export async function signInWithGitHub(code: string) {
  return api.post<{ token: string; user: User }>("/auth/github", { code });
}
