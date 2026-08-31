import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueMultiplierBarChart from "./ValueMultiplierBarChart";
import { lifetimeValueData } from "../../../data/lifetimeValue";

describe("ValueMultiplierBarChart", () => {
  it("renders cross-functional impact multiplier columns with display values", () => {
    render(
      <ValueMultiplierBarChart data={lifetimeValueData.charts.multipliers} />,
    );

    expect(
      screen.getByText("Cross-Functional Impact Multipliers"),
    ).toBeInTheDocument();
    expect(screen.getByText("$9.6M+")).toBeInTheDocument();
    expect(screen.getByText("705k+ hrs")).toBeInTheDocument();
    expect(screen.getByText("36x faster")).toBeInTheDocument();
    expect(screen.getByText("Total Financial ROI")).toBeInTheDocument();
    expect(screen.getByText(/hover over any column/i)).toBeInTheDocument();
  });

  it("shows before/after detail on hover", () => {
    render(
      <ValueMultiplierBarChart data={lifetimeValueData.charts.multipliers} />,
    );

    fireEvent.mouseEnter(screen.getByText("Labor Hours Reclaimed"));

    expect(
      screen.getByText(/Manual paper logs & 2,760 annual BA hours/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Power Platform across 450 sites/),
    ).toBeInTheDocument();
  });

  it("renders an empty state when no impact vectors match filters", () => {
    render(<ValueMultiplierBarChart data={[]} />);

    expect(
      screen.getByText(/no impact vectors match the active filter criteria/i),
    ).toBeInTheDocument();
  });
});
