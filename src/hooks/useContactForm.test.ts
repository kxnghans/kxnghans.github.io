import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  useContactForm,
  STORAGE_KEY_LAST_SENT,
  SUBMIT_COOLDOWN_MS,
  type ContactFormValues,
} from "./useContactForm";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import type { FieldErrors } from "react-hook-form";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useContactForm", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("initializes with default idle state", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.getIconClassName()).toBe("");
  });

  it("triggers toast error on form validation errors", () => {
    const { result } = renderHook(() => useContactForm());

    const mockErrors: FieldErrors<ContactFormValues> = {
      name: { type: "required", message: "Name is required" },
    };

    act(() => {
      result.current.onValidationError(mockErrors);
    });

    expect(toast.error).toHaveBeenCalledWith("Name is required");
  });

  it("blocks submission and shows cooldown toast when sent within cooldown window", () => {
    const { result } = renderHook(() => useContactForm());
    const recentTime = Date.now() - (SUBMIT_COOLDOWN_MS - 20000); // 20s remaining
    localStorage.setItem(STORAGE_KEY_LAST_SENT, String(recentTime));

    act(() => {
      result.current.sendEmail({
        name: "Test User",
        email: "test@example.com",
        subject: "Subject",
        message: "Hello world",
      });
    });

    expect(emailjs.send).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining("Please wait"),
    );
  });
});
