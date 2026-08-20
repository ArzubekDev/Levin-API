import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  buildUpstreamUrl,
  isBlockedUpstreamAuthPath,
  mapUpstreamFetchError,
  UPSTREAM_TIMEOUT_MS,
} from "@/server/api/upstream";
import { assertSameOrigin } from "@/server/auth/assert-same-origin";
import { clearSessionCookie } from "@/server/auth/session-cookie";
import { SESSION_COOKIE } from "@/shared/lib/session-cookie";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "cookie",
  "content-length",
  "content-encoding",
]);

function buildUpstreamHeaders(request: NextRequest, token: string | undefined) {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return;
    if (key.toLowerCase() === "authorization") return;
    headers.set(key, value);
  });

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export async function proxyToUpstream(request: NextRequest, pathSegments: string[]) {
  const csrf = assertSameOrigin(request);
  if (!csrf.ok) {
    return NextResponse.json({ message: csrf.message }, { status: csrf.status });
  }

  if (isBlockedUpstreamAuthPath(pathSegments)) {
    return NextResponse.json({ message: "Use /api/auth/* for authentication" }, { status: 404 });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const upstreamUrl = buildUpstreamUrl(pathSegments.join("/"), request.nextUrl.search);
  const headers = buildUpstreamHeaders(request, token);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, init);
  } catch (error) {
    const mapped = mapUpstreamFetchError(error);
    return NextResponse.json({ message: mapped.message }, { status: mapped.status });
  }

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return;
    if (key.toLowerCase() === "set-cookie") return;
    responseHeaders.set(key, value);
  });

  const response = new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });

  if (upstream.status === 401 && pathSegments.join("/") === "auth/me") {
    clearSessionCookie(response);
  }

  return response;
}
