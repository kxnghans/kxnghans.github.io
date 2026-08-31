import { render, screen, fireEvent, act, within } from "@testing-library/react";
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

  it("renders the Home page by default with profile summary card", () => {
    renderApp();
    expect(screen.getByText("Hanson-Tube")).toBeInTheDocument();
    expect(
      screen.getByText("Systems Engineer & Sr Business Analyst"),
    ).toBeInTheDocument();
  });

  it("navigates across sidebar routes seamlessly", async () => {
    renderApp();

    const sidebar = document.querySelector("aside")!;
    expect(sidebar).toBeInTheDocument();

    // 1. Navigate to Work Experience
    fireEvent.click(within(sidebar).getByText("Work Experience"));
    expect(
      await screen.findByRole("heading", { name: "Work Experience" }),
    ).toBeInTheDocument();

    // 2. Navigate to Projects
    fireEvent.click(within(sidebar).getByText("Projects"));
    expect(
      await screen.findByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();

    // 3. Navigate to Education
    fireEvent.click(within(sidebar).getByText("Education"));
    expect(
      await screen.findByRole("heading", { name: "Education" }),
    ).toBeInTheDocument();

    // 4. Navigate to Honors
    fireEvent.click(within(sidebar).getByText("Honors"));
    expect(
      await screen.findByRole("heading", { name: "Honors & Awards" }),
    ).toBeInTheDocument();

    // 5. Navigate to Value
    fireEvent.click(within(sidebar).getByText("Value"));
    expect(
      await screen.findByRole("heading", {
        name: /executive value & impact intelligence/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows recommended topics on search input focus and navigates to result on click", async () => {
    renderApp();

    const searchInput = screen.getByPlaceholderText("Search");
    act(() => {
      fireEvent.focus(searchInput);
    });

    // Verify recommendations header appears
    const recHeader = await screen.findByText("Recommended Topics");
    expect(recHeader).toBeInTheDocument();

    // Find the recommendation button uniquely by category tag and title
    const recButton = screen.getByRole("button", {
      name: /\[projects\] gospel games platform/i,
    });
    expect(recButton).toBeInTheDocument();

    // Click on recommended result
    fireEvent.click(recButton);

    // Verify target page rendered
    expect(
      await screen.findByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
  });

  it("toggles theme between Light Mode and Dark Mode with html class updates", () => {
    renderApp();
    const themeBtn = screen.getByText("Light Mode");
    fireEvent.click(themeBtn);

    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Dark Mode"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByText("Light Mode")).toBeInTheDocument();
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
