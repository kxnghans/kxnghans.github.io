/**
 * @file SearchBar.jsx
 * @description This component provides a search input field with voice recognition capabilities.
 */

import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import SearchResults from "./SearchResults";
import { FaSearch, FaMicrophone } from "react-icons/fa";

const SearchBar = ({
  setActivePage,
  isMicActive,
  showVisualCues,
  placeholderText,
  toggleMic,
  inputRef,
  theme,
}) => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex w-full flex-1 items-center">
      <div className="relative w-full">
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholderText}
          value={searchQuery}
          onChange={handleSearchChange}
          className={`bevel-light-inset bevel-dark-inset w-full rounded-full bg-gray-200 py-2 pl-10 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-black md:text-base ${
            showVisualCues ? "ring-2 ring-red-500" : ""
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
        className={`ml-3 transform rounded-full p-2 transition-all duration-200 ${
          showVisualCues
            ? "scale-105 animate-gentle-pulse bg-red-500 text-white shadow-lg shadow-red-500/40"
            : isMicActive
              ? "bevel-light-inset bevel-dark-inset bg-gray-200 dark:bg-black"
              : "bevel-light-inset bevel-dark-inset bg-gray-200 hover:bg-gray-300 dark:bg-black dark:hover:bg-gray-800"
        }`}
      >
        <div className="flex h-5 w-5 items-center justify-center text-[1.2rem] sm:h-6 sm:w-6 md:text-[1.4rem]">
          <FaMicrophone
            className={
              showVisualCues && theme === "dark"
                ? "text-gray-800 drop-shadow-md"
                : showVisualCues
                  ? "text-white drop-shadow-md"
                  : isMicActive
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-gray-500 dark:text-gray-400"
            }
          />
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
