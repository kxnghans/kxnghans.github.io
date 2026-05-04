import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  const mockSetActivePage = vi.fn();
  const mockSetTheme = vi.fn();

  it("renders navigation items", () => {
    render(
      <Sidebar 
        isOpen={true} 
        activePage="Home" 
        setActivePage={mockSetActivePage} 
        theme="dark" 
        setTheme={mockSetTheme} 
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("calls setActivePage when a nav item is clicked", () => {
    render(
      <Sidebar 
        isOpen={true} 
        activePage="Home" 
        setActivePage={mockSetActivePage} 
        theme="dark" 
        setTheme={mockSetTheme} 
      />
    );

    fireEvent.click(screen.getByText("Projects"));
    expect(mockSetActivePage).toHaveBeenCalledWith("Projects");
  });

  it("calls setTheme when theme toggle is clicked", () => {
    render(
      <Sidebar 
        isOpen={true} 
        activePage="Home" 
        setActivePage={mockSetActivePage} 
        theme="dark" 
        setTheme={mockSetTheme} 
      />
    );

    fireEvent.click(screen.getByText("Light Mode"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("hides text labels when isOpen is false", () => {
    render(
      <Sidebar 
        isOpen={false} 
        activePage="Home" 
        setActivePage={mockSetActivePage} 
        theme="dark" 
        setTheme={mockSetTheme} 
      />
    );

    const homeLabel = screen.getByText("Home");
    expect(homeLabel).toHaveClass("opacity-0");
  });
});
