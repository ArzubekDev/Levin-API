export function getPublicApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (!configured || configured.startsWith("/")) {
    return process.env.API_INTERNAL_URL || "http://localhost:4000";
  }
  return configured.replace(/\/$/, "");
}
