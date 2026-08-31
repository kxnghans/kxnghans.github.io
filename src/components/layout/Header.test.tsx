import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "./Header";
import { SearchProvider } from "../../context/SearchContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { toast } from "sonner";

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("Header", () => {
  const mockToggleSidebar = vi.fn();
  const mockSetActivePage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHeader = (props = {}) => {
    return render(
      <ThemeProvider>
        <SearchProvider>
          <Header
            toggleSidebar={mockToggleSidebar}
            setActivePage={mockSetActivePage}
            activePage="Home"
            {...props}
          />
        </SearchProvider>
      </ThemeProvider>,
    );
  };

  it("renders the app title", () => {
    renderHeader();
    expect(screen.getByText("Hanson-Tube")).toBeInTheDocument();
  });

  it("calls toggleSidebar when menu button is clicked", () => {
    renderHeader();
    const menuBtn = screen.getByLabelText("Toggle sidebar");
    fireEvent.click(menuBtn);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });

  it("calls setActivePage('Home') when title is clicked", () => {
    renderHeader();
    const title = screen.getByText("Hanson-Tube");
    fireEvent.click(title);
    expect(mockSetActivePage).toHaveBeenCalledWith("Home");
  });

  it("shows error toast when mic is clicked and speech is not supported", () => {
    // Force SpeechRecognition to be undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const originalSpeechRecognition = win.SpeechRecognition;
    delete win.SpeechRecognition;
    delete win.webkitSpeechRecognition;

    renderHeader();

    const micBtn = screen.getByLabelText("Toggle microphone");
    fireEvent.click(micBtn);

    expect(toast.error).toHaveBeenCalledWith(
      "Voice search is not supported in this browser.",
      expect.any(Object),
    );

    // Restore
    win.SpeechRecognition = originalSpeechRecognition;
    win.webkitSpeechRecognition = originalSpeechRecognition;
  });

  it("focuses search input when Ctrl+K or '/' hotkey is pressed", () => {
    renderHeader();
    const searchInput = screen.getByPlaceholderText("Search");

    // Press Ctrl+K
    act(() => {
      fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    });
    expect(document.activeElement).toBe(searchInput);

    // Blur input
    act(() => {
      searchInput.blur();
    });
    expect(document.activeElement).not.toBe(searchInput);

    // Press '/'
    act(() => {
      fireEvent.keyDown(window, { key: "/" });
    });
    expect(document.activeElement).toBe(searchInput);
  });

  it("clears and blurs search input when Escape is pressed while focused", () => {
    renderHeader();
    const searchInput = screen.getByPlaceholderText("Search");

    act(() => {
      fireEvent.change(searchInput, { target: { value: "React" } });
      searchInput.focus();
    });
    expect(document.activeElement).toBe(searchInput);

    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    expect(document.activeElement).not.toBe(searchInput);
  });
});
