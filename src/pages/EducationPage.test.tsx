import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EducationPage from "./EducationPage";

describe("EducationPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders education degree cards with summaries", () => {
    render(<EducationPage />);

    expect(
      screen.getByRole("heading", { name: "Education" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Masters in Data Science")).toBeInTheDocument();
    expect(
      screen.getByText("Bachelors in Electrical Engineering"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("University of California, Berkeley"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("University of Colorado, Colorado Springs"),
    ).toBeInTheDocument();
  });

  it("opens DetailModal when clicking on UC Berkeley masters card", () => {
    render(<EducationPage />);

    const berkeleyCard = screen.getByRole("button", {
      name: /masters in data science/i,
    });
    fireEvent.click(berkeleyCard);

    // Modal renders with title, subtitle, highlights, categories, and exposure
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Master of Science in Data Science",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Academic GPA:")).toBeInTheDocument();
    expect(
      screen.getByText("Graduate Machine Learning & AI Curriculum"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Machine Learning Systems Engineering:"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Key Capstone & Research Initiatives"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fretwork Audio-to-Tablature Engine:"),
    ).toBeInTheDocument();
    expect(screen.getByText("Exposure to:")).toBeInTheDocument();
    expect(screen.getByText("AWS ECS Fargate")).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole("button", {
      name: /close detail modal/i,
    });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens DetailModal when pressing Enter or Space key on UCCS card", () => {
    render(<EducationPage />);

    const uccsCard = screen.getByRole("button", {
      name: /bachelors in electrical engineering/i,
    });

    // Test Space key trigger
    fireEvent.keyDown(uccsCard, { key: " " });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Bachelor of Science in Electrical Engineering",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Circuits, Electronics & Solid-State Physics"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Circuits I & II and AC Circuit Labs:"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Embedded Systems & Computer Engineering"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("RF, Electromagnetics & Wave Propagation"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Signal Processing, Mathematics & Applied Deep Learning",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Senior Capstone (AR-VR Flight Simulator):"),
    ).toBeInTheDocument();

    // Close modal with escape key
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Test Enter key trigger
    fireEvent.keyDown(uccsCard, { key: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens Fretwork ProjectModal when clicking Fretwork in Berkeley detail modal", () => {
    render(<EducationPage />);

    const berkeleyCard = screen.getByRole("button", {
      name: /masters in data science/i,
    });
    fireEvent.click(berkeleyCard);

    // Find and click the Fretwork project trigger button
    const fretworkBtn = screen.getByRole("button", {
      name: /view fretwork audio-to-tablature engine project modal/i,
    });
    expect(fretworkBtn).toBeInTheDocument();
    fireEvent.click(fretworkBtn);

    // Verify ProjectModal opened with Fretwork project details
    expect(
      screen.getByRole("heading", {
        name: "Fretwork – AI-Powered Guitar Tablature & Dynamic Pathfinding",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Trained a PyTorch TabTransformer neural network", {
        exact: false,
      }),
    ).toBeInTheDocument();

    // Close ProjectModal
    const closeProjectBtn = screen.getByRole("button", {
      name: /close project modal/i,
    });
    fireEvent.click(closeProjectBtn);
    expect(
      screen.queryByRole("heading", {
        name: "Fretwork – AI-Powered Guitar Tablature & Dynamic Pathfinding",
      }),
    ).not.toBeInTheDocument();
  });
});
