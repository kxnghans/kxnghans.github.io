import { useRef, useState, useEffect, type UIEvent } from "react";
import { useSearch } from "../../context/SearchContext";
import { Icon, ICONS, type IconName } from "../icons";
import type { SearchCategory, SearchableItem } from "../../types/search";
import { Highlight, smartTruncate } from "./searchUtils";

const CATEGORY_ICON_MAP: Record<SearchCategory, IconName> = {
  Value: ICONS.VALUE,
  Projects: ICONS.PROJECTS,
  Skills: ICONS.COG,
  Work: ICONS.WORK,
  Education: ICONS.EDUCATION,
  Certifications: ICONS.CERTIFICATION,
  Community: ICONS.USERS,
  Honors: ICONS.HONORS,
};

export interface SearchResultsProps {
  setActivePage: (page: string) => void;
  isFocused?: boolean;
  onClose?: () => void;
}

const SearchResults = ({
  setActivePage,
  isFocused = false,
  onClose,
}: SearchResultsProps) => {
  const { searchQuery, searchResults, recommendations, navigateToResult } =
    useSearch();
  const [maxHeight, setMaxHeight] = useState<string>("none");
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isQueryEmpty = !searchQuery.trim();
  const displayItems = isQueryEmpty ? recommendations : searchResults;
  const isVisible = isQueryEmpty
    ? isFocused && recommendations.length > 0
    : isFocused || searchResults.length > 0;

  // Recalculate max dropdown height and scroll arrow indicator based on item counts
  useEffect(() => {
    if (itemRef.current && containerRef.current) {
      const itemHeight = itemRef.current.offsetHeight || 60;
      const numVisible = 6;
      if (displayItems.length > numVisible) {
        setMaxHeight(`${numVisible * itemHeight}px`);
        setShowArrow(true);
      } else {
        setMaxHeight("none");
        setShowArrow(false);
      }
    }
  }, [displayItems.length]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 2) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  };

  if (!isVisible) return null;

  const handleResultClick = (result: SearchableItem) => {
    setActivePage(result.location.pageName);
    navigateToResult(result.location);
    onClose?.();
  };

  return (
    <div
      ref={containerRef}
      style={{ maxHeight }}
      onScroll={handleScroll}
      className="dark:bg-dark-card absolute top-full z-50 mt-1.5 w-full overflow-y-auto rounded-xl bg-white shadow-xl ring-1 ring-black/5 dark:ring-white/10"
    >
      {/* Recommended Topics Header vs Empty Search Indicator */}
      {isQueryEmpty ? (
        <div className="dark:bg-dark-header/90 flex items-center justify-between border-b border-gray-200 bg-gray-100/90 px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:border-gray-700 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Icon
              name={ICONS.STAR}
              className="text-red-500 dark:text-red-400"
            />
            <span>Recommended Topics</span>
          </span>
          <span className="text-[10px] font-normal tracking-normal text-gray-400 lowercase dark:text-gray-500">
            Suggested for you
          </span>
        </div>
      ) : displayItems.length === 0 ? (
        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No matches found for{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            &quot;{searchQuery}&quot;
          </span>
        </div>
      ) : null}

      {/* Rendered Search or Recommendation Item List */}
      {displayItems.length > 0 && (
        <ul className="overflow-hidden">
          {displayItems.map((result, index) => (
            <li
              ref={index === 0 ? itemRef : null}
              key={result.id}
              className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
            >
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleResultClick(result)}
                className="dark:bg-dark-card dark:hover:bg-dark-bg flex w-full cursor-pointer items-center bg-gray-50 p-3.5 text-left transition-colors hover:bg-gray-100"
              >
                <span className="mr-3 text-base text-gray-800 dark:text-gray-200">
                  <Icon name={CATEGORY_ICON_MAP[result.category]} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-800 dark:text-gray-200">
                    <span className="mr-1 font-normal text-gray-500 dark:text-gray-400">
                      [{result.category}]
                    </span>
                    <Highlight text={result.title} highlight={searchQuery} />
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-600 dark:text-gray-400">
                    <Highlight
                      text={smartTruncate(result.content, 8, searchQuery)}
                      highlight={searchQuery}
                    />
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showArrow && (
        <div className="dark:bg-dark-card sticky bottom-0 w-full border-t border-gray-200 bg-white py-1 text-center dark:border-gray-700">
          <Icon
            name={ICONS.CHEVRON_DOWN}
            className="mx-auto animate-bounce text-gray-500 dark:text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
