/**
 * @file Header.tsx
 * @description Top navigation bar with branding, mobile drawer toggle, desktop search,
 * mobile search popover, and profile avatar link.
 */

import { useState, useRef } from "react";
import { Icon, ICONS } from "../icons";
import SearchBar from "../search/SearchBar";
import { useSearch } from "../../context/SearchContext";
import { useVoiceSearch } from "../../hooks/useVoiceSearch";
import { useSearchHotkeys } from "../../hooks/useSearchHotkeys";
import { ASSET_URLS } from "../../data/assets";

const profileImage = ASSET_URLS.PROFILE.AVATAR_WEBP;

export interface HeaderProps {
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
  activePage: string;
}

const Header = ({ toggleSidebar, setActivePage, activePage }: HeaderProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { setSearchQuery } = useSearch();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const micRef = useRef<HTMLButtonElement | null>(null);

  // Bind voice recognition lifecycle and speech error handlers
  const {
    isMicActive,
    isSpeechSupported,
    showVisualCues,
    placeholderText,
    toggleMic,
  } = useVoiceSearch({
    onTranscript: setSearchQuery,
    inputRef,
    micRef,
  });

  // Bind global keyboard shortcuts (Ctrl+K, Cmd+K, /, Esc)
  useSearchHotkeys({
    inputRef,
    isSearchVisible,
    setIsSearchVisible,
    onClearSearch: () => setSearchQuery(""),
  });

  return (
    <header className="dark:bg-dark-header/90 sticky top-0 z-40 flex items-center justify-between border-b border-gray-300 bg-gray-100/80 p-3 backdrop-blur-sm dark:border-gray-800">
      {/* Left Section: Menu Toggle and App Title */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="mr-4 rounded-full p-2 transition-colors hover:bg-gray-300 md:p-2.5 dark:hover:bg-gray-800"
        >
          <div className="flex h-5 w-5 items-center justify-center text-[1.4rem] sm:h-6 sm:w-6 md:text-[1.6rem]">
            <Icon name={ICONS.MENU} />
          </div>
        </button>
        <button
          type="button"
          className="group flex cursor-pointer items-center text-left transition-transform duration-200 ease-in-out hover:text-red-600 active:scale-95 dark:hover:text-red-500"
          onClick={() => {
            setActivePage("Home");
            window.scrollTo(0, 0);
          }}
          aria-label="Go to Home"
        >
          <div className="mr-3 text-[2rem] text-red-600 transition-transform duration-200 ease-in-out group-hover:scale-105 md:text-[2.5rem] dark:text-red-500">
            <Icon name={ICONS.PLAY} />
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
                : "bevel-light-inset bevel-dark-inset dark:bg-dark-well dark:hover:bg-dark-well-hover bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <div className="flex h-5 w-5 items-center justify-center text-[1rem] sm:h-6 sm:w-6 md:text-[1.2rem]">
              <Icon
                name={ICONS.SEARCH}
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
              className={`h-10 w-10 transform cursor-pointer rounded-full border-2 border-transparent object-cover hover:border-red-600 dark:hover:border-red-500 ${
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
        <div className="dark:bg-dark-header/95 absolute top-full right-0 left-0 bg-gray-100/95 p-4 shadow-lg backdrop-blur-sm lg:hidden">
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
