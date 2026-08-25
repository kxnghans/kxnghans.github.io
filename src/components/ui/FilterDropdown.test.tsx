import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterDropdown from "./FilterDropdown";

describe("FilterDropdown", () => {
  const options = ["Option A", "Option B", "Option C"];

  it("renders trigger button with label and default All text", () => {
    render(
      <FilterDropdown
        label="Test Category"
        options={options}
        selected={["All"]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("renders single selected item name", () => {
    render(
      <FilterDropdown
        label="Domain"
        options={options}
        selected={["Option A"]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("renders count when multiple items are selected", () => {
    render(
      <FilterDropdown
        label="Domain"
        options={options}
        selected={["Option A", "Option B"]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("2 Selected")).toBeInTheDocument();
  });

  it("opens popover on click and toggles options", () => {
    const handleToggle = vi.fn();
    render(
      <FilterDropdown
        label="Domain"
        options={options}
        selected={["Option A"]}
        onToggle={handleToggle}
      />,
    );

    const trigger = screen.getByRole("button", { name: /filter by domain/i });
    fireEvent.click(trigger);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Select Domain")).toBeInTheDocument();

    const optionB = screen.getByRole("option", { name: "Option B" });
    fireEvent.click(optionB);
    expect(handleToggle).toHaveBeenCalledWith("Option B");
  });

  it("handles All toggle", () => {
    const handleToggle = vi.fn();
    render(
      <FilterDropdown
        label="Domain"
        options={options}
        selected={["Option A"]}
        onToggle={handleToggle}
      />,
    );

    const trigger = screen.getByRole("button", { name: /filter by domain/i });
    fireEvent.click(trigger);

    const allOption = screen.getByRole("option", { name: "All" });
    fireEvent.click(allOption);
    expect(handleToggle).toHaveBeenCalledWith("All");
  });

  it("closes popover when Done is clicked", () => {
    render(
      <FilterDropdown
        label="Domain"
        options={options}
        selected={["All"]}
        onToggle={vi.fn()}
      />,
    );

    const trigger = screen.getByRole("button", { name: /filter by domain/i });
    fireEvent.click(trigger);

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    const doneButton = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneButton);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes on Escape key press", () => {
    render(
      <FilterDropdown
        label="Domain"
        options={options}
        selected={["All"]}
        onToggle={vi.fn()}
      />,
    );

    const trigger = screen.getByRole("button", { name: /filter by domain/i });
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
