import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueRadarChart from "./ValueRadarChart";
import { lifetimeValueData } from "../../../data/lifetimeValue";

describe("ValueRadarChart", () => {
  it("renders chart title and 6 axis labels", () => {
    render(<ValueRadarChart data={lifetimeValueData.charts.radar} />);

    expect(
      screen.getByText("Capability & Competency Radar"),
    ).toBeInTheDocument();
    expect(screen.getByText("Communication")).toBeInTheDocument();
    expect(screen.getByText("Systems Eng")).toBeInTheDocument();
    expect(screen.getByText("Supply Chain")).toBeInTheDocument();
  });

  it("updates detail box on vertex hover", () => {
    render(<ValueRadarChart data={lifetimeValueData.charts.radar} />);

    const label = screen.getByText("Communication");
    fireEvent.mouseEnter(label);

    expect(screen.getByText(/23 Years Practice/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Lifelong Practice \| Executive Briefings/i),
    ).toBeInTheDocument();

    fireEvent.mouseLeave(label);
    expect(
      screen.getByText(/Hover over any axis vertex/i),
    ).toBeInTheDocument();
  });
});
