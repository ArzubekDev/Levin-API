export function getSafeNextPath(next: string | null | undefined, fallback: string): string {
  if (!next?.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }

  return next;
}
