import type { NextRequest } from "next/server";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function getOriginFromReferer(referer: string | null): string | null {
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function assertSameOrigin(
  request: NextRequest,
): { ok: true } | { ok: false; status: 403; message: string } {
  if (!MUTATING_METHODS.has(request.method)) {
    return { ok: true };
  }

  const expected = request.nextUrl.origin;
  const origin = request.headers.get("origin");
  const refererOrigin = getOriginFromReferer(request.headers.get("referer"));
  const actual = origin ?? refererOrigin;

  if (!actual || actual !== expected) {
    return { ok: false, status: 403, message: "Forbidden: invalid origin" };
  }

  return { ok: true };
}
