import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LazyImage, { clearImageCache, markImageCached } from "./LazyImage";
import { ASSET_URLS } from "../../data/assets";

describe("LazyImage", () => {
  beforeEach(() => {
    clearImageCache();
  });

  it("renders the skeleton placeholder initially for uncached images", () => {
    render(
      <LazyImage src={ASSET_URLS.PROJECTS.CAROHANS_HUB} alt="CaroHans Hub" />,
    );

    const skeleton = screen.getByTestId("lazy-image-skeleton");
    expect(skeleton).toBeInTheDocument();

    const img = screen.getByAltText("CaroHans Hub");
    expect(img).toHaveClass("opacity-0");
  });

  it("transitions to loaded state and fires onLoad callback", () => {
    const handleLoad = vi.fn();
    render(
      <LazyImage
        src={ASSET_URLS.PROJECTS.CAROHANS_HUB}
        alt="CaroHans Hub"
        onLoad={handleLoad}
      />,
    );

    const img = screen.getByAltText("CaroHans Hub");
    fireEvent.load(img);

    expect(handleLoad).toHaveBeenCalledTimes(1);
    expect(img).toHaveClass("opacity-100");
    expect(screen.queryByTestId("lazy-image-skeleton")).not.toBeInTheDocument();
  });

  it("displays error fallback UI on image error", () => {
    const handleError = vi.fn();
    render(
      <LazyImage
        src="https://storage.googleapis.com/portfolio_showcase/images/invalid-path.webp"
        alt="Invalid Asset"
        onError={handleError}
      />,
    );

    const img = screen.getByAltText("Invalid Asset");
    fireEvent.error(img);

    expect(handleError).toHaveBeenCalledTimes(1);
    const errorFallback = screen.getByTestId("lazy-image-error");
    expect(errorFallback).toBeInTheDocument();
    expect(screen.getByText("Invalid Asset")).toBeInTheDocument();
  });

  it("falls back to fallbackSrc when primary source fails", () => {
    render(
      <LazyImage
        src="https://storage.googleapis.com/portfolio_showcase/images/invalid-path.webp"
        fallbackSrc="https://storage.googleapis.com/portfolio_showcase/images/fallback.webp"
        alt="With Fallback"
      />,
    );

    const img = screen.getByAltText("With Fallback");
    expect(img).toHaveAttribute(
      "src",
      "https://storage.googleapis.com/portfolio_showcase/images/invalid-path.webp",
    );

    fireEvent.error(img);

    expect(img).toHaveAttribute(
      "src",
      "https://storage.googleapis.com/portfolio_showcase/images/fallback.webp",
    );
  });

  it("renders cached image immediately with opacity-100 and no skeleton", () => {
    const cachedUrl = ASSET_URLS.PROJECTS.CAROHANS_HUB;
    markImageCached(cachedUrl);

    render(<LazyImage src={cachedUrl} alt="Cached Image" />);

    const img = screen.getByAltText("Cached Image");
    expect(img).toHaveClass("opacity-100");
    expect(screen.queryByTestId("lazy-image-skeleton")).not.toBeInTheDocument();
  });
});
