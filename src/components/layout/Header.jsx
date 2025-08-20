import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SearchIcon, MicIcon } from '../icons/Icons';

const Header = ({ toggleSidebar, setActivePage, activePage }) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [showVisualCues, setShowVisualCues] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Search');
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const lastSpeechTimeRef = useRef(null);
  const visualCuesTimeoutRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        // Start visual cues after 500ms delay
        visualCuesTimeoutRef.current = setTimeout(() => {
          setShowVisualCues(true);
          setPlaceholderText('Start talking...');
          // Focus input after delay to show ring with other visual cues
          inputRef.current?.focus();
        }, 500);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        let hasNewSpeech = false;

        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            hasNewSpeech = true;
          } else {
            interimTranscript += event.results[i][0].transcript;
            // Only consider it new speech if there's actual content
            if (event.results[i][0].transcript.trim()) {
              hasNewSpeech = true;
            }
          }
        }
        
        setSearchText((finalTranscript + interimTranscript).trim());

        // Update last speech time and reset timeout only when there's actual speech
        if (hasNewSpeech) {
          lastSpeechTimeRef.current = Date.now();
          
          // Clear existing timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
          
          // Set new timeout for silence detection
          silenceTimeoutRef.current = setTimeout(() => {
            // Double-check that enough time has passed since last speech
            const timeSinceLastSpeech = Date.now() - (lastSpeechTimeRef.current || 0);
            if (timeSinceLastSpeech >= 2000) {
              recognitionRef.current?.stop();
            }
          }, 2000);
        }
      };

      // Remove the onspeechend handler as it interferes with our custom silence detection
      // recognition.onspeechend = () => { ... }; // REMOVED

      recognition.onend = () => {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText('Search');
        // Clear any remaining timeouts
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
          visualCuesTimeoutRef.current = null;
        }
        // Blur input to remove any focus ring
        inputRef.current?.blur();
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'An error occurred. Try again.';
        if (event.error === 'no-speech') {
          errorMessage = 'No speech detected. Please try again.';
        } else if (event.error === 'audio-capture') {
          errorMessage = 'Microphone not available. Check permissions.';
        } else if (event.error === 'not-allowed') {
          errorMessage = 'Microphone permission was denied.';
        }
        setPlaceholderText(errorMessage);
        setIsMicActive(false);
        setShowVisualCues(false);
        
        // Clear timeouts on error
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
          visualCuesTimeoutRef.current = null;
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }

    // Cleanup
    return () => {
      recognitionRef.current?.stop();
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      if (visualCuesTimeoutRef.current) {
        clearTimeout(visualCuesTimeoutRef.current);
        visualCuesTimeoutRef.current = null;
      }
    };
  }, []);

  // Global click handler to stop mic when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMicActive) {
        const micButton = document.getElementById('mic-button');
        const inputField = inputRef.current;
        if (
          micButton &&
          !micButton.contains(event.target) &&
          inputField &&
          !inputField.contains(event.target)
        ) {
          // Immediately reset all visual cues
          setShowVisualCues(false);
          setPlaceholderText('Search');
          if (visualCuesTimeoutRef.current) {
            clearTimeout(visualCuesTimeoutRef.current);
            visualCuesTimeoutRef.current = null;
          }
          // Blur input to remove focus ring
          inputRef.current?.blur();
          recognitionRef.current?.stop();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMicActive]);

  const toggleMic = () => {
    if (recognitionRef.current) {
      if (!isMicActive) {
        setIsMicActive(true);
        setSearchText('');
        // Reset speech tracking and visual cues
        lastSpeechTimeRef.current = null;
        setShowVisualCues(false);
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
          visualCuesTimeoutRef.current = null;
        }
        
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Speech recognition already running.');
        }
        // Don't focus input initially to prevent instant ring - focus will happen after delay
      } else {
        // Manual deactivation - immediately reset all visual cues
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText('Search');
        // Clear visual cues timeout if stopping manually
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
          visualCuesTimeoutRef.current = null;
        }
        // Blur input to remove focus ring
        inputRef.current?.blur();
        recognitionRef.current.stop();
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <header className="bg-gray-100/80 dark:bg-[#181818]/90 backdrop-blur-sm p-3 flex justify-between items-center sticky top-0 z-40 border-b border-gray-300 dark:border-gray-800">
      {/* Left side */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mr-4"
        >
          <MenuIcon />
        </button>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setActivePage('Home')}
        >
          <svg
            className="w-8 h-8 text-red-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-xl font-bold tracking-wider hidden sm:block">
            Kobby Hanson
          </h1>
        </div>
      </div>

      {/* Search bar + mic */}
      <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            ref={inputRef}
            placeholder={placeholderText}
            value={searchText}
            onChange={handleSearchChange}
            className={`w-full bg-gray-200 dark:bg-black rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:outline-none bevel-light-inset dark:bevel-dark-inset transition-all duration-200 ${
              showVisualCues ? 'ring-2 ring-red-500' : ''
            }`}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>

        {/* Mic button */}
        <button
          id="mic-button"
          onClick={toggleMic}
          aria-label="Toggle microphone"
          className={`ml-3 p-2 rounded-full transition-all transform duration-200 ${
            showVisualCues
              ? 'bg-red-500 text-white bevel-light-inset dark:bevel-dark-inset scale-105 shadow-lg shadow-red-500/40 animate-pulse'
              : isMicActive
              ? 'bg-gray-300 dark:bg-gray-700 bevel-light-inset dark:bevel-dark-inset'
              : 'hover:bg-gray-300 dark:hover:bg-gray-800 bevel-light-inset dark:bevel-dark-inset'
          }`}
        >
          <MicIcon
            className={
              showVisualCues
                ? 'text-white drop-shadow-md'
                : isMicActive
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-gray-500 dark:text-gray-400'
            }
          />
        </button>
      </div>

      {/* Right side (profile) */}
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Profile"
          className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-transparent hover:border-red-500 transition-all ${
            activePage === 'Home' ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={() => setActivePage('Home')}
        />
      </div>
    </header>
  );
};

export default Header;