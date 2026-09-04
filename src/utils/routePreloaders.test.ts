import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  ROUTE_LOADERS,
  prefetchRoute,
  prefetchAllRoutesIdle,
  isDataSaverActive,
  resetPrefetchedRoutes,
} from "./routePreloaders";

describe("routePreloaders", () => {
  beforeEach(() => {
    resetPrefetchedRoutes();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetPrefetchedRoutes();
  });

  it("identifies data saver status correctly", () => {
    // Default mock environment has no navigator.connection.saveData
    expect(isDataSaverActive()).toBe(false);

    // Mock saveData active
    const originalConnection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    });

    expect(isDataSaverActive()).toBe(true);

    // Restore
    Object.defineProperty(navigator, "connection", {
      value: originalConnection,
      configurable: true,
    });
  });

  it("prefetches route on valid route name", async () => {
    const loaderSpy = vi.spyOn(ROUTE_LOADERS, "Projects");
    prefetchRoute("Projects");

    expect(loaderSpy).toHaveBeenCalledTimes(1);

    // Calling again should not re-trigger loader (deduplication)
    prefetchRoute("Projects");
    expect(loaderSpy).toHaveBeenCalledTimes(1);
  });

  it("ignores unknown route names gracefully", () => {
    expect(() => prefetchRoute("NonExistentRoute")).not.toThrow();
  });

  it("handles loader rejections gracefully and clears failed route from cache", async () => {
    const errorLoader = vi.fn().mockRejectedValue(new Error("Network Error"));
    ROUTE_LOADERS.Honors = errorLoader;

    prefetchRoute("Honors");
    expect(errorLoader).toHaveBeenCalledTimes(1);

    // Wait for microtask tick for catch handler to execute
    await Promise.resolve();

    // After failure, re-attempting prefetch should retry
    prefetchRoute("Honors");
    expect(errorLoader).toHaveBeenCalledTimes(2);
  });

  it("schedules idle prefetching for all routes", () => {
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");
    const originalRequestIdleCallback = window.requestIdleCallback;

    // Simulate environment without requestIdleCallback
    // @ts-expect-error - testing fallback
    delete window.requestIdleCallback;

    prefetchAllRoutesIdle();
    expect(setTimeoutSpy).toHaveBeenCalled();

    // Restore
    if (originalRequestIdleCallback) {
      window.requestIdleCallback = originalRequestIdleCallback;
    }
  });

  it("uses requestIdleCallback when available", () => {
    const idleSpy = vi.fn();
    window.requestIdleCallback =
      idleSpy as unknown as typeof window.requestIdleCallback;

    prefetchAllRoutesIdle();
    expect(idleSpy).toHaveBeenCalledTimes(1);
  });
});
