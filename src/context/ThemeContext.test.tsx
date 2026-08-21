import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";

const TestConsumer = () => {
  const { theme, toggleTheme, setTheme, isDarkMode } = useTheme();
  return (
    <div>
      <span data-testid="theme-val">{theme}</span>
      <span data-testid="is-dark">{isDarkMode ? "true" : "false"}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
    </div>
  );
};

describe("ThemeContext & ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("defaults to dark theme when no localStorage or matchMedia", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-val").textContent).toBe("dark");
    expect(screen.getByTestId("is-dark").textContent).toBe("true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("initializes from localStorage if valid theme exists", () => {
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-val").textContent).toBe("light");
    expect(screen.getByTestId("is-dark").textContent).toBe("false");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("initializes from matchMedia when prefers-color-scheme is dark", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-val").textContent).toBe("dark");
  });

  it("toggles theme correctly between dark and light", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-val").textContent).toBe("dark");

    fireEvent.click(screen.getByText("Toggle"));

    expect(screen.getByTestId("theme-val").textContent).toBe("light");
    expect(screen.getByTestId("is-dark").textContent).toBe("false");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");

    fireEvent.click(screen.getByText("Toggle"));

    expect(screen.getByTestId("theme-val").textContent).toBe("dark");
    expect(screen.getByTestId("is-dark").textContent).toBe("true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("explicitly sets theme using setTheme", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText("Set Light"));
    expect(screen.getByTestId("theme-val").textContent).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");

    fireEvent.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("theme-val").textContent).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("throws an error when useTheme is called outside ThemeProvider", () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    expect(() => render(<TestConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    console.error = originalConsoleError;
  });
});
