import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Slideshow, { type ModalRenderProps } from "./Slideshow";
import type { ReactNode } from "react";

// Mock child components and dependencies
vi.mock("./Section", () => ({
  default: ({ title, children }: { title: ReactNode; children: ReactNode }) => (
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

interface MockItem {
  id: number;
  name: string;
}

describe("Slideshow", () => {
  const mockData: MockItem[] = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];
  const renderCard = (item: MockItem) => <div>{item.name}</div>;
  const renderModal = ({ item, onClose }: ModalRenderProps<MockItem>) => (
    <div data-testid="modal">
      <span>{item.name}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    Element.prototype.scrollBy = vi.fn();
  });

  it("renders the correct number of slides", () => {
    render(
      <Slideshow<MockItem>
        title="Test Slideshow"
        data={mockData}
        renderCard={renderCard}
        renderModal={renderModal}
      />,
    );

    const slide1 = screen.getByText("Item 1");
    const slide2 = screen.getByText("Item 2");

    expect(slide1).toBeInTheDocument();
    expect(slide2).toBeInTheDocument();
  });

  it("opens the modal when a card is clicked", () => {
    render(
      <Slideshow<MockItem>
        title="Test Slideshow"
        data={mockData}
        renderCard={renderCard}
        renderModal={renderModal}
      />,
    );

    const slide1 = screen.getByText("Item 1");
    fireEvent.click(slide1);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText("Item 1")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    render(
      <Slideshow<MockItem>
        title="Test Slideshow"
        data={mockData}
        renderCard={renderCard}
        renderModal={renderModal}
      />,
    );

    const slide1 = screen.getByText("Item 1");
    fireEvent.click(slide1);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    const closeButton = within(modal).getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("handles keyboard arrow navigation and button clicks on slideshow", () => {
    render(
      <Slideshow<MockItem>
        title="Test Slideshow"
        data={mockData}
        renderCard={renderCard}
        renderModal={renderModal}
      />,
    );

    const slideCards = screen.getAllByRole("button");
    const firstSlideCard = slideCards.find((btn) =>
      within(btn).queryByText("Item 1"),
    );
    expect(firstSlideCard).toBeDefined();

    if (firstSlideCard) {
      fireEvent.keyDown(firstSlideCard, { key: "ArrowRight" });
      fireEvent.keyDown(firstSlideCard, { key: "ArrowLeft" });
    }

    const leftBtn = screen.getByLabelText("Scroll Test Slideshow left");
    const rightBtn = screen.getByLabelText("Scroll Test Slideshow right");
    expect(leftBtn).toBeInTheDocument();
    expect(rightBtn).toBeInTheDocument();
    fireEvent.click(leftBtn);
    fireEvent.click(rightBtn);
  });

  it("triggers modal open when Enter key is pressed on slide", () => {
    render(
      <Slideshow<MockItem>
        title="Test Slideshow"
        data={mockData}
        renderCard={renderCard}
        renderModal={renderModal}
      />,
    );

    const slideCards = screen.getAllByRole("button");
    const firstSlideCard = slideCards.find((btn) =>
      within(btn).queryByText("Item 1"),
    );
    expect(firstSlideCard).toBeDefined();

    if (firstSlideCard) {
      fireEvent.keyDown(firstSlideCard, { key: "Enter" });
    }
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
