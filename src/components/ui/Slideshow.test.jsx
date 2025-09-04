import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Slideshow from "./Slideshow";

// Mock child components and dependencies
vi.mock("./Section", () => ({
  default: ({ title, children }) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock("../icons/Icons", () => ({
  ChevronLeftIcon: () => <div>Left</div>,
  ChevronRightIcon: () => <div>Right</div>,
}));

describe("Slideshow", () => {
  const mockData = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }];
  const renderCard = (item) => <div>{item.name}</div>;
  const renderModal = ({ item, onClose }) => (
    <div data-testid="modal">
      <span>{item.name}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );

  it("renders the correct number of slides", () => {
    render(
      <Slideshow title="Test Slideshow" data={mockData} renderCard={renderCard} renderModal={renderModal} />
    );

    const slide1 = screen.getByText("Item 1");
    const slide2 = screen.getByText("Item 2");

    expect(slide1).toBeInTheDocument();
    expect(slide2).toBeInTheDocument();
  });

  it("opens the modal when a card is clicked", () => {
    render(
      <Slideshow title="Test Slideshow" data={mockData} renderCard={renderCard} renderModal={renderModal} />
    );

    const slide1 = screen.getByText("Item 1");
    fireEvent.click(slide1);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText("Item 1")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    render(
      <Slideshow title="Test Slideshow" data={mockData} renderCard={renderCard} renderModal={renderModal} />
    );

    const slide1 = screen.getByText("Item 1");
    fireEvent.click(slide1);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    const closeButton = within(modal).getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
