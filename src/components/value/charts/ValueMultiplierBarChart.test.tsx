import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueMultiplierBarChart from "./ValueMultiplierBarChart";
import { lifetimeValueData } from "../../../data/lifetimeValue";

describe("ValueMultiplierBarChart", () => {
  it("renders acceleration columns with grounded speedup labels", () => {
    render(
      <ValueMultiplierBarChart data={lifetimeValueData.charts.multipliers} />,
    );

    expect(
      screen.getByText("Cycle-Time Acceleration Factors"),
    ).toBeInTheDocument();
    expect(screen.getByText("36x faster")).toBeInTheDocument();
    expect(screen.getByText("18x faster")).toBeInTheDocument();
    expect(screen.getByText("10x faster")).toBeInTheDocument();
    expect(screen.getByText("Supply Reconciliation (OAR)")).toBeInTheDocument();
    expect(screen.getByText(/hover over any column/i)).toBeInTheDocument();
  });

  it("shows before/after detail on hover", () => {
    render(
      <ValueMultiplierBarChart data={lifetimeValueData.charts.multipliers} />,
    );

    fireEvent.mouseEnter(screen.getByText("Executive Report ETL"));

    expect(screen.getByText(/180\+ min per refresh/)).toBeInTheDocument();
    expect(screen.getByText(/<10 min per refresh/)).toBeInTheDocument();
  });

  it("renders an empty state when no workflows match filters", () => {
    render(<ValueMultiplierBarChart data={[]} />);

    expect(
      screen.getByText(/no acceleration workflows match/i),
    ).toBeInTheDocument();
  });
});
