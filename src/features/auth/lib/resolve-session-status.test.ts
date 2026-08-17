import { resolveSessionStatus } from "@/features/auth/lib/resolve-session-status";

describe("resolveSessionStatus", () => {
  it("returns loading while the session query is pending", () => {
    expect(
      resolveSessionStatus({
        isPending: true,
        hasUser: false,
        isError: false,
        isUnauthorized: false,
      }),
    ).toBe("loading");
  });

  it("returns authenticated when user data is available", () => {
    expect(
      resolveSessionStatus({
        isPending: false,
        hasUser: true,
        isError: false,
        isUnauthorized: false,
      }),
    ).toBe("authenticated");
  });

  it("returns unauthenticated on 401", () => {
    expect(
      resolveSessionStatus({
        isPending: false,
        hasUser: false,
        isError: true,
        isUnauthorized: true,
      }),
    ).toBe("unauthenticated");
  });

  it("returns unauthenticated when the probe succeeds with no user", () => {
    expect(
      resolveSessionStatus({
        isPending: false,
        hasUser: false,
        isError: false,
        isUnauthorized: false,
      }),
    ).toBe("unauthenticated");
  });

  it("returns unauthenticated when 401 leaves stale user data", () => {
    expect(
      resolveSessionStatus({
        isPending: false,
        hasUser: true,
        isError: true,
        isUnauthorized: true,
      }),
    ).toBe("unauthenticated");
  });

  it("returns unavailable when /auth/me fails for a non-auth reason", () => {
    expect(
      resolveSessionStatus({
        isPending: false,
        hasUser: false,
        isError: true,
        isUnauthorized: false,
      }),
    ).toBe("unavailable");
  });

  it("returns unavailable when a non-auth error leaves stale user data", () => {
    expect(
      resolveSessionStatus({
        isPending: false,
        hasUser: true,
        isError: true,
        isUnauthorized: false,
      }),
    ).toBe("unavailable");
  });
});
