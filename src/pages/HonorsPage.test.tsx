import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HonorsPage from "./HonorsPage";
import { SearchProvider } from "../context/SearchContext";

describe("HonorsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHonorsPage = () => {
    return render(
      <SearchProvider>
        <HonorsPage />
      </SearchProvider>,
    );
  };

  it("renders honors heading, honor cards, and certifications slideshow", () => {
    renderHonorsPage();

    expect(
      screen.getByRole("heading", { name: "Honors & Awards" }),
    ).toBeInTheDocument();
    expect(screen.getByText("USAF Decorations and Medals")).toBeInTheDocument();
    expect(screen.getByText("Airman of the Year")).toBeInTheDocument();
    expect(screen.getByText("President's & Dean's Lists")).toBeInTheDocument();
    expect(screen.getByText("Honor Graduate")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Certifications" }),
    ).toBeInTheDocument();
  });

  it("opens DetailModal when clicking on an honor card and closes on close button", () => {
    renderHonorsPage();

    const airmanCard = screen.getByText("Airman of the Year");
    fireEvent.click(airmanCard);

    // Verify modal content scoped within dialog
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", {
        name: "Airman of the Year & Diamond Sharp Award",
      }),
    ).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole("button", {
      name: /close detail modal/i,
    });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens DetailModal using keyboard Enter and Space keys", () => {
    renderHonorsPage();

    const medalsCard = screen.getByRole("button", {
      name: /usaf decorations and medals/i,
    });

    // Space key trigger
    fireEvent.keyDown(medalsCard, { key: " " });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", {
        name: "USAF Decorations and Medals",
      }),
    ).toBeInTheDocument();

    // Close with Escape key
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Enter key trigger
    fireEvent.keyDown(medalsCard, { key: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
