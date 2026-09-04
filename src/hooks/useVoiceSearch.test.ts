import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useVoiceSearch } from "./useVoiceSearch";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("useVoiceSearch", () => {
  const mockOnTranscript = vi.fn();
  let inputRef: { current: HTMLInputElement | null };
  let micRef: { current: HTMLButtonElement | null };

  const originalSpeech = window.SpeechRecognition;
  const originalWebkit = window.webkitSpeechRecognition;

  beforeEach(() => {
    vi.clearAllMocks();
    inputRef = { current: document.createElement("input") };
    micRef = { current: document.createElement("button") };
  });

  afterEach(() => {
    window.SpeechRecognition = originalSpeech;
    window.webkitSpeechRecognition = originalWebkit;
  });

  it("handles unsupported browser gracefully and shows error toast on toggleMic", () => {
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;

    const { result } = renderHook(() =>
      useVoiceSearch({
        onTranscript: mockOnTranscript,
        inputRef,
        micRef,
      }),
    );

    expect(result.current.isSpeechSupported).toBe(false);
    expect(result.current.isMicActive).toBe(false);

    act(() => {
      result.current.toggleMic();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Voice search is not supported in this browser.",
      expect.any(Object),
    );
  });

  it("initializes and toggles speech recognition when supported", () => {
    const mockStart = vi.fn();
    const mockStop = vi.fn();

    class MockSpeechRecognition {
      continuous = false;
      interimResults = false;
      lang = "";
      start = mockStart;
      stop = mockStop;
      abort = vi.fn();
      onstart = null;
      onresult = null;
      onerror = null;
      onend = null;
      addEventListener = vi.fn();
      removeEventListener = vi.fn();
      dispatchEvent = vi.fn();
    }

    // Mount mock constructor onto window
    window.SpeechRecognition =
      MockSpeechRecognition as unknown as typeof window.SpeechRecognition;

    const { result } = renderHook(() =>
      useVoiceSearch({
        onTranscript: mockOnTranscript,
        inputRef,
        micRef,
      }),
    );

    expect(result.current.isSpeechSupported).toBe(true);
    expect(result.current.isMicActive).toBe(false);

    // Toggle mic on
    act(() => {
      result.current.toggleMic();
    });

    expect(mockStart).toHaveBeenCalled();
    expect(result.current.isMicActive).toBe(true);

    // Toggle mic off
    act(() => {
      result.current.toggleMic();
    });

    expect(mockStop).toHaveBeenCalled();
    expect(result.current.isMicActive).toBe(false);
  });
});
