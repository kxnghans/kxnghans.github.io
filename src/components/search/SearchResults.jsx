
import React, { useContext, useRef, useState, useEffect } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { FaCog, FaProjectDiagram, FaBriefcase, FaGraduationCap, FaCertificate, FaUsers, FaAward } from 'react-icons/fa';

const ICONS = {
  Project: <FaProjectDiagram />,
  Skill: <FaCog />,
  Work: <FaBriefcase />,
  Education: <FaGraduationCap />,
  Certification: <FaCertificate />,
  Community: <FaUsers />,
  Honor: <FaAward />,
};

const Highlight = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
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
        )
      )}
    </span>
  );
};

const smartTruncate = (str, n, query) => {
  if (!str) return "";
  const words = str.split(" ");
  if (words.length <= n) return str;

  const queryIndex = words.findIndex(word => word.toLowerCase().includes(query.toLowerCase()));

  if (queryIndex !== -1) {
    const half = Math.floor(n / 2);
    let start = Math.max(0, queryIndex - half);
    let end = Math.min(words.length, queryIndex + half);

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
  const { searchQuery, searchResults, loading } = useContext(SearchContext);
  const [maxHeight, setMaxHeight] = useState('none');
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      const itemHeight = itemRef.current.offsetHeight;
      setMaxHeight(`${7 * itemHeight}px`);
    }
  }, [searchResults.length]);

  if (loading) {
    return (
      <div className="absolute w-full bg-white dark:bg-dark-card shadow-lg rounded-lg p-4 top-full mt-1">
        <p>Loading...</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  const handleResultClick = (page) => {
    setActivePage(page);
  };

  return (
    <div style={{ maxHeight }} className="absolute w-full bg-white dark:bg-dark-card shadow-lg rounded-lg top-full mt-1 overflow-y-auto">
      <ul className="overflow-hidden">
        {searchResults.map((result, index) => (
          <li ref={index === 0 ? itemRef : null} key={result.id} onClick={() => handleResultClick(result.page)} className={`p-4 bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer flex items-center border-b border-gray-200 dark:border-gray-700 last:border-b-0`}>
            <span className="mr-4 text-gray-800 dark:text-gray-200">{ICONS[result.type]}</span>
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">
                <span className="text-gray-500 dark:text-gray-400">[{result.type}]</span> <Highlight text={result.title} highlight={searchQuery} />
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <Highlight text={smartTruncate(result.description, 8, searchQuery)} highlight={searchQuery} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
