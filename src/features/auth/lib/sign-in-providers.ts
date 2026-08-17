import type { User } from "@/entities/user";

async function postAuth<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
    throw new Error(error.message || "Ошибка аутентификации");
  }

  return response.json() as Promise<T>;
}

export async function signInWithGoogle(credential: string) {
  return postAuth<{ user: User }>("/api/auth/google", { credential });
}

export async function signInWithGitHub(code: string) {
  return postAuth<{ user: User }>("/api/auth/github", { code });
}
