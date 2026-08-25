import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchProvider, useSearch } from "./SearchContext";

// Simple consumer to test context values
const TestConsumer = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    navigateToResult,
  } = useSearch();
  return (
    <div>
      <div data-testid="search-query">{searchQuery}</div>
      <div data-testid="results-count">{searchResults.length}</div>
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul data-testid="results">
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
      <button
        data-testid="navigate-btn"
        onClick={() =>
          navigateToResult({
            pageName: "Work",
            componentType: "none",
            itemId: "test-id",
          })
        }
      >
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
      </SearchProvider>,
    );

    expect(screen.getByTestId("search-query")).toHaveTextContent("");
    expect(screen.getByTestId("results-count")).toHaveTextContent("0");
  });

  it("updates search query and filters results", async () => {
    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>,
    );

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "React" } });

    await waitFor(() => {
      expect(screen.getByTestId("search-query")).toHaveTextContent("React");
    });

    await waitFor(() => {
      const results = screen.getByTestId("results");
      expect(results.children.length).toBeGreaterThan(0);
    });
  });

  it("indexes and retrieves ecosystem venture terms accurately", async () => {
    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>,
    );

    const input = screen.getByTestId("search-input");

    // Search for "DAFMAN" (from MilCalc project summary & details)
    fireEvent.change(input, { target: { value: "DAFMAN" } });
    await waitFor(() => {
      expect(screen.getByText("MilCalc Mobile Suite")).toBeInTheDocument();
    });

    // Search for "Berkeley" (from Education)
    fireEvent.change(input, { target: { value: "Berkeley" } });
    await waitFor(() => {
      expect(screen.getByText("Masters in Data Science")).toBeInTheDocument();
    });

    // Search for "CONOPS" (from Work experience)
    fireEvent.change(input, { target: { value: "CONOPS" } });
    await waitFor(() => {
      expect(
        screen.getByText("Systems Engineer & Sr Business Analyst"),
      ).toBeInTheDocument();
    });
  });

  it("handles multi-token search queries and tech aliases", async () => {
    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>,
    );

    const input = screen.getByTestId("search-input");

    // Multi-token: CaroHans with platform term
    fireEvent.change(input, { target: { value: "CaroHans Supabase" } });
    await waitFor(() => {
      expect(
        screen.getByText("CaroHans Event Rentals (ERMS)"),
      ).toBeInTheDocument();
    });

    // Alias query: "nextjs"
    fireEvent.change(input, { target: { value: "nextjs" } });
    await waitFor(() => {
      expect(
        screen.getByText("CaroHans Event Rentals (ERMS)"),
      ).toBeInTheDocument();
    });
  });

  it("safely handles special regex characters without errors", async () => {
    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>,
    );

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "C++" } });
    await waitFor(() => {
      expect(screen.getByTestId("results-count")).not.toHaveTextContent("0");
    });

    fireEvent.change(input, { target: { value: "React (Hooks) [v19] + Vite" } });
    await waitFor(() => {
      expect(screen.getByTestId("search-query")).toHaveTextContent(
        "React (Hooks) [v19] + Vite",
      );
    });
  });

  it("handles navigation with scrolling", async () => {
    vi.useFakeTimers();

    // Mock getElementById
    const mockElement = { scrollIntoView: vi.fn() };
    document.getElementById = vi
      .fn()
      .mockReturnValue(mockElement as unknown as HTMLElement);

    render(
      <SearchProvider>
        <TestConsumer />
      </SearchProvider>,
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
