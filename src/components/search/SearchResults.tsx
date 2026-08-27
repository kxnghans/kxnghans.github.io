import {
  useRef,
  useState,
  useEffect,
  type UIEvent,
} from "react";
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
}

const SearchResults = ({ setActivePage }: SearchResultsProps) => {
  const { searchQuery, searchResults, navigateToResult } = useSearch();
  const [maxHeight, setMaxHeight] = useState<string>("none");
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (itemRef.current && containerRef.current) {
      const itemHeight = itemRef.current.offsetHeight;
      const numVisible = 7;
      if (searchResults.length > numVisible) {
        setMaxHeight(`${numVisible * itemHeight}px`);
        setShowArrow(true);
      } else {
        setMaxHeight("none");
        setShowArrow(false);
      }
    }
  }, [searchResults.length]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  };

  if (searchResults.length === 0) {
    return null;
  }

  const handleResultClick = (result: SearchableItem) => {
    setActivePage(result.location.pageName);
    navigateToResult(result.location);
  };

  return (
    <div
      ref={containerRef}
      style={{ maxHeight }}
      onScroll={handleScroll}
      className="dark:bg-dark-card absolute top-full mt-1 w-full overflow-y-auto rounded-lg bg-white shadow-lg"
    >
      <ul className="overflow-hidden">
        {searchResults.map((result, index) => (
          <li
            ref={index === 0 ? itemRef : null}
            key={result.id}
            className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
          >
            <button
              type="button"
              onClick={() => handleResultClick(result)}
              className="dark:bg-dark-card dark:hover:bg-dark-bg flex w-full cursor-pointer items-center bg-gray-50 p-4 text-left hover:bg-gray-100"
            >
              <span className="mr-4 text-gray-800 dark:text-gray-200">
                <Icon name={CATEGORY_ICON_MAP[result.category]} />
              </span>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  <span className="text-gray-500 dark:text-gray-400">
                    [{result.category}]
                  </span>{" "}
                  <Highlight text={result.title} highlight={searchQuery} />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
