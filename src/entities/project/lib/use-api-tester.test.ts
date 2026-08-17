import { act, renderHook } from "@testing-library/react";

import type { Project } from "../model/types";
import { useApiTester } from "./use-api-tester";

jest.mock("@/shared/config/env", () => ({
  getPublicApiBase: () => "http://api.test",
}));

const project: Project = {
  id: "1",
  name: "Users",
  endpointKey: "abc",
  schemaJson: { users: {}, posts: {} },
  delay: 0,
  errorRate: 0,
  defaultLimit: 20,
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("useApiTester", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("builds the endpoint url from the first resource and default limit", () => {
    const { result } = renderHook(() => useApiTester(project));

    expect(result.current.resources).toEqual(["users", "posts"]);
    expect(result.current.resource).toBe("users");
    expect(result.current.apiUrl).toBe("http://api.test/api/abc/users?limit=20");
  });

  it("resets tester state when the project changes", async () => {
    const { result, rerender } = renderHook(
      ({ current }: { current: Project | undefined }) => useApiTester(current),
      { initialProps: { current: project } },
    );

    await act(async () => {
      result.current.setLimitOverride("5");
      result.current.selectResource("posts");
    });

    rerender({
      current: {
        ...project,
        id: "2",
        endpointKey: "xyz",
        schemaJson: { orders: {} },
      },
    });

    expect(result.current.resource).toBe("orders");
    expect(result.current.limitOverride).toBe("");
    expect(result.current.apiUrl).toBe("http://api.test/api/xyz/orders?limit=20");
    expect(result.current.testResponse).toBeNull();
  });

  it("updates the url when resource or limit changes and clears the last response", async () => {
    const { result } = renderHook(() => useApiTester(project));

    await act(async () => {
      result.current.setLimitOverride("5");
      result.current.selectResource("posts");
    });

    expect(result.current.resource).toBe("posts");
    expect(result.current.apiUrl).toBe("http://api.test/api/abc/posts?limit=5");
    expect(result.current.testResponse).toBeNull();
    expect(result.current.responseStatus).toBeNull();
    expect(result.current.responseExpanded).toBe(false);
  });

  it("stores a formatted response after a successful test request", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true }),
    }) as jest.Mock;

    const { result } = renderHook(() => useApiTester(project));

    await act(async () => {
      await result.current.handleTest();
    });

    expect(global.fetch).toHaveBeenCalledWith("http://api.test/api/abc/users?limit=20");
    expect(result.current.responseStatus).toBe(200);
    expect(JSON.parse(result.current.testResponse ?? "")).toEqual(
      expect.objectContaining({
        status: 200,
        body: { ok: true },
      }),
    );
    expect(result.current.isTesting).toBe(false);
  });

  it("stores an error message when the test request fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("offline"));

    const { result } = renderHook(() => useApiTester(project));

    await act(async () => {
      await result.current.handleTest();
    });

    expect(result.current.responseStatus).toBeNull();
    expect(result.current.testResponse).toBe("offline");
    expect(result.current.isTesting).toBe(false);
  });

  it("copies the url and resets the copied flag after a timeout", async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const { result, unmount } = renderHook(() => useApiTester(project));

    await act(async () => {
      await result.current.handleCopy();
    });

    expect(writeText).toHaveBeenCalledWith("http://api.test/api/abc/users?limit=20");
    expect(result.current.copied).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
    unmount();
  });
});
