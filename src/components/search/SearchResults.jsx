import React, { useContext, useRef, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
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

const ICONS = {
  Projects: <FaProjectDiagram />,
  Skills: <FaCog />,
  Work: <FaBriefcase />,
  Education: <FaGraduationCap />,
  Certifications: <FaCertificate />,
  Community: <FaUsers />,
  Honors: <FaAward />,
};

const Highlight = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 text-black">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
};

const smartTruncate = (str, n, query) => {
  if (!str) return "";
  const words = str.split(" ");
  if (words.length <= n) return str;

  const lowerCaseStr = str.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();
  const queryIndex = lowerCaseStr.indexOf(lowerCaseQuery);

  if (queryIndex !== -1) {
    // Find the word index that contains the start of the query
    let charCount = 0;
    let wordIndex = 0;
    for (let i = 0; i < words.length; i++) {
      charCount += words[i].length + 1; // +1 for space
      if (charCount > queryIndex) {
        wordIndex = i;
        break;
      }
    }

    const half = Math.floor(n / 2);
    let start = Math.max(0, wordIndex - half);
    let end = Math.min(words.length, wordIndex + half);

    if (end - start < n) {
      if (start === 0) {
        end = Math.min(words.length, n);
      } else if (end === words.length) {
        start = Math.max(0, words.length - n);
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

const SearchResults = ({ setActivePage }) => {
  const { searchQuery, searchResults, loading, navigateToResult } =
    useContext(SearchContext);
  const [maxHeight, setMaxHeight] = useState("none");
  const [showArrow, setShowArrow] = useState(false);
  const itemRef = useRef(null);
  const containerRef = useRef(null);

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

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  };

  if (loading) {
    return (
      <div className="absolute top-full mt-1 w-full rounded-lg bg-white p-4 shadow-lg dark:bg-dark-card">
        <p>Loading...</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  const handleResultClick = (result) => {
    setActivePage(result.location.pageName);
    navigateToResult(result.location);
  };

  return (
    <div
      ref={containerRef}
      style={{ maxHeight }}
      onScroll={handleScroll}
      className="absolute top-full mt-1 w-full overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-dark-card"
    >
      <ul className="overflow-hidden">
        {searchResults.map((result, index) => (
          <li
            ref={index === 0 ? itemRef : null}
            key={result.id}
            onClick={() => handleResultClick(result)}
            className={`flex cursor-pointer items-center border-b border-gray-200 bg-gray-50 p-4 last:border-b-0 hover:bg-gray-100 dark:border-gray-700 dark:bg-dark-card dark:hover:bg-dark-bg`}
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
          </li>
        ))}
      </ul>
      {showArrow && (
        <div className="sticky bottom-0 w-full border-t border-gray-200 bg-white py-1 text-center dark:border-gray-700 dark:bg-dark-card">
          <FaChevronDown className="mx-auto animate-bounce text-gray-500 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
