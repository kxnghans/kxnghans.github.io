import { useContext, type ChangeEvent, type RefObject } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useTheme } from "../../context/ThemeContext";
import SearchResults from "./SearchResults";
import { Icon, ICONS } from "../icons";

export interface SearchBarProps {
  setActivePage: (page: string) => void;
  isMicActive: boolean;
  isSpeechSupported: boolean;
  showVisualCues: boolean;
  placeholderText: string;
  toggleMic: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  micRef: RefObject<HTMLButtonElement | null>;
}

const SearchBar = ({
  setActivePage,
  isMicActive,
  isSpeechSupported,
  showVisualCues,
  placeholderText,
  toggleMic,
  inputRef,
  micRef,
}: SearchBarProps) => {
  const searchCtx = useContext(SearchContext);
  const searchQuery = searchCtx?.searchQuery || "";
  const setSearchQuery = searchCtx?.setSearchQuery || (() => {});
  const { theme } = useTheme();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex w-full flex-1 items-center">
      <div className="group relative w-full">
        {/* Recessed search input with bevel styling and dynamic visual cues */}
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholderText}
          value={searchQuery}
          onChange={handleSearchChange}
          className={`bevel-light-inset bevel-dark-inset w-full rounded-full bg-gray-200 py-2 pr-10 pl-10 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 md:text-base dark:bg-dark-well dark:focus:border-red-500 ${
            showVisualCues
              ? "ring-2 ring-red-500 dark:!border-red-500 dark:shadow-md dark:shadow-red-500/30"
              : ""
          }`}
        />
        {/* Search Glyph Indicator */}
        <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[1rem] md:text-[1.2rem]">
          <Icon
            name={ICONS.SEARCH}
            className={`transition-colors duration-200 ${
              showVisualCues
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-400 dark:group-focus-within:text-red-500"
            }`}
          />
        </div>
        {/* Clear query button or keyboard shortcut hint */}
        {searchQuery ? (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search query"
            className="absolute top-1/2 right-3 z-10 -translate-y-1/2"
          >
            <Icon
              name={ICONS.CLOSE_CIRCLE}
              className="h-4 w-4 text-gray-400 transition-colors hover:text-red-500"
            />
          </button>
        ) : (
          <div className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-1 sm:flex">
            <kbd className="rounded border border-gray-300/60 bg-gray-100/60 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 select-none dark:border-white/5 dark:bg-white/[0.04] dark:text-gray-500">
              {typeof navigator !== "undefined" &&
              /Mac|iPhone|iPod|iPad/.test(
                navigator.platform || navigator.userAgent || "",
              )
                ? "⌘K"
                : "Ctrl K"}
            </kbd>
          </div>
        )}
        <SearchResults setActivePage={setActivePage} />
      </div>

      {/* Speech Recognition Mic Button */}
      <button
        id="mic-button"
        ref={micRef}
        type="button"
        onClick={toggleMic}
        aria-label="Toggle microphone"
        className={`ml-3 transform rounded-full p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-header ${
          showVisualCues
            ? "animate-gentle-pulse scale-105 bg-red-500 text-white shadow-lg shadow-red-500/40 ring-2 ring-red-500"
            : isMicActive
              ? "bevel-light-inset bevel-dark-inset bg-gray-200 dark:bg-dark-well dark:ring-2 dark:ring-red-500/60"
              : !isSpeechSupported
                ? "bevel-light-inset bevel-dark-inset bg-gray-200 opacity-50 dark:bg-dark-well"
                : "bevel-light-inset bevel-dark-inset bg-gray-200 hover:bg-gray-300 dark:bg-dark-well dark:hover:bg-dark-well-hover"
        }`}
      >
        <div className="flex h-5 w-5 items-center justify-center text-[1.2rem] sm:h-6 sm:w-6 md:text-[1.4rem]">
          <Icon
            name={ICONS.MICROPHONE}
            className={
              showVisualCues && theme === "dark"
                ? "text-gray-900 drop-shadow-sm"
                : showVisualCues
                  ? "text-white drop-shadow-md"
                  : isMicActive
                    ? "text-gray-600 dark:text-red-400"
                    : !isSpeechSupported
                      ? "text-gray-400 dark:text-gray-600"
                      : "text-gray-500 dark:text-gray-400 dark:hover:text-red-400"
            }
          />
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
