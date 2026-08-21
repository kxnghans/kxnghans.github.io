import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { searchableData } from "../utils/searchableData";
import { navOrder } from "../data/navigation";
import { honors } from "../data";
import type { SearchableItem, SearchLocation } from "../types/search";
import type { HonorDetails, ProjectDetails } from "../types/data";

export type ModalDetailItem =
  HonorDetails | ProjectDetails | Record<string, unknown> | null;

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchableItem[];
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ModalDetailItem>(null);
  const [activeSlides, setActiveSlides] = useState<
    Record<string, number | string>
  >({});

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

  const navigateToResult = (location?: SearchLocation) => {
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

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
