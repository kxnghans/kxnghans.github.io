import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValuePage from "./ValuePage";

describe("ValuePage", () => {
  it("renders main heading, executive KPI summaries, and charts", () => {
    render(<ValuePage />);

    expect(
      screen.getByRole("heading", {
        name: /executive value & impact intelligence/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("$9.6M+")[0]).toBeInTheDocument();
    expect(screen.getAllByText("36x")[0]).toBeInTheDocument();
    expect(screen.getAllByText("705k+")[0]).toBeInTheDocument();
    expect(screen.getAllByText("450 Sites")[0]).toBeInTheDocument();

    expect(
      screen.getByText("Capability & Competency Radar"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cycle-Time Acceleration Factors"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Lifetime Improvements Over Time"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Domain Impact Footprint"),
    ).toBeInTheDocument();
  });

  it("filters multipliers and savings total when selecting a domain sector filter", () => {
    render(<ValuePage />);

    const domainBtn = screen.getByRole("button", {
      name: /domain sector/i,
    });
    fireEvent.click(domainBtn);

    const defenseOpt = screen.getByRole("option", {
      name: /defense & space/i,
    });
    fireEvent.click(defenseOpt);

    const doneBtn = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneBtn);

    expect(screen.getByText("SNO CI/CD Builds")).toBeInTheDocument();
    expect(
      screen.queryByText("Executive Report ETL"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("$1.0M")).toBeInTheDocument();
  });

  it("filters time-cost initiatives when selecting a career era filter", () => {
    render(<ValuePage />);

    const eraBtn = screen.getByRole("button", {
      name: /career era/i,
    });
    fireEvent.click(eraBtn);

    const usafOpt = screen.getByRole("option", {
      name: /2015 – 2019 \(USAF Expeditionary Logistics\)/i,
    });
    fireEvent.click(usafOpt);

    const doneBtn = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneBtn);

    expect(
      screen.getByText(/no acceleration workflows match/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("SNO CI/CD Builds")).not.toBeInTheDocument();
  });

  it("resets all active filters when Reset Filters is clicked", () => {
    render(<ValuePage />);

    const domainBtn = screen.getByRole("button", {
      name: /domain sector/i,
    });
    fireEvent.click(domainBtn);

    const defenseOpt = screen.getByRole("option", {
      name: /defense & space/i,
    });
    fireEvent.click(defenseOpt);

    const doneBtn = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneBtn);

    const resetBtn = screen.getByRole("button", { name: /^reset$/i });
    expect(resetBtn).not.toBeDisabled();
    fireEvent.click(resetBtn);

    expect(screen.getByText("SNO CI/CD Builds")).toBeInTheDocument();
    expect(screen.getByText("Executive Report ETL")).toBeInTheDocument();
    expect(screen.getAllByText("$9.6M+")[0]).toBeInTheDocument();
  });
});
