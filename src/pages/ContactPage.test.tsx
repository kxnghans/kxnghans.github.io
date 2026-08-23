import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactPage from "./ContactPage";
import { ThemeProvider } from "../context/ThemeContext";
import { SearchProvider } from "../context/SearchContext";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderContactPage = () => {
  return render(
    <ThemeProvider>
      <SearchProvider>
        <ContactPage />
      </SearchProvider>
    </ThemeProvider>,
  );
};

describe("ContactPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders contact links and form input fields", () => {
    renderContactPage();

    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("submits the form successfully and stores cooldown timestamp in localStorage", async () => {
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: "OK" });

    renderContactPage();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Subject"), {
      target: { value: "Project Inquiry" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Hello, I would like to discuss a project." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    expect(toast.success).toHaveBeenCalledWith("Message sent successfully!");
    expect(localStorage.getItem("hanson_last_contact_sent")).not.toBeNull();
  });

  it("blocks submission and shows cooldown toast if submitted within cooldown window", async () => {
    // Simulate a message sent 20 seconds ago (cooldown is 60s)
    const recentSentTime = Date.now() - 20 * 1000;
    localStorage.setItem("hanson_last_contact_sent", String(recentSentTime));

    renderContactPage();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Subject"), {
      target: { value: "Follow up" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Quick follow up message." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Please wait \d+s before sending another message\./,
        ),
      );
    });

    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("handles EmailJS send error gracefully", async () => {
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error("Network Error"));

    renderContactPage();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Alex Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Subject"), {
      target: { value: "Test Error" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Testing error state." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to send message. Please try again.",
      );
    });
  });
});
