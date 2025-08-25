/**
 * @file Header.jsx
 * @description This component renders the main header of the application.
 * It includes the navigation menu toggle, the application title, a search bar with voice input, and a profile icon.
 */

import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaBars, FaSearch, FaPlayCircle } from 'react-icons/fa';
import profileImage from '../../../assets/Kobs DP.png';
import SearchBar from '../search/SearchBar';
import { SearchContext } from '../../context/SearchContext';

const Header = ({ toggleSidebar, setActivePage, activePage, theme }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [showVisualCues, setShowVisualCues] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
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
        visualCuesTimeoutRef.current = setTimeout(() => {
          setShowVisualCues(true);
          setPlaceholderText('Start talking...');
          setTimeout(() => {
            inputRef.current?.focus();
          }, 50);
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
        setPlaceholderText('Search');
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current) clearTimeout(visualCuesTimeoutRef.current);
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
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current) clearTimeout(visualCuesTimeoutRef.current);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }

    return () => {
      recognitionRef.current?.stop();
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (visualCuesTimeoutRef.current) clearTimeout(visualCuesTimeoutRef.current);
    };
  }, [setSearchQuery]);

  const toggleMic = () => {
    if (recognitionRef.current) {
      if (!isMicActive) {
        setIsMicActive(true);
        setSearchQuery('');
        lastSpeechTimeRef.current = null;
        setShowVisualCues(false);
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (visualCuesTimeoutRef.current) clearTimeout(visualCuesTimeoutRef.current);
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Speech recognition already running.');
        }
      } else {
        setIsMicActive(false);
        setShowVisualCues(false);
        setPlaceholderText('Search');
        if (visualCuesTimeoutRef.current) clearTimeout(visualCuesTimeoutRef.current);
        recognitionRef.current.stop();
      }
    }
  };

  return (
    <header className="relative bg-gray-100/80 dark:bg-[#181818]/90 backdrop-blur-sm p-3 flex justify-between items-center sticky top-0 z-40 border-b border-gray-300 dark:border-gray-800">
      {/* Left Section: Menu Toggle and App Title */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 md:p-2.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mr-4"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[1.4rem] md:text-[1.6rem]"><FaBars /></div>
        </button>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setActivePage('Home')}
        >
          <div className="text-[2rem] md:text-[2.5rem] text-red-600 mr-3"><FaPlayCircle /></div>
          <h1 className="text-[1.4rem] md:text-[1.6rem] font-bold tracking-wider">
            Kobby Hanson
          </h1>
        </div>
      </div>

      {/* Center Section (Desktop): Search Bar */}
      <div className="flex-1 max-w-xl mx-4 hidden lg:flex">
        <SearchBar
          setActivePage={setActivePage}
          isMicActive={isMicActive}
          showVisualCues={showVisualCues}
          placeholderText={placeholderText}
          toggleMic={toggleMic}
          inputRef={inputRef}
          theme={theme}
        />
      </div>

      {/* Right Section: Search Toggle and Profile Image */}
      <div className="flex items-center justify-end flex-1 lg:hidden">
        {/* Search Toggle for small screens */}
        <button
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          aria-label="Toggle Search"
          className={`p-1.5 md:p-2 rounded-full transition-all transform duration-200 lg:hidden mr-2 ${
            isSearchVisible
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-800 bevel-light-inset bevel-dark-inset'
          }`}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[1rem] md:text-[1.2rem]">
            <FaSearch className={isSearchVisible && theme === 'dark' ? 'text-gray-800' : isSearchVisible ? 'text-white' : 'text-gray-500 dark:text-gray-400'} />
          </div>
        </button>

        <img
          src={profileImage}
          alt="Profile"
          className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-transparent hover:border-red-500 transition-all transform ${
            activePage === 'Home' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
          onClick={() => setActivePage('Home')}
        />
      </div>

      {/* Mobile Search Popup */}
      {isSearchVisible && (
        <div className="absolute top-full left-0 right-0 p-4 bg-gray-100/95 dark:bg-[#181818]/95 backdrop-blur-sm shadow-lg lg:hidden">
          <SearchBar
            setActivePage={setActivePage}
            isMicActive={isMicActive}
            showVisualCues={showVisualCues}
            placeholderText={placeholderText}
            toggleMic={toggleMic}
            inputRef={inputRef}
            theme={theme}
          />
        </div>
      )}
    </header>
  );
};

export default Header;