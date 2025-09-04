import React, { createContext, useState, useMemo } from "react";
import { searchableData } from "../utils/searchableData";
import { navOrder } from "../data/navigation";
import { honors } from "../data";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSlides, setActiveSlides] = useState({});

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    setLoading(true);
    const results = searchableData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        const aIndex = navOrder.indexOf(a.category);
        const bIndex = navOrder.indexOf(b.category);
        return aIndex - bIndex;
      });
    setLoading(false);
    return results;
  }, [searchQuery]);

  const navigateToResult = (location) => {
    if (!location) return;

    // Close any open modal first
    setActiveModal(null);
    setSelectedItem(null);

    if (location.componentType === "modal") {
      if (location.pageName === "Honors") {
        setSelectedItem(honors[location.itemId].details);
      }
      setActiveModal(location.itemId);
    }

    if (location.componentType === "slideshow") {
      setActiveSlides((prev) => ({
        ...prev,
        [location.componentId]: location.itemId,
      }));
    }

    // For components that are just on a page, we can use the itemId to scroll
    if (location.componentType === "none") {
      setTimeout(() => {
        const element = document.getElementById(location.itemId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100); // Delay to allow page to render
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        loading,
        activeModal,
        setActiveModal,
        selectedItem,
        setSelectedItem,
        activeSlides,
        navigateToResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
