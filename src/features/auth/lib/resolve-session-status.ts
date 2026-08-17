export type SessionStatus = "loading" | "authenticated" | "unauthenticated" | "unavailable";

type ResolveSessionStatusInput = {
  isPending: boolean;
  hasUser: boolean;
  isError: boolean;
  isUnauthorized: boolean;
};

export function resolveSessionStatus({
  isPending,
  hasUser,
  isError,
  isUnauthorized,
}: ResolveSessionStatusInput): SessionStatus {
  if (isPending) return "loading";
  if (isError) {
    return isUnauthorized ? "unauthenticated" : "unavailable";
  }
  if (hasUser) return "authenticated";
  return "unauthenticated";
}
