import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormField from "./FormField";

describe("FormField", () => {
  it("renders an input with the correct placeholder", () => {
    const register = () => {};
    render(
      <FormField
        name="test"
        type="text"
        placeholder="Test Placeholder"
        register={register}
        errors={{}}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
    expect(inputElement).toBeInTheDocument();
  });
});
