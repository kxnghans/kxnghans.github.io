import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategorizedList from "./CategorizedList";

describe("CategorizedList", () => {
  it("renders null when given empty items array", () => {
    const { container } = render(<CategorizedList items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a flat list with colon-separated labels and values", () => {
    const items = ["Role: Lead Architect", "Standard list item"];
    render(<CategorizedList items={items} />);

    expect(screen.getByText("Role:")).toBeInTheDocument();
    expect(screen.getByText("Lead Architect")).toBeInTheDocument();
    expect(screen.getByText("Standard list item")).toBeInTheDocument();
  });

  it("renders project link button when item label matches an existing project", () => {
    const mockSelect = vi.fn();
    const items = ["MilCalc: Cross-platform military logistics suite"];
    render(<CategorizedList items={items} onSelectProject={mockSelect} />);

    const projectBtn = screen.getByLabelText("View MilCalc project modal");
    expect(projectBtn).toBeInTheDocument();

    fireEvent.click(projectBtn);
    expect(mockSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("MilCalc"),
      }),
    );
  });

  it("groups items into categorized blocks when headers end with colon", () => {
    const items = [
      "Architecture:",
      "Frontend: React with TypeScript",
      "Backend: Cloudflare Workers",
    ];
    render(<CategorizedList items={items} />);

    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Frontend:")).toBeInTheDocument();
    expect(screen.getByText("React with TypeScript")).toBeInTheDocument();
  });
});
