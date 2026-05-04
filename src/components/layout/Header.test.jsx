import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "./Header";
import { SearchProvider } from "../../context/SearchContext";
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
      <SearchProvider>
        <Header 
          toggleSidebar={mockToggleSidebar}
          setActivePage={mockSetActivePage}
          activePage="Home"
          theme="dark"
          {...props}
        />
      </SearchProvider>
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
    const originalSpeechRecognition = window.SpeechRecognition;
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;

    renderHeader();
    
    const micBtn = screen.getByLabelText("Toggle microphone");
    fireEvent.click(micBtn);
    
    expect(toast.error).toHaveBeenCalledWith(
      "Voice search is not supported in this browser.",
      expect.any(Object)
    );

    // Restore
    window.SpeechRecognition = originalSpeechRecognition;
    window.webkitSpeechRecognition = originalSpeechRecognition;
  });
});
