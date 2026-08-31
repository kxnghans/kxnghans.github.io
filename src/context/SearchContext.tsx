import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useDeferredValue,
  type ReactNode,
} from "react";
import { searchableData } from "../utils/searchableData";
import { SearchEngine } from "../utils/searchEngine";
import { honors } from "../data";
import type { SearchableItem, SearchLocation } from "../types/search";
import type { HonorDetails, ProjectDetails } from "../types/data";

const engine = new SearchEngine(searchableData);

export type ModalDetailItem =
  HonorDetails | ProjectDetails | Record<string, unknown> | null;

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchableItem[];
  recommendations: SearchableItem[];
  activeModal: string | number | null;
  setActiveModal: (modal: string | number | null) => void;
  selectedItem: ModalDetailItem;
  setSelectedItem: (item: ModalDetailItem) => void;
  activeSlides: Record<string, number | string>;
  navigateToResult: (location?: SearchLocation) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModal, setActiveModal] = useState<string | number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ModalDetailItem>(null);
  const [activeSlides, setActiveSlides] = useState<
    Record<string, number | string>
  >({});

  const deferredQuery = useDeferredValue(searchQuery);

  const searchResults = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    return engine.search(deferredQuery);
  }, [deferredQuery]);

  // Curated category-diverse recommendations surfaced during empty search states
  const recommendations = useMemo(() => {
    return engine.getRecommendations(6);
  }, []);

  const setSearchQuerySafe = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const navigateToResult = useCallback((location?: SearchLocation) => {
    if (!location) return;

    // Close any open modal first
    setActiveModal(null);
    setSelectedItem(null);

    if (location.componentType === "modal") {
      if (
        location.pageName === "Honors" &&
        typeof location.itemId === "number" &&
        honors[location.itemId]
      ) {
        setSelectedItem(honors[location.itemId].details);
      }
      setActiveModal(location.itemId);
    }

    if (location.componentType === "slideshow" && location.componentId) {
      setActiveSlides((prev) => ({
        ...prev,
        [location.componentId as string]: location.itemId,
      }));
    }

    // For components that are just on a page, use itemId to scroll
    if (location.componentType === "none" && location.itemId) {
      setTimeout(() => {
        const element = document.getElementById(String(location.itemId));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, []);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery: setSearchQuerySafe,
      searchResults,
      recommendations,
      activeModal,
      setActiveModal,
      selectedItem,
      setSelectedItem,
      activeSlides,
      navigateToResult,
    }),
    [
      searchQuery,
      setSearchQuerySafe,
      searchResults,
      recommendations,
      activeModal,
      selectedItem,
      activeSlides,
      navigateToResult,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
