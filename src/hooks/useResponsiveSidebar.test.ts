import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useResponsiveSidebar } from "./useResponsiveSidebar";

describe("useResponsiveSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes as open on desktop viewports (>= 1024px)", () => {
    window.innerWidth = 1280;
    const { result } = renderHook(() => useResponsiveSidebar());

    expect(result.current.isSidebarOpen).toBe(true);
    expect(result.current.isMediumScreen).toBe(false);
  });

  it("initializes as medium screen on smaller viewports (< 1024px)", () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useResponsiveSidebar());

    expect(result.current.isSidebarOpen).toBe(false);
    expect(result.current.isMediumScreen).toBe(true);
  });

  it("auto-collapses after 5s when open on medium screen", () => {
    vi.useFakeTimers();
    window.innerWidth = 768;
    const { result } = renderHook(() => useResponsiveSidebar());

    act(() => {
      result.current.setIsSidebarOpen(true);
    });
    expect(result.current.isSidebarOpen).toBe(true);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.isSidebarOpen).toBe(false);
  });

  it("closes sidebar when clicking outside on medium screen", () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useResponsiveSidebar());

    const sidebarEl = document.createElement("div");
    const outsideEl = document.createElement("button");
    document.body.appendChild(sidebarEl);
    document.body.appendChild(outsideEl);

    result.current.sidebarRef.current = sidebarEl;

    act(() => {
      result.current.setIsSidebarOpen(true);
    });

    act(() => {
      outsideEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(result.current.isSidebarOpen).toBe(false);

    document.body.removeChild(sidebarEl);
    document.body.removeChild(outsideEl);
  });

  it("keeps sidebar open when clicking inside sidebar container", () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useResponsiveSidebar());

    const sidebarEl = document.createElement("div");
    const insideEl = document.createElement("button");
    sidebarEl.appendChild(insideEl);
    document.body.appendChild(sidebarEl);

    result.current.sidebarRef.current = sidebarEl;

    act(() => {
      result.current.setIsSidebarOpen(true);
    });

    act(() => {
      insideEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(result.current.isSidebarOpen).toBe(true);

    document.body.removeChild(sidebarEl);
  });
});
