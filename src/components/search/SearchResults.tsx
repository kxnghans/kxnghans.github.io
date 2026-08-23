import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type UIEvent,
} from "react";
import { useSearch } from "../../context/SearchContext";
import {
  FaCog,
  FaProjectDiagram,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaAward,
  FaChevronDown,
} from "react-icons/fa";
import type { SearchCategory, SearchableItem } from "../../types/search";

const ICONS: Record<SearchCategory, ReactNode> = {
  Projects: <FaProjectDiagram />,
  Skills: <FaCog />,
  Work: <FaBriefcase />,
  Education: <FaGraduationCap />,
  Certifications: <FaCertificate />,
  Community: <FaUsers />,
  Honors: <FaAward />,
};

interface HighlightProps {
  text: string;
  highlight: string;
}

const Highlight = ({ text, highlight }: HighlightProps) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="rounded-xs bg-red-500/15 px-0.5 font-semibold text-red-600 dark:bg-red-500/25 dark:text-red-400"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

const smartTruncate = (str: string, n: number, query: string): string => {
  if (!str) return "";
  const words = str.split(" ");
  if (words.length <= n) return str;

  const lowerCaseStr = str.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();
  const queryIndex = lowerCaseStr.indexOf(lowerCaseQuery);

  if (queryIndex !== -1) {
    let charCount = 0;
    let wordIndex = 0;
    for (let i = 0; i < words.length; i++) {
      charCount += words[i].length + 1;
      if (charCount > queryIndex) {
        wordIndex = i;
        break;
      }
    }

    const half = Math.floor(n / 2);
    const start = Math.max(0, wordIndex - half);
    let end = Math.min(words.length, wordIndex + half);

    if (end - start < n) {
      if (start === 0) {
        end = Math.min(words.length, n);
      } else if (end === words.length) {
        // adjust if needed
      }
    }

    let snippet = words.slice(start, end).join(" ");
    if (start > 0) snippet = "..." + snippet;
    if (end < words.length) snippet = snippet + "...";
    return snippet;
  } else {
    return words.slice(0, n).join(" ") + "...";
  }
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
                {ICONS[result.category]}
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
          <FaChevronDown className="mx-auto animate-bounce text-gray-500 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
