import React from "react";
import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchContext, SearchProvider } from "./SearchContext";

// Simple consumer to test context values
const TestConsumer = () => {
  const { searchQuery, setSearchQuery, searchResults, loading, navigateToResult } = React.useContext(SearchContext);
  return (
    <div>
      <div data-testid="search-query">{searchQuery}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <input 
        data-testid="search-input" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <ul data-testid="results">
        {searchResults.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
      <button data-testid="navigate-btn" onClick={() => navigateToResult({ componentType: 'none', itemId: 'test-id' })}>
        Navigate
      </button>
    </div>
  );
};

describe("SearchContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides default values", () => {
    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>
    );

    expect(screen.getByTestId("search-query")).toHaveTextContent("");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
  });

  it("updates search query and filters results", async () => {
    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    
    fireEvent.change(input, { target: { value: 'React' } });

    await waitFor(() => {
      expect(screen.getByTestId("search-query")).toHaveTextContent("React");
    });
    
    // Check that some results are returned (assuming searchableData has React related content)
    await waitFor(() => {
      const results = screen.getByTestId("results");
      expect(results.children.length).toBeGreaterThan(0);
    });
  });

  it("handles navigation with scrolling", async () => {
    vi.useFakeTimers();
    
    // Mock getElementById
    const mockElement = { scrollIntoView: vi.fn() };
    document.getElementById = vi.fn().mockReturnValue(mockElement);

    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>
    );

    const btn = screen.getByTestId("navigate-btn");
    await act(async () => {
      btn.click();
    });

    // Fast-forward the 100ms timeout
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(document.getElementById).toHaveBeenCalledWith("test-id");
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
    
    vi.useRealTimers();
  });
});
