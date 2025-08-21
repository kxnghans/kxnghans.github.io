
import React, { createContext, useState, useMemo } from 'react';
import { searchableData } from '../utils/searchableData';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    setLoading(true);
    const results = searchableData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setLoading(false);
    return results;
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResults, loading }}>
      {children}
    </SearchContext.Provider>
  );
};
