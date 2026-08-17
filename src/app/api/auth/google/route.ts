import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { assertSameOrigin } from "@/server/auth/assert-same-origin";
import { exchangeOAuthAndSetSession } from "@/server/auth/exchange-oauth";

export async function POST(request: NextRequest) {
  const csrf = assertSameOrigin(request);
  if (!csrf.ok) {
    return NextResponse.json({ message: csrf.message }, { status: csrf.status });
  }

  const body = (await request.json().catch(() => null)) as { credential?: string } | null;
  if (!body?.credential) {
    return NextResponse.json({ message: "Missing credential" }, { status: 400 });
  }

  return exchangeOAuthAndSetSession("auth/google", { credential: body.credential });
}
