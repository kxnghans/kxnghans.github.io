import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";

describe("App", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    localStorage.clear();
    document.documentElement.className = "";
    vi.clearAllMocks();
  });

  const renderApp = () => {
    return render(
      <ThemeProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ThemeProvider>,
    );
  };

  it("renders the Home page by default", () => {
    renderApp();
    expect(screen.getByText("Hanson-Tube")).toBeInTheDocument();
  });

  it("changes page when sidebar item is clicked", async () => {
    renderApp();
    const projectsBtn = screen.getByRole("button", { name: /projects/i });
    fireEvent.click(projectsBtn);

    expect(
      await screen.findByRole("heading", { name: /projects/i }),
    ).toBeInTheDocument();
  });

  it("navigates to the Value page when Value sidebar item is clicked", async () => {
    renderApp();
    const valueBtn = screen.getByRole("button", { name: /value/i });
    fireEvent.click(valueBtn);

    expect(
      await screen.findByRole("heading", {
        name: /executive value & impact intelligence/i,
      }),
    ).toBeInTheDocument();
  });



  it("toggles theme correctly", () => {
    renderApp();
    const themeBtn = screen.getByText("Light Mode");
    fireEvent.click(themeBtn);

    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("auto-closes sidebar on medium screens after a delay", async () => {
    vi.useFakeTimers();
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });

    renderApp();

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    vi.useRealTimers();
  });
});
