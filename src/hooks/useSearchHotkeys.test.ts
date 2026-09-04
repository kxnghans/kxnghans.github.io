import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useSearchHotkeys } from "./useSearchHotkeys";

describe("useSearchHotkeys", () => {
  let inputElement: HTMLInputElement;
  const mockSetIsSearchVisible = vi.fn();
  const mockOnClearSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    inputElement = document.createElement("input");
    document.body.appendChild(inputElement);
  });

  afterEach(() => {
    document.body.removeChild(inputElement);
  });

  it("focuses input when Ctrl+K is pressed", () => {
    const inputRef = { current: inputElement };
    renderHook(() =>
      useSearchHotkeys({
        inputRef,
        isSearchVisible: false,
        setIsSearchVisible: mockSetIsSearchVisible,
        onClearSearch: mockOnClearSearch,
      }),
    );

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
      );
    });

    expect(document.activeElement).toBe(inputElement);
  });

  it("focuses input when '/' is pressed and user is not in an editable field", () => {
    const inputRef = { current: inputElement };
    renderHook(() =>
      useSearchHotkeys({
        inputRef,
        isSearchVisible: false,
        setIsSearchVisible: mockSetIsSearchVisible,
        onClearSearch: mockOnClearSearch,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
    });

    expect(document.activeElement).toBe(inputElement);
  });

  it("does not hijack '/' when another input field is already active", () => {
    const anotherInput = document.createElement("input");
    document.body.appendChild(anotherInput);
    anotherInput.focus();

    const inputRef = { current: inputElement };
    renderHook(() =>
      useSearchHotkeys({
        inputRef,
        isSearchVisible: false,
        setIsSearchVisible: mockSetIsSearchVisible,
        onClearSearch: mockOnClearSearch,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
    });

    expect(document.activeElement).toBe(anotherInput);
    document.body.removeChild(anotherInput);
  });

  it("clears search and blurs input when Escape is pressed while focused", () => {
    inputElement.focus();
    const inputRef = { current: inputElement };

    renderHook(() =>
      useSearchHotkeys({
        inputRef,
        isSearchVisible: true,
        setIsSearchVisible: mockSetIsSearchVisible,
        onClearSearch: mockOnClearSearch,
      }),
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(mockOnClearSearch).toHaveBeenCalled();
    expect(mockSetIsSearchVisible).toHaveBeenCalledWith(false);
  });
});
