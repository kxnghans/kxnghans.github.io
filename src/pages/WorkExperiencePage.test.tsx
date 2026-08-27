import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import WorkExperiencePage from "./WorkExperiencePage";

describe("WorkExperiencePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders work experience cards with summaries and titles", () => {
    render(<WorkExperiencePage />);

    expect(
      screen.getByRole("heading", { name: "Work Experience" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Systems Engineer & Sr Business Analyst"),
    ).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(screen.getByText("Supply Chain Manager")).toBeInTheDocument();
    expect(screen.getByText("Lockheed Martin, Space")).toBeInTheDocument();
    expect(screen.getByText("UCCS")).toBeInTheDocument();
    expect(screen.getByText("US Air Force")).toBeInTheDocument();
  });

  it("opens DetailModal when clicking on Lockheed Martin card with bullet details and exposure badges", () => {
    render(<WorkExperiencePage />);

    const lockheedCard = screen.getByRole("button", {
      name: /systems engineer & sr business analyst/i,
    });
    fireEvent.click(lockheedCard);

    // Modal renders with dialog, bullet details, and exposure badges
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", {
        name: "Systems Engineer & Sr Business Analyst",
      }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Architected Single Node OpenShift \(SNO\) clusters in the Galaxy Test Bed/i,
      ),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Authored the formal Concept of Operations \(CONOPS\) for GTB/i,
      ),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Exposure to:")).toBeInTheDocument();
    expect(within(dialog).getByText("OpenShift SNO")).toBeInTheDocument();
    expect(within(dialog).getByText("Kubernetes")).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole("button", {
      name: /close detail modal/i,
    });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens DetailModal when pressing Enter or Space key on USAF and UCCS cards", () => {
    render(<WorkExperiencePage />);

    const uccsCard = screen.getByRole("button", {
      name: /software developer/i,
    });

    // Test Space key trigger
    fireEvent.keyDown(uccsCard, { key: " " });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", { name: "Software Developer" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        /Built and maintained full-stack web applications for University of Colorado partners/i,
      ),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("TypeScript")).toBeInTheDocument();

    // Close modal with escape key
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Test Enter key trigger on USAF card
    const airForceCard = screen.getByRole("button", {
      name: /supply chain manager/i,
    });
    fireEvent.keyDown(airForceCard, { key: "Enter" });
    const usafDialog = screen.getByRole("dialog");
    expect(usafDialog).toBeInTheDocument();
    expect(
      within(usafDialog).getByRole("heading", { name: "Supply Chain Manager" }),
    ).toBeInTheDocument();
    expect(
      within(usafDialog).getByText(
        /Commissioned as Medical Service Corps \(MSC\) Officer/i,
      ),
    ).toBeInTheDocument();
    expect(within(usafDialog).getByText("Expeditionary Logistics")).toBeInTheDocument();
  });
});
