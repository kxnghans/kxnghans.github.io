import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SummaryTextLines from "./SummaryTextLines";

describe("SummaryTextLines", () => {
  it("renders simple lines without colons", () => {
    const lines = ["Simple line one", "Simple line two"];
    render(<SummaryTextLines lines={lines} />);

    expect(screen.getByText("Simple line one")).toBeInTheDocument();
    expect(screen.getByText("Simple line two")).toBeInTheDocument();
  });

  it("splits and bolds labels for 'Label: Value' lines", () => {
    const lines = ["Venture: CaroHans", "Tech: Next.js, Supabase"];
    render(<SummaryTextLines lines={lines} />);

    expect(screen.getByText("Venture:")).toBeInTheDocument();
    expect(screen.getByText("CaroHans")).toBeInTheDocument();
    expect(screen.getByText("Tech:")).toBeInTheDocument();
    expect(screen.getByText("Next.js, Supabase")).toBeInTheDocument();
  });

  it("bolds the first line completely when boldFirstLine is true", () => {
    const lines = ["Lockheed Martin Space", "Role: Systems Engineer"];
    render(<SummaryTextLines lines={lines} boldFirstLine={true} />);

    const firstLineStrong = screen.getByText("Lockheed Martin Space");
    expect(firstLineStrong.tagName).toBe("STRONG");
    expect(screen.getByText("Role:")).toBeInTheDocument();
    expect(screen.getByText("Systems Engineer")).toBeInTheDocument();
  });

  it("renders empty when lines array is empty", () => {
    const { container } = render(<SummaryTextLines lines={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
