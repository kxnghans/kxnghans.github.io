import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueTimelineAreaChart from "./ValueTimelineAreaChart";
import { lifetimeValueData } from "../../../data/lifetimeValue";

describe("ValueTimelineAreaChart", () => {
  it("renders cumulative savings and reclaimed hours trajectory", () => {
    render(
      <ValueTimelineAreaChart data={lifetimeValueData.charts.timeline} />,
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
      <ValueTimelineAreaChart data={lifetimeValueData.charts.timeline} />,
    );

    const svg = screen.getByRole("img");
    const circles = svg.querySelectorAll("circle");
    fireEvent.mouseEnter(circles[0]);

    expect(screen.getAllByText("2015 – 2019").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$1.09M").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/USAF ETDC Kuwait Theater Distribution/).length,
    ).toBeGreaterThan(0);
  });

  it("renders an empty state with no data", () => {
    render(<ValueTimelineAreaChart data={[]} />);

    expect(
      screen.getByText(/no trajectory data matches/i),
    ).toBeInTheDocument();
  });
});
