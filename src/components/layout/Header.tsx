import { useState, useEffect, useRef, useCallback } from "react";
import { FaBars, FaSearch, FaPlayCircle } from "react-icons/fa";
const profileImage = "/assets/Kobs DP.webp";
import SearchBar from "../search/SearchBar";
import { useSearch } from "../../context/SearchContext";
import { toast } from "sonner";

interface IWindowSpeechRecognition extends Window {
  SpeechRecognition?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface HeaderProps {
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
  activePage: string;
}

const Header = ({ toggleSidebar, setActivePage, activePage }: HeaderProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [showVisualCues, setShowVisualCues] = useState(false);
  const { setSearchQuery } = useSearch();
  const [placeholderText, setPlaceholderText] = useState("Search");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSpeechTimeRef = useRef<number | null>(null);
  const visualCuesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const micRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const win = window as unknown as IWindowSpeechRecognition;
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        visualCuesTimeoutRef.current = setTimeout(() => {
          setShowVisualCues(true);
          setPlaceholderText("Start talking...");
          setTimeout(() => {
            inputRef.current?.focus();
          }, 50);
        }, 500);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";
        let hasNewSpeech = false;

        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            hasNewSpeech = true;
          } else {
            interimTranscript += event.results[i][0].transcript;
            if (event.results[i][0].transcript.trim()) {
              hasNewSpeech = true;
            }
          }
        }

        setSearchQuery((finalTranscript + interimTranscript).trim());

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

      recognition.onend = () => {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText("Search");
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current)
          clearTimeout(visualCuesTimeoutRef.current);
        inputRef.current?.blur();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
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
        if (visualCuesTimeoutRef.current)
          clearTimeout(visualCuesTimeoutRef.current);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSpeechSupported(false);
    }

    return () => {
      recognitionRef.current?.stop();
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (visualCuesTimeoutRef.current)
        clearTimeout(visualCuesTimeoutRef.current);
    };
  }, [setSearchQuery]);

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
        setSearchQuery("");
        lastSpeechTimeRef.current = null;
        setShowVisualCues(false);
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current)
          clearTimeout(visualCuesTimeoutRef.current);
        try {
          recognitionRef.current.start();
        } catch {
          // Ignore if already active
        }
      } else {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText("Search");
        if (visualCuesTimeoutRef.current)
          clearTimeout(visualCuesTimeoutRef.current);
        recognitionRef.current.stop();
      }
    }
  }, [isSpeechSupported, isMicActive, setSearchQuery]);

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
  }, [isMicActive, toggleMic]);

  // Global hotkeys: Ctrl+K / Cmd+K / "/" to focus search; Esc to clear & blur search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac =
        typeof window !== "undefined" &&
        /Mac|iPhone|iPod|iPad/.test(window.navigator?.userAgent || "");
      const isCmdOrCtrlK =
        (isMac ? event.metaKey : event.ctrlKey) &&
        (event.key === "k" || event.key === "K");
      const isSlash = event.key === "/";

      const activeElement = document.activeElement as HTMLElement | null;
      const isEditingText =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable);

      if (isCmdOrCtrlK || (isSlash && !isEditingText)) {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select?.();
        } else {
          setIsSearchVisible(true);
        }
        return;
      }

      if (event.key === "Escape") {
        if (document.activeElement === inputRef.current || isSearchVisible) {
          event.preventDefault();
          setSearchQuery("");
          inputRef.current?.blur();
          setIsSearchVisible(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchVisible, setSearchQuery]);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-300 bg-gray-100/80 p-3 backdrop-blur-sm dark:border-gray-800 dark:bg-[#181818]/90">
      {/* Left Section: Menu Toggle and App Title */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="mr-4 rounded-full p-2 transition-colors hover:bg-gray-300 md:p-2.5 dark:hover:bg-gray-800"
        >
          <div className="flex h-5 w-5 items-center justify-center text-[1.4rem] sm:h-6 sm:w-6 md:text-[1.6rem]">
            <FaBars />
          </div>
        </button>
        <button
          type="button"
          className="group flex cursor-pointer items-center text-left transition-transform duration-200 ease-in-out hover:text-red-600 active:scale-95"
          onClick={() => {
            setActivePage("Home");
            window.scrollTo(0, 0);
          }}
          aria-label="Go to Home"
        >
          <div className="mr-3 text-[2rem] text-red-600 transition-transform duration-200 ease-in-out group-hover:scale-105 md:text-[2.5rem]">
            <FaPlayCircle />
          </div>
          <h1 className="text-[1.4rem] font-bold tracking-wider md:text-[1.6rem]">
            Hanson-Tube
          </h1>
        </button>
      </div>

      {/* Center Section (Desktop): Search Bar */}
      <div className="mx-4 hidden max-w-xl flex-1 lg:flex">
        <SearchBar
          setActivePage={setActivePage}
          isMicActive={isMicActive}
          isSpeechSupported={isSpeechSupported}
          showVisualCues={showVisualCues}
          placeholderText={placeholderText}
          toggleMic={toggleMic}
          inputRef={inputRef}
          micRef={micRef}
        />
      </div>

      {/* Right Section: Search Toggle and Profile Image */}
      <div className="relative h-10 flex-1 lg:hidden">
        {/* Search Toggle for small screens */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transform transition-all duration-500 ease-in-out ${
            activePage === "Home"
              ? "left-full -translate-x-full"
              : "left-1/2 -translate-x-1/2"
          } z-10`}
        >
          <button
            type="button"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            aria-label="Toggle Search"
            className={`transform rounded-full p-1.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none md:p-2 lg:hidden ${
              isSearchVisible
                ? "bg-red-500 text-white shadow-md shadow-red-500/40 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] dark:ring-2 dark:ring-red-500 dark:hover:border dark:hover:border-solid dark:hover:border-red-700"
                : "bevel-light-inset bevel-dark-inset bg-gray-200 hover:bg-gray-300 dark:bg-[#141416] dark:hover:bg-[#1e1e22]"
            }`}
          >
            <div className="flex h-5 w-5 items-center justify-center text-[1rem] sm:h-6 sm:w-6 md:text-[1.2rem]">
              <FaSearch
                className={
                  isSearchVisible
                    ? "text-white dark:text-gray-900"
                    : "text-gray-500 dark:text-gray-400"
                }
              />
            </div>
          </button>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2">
          <button
            type="button"
            aria-label="Go to Home"
            onClick={() => setActivePage("Home")}
            className="focus:outline-none"
          >
            <img
              src={profileImage}
              alt="Profile"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`h-10 w-10 transform cursor-pointer rounded-full border-2 border-transparent object-cover hover:border-red-500 ${
                activePage === "Home"
                  ? "scale-0 opacity-0"
                  : "scale-100 opacity-100 transition-all delay-150 duration-500"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Search Popup */}
      {isSearchVisible && (
        <div className="absolute top-full right-0 left-0 bg-gray-100/95 p-4 shadow-lg backdrop-blur-sm lg:hidden dark:bg-[#181818]/95">
          <SearchBar
            setActivePage={setActivePage}
            isMicActive={isMicActive}
            isSpeechSupported={isSpeechSupported}
            showVisualCues={showVisualCues}
            placeholderText={placeholderText}
            toggleMic={toggleMic}
            inputRef={inputRef}
            micRef={micRef}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
