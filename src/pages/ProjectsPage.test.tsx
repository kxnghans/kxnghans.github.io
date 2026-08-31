import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProjectsPage from "./ProjectsPage";
import { SearchProvider } from "../context/SearchContext";

describe("ProjectsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderProjectsPage = () => {
    return render(
      <SearchProvider>
        <ProjectsPage />
      </SearchProvider>,
    );
  };

  it("renders the projects page heading and all project cards", () => {
    renderProjectsPage();

    expect(
      screen.getByRole("heading", { name: "Projects" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Portfolio Showcase")).toBeInTheDocument();
    expect(
      screen.getByText("CaroHans Event Rentals (ERMS)"),
    ).toBeInTheDocument();
    expect(screen.getByText("MilCalc Mobile Suite")).toBeInTheDocument();
    expect(screen.getByText("Gospel Games Platform")).toBeInTheDocument();
    expect(screen.getByText("Unpack Travel Companion")).toBeInTheDocument();
    expect(screen.getByText("Fretwork Guitar Capstone")).toBeInTheDocument();
  });

  it("opens ProjectModal when clicking on a project card and closes on close button", () => {
    renderProjectsPage();

    const carohansCard = screen.getByText("CaroHans Event Rentals (ERMS)");
    fireEvent.click(carohansCard);

    // Verify modal content scoped within dialog
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", {
        name: "CaroHans – Event Rental Management System (ERMS)",
      }),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Highlights")).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole("button", {
      name: /close project modal/i,
    });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens ProjectModal using keyboard Enter and Space keys", () => {
    renderProjectsPage();

    const milcalcCard = screen.getByRole("button", {
      name: /milcalc mobile suite/i,
    });

    // Space key trigger
    fireEvent.keyDown(milcalcCard, { key: " " });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", {
        name: "MilCalc – Military Pension & Fitness Mobile Suite",
      }),
    ).toBeInTheDocument();

    // Close with Escape key
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Enter key trigger
    fireEvent.keyDown(milcalcCard, { key: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
