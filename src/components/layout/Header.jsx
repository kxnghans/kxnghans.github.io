/**
 * @file Header.jsx
 * @description This component renders the main header of the application.
 * It includes the navigation menu toggle, the application title, a search bar with voice input, and a profile icon.
 */

import React, { useState, useEffect, useRef, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import SearchResults from '../search/SearchResults';
import { FaBars, FaSearch, FaMicrophone, FaPlayCircle } from 'react-icons/fa';

const Header = ({ toggleSidebar, setActivePage, activePage }) => {
  // STATE MANAGEMENT
  // -------------------

  // `isMicActive`: Tracks if the microphone is currently listening.
  const [isMicActive, setIsMicActive] = useState(false);
  // `showVisualCues`: Controls the visual feedback animations for voice input.
  const [showVisualCues, setShowVisualCues] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  // `placeholderText`: The placeholder text for the search bar, which changes based on mic state.
  const [placeholderText, setPlaceholderText] = useState('Search');

  // REFS
  // -----

  // `recognitionRef`: Holds the SpeechRecognition instance.
  const recognitionRef = useRef(null);
  // `inputRef`: A ref for the search input element to control focus.
  const inputRef = useRef(null);
  // `silenceTimeoutRef`: Manages the timeout for detecting silence after speech.
  const silenceTimeoutRef = useRef(null);
  // `lastSpeechTimeRef`: Tracks the timestamp of the last detected speech.
  const lastSpeechTimeRef = useRef(null);
  // `visualCuesTimeoutRef`: Manages the timeout for starting the visual cues.
  const visualCuesTimeoutRef = useRef(null);

  // SPEECH RECOGNITION SETUP
  // -------------------------

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Keep listening even after a pause.
      recognition.interimResults = true; // Get results as the user speaks.
      recognition.lang = 'en-US';

      /**
       * `onstart`: Triggered when the speech recognition service starts listening.
       */
      recognition.onstart = () => {
        // Start visual cues after a 500ms delay.
        visualCuesTimeoutRef.current = setTimeout(() => {
          setShowVisualCues(true);
          setPlaceholderText('Start talking...');

          // Delay the input focus by an additional 50ms (total 550ms)
          // to isolate the ring animation from other visual cues.
          setTimeout(() => {
            inputRef.current?.focus();
          }, 50);
        }, 500);
      };

      /**
       * `onresult`: Triggered when the speech recognition service has a result.
       * This can be an interim or a final result.
       */
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        let hasNewSpeech = false;

        // Loop through the results to build the transcript.
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

        // Custom silence detection to stop the mic automatically.
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

      /**
       * `onend`: Triggered when the speech recognition service stops listening.
       */
      recognition.onend = () => {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText('Search');

        // Clean up any running timeouts.
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
          visualCuesTimeoutRef.current = null;
        }
        inputRef.current?.blur(); // Remove focus from the input.
      };

      /**
       * `onerror`: Triggered when there is a speech recognition error.
       */
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

        // Clean up any running timeouts.
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

    // Cleanup function to stop recognition and clear timeouts when the component unmounts.
    return () => {
      recognitionRef.current?.stop();
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (visualCuesTimeoutRef.current) {
        clearTimeout(visualCuesTimeoutRef.current);
      }
    };
  }, [setSearchQuery]);

  // EFFECT: CLICK OUTSIDE HANDLER
  // -----------------------------

  // This effect adds a global click listener to deactivate the mic if the user clicks outside the search area.
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
          // Reset all visual cues and stop the microphone.
          setShowVisualCues(false);
          setPlaceholderText('Search');
          if (visualCuesTimeoutRef.current) {
            clearTimeout(visualCuesTimeoutRef.current);
          }
          inputRef.current?.blur();
          recognitionRef.current?.stop();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMicActive]);

  // EVENT HANDLERS
  // --------------

  /**
   * `toggleMic`: Toggles the microphone on and off.
   */
  const toggleMic = () => {
    if (recognitionRef.current) {
      if (!isMicActive) {
        setIsMicActive(true);
        setSearchQuery('');
        // Reset all tracking and visual states before starting.
        lastSpeechTimeRef.current = null;
        setShowVisualCues(false);
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
        }

        try {
          recognitionRef.current.start();
        } catch (e) {
          // This can happen if start() is called while it's already starting.
          console.warn('Speech recognition already running.');
        }
      } else {
        // Manually deactivating the mic.
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText('Search');
        if (visualCuesTimeoutRef.current) {
          clearTimeout(visualCuesTimeoutRef.current);
        }
        inputRef.current?.blur();
        recognitionRef.current.stop();
      }
    }
  };

  /**
   * `handleSearchChange`: Updates the search text state when the user types.
   */
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // RENDER
  // ------

  return (
    <header className="bg-gray-100/80 dark:bg-[#181818]/90 backdrop-blur-sm p-3 flex justify-between items-center sticky top-0 z-40 border-b border-gray-300 dark:border-gray-800">
      {/* Left Section: Menu Toggle and App Title */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mr-4"
        >
          <FaBars size={25} />
        </button>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setActivePage('Home')}
        >
          <FaPlayCircle size={28} className="text-red-600 mr-3" />
          <h1 className="text-xl font-bold tracking-wider hidden sm:block">
            Kobby Hanson
          </h1>
        </div>
      </div>

      {/* Center Section: Search Bar and Microphone Button */}
      <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            ref={inputRef}
            placeholder={placeholderText}
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full bg-gray-200 dark:bg-black rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:outline-none bevel-light-inset dark:bevel-dark-inset transition-all duration-200 ${
              showVisualCues ? 'ring-2 ring-red-500' : ''
            }`}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <FaSearch size={15} />
          </div>
          <SearchResults setActivePage={setActivePage} />
        </div>

        {/* Mic Button */}
        <button
          id="mic-button"
          onClick={toggleMic}
          aria-label="Toggle microphone"
          className={`ml-3 p-2 rounded-full transition-all transform duration-200 ${
            showVisualCues
              ? 'bg-red-500 text-white bevel-light-inset dark:bevel-dark-inset scale-105 shadow-lg shadow-red-500/40 animate-gentle-pulse'
              : isMicActive
              ? 'bg-gray-200 dark:bg-black bevel-light-inset dark:bevel-dark-inset'
              : 'bg-gray-200 dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-800 bevel-light-inset dark:bevel-dark-inset'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <FaMicrophone size={19} className={
              showVisualCues
                ? 'text-white drop-shadow-md'
                : isMicActive
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-gray-500 dark:text-gray-400'
            } />
          </div>
        </button>
      </div>

      {/* Right Section: Profile Image */}
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format=fit&crop&ixlib=rb-4.0.3"
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