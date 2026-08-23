import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProjectModal from "./ProjectModal";

describe("ProjectModal", () => {
  const mockOnClose = vi.fn();
  const mockProject = {
    title: "Test Ecosystem Platform",
    challenge: "Test challenge description",
    action: "Test action description",
    outcome: "Test outcome description",
    details: ["Integrated with Cloudflare edge routing", "Sub-millisecond cold start latency"],
    liveLink: "https://example.com/demo",
    codeLink: "https://example.com/code",
    video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    highlights: [
      { label: "Architecture", value: "Modern Stack" },
      { label: "Scale", value: "Enterprise Scale" },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal with project details and ARIA attributes", () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "project-modal-title");

    expect(screen.getByText("Test Ecosystem Platform")).toBeInTheDocument();
    expect(screen.getByText("Test challenge description")).toBeInTheDocument();
    expect(screen.getByText("Test action description")).toBeInTheDocument();
    expect(screen.getByText("Test outcome description")).toBeInTheDocument();
    expect(screen.getByText("Integrated with Cloudflare edge routing")).toBeInTheDocument();
    expect(screen.getByText("Architecture:")).toBeInTheDocument();
    expect(screen.getByText("Modern Stack")).toBeInTheDocument();
  });

  it("renders embedded demonstration video iframe when video property is provided", () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const iframe = screen.getByTitle(/demonstration video/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  });

  it("renders live demo and source code action buttons", () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const demoLink = screen.getByRole("link", { name: /demo/i });
    expect(demoLink).toHaveAttribute("href", "https://example.com/demo");
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");

    const codeLink = screen.getByRole("link", { name: /view project/i });
    expect(codeLink).toHaveAttribute("href", "https://example.com/code");
  });

  it("calls onClose when close button is clicked", () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    const closeBtn = screen.getByLabelText("Close project modal");
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    render(<ProjectModal project={mockProject} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
