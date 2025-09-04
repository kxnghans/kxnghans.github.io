import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Section from "./Section";

describe("Section", () => {
  it("renders the title and children", () => {
    const titleText = "Test Title";
    const childText = "Test Child";
    render(
      <Section title={titleText}>
        <p>{childText}</p>
      </Section>
    );

    const titleElement = screen.getByText(titleText);
    const childElement = screen.getByText(childText);

    expect(titleElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
