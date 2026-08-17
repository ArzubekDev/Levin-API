import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { assertSameOrigin } from "@/server/auth/assert-same-origin";
import { clearSessionCookie } from "@/server/auth/session-cookie";

export async function POST(request: NextRequest) {
  const csrf = assertSameOrigin(request);
  if (!csrf.ok) {
    return NextResponse.json({ message: csrf.message }, { status: csrf.status });
  }

  const response = new NextResponse(null, { status: 204 });
  clearSessionCookie(response);
  return response;
}
