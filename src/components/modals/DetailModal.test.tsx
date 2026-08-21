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
