import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValuePage from "./ValuePage";
import { ThemeProvider } from "../context/ThemeContext";

const renderValuePage = () =>
  render(
    <ThemeProvider>
      <ValuePage />
    </ThemeProvider>,
  );

describe("ValuePage", () => {
  it("renders main heading, executive KPI summaries, and charts", () => {
    renderValuePage();

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
      screen.getByText("Cross-Functional Impact Multipliers"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Lifetime Improvements Over Time"),
    ).toBeInTheDocument();
    expect(screen.getByText("Domain Impact Footprint")).toBeInTheDocument();
  });

  it("filters multipliers and savings total when selecting a domain sector filter", () => {
    renderValuePage();

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

    expect(screen.getByText("Supply Chain Security")).toBeInTheDocument();
    expect(screen.queryByText("Total Financial ROI")).not.toBeInTheDocument();
    expect(screen.getAllByText("40+ repos").length).toBeGreaterThan(0);
  });

  it("filters time-cost initiatives when selecting a career era filter", () => {
    renderValuePage();

    const eraBtn = screen.getByRole("button", {
      name: /career era/i,
    });
    fireEvent.click(eraBtn);

    const usafOpt = screen.getByRole("option", {
      name: /2015 – 2019: Logistics & Supply Chain/i,
    });
    fireEvent.click(usafOpt);

    const doneBtn = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneBtn);

    expect(screen.getByText("Workflow Velocity")).toBeInTheDocument();
    expect(screen.queryByText("Supply Chain Security")).not.toBeInTheDocument();
  });

  it("resets all active filters when Reset Filters is clicked", () => {
    renderValuePage();

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

    expect(screen.getByText("Supply Chain Security")).toBeInTheDocument();
    expect(screen.getByText("Total Financial ROI")).toBeInTheDocument();
    expect(screen.getAllByText("$9.6M+")[0]).toBeInTheDocument();
  });
});
