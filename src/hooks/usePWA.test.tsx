import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePWA } from "./usePWA";
import { toast } from "sonner";

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: () => ({
    needRefresh: [false, vi.fn()],
    offlineReady: [false, vi.fn()],
    updateServiceWorker: vi.fn(),
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
    warning: vi.fn(),
    success: vi.fn(),
  },
}));

describe("usePWA", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers offline and online event listeners", () => {
    renderHook(() => usePWA());

    act(() => {
      window.dispatchEvent(new Event("offline"));
    });

    expect(toast.warning).toHaveBeenCalledWith(
      "You are currently offline. Cached content is active.",
      expect.any(Object),
    );

    act(() => {
      window.dispatchEvent(new Event("online"));
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Connection restored.",
      expect.any(Object),
    );
  });
});
