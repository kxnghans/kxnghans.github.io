import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormField from "./FormField";
import { ThemeProvider } from "../../context/ThemeContext";

describe("FormField", () => {
  it("renders an input with the correct placeholder", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const register: any = () => ({
      name: "test",
      onChange: () => {},
      onBlur: () => {},
      ref: () => {},
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setValue: any = () => {};
    render(
      <ThemeProvider>
        <FormField
          name="name"
          type="text"
          placeholder="Test Placeholder"
          register={register}
          setValue={setValue}
          errors={{}}
        />
      </ThemeProvider>,
    );

    const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
    expect(inputElement).toBeInTheDocument();
  });
});
