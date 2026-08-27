import { useState, useRef, useEffect, type ReactNode } from "react";
import Section from "./Section";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/Icons";
import { UI_SURFACES } from "../../theme";

export interface ModalRenderProps<M> {
  item: M;
  onClose: () => void;
}

export interface SlideshowProps<T, M = T> {
  title: ReactNode;
  data: T[];
  renderCard: (item: T) => ReactNode;
  renderModal: (props: ModalRenderProps<M>) => ReactNode;
  getModalItem?: (item: T) => M;
  sectionClassName?: string;
  activeSlide?: number | string;
}

const Slideshow = <T, M = T>({
  title,
  data,
  renderCard,
  renderModal,
  getModalItem,
  sectionClassName,
  activeSlide,
}: SlideshowProps<T, M>) => {
  const [selectedItem, setSelectedItem] = useState<M | null>(null);
  const slideshowRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const slideIdx =
      typeof activeSlide === "number"
        ? activeSlide
        : typeof activeSlide === "string"
          ? parseInt(activeSlide, 10)
          : undefined;

    if (
      slideIdx !== undefined &&
      !isNaN(slideIdx) &&
      slideRefs.current[slideIdx]
    ) {
      slideRefs.current[slideIdx]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeSlide]);

  const scroll = (scrollOffset: number) => {
    slideshowRef.current?.scrollBy?.({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

  const handleCardClick = (item: T) => {
    const modalItem = getModalItem
      ? getModalItem(item)
      : (item as unknown as M);
    setSelectedItem(modalItem);
  };

  const titleString = typeof title === "string" ? title : "Slideshow";

  return (
    <Section
      title={title}
      className={
        sectionClassName || "flex min-h-0 flex-1 flex-col !p-0 sm:!p-2 md:!p-4"
      }
    >
      <div className="relative flex flex-1 items-center">
        <button
          onClick={() => scroll(-320)}
          aria-label={`Scroll ${titleString} left`}
          className="dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-gray-200/80 p-1 transition-colors hover:bg-white sm:p-2"
        >
          <ChevronLeftIcon />
        </button>
        <div
          ref={slideshowRef}
          aria-label={`${titleString} carousel`}
          className="scrollbar-hide flex h-full snap-x snap-mandatory scroll-pl-4 items-center space-x-4 overflow-x-auto pt-4 pb-4 pl-4"
        >
          <div className="w-8 flex-shrink-0 sm:w-10 md:w-12" />
          {data.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              role="button"
              tabIndex={0}
              className={UI_SURFACES.slideshowCard}
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(item);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  scroll(-320);
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  scroll(320);
                }
              }}
            >
              {renderCard(item)}
            </div>
          ))}
          <div className="w-4 flex-shrink-0 sm:w-6 md:w-8" />
        </div>
        <button
          onClick={() => scroll(320)}
          aria-label={`Scroll ${titleString} right`}
          className="dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-gray-200/80 p-1 transition-colors hover:bg-white sm:p-2"
        >
          <ChevronRightIcon />
        </button>
      </div>
      {selectedItem &&
        renderModal({
          item: selectedItem,
          onClose: () => setSelectedItem(null),
        })}
    </Section>
  );
};

export default Slideshow;
