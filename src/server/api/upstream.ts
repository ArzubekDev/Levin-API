const DEFAULT_UPSTREAM = "http://localhost:4000";

export const UPSTREAM_TIMEOUT_MS = 8_000;

export function mapUpstreamFetchError(error: unknown): { status: 502 | 504; message: string } {
  const name = error instanceof Error ? error.name : "";
  if (name === "TimeoutError" || name === "AbortError") {
    return { status: 504, message: "Upstream timeout" };
  }

  return { status: 502, message: "Upstream unavailable" };
}

export function getUpstreamBaseUrl() {
  return (process.env.API_INTERNAL_URL || DEFAULT_UPSTREAM).replace(/\/$/, "");
}

export function buildUpstreamUrl(path: string, search = "") {
  const cleanPath = path.replace(/^\//, "");
  return `${getUpstreamBaseUrl()}/${cleanPath}${search}`;
}

export const BLOCKED_UPSTREAM_AUTH_PATHS = new Set([
  "auth/google",
  "auth/github",
  "auth/dev-login",
]);

export function isBlockedUpstreamAuthPath(pathSegments: string[]) {
  return BLOCKED_UPSTREAM_AUTH_PATHS.has(pathSegments.join("/"));
}
