export const authKeys = {
  all: ["auth"] as const,
  session: (token: string | null) => [...authKeys.all, "session", token] as const,
  projects: (token: string | null) => [...authKeys.all, "projects", token] as const,
};
