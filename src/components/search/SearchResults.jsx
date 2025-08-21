
import React, { useContext } from 'react';
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

const SearchResults = ({ setActivePage }) => {
  const { searchResults, loading } = useContext(SearchContext);

  if (loading) {
    return (
      <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg p-4">
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
    <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg">
      <ul>
        {searchResults.map(result => (
          <li key={result.id} onClick={() => handleResultClick(result.page)} className="p-4 hover:bg-gray-100 cursor-pointer flex items-center">
            <span className="mr-4">{ICONS[result.type]}</span>
            <div>
              <p className="font-bold">{result.title}</p>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
