import { getSafeNextPath } from "@/features/auth/lib/safe-next-path";

describe("getSafeNextPath", () => {
  it("returns relative next path", () => {
    expect(getSafeNextPath("/generate-api", "/dashboard")).toBe("/generate-api");
  });

  it("rejects open redirects and falls back", () => {
    expect(getSafeNextPath("//evil.com", "/dashboard")).toBe("/dashboard");
    expect(getSafeNextPath("https://evil.com", "/dashboard")).toBe("/dashboard");
    expect(getSafeNextPath(null, "/dashboard")).toBe("/dashboard");
  });
});
