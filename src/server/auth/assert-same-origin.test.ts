import type { NextRequest } from "next/server";

import { assertSameOrigin } from "@/server/auth/assert-same-origin";

function mockRequest({
  method,
  origin,
  referer,
}: {
  method: string;
  origin?: string | null;
  referer?: string | null;
}): NextRequest {
  const headers = new Headers();
  if (origin) headers.set("origin", origin);
  if (referer) headers.set("referer", referer);

  return {
    method,
    headers,
    nextUrl: { origin: "http://localhost:3000" },
  } as unknown as NextRequest;
}

describe("assertSameOrigin", () => {
  it("allows safe methods without Origin", () => {
    expect(assertSameOrigin(mockRequest({ method: "GET" })).ok).toBe(true);
  });

  it("allows mutating requests from the same origin", () => {
    expect(
      assertSameOrigin(mockRequest({ method: "POST", origin: "http://localhost:3000" })).ok,
    ).toBe(true);
  });

  it("rejects mutating requests from a foreign origin", () => {
    const result = assertSameOrigin(
      mockRequest({ method: "POST", origin: "https://evil.example" }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(403);
    }
  });

  it("accepts Referer when Origin is missing", () => {
    expect(
      assertSameOrigin(
        mockRequest({
          method: "DELETE",
          referer: "http://localhost:3000/dashboard",
        }),
      ).ok,
    ).toBe(true);
  });
});
