import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailModal from "./DetailModal";

describe("DetailModal", () => {
  const mockOnClose = vi.fn();
  const mockItem = {
    title: "Test Detail Item",
    subtitle: "Test Subtitle",
    details: ["Detail point 1", "Detail point 2: description"],
    highlights: [{ label: "Key Insight", value: "High value" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders detail modal with item content and dialog attributes", () => {
    render(<DetailModal item={mockItem} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "detail-modal-title");

    expect(screen.getByText("Test Detail Item")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Detail point 1")).toBeInTheDocument();
    expect(screen.getByText("Key Insight:")).toBeInTheDocument();
  });

  it("renders categorized details when headers ending with colons are present", () => {
    const itemWithCategories = {
      title: "Categorized Certifications",
      details: [
        "Programming Languages:",
        "TypeScript: Strongly typed JS",
        "Python: Scientific computing",
        "Cloud & DevOps:",
        "Docker: Container runtime",
      ],
    };

    render(<DetailModal item={itemWithCategories} onClose={mockOnClose} />);

    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
    expect(screen.getByText("TypeScript:")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Docker:")).toBeInTheDocument();
  });

  it("renders modalDetails, challenge/action/outcome, and exposure badges", () => {
    const skillItem = {
      title: "Fallback Title",
      challenge: "Legacy architecture bottleneck",
      action: "Refactored to modular micro-frontends",
      outcome: "Improved latency by 45%",
      modalDetails: {
        title: "Programming & Frameworks",
        subtitle: "Modern Full-Stack Stack",
        details: ["Python, TypeScript, SQL"],
        exposure: ["Kubernetes", "Cloudflare Workers"],
      },
    };

    render(<DetailModal item={skillItem} onClose={mockOnClose} />);

    expect(screen.getByText("Programming & Frameworks")).toBeInTheDocument();
    expect(screen.getByText("Modern Full-Stack Stack")).toBeInTheDocument();
    expect(screen.getByText("Legacy architecture bottleneck")).toBeInTheDocument();
    expect(screen.getByText("Refactored to modular micro-frontends")).toBeInTheDocument();
    expect(screen.getByText("Improved latency by 45%")).toBeInTheDocument();
    expect(screen.getByText("Exposure to:")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Cloudflare Workers")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<DetailModal item={mockItem} onClose={mockOnClose} />);

    const closeBtn = screen.getByLabelText("Close detail modal");
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    render(<DetailModal item={mockItem} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
