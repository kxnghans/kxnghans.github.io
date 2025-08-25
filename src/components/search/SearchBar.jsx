/**
 * @file SearchBar.jsx
 * @description This component provides a search input field with voice recognition capabilities.
 */

import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import SearchResults from './SearchResults';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const SearchBar = ({ setActivePage, isMicActive, showVisualCues, placeholderText, toggleMic, inputRef, theme }) => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex-1 flex items-center w-full">
      <div className="relative w-full">
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholderText}
          value={searchQuery}
          onChange={handleSearchChange}
          className={`text-sm md:text-base w-full bg-gray-200 dark:bg-black rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:outline-none bevel-light-inset bevel-dark-inset transition-all duration-200 ${
            showVisualCues ? 'ring-2 ring-red-500' : ''
          }`}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[1rem] md:text-[1.2rem]">
          <FaSearch className="text-gray-500 dark:text-gray-400" />
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
            ? 'bg-red-500 text-white scale-105 shadow-lg shadow-red-500/40 animate-gentle-pulse'
            : isMicActive
            ? 'bg-gray-200 dark:bg-black bevel-light-inset bevel-dark-inset'
            : 'bg-gray-200 dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-800 bevel-light-inset bevel-dark-inset'
        }`}
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[1.2rem] md:text-[1.4rem]">
          <FaMicrophone className={
            showVisualCues && theme === 'dark'
              ? 'text-gray-800 drop-shadow-md'
              : showVisualCues
              ? 'text-white drop-shadow-md'
              : isMicActive
              ? 'text-gray-600 dark:text-gray-300'
              : 'text-gray-500 dark:text-gray-400'
          } />
        </div>
      </button>
    </div>
  );
};

export default SearchBar;