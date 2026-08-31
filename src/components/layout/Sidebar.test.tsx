import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../../context/ThemeContext";

describe("Sidebar", () => {
  const mockSetActivePage = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.clearAllMocks();
  });

  const renderSidebar = (props = {}) => {
    return render(
      <ThemeProvider>
        <Sidebar
          isOpen={true}
          activePage="Home"
          setActivePage={mockSetActivePage}
          {...props}
        />
      </ThemeProvider>,
    );
  };

  it("renders navigation items including Value when feature flag is enabled", () => {
    renderSidebar();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("calls setActivePage when a nav item is clicked", () => {
    renderSidebar();

    fireEvent.click(screen.getByText("Value"));
    expect(mockSetActivePage).toHaveBeenCalledWith("Value");

    fireEvent.click(screen.getByText("Projects"));
    expect(mockSetActivePage).toHaveBeenCalledWith("Projects");
  });

  it("toggles theme when theme toggle is clicked", () => {
    renderSidebar();

    const toggleBtn = screen.getByText("Light Mode");
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("hides text labels when isOpen is false", () => {
    renderSidebar({ isOpen: false });

    const homeLabel = screen.getByText("Home");
    expect(homeLabel).toHaveClass("opacity-0");
  });
});
