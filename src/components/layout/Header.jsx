/**
 * @file Header.jsx
 * @description This component renders the main header of the application.
 * It includes the navigation menu toggle, the application title, a search bar with voice input, and a profile icon.
 */

import React, { useState, useEffect, useRef, useContext } from "react";
import { FaBars, FaSearch, FaPlayCircle } from "react-icons/fa";
import profileImage from "../../../assets/Kobs DP.png";
import SearchBar from "../search/SearchBar";
import { SearchContext } from "../../context/SearchContext";

const Header = ({ toggleSidebar, setActivePage, activePage, theme }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [showVisualCues, setShowVisualCues] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [placeholderText, setPlaceholderText] = useState("Search");

  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const lastSpeechTimeRef = useRef(null);
  const visualCuesTimeoutRef = useRef(null);
  const micRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
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

      recognition.onresult = (event) => {
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

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
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
      console.warn("Speech Recognition API not supported in this browser.");
    }

    return () => {
      recognitionRef.current?.stop();
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (visualCuesTimeoutRef.current)
        clearTimeout(visualCuesTimeoutRef.current);
    };
  }, [setSearchQuery]);

  const toggleMic = () => {
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
        } catch (e) {
          console.warn("Speech recognition already running.");
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
  };

  useEffect(() => {
    const handleScreenInteraction = (event) => {
      if (
        isMicActive &&
        micRef.current &&
        !micRef.current.contains(event.target)
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

  return (
    <header className="relative sticky top-0 z-40 flex items-center justify-between border-b border-gray-300 bg-gray-100/80 p-3 backdrop-blur-sm dark:border-gray-800 dark:bg-[#181818]/90">
      {/* Left Section: Menu Toggle and App Title */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="mr-4 rounded-full p-2 transition-colors hover:bg-gray-300 dark:hover:bg-gray-800 md:p-2.5"
        >
          <div className="flex h-5 w-5 items-center justify-center text-[1.4rem] sm:h-6 sm:w-6 md:text-[1.6rem]">
            <FaBars />
          </div>
        </button>
        <div
          className="group flex cursor-pointer items-center transition-transform duration-200 ease-in-out hover:text-red-600 active:scale-95"
          onClick={() => {
            setActivePage("Home");
            window.scrollTo(0, 0);
          }}
        >
          <div className="mr-3 text-[2rem] text-red-600 transition-transform duration-200 ease-in-out group-hover:scale-105 md:text-[2.5rem]">
            <FaPlayCircle />
          </div>
          <h1 className="text-[1.4rem] font-bold tracking-wider md:text-[1.6rem]">
            Kobby Hanson
          </h1>
        </div>
      </div>

      {/* Center Section (Desktop): Search Bar */}
      <div className="mx-4 hidden max-w-xl flex-1 lg:flex">
        <SearchBar
          setActivePage={setActivePage}
          isMicActive={isMicActive}
          showVisualCues={showVisualCues}
          placeholderText={placeholderText}
          toggleMic={toggleMic}
          inputRef={inputRef}
          theme={theme}
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
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <button
            aria-label="Toggle Search"
            className={`transform rounded-full p-1.5 transition-all duration-200 md:p-2 lg:hidden ${
              isSearchVisible
                ? "bg-red-500 text-white hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),_inset_-2px_-2px_4px_rgba(255,255,255,0.7)] dark:hover:border dark:hover:border-solid dark:hover:border-red-700"
                : "bevel-light-inset bevel-dark-inset bg-gray-200 hover:bg-gray-300 dark:bg-black dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex h-5 w-5 items-center justify-center text-[1rem] sm:h-6 sm:w-6 md:text-[1.2rem]">
              <FaSearch
                className={
                  isSearchVisible
                    ? "text-white dark:text-gray-800"
                    : "text-gray-500 dark:text-gray-400"
                }
              />
            </div>
          </button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <img
            src={profileImage}
            alt="Profile"
            className={`h-10 w-10 transform cursor-pointer rounded-full border-2 border-transparent object-cover hover:border-red-500 ${
              activePage === "Home"
                ? "scale-0 opacity-0"
                : "scale-100 opacity-100 transition-all delay-150 duration-500"
            }`}
            onClick={() => setActivePage("Home")}
          />
        </div>
      </div>

      {/* Mobile Search Popup */}
      {isSearchVisible && (
        <div className="absolute left-0 right-0 top-full bg-gray-100/95 p-4 shadow-lg backdrop-blur-sm dark:bg-[#181818]/95 lg:hidden">
          <SearchBar
            setActivePage={setActivePage}
            isMicActive={isMicActive}
            showVisualCues={showVisualCues}
            placeholderText={placeholderText}
            toggleMic={toggleMic}
            inputRef={inputRef}
            theme={theme}
            micRef={micRef}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
