import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { assertSameOrigin } from "@/server/auth/assert-same-origin";
import { exchangeOAuthAndSetSession } from "@/server/auth/exchange-oauth";

export async function POST(request: NextRequest) {
  const csrf = assertSameOrigin(request);
  if (!csrf.ok) {
    return NextResponse.json({ message: csrf.message }, { status: csrf.status });
  }

  const body = (await request.json().catch(() => null)) as { code?: string } | null;
  if (!body?.code) {
    return NextResponse.json({ message: "Missing code" }, { status: 400 });
  }

  return exchangeOAuthAndSetSession("auth/github", { code: body.code });
}
