import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueDomainDonutChart from "./ValueDomainDonutChart";
import { lifetimeValueData } from "../../../data/lifetimeValue";

describe("ValueDomainDonutChart", () => {
  it("renders donut chart title and domain percentages", () => {
    render(
      <ValueDomainDonutChart
        data={lifetimeValueData.charts.distribution}
      />,
    );

    expect(
      screen.getByText("Domain Impact Footprint"),
    ).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("updates sector detail callout on legend hover", () => {
    render(
      <ValueDomainDonutChart
        data={lifetimeValueData.charts.distribution}
      />,
    );

    const fintechBtn = screen.getByRole("button", {
      name: /enterprise & fintech/i,
    });
    fireEvent.mouseEnter(fintechBtn);

    expect(
      screen.getByText(/accounts for/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/50%/i)[0],
    ).toBeInTheDocument();
  });
});
