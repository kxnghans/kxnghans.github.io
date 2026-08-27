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
    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("15%")).toBeInTheDocument();
  });

  it("updates sector detail callout on legend hover", () => {
    render(
      <ValueDomainDonutChart
        data={lifetimeValueData.charts.distribution}
      />,
    );

    const enterpriseBtn = screen.getByRole("button", {
      name: /enterprise automation/i,
    });
    fireEvent.mouseEnter(enterpriseBtn);

    expect(
      screen.getByText(/accounts for/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/30%/i)[0],
    ).toBeInTheDocument();
  });
});

