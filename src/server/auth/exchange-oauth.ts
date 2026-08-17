import { NextResponse } from "next/server";

import type { User } from "@/entities/user";
import { buildUpstreamUrl } from "@/server/api/upstream";
import { setSessionCookie } from "@/server/auth/session-cookie";

type AuthSuccess = {
  token: string;
  user: User;
};

export async function exchangeOAuthAndSetSession(
  path: "auth/google" | "auth/github",
  body: unknown,
) {
  const upstream = await fetch(buildUpstreamUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await upstream.json().catch(() => null)) as
    AuthSuccess | { message?: string } | null;

  if (!upstream.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload && payload.message
        ? String(payload.message)
        : "Ошибка аутентификации";
    return NextResponse.json({ message }, { status: upstream.status });
  }

  if (!payload || typeof payload !== "object" || !("token" in payload) || !payload.token) {
    return NextResponse.json({ message: "Некорректный ответ авторизации" }, { status: 502 });
  }

  const response = NextResponse.json({ user: payload.user });
  setSessionCookie(response, payload.token);
  return response;
}
