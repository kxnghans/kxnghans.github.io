import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useFocusTrap } from "./useFocusTrap";

interface FocusTrapTestProps {
  isOpen: boolean;
  onClose?: () => void;
}

const FocusTrapTestComponent = ({ isOpen, onClose }: FocusTrapTestProps) => {
  const ref = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  return (
    <div>
      <button data-testid="outside-button">Outside</button>
      {isOpen && (
        <div ref={ref} data-testid="modal-container" tabIndex={-1}>
          <button data-testid="first-button">First</button>
          <input data-testid="middle-input" placeholder="Middle" />
          <button data-testid="last-button">Last</button>
        </div>
      )}
    </div>
  );
};

describe("useFocusTrap", () => {
  it("traps focus between first and last element within container", () => {
    const handleClose = vi.fn();
    render(<FocusTrapTestComponent isOpen={true} onClose={handleClose} />);

    const firstBtn = screen.getByTestId("first-button");
    const lastBtn = screen.getByTestId("last-button");

    // Initially focuses first button
    expect(document.activeElement).toBe(firstBtn);

    // Tab from last element wraps to first element
    lastBtn.focus();
    expect(document.activeElement).toBe(lastBtn);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });
    expect(document.activeElement).toBe(firstBtn);

    // Shift+Tab from first element wraps to last element
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastBtn);
  });

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn();
    render(<FocusTrapTestComponent isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("restores focus to previous trigger upon unmount", () => {
    const handleClose = vi.fn();
    const { rerender } = render(
      <FocusTrapTestComponent isOpen={false} onClose={handleClose} />,
    );

    const outsideBtn = screen.getByTestId("outside-button");
    outsideBtn.focus();
    expect(document.activeElement).toBe(outsideBtn);

    // Open trap
    rerender(<FocusTrapTestComponent isOpen={true} onClose={handleClose} />);
    expect(document.activeElement).toBe(screen.getByTestId("first-button"));

    // Close trap
    rerender(<FocusTrapTestComponent isOpen={false} onClose={handleClose} />);
    expect(document.activeElement).toBe(outsideBtn);
  });
});
