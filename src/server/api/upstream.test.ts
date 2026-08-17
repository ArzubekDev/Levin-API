import { isBlockedUpstreamAuthPath, mapUpstreamFetchError } from "@/server/api/upstream";

describe("isBlockedUpstreamAuthPath", () => {
  it("blocks OAuth login paths that would leak tokens", () => {
    expect(isBlockedUpstreamAuthPath(["auth", "google"])).toBe(true);
    expect(isBlockedUpstreamAuthPath(["auth", "github"])).toBe(true);
    expect(isBlockedUpstreamAuthPath(["auth", "dev-login"])).toBe(true);
  });

  it("allows session and resource paths", () => {
    expect(isBlockedUpstreamAuthPath(["auth", "me"])).toBe(false);
    expect(isBlockedUpstreamAuthPath(["projects"])).toBe(false);
  });
});

describe("mapUpstreamFetchError", () => {
  it("maps timeout and abort to 504", () => {
    expect(
      mapUpstreamFetchError(Object.assign(new Error("aborted"), { name: "TimeoutError" })),
    ).toEqual({
      status: 504,
      message: "Upstream timeout",
    });
    expect(
      mapUpstreamFetchError(Object.assign(new Error("aborted"), { name: "AbortError" })),
    ).toEqual({
      status: 504,
      message: "Upstream timeout",
    });
  });

  it("maps connection failures to 502", () => {
    expect(mapUpstreamFetchError(new TypeError("fetch failed"))).toEqual({
      status: 502,
      message: "Upstream unavailable",
    });
  });
});
