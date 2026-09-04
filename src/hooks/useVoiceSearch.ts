/**
 * @file useVoiceSearch.ts
 * @description Manages browser SpeechRecognition lifecycle, interim transcription,
 * silence detection timeouts, and microphone state with strict W3C typing.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from "react";
import { toast } from "sonner";

export interface UseVoiceSearchOptions {
  onTranscript: (transcript: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  micRef: RefObject<HTMLButtonElement | null>;
}

export interface UseVoiceSearchResult {
  isMicActive: boolean;
  isSpeechSupported: boolean;
  showVisualCues: boolean;
  placeholderText: string;
  toggleMic: () => void;
}

export const useVoiceSearch = ({
  onTranscript,
  inputRef,
  micRef,
}: UseVoiceSearchOptions): UseVoiceSearchResult => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [showVisualCues, setShowVisualCues] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Search");

  // Speech recognition controller and silence timeout references
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSpeechTimeRef = useRef<number | null>(null);
  const visualCuesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Initialize SpeechRecognition instance on mount if browser supports it
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // Trigger visual indicators and shift focus to input upon recognition start
      recognition.onstart = () => {
        visualCuesTimeoutRef.current = setTimeout(() => {
          setShowVisualCues(true);
          setPlaceholderText("Start talking...");
          setTimeout(() => {
            inputRef.current?.focus();
          }, 50);
        }, 500);
      };

      // Process continuous speech stream and trigger auto-stop after 2s of silence
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";
        let hasNewSpeech = false;

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            hasNewSpeech = true;
          } else {
            interimTranscript += result[0].transcript;
            if (result[0].transcript.trim()) {
              hasNewSpeech = true;
            }
          }
        }

        onTranscript((finalTranscript + interimTranscript).trim());

        if (hasNewSpeech) {
          lastSpeechTimeRef.current = Date.now();
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
          silenceTimeoutRef.current = setTimeout(() => {
            const timeSinceLastSpeech =
              Date.now() - (lastSpeechTimeRef.current || 0);
            if (timeSinceLastSpeech >= 2000) {
              recognitionRef.current?.stop();
            }
          }, 2000);
        }
      };

      // Clean up visual cues and reset input state when speech recognition halts
      recognition.onend = () => {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText("Search");
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
        }
        inputRef.current?.blur();
      };

      // Map browser speech recognition errors to human-friendly feedback messages
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = "An error occurred. Try again.";
        if (event.error === "no-speech") {
          errorMessage = "No speech detected. Please try again.";
        } else if (event.error === "audio-capture") {
          errorMessage = "Microphone not available. Check permissions.";
        } else if (event.error === "not-allowed") {
          errorMessage = "Microphone permission was denied.";
        }
        setPlaceholderText(errorMessage);
        setIsMicActive(false);
        setShowVisualCues(false);
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
        }
      };

      recognitionRef.current = recognition;
    } else {
      setIsSpeechSupported(false);
    }

    return () => {
      recognitionRef.current?.stop();
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (visualCuesTimeoutRef.current) {
        clearTimeout(visualCuesTimeoutRef.current);
      }
    };
  }, [inputRef, onTranscript]);

  // Toggle microphone capture state with browser capability notification
  const toggleMic = useCallback(() => {
    if (!isSpeechSupported) {
      toast.error("Voice search is not supported in this browser.", {
        description: "Please try using a modern browser like Chrome or Edge.",
      });
      return;
    }

    if (recognitionRef.current) {
      if (!isMicActive) {
        setIsMicActive(true);
        onTranscript("");
        lastSpeechTimeRef.current = null;
        setShowVisualCues(false);
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
        }
        try {
          recognitionRef.current.start();
        } catch {
          // Ignore if recognition service is already initializing
        }
      } else {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText("Search");
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
        }
        recognitionRef.current.stop();
      }
    }
  }, [isSpeechSupported, isMicActive, onTranscript]);

  // Auto-terminate voice listening on touch or click outside the microphone control
  useEffect(() => {
    const handleScreenInteraction = (event: MouseEvent | TouchEvent) => {
      if (
        isMicActive &&
        micRef.current &&
        !micRef.current.contains(event.target as Node)
      ) {
        toggleMic();
      }
    };

    window.addEventListener("click", handleScreenInteraction);
    window.addEventListener("touchstart", handleScreenInteraction);

    return () => {
      window.removeEventListener("click", handleScreenInteraction);
      window.removeEventListener("touchstart", handleScreenInteraction);
    };
  }, [isMicActive, micRef, toggleMic]);

  return {
    isMicActive,
    isSpeechSupported,
    showVisualCues,
    placeholderText,
    toggleMic,
  };
};
