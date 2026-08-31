import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchResults from "./SearchResults";
import { Highlight, smartTruncate } from "./searchUtils";
import {
  SearchContext,
  type SearchContextType,
} from "../../context/SearchContext";
import type { SearchableItem } from "../../types/search";

describe("searchUtils", () => {
  it("highlights matching tokens safely with theme classes", () => {
    const { container } = render(
      <Highlight
        text="Building Next.js apps with TypeScript"
        highlight="Next.js TypeScript"
      />,
    );
    const highlighted = container.querySelectorAll("span.text-red-600");
    expect(highlighted.length).toBeGreaterThanOrEqual(2);
  });

  it("handles special regex characters in Highlight without crashing", () => {
    const { container } = render(
      <Highlight
        text="C++ and C# with React (v19) [Hooks] + Vite"
        highlight="C++ (v19) [Hooks] +"
      />,
    );
    expect(container.textContent).toBe(
      "C++ and C# with React (v19) [Hooks] + Vite",
    );
  });

  it("smartTruncate centers snippet around matching tokens", () => {
    const text =
      "Alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega";
    const snippet = smartTruncate(text, 6, "lambda");
    expect(snippet).toContain("lambda");
    expect(snippet.startsWith("...")).toBe(true);
    expect(snippet.endsWith("...")).toBe(true);
  });
});

describe("SearchResults component", () => {
  const mockResults: SearchableItem[] = [
    {
      id: "project-0",
      title: "CaroHans Event Rentals (ERMS)",
      subtitle: "CaroHans – Event Rental Management System",
      content: "Managing event rental equipment in Accra, Ghana.",
      category: "Projects",
      location: { pageName: "Projects", componentType: "modal", itemId: 0 },
    },
    {
      id: "skill-0",
      title: "Programming Languages & Frameworks",
      content: "TypeScript, JavaScript, React, Next.js, Python, C++",
      category: "Skills",
      location: { pageName: "Skills", componentType: "slideshow", itemId: 0 },
    },
  ];

  const mockRecommendations: SearchableItem[] = [
    {
      id: "project-2",
      title: "Gospel Games Platform",
      subtitle: "Faith-Based Interactive Gaming Platform",
      content: "Cross-platform mobile gaming platform built in React Native.",
      category: "Projects",
      location: { pageName: "Projects", componentType: "modal", itemId: 2 },
    },
    {
      id: "honor-0",
      title: "22nd NAF Airman of the Year",
      subtitle: "United States Air Force",
      content: "Top Airman accolade across numbered Air Force.",
      category: "Honors",
      location: { pageName: "Honors", componentType: "modal", itemId: 0 },
    },
  ];

  const defaultContextValue: SearchContextType = {
    searchQuery: "CaroHans",
    setSearchQuery: vi.fn(),
    searchResults: mockResults,
    recommendations: mockRecommendations,
    activeModal: null,
    setActiveModal: vi.fn(),
    selectedItem: null,
    setSelectedItem: vi.fn(),
    activeSlides: {},
    navigateToResult: vi.fn(),
  };

  it("renders search results with category badges and icons", () => {
    render(
      <SearchContext.Provider value={defaultContextValue}>
        <SearchResults setActivePage={vi.fn()} isFocused={true} />
      </SearchContext.Provider>,
    );

    expect(screen.getByText(/\[Projects\]/i)).toBeInTheDocument();
    expect(screen.getByText(/\[Skills\]/i)).toBeInTheDocument();
  });

  it("triggers setActivePage, navigateToResult, and onClose when result is clicked", () => {
    const setActivePage = vi.fn();
    const navigateToResult = vi.fn();
    const onClose = vi.fn();

    render(
      <SearchContext.Provider
        value={{ ...defaultContextValue, navigateToResult }}
      >
        <SearchResults
          setActivePage={setActivePage}
          isFocused={true}
          onClose={onClose}
        />
      </SearchContext.Provider>,
    );

    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstButton);

    expect(setActivePage).toHaveBeenCalledWith("Projects");
    expect(navigateToResult).toHaveBeenCalledWith(mockResults[0].location);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders recommended results with header when search query is empty and isFocused is true", () => {
    render(
      <SearchContext.Provider
        value={{ ...defaultContextValue, searchQuery: "", searchResults: [] }}
      >
        <SearchResults setActivePage={vi.fn()} isFocused={true} />
      </SearchContext.Provider>,
    );

    expect(screen.getByText("Recommended Topics")).toBeInTheDocument();
    expect(screen.getByText("Gospel Games Platform")).toBeInTheDocument();
    expect(screen.getByText("22nd NAF Airman of the Year")).toBeInTheDocument();
  });

  it("renders no-matches message when query has no search results and isFocused is true", () => {
    render(
      <SearchContext.Provider
        value={{
          ...defaultContextValue,
          searchQuery: "unknown-query-xyz",
          searchResults: [],
        }}
      >
        <SearchResults setActivePage={vi.fn()} isFocused={true} />
      </SearchContext.Provider>,
    );

    expect(screen.getByText(/No matches found for/i)).toBeInTheDocument();
    expect(screen.getByText(/"unknown-query-xyz"/i)).toBeInTheDocument();
  });

  it("renders null when searchResults is empty and isFocused is false", () => {
    const { container } = render(
      <SearchContext.Provider
        value={{ ...defaultContextValue, searchQuery: "", searchResults: [] }}
      >
        <SearchResults setActivePage={vi.fn()} isFocused={false} />
      </SearchContext.Provider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
