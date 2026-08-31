import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueTimelineAreaChart from "./ValueTimelineAreaChart";
import { ThemeProvider } from "../../../context/ThemeContext";
import { lifetimeValueData } from "../../../data/lifetimeValue";

describe("ValueTimelineAreaChart", () => {
  it("renders cumulative savings and reclaimed hours trajectory", () => {
    render(
      <ThemeProvider>
        <ValueTimelineAreaChart data={lifetimeValueData.charts.timeline} />
      </ThemeProvider>,
    );

    expect(
      screen.getByText("Lifetime Improvements Over Time"),
    ).toBeInTheDocument();
    expect(screen.getByText("4 Eras")).toBeInTheDocument();
    expect(screen.getAllByText("$ Saved").length).toBeGreaterThan(0);
    expect(screen.getByText(/hover over any point/i)).toBeInTheDocument();

    const svg = screen.getByRole("img", {
      name: /cumulative savings and reclaimed hours over time/i,
    });
    expect(svg).toBeInTheDocument();
  });

  it("shows era milestone detail when hovering a data point", () => {
    render(
      <ThemeProvider>
        <ValueTimelineAreaChart data={lifetimeValueData.charts.timeline} />
      </ThemeProvider>,
    );

    const svg = screen.getByRole("img");
    const circles = svg.querySelectorAll("circle");
    fireEvent.mouseEnter(circles[0]);

    expect(screen.getAllByText("2015 – 2019").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$1.09M").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Logistics & Supply Chain/).length,
    ).toBeGreaterThan(0);
  });

  it("renders an empty state with no data", () => {
    render(
      <ThemeProvider>
        <ValueTimelineAreaChart data={[]} />
      </ThemeProvider>,
    );

    expect(screen.getByText(/no trajectory data matches/i)).toBeInTheDocument();
  });
});
