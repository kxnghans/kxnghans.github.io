import React, { useEffect, useRef } from "react";
import Section from "./Section";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/Icons";

const Slideshow = ({
  title,
  data,
  renderCard,
  renderModal,
  getModalItem,
  sectionClassName,
  activeSlide,
}) => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const slideshowRef = React.useRef(null);
  const slideRefs = React.useRef([]);

  useEffect(() => {
    if (activeSlide !== undefined && slideRefs.current[activeSlide]) {
      slideRefs.current[activeSlide].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeSlide]);

  const scroll = (scrollOffset) => {
    slideshowRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const handleCardClick = (item) => {
    const modalItem = getModalItem ? getModalItem(item) : item;
    setSelectedItem(modalItem);
  };

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
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-200/80 p-1 transition-colors hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light sm:p-2"
        >
          <ChevronLeftIcon />
        </button>
        <div
          ref={slideshowRef}
          className="scrollbar-hide flex h-full snap-x snap-mandatory scroll-pl-4 items-center space-x-4 overflow-x-auto pb-4 pl-4 pt-4"
        >
          <div className="w-8 flex-shrink-0 sm:w-10 md:w-12"></div>
          {data.map((item, index) => (
            <div
              key={index}
              ref={(el) => (slideRefs.current[index] = el)}
              className="bevel-light dark:neumorphic-outset-dark w-64 flex-shrink-0 transform cursor-pointer snap-start overflow-hidden rounded-lg bg-gray-200 transition-transform duration-300 hover:-translate-y-1 sm:w-72 md:w-80"
              onClick={() => handleCardClick(item)}
            >
              {renderCard(item)}
            </div>
          ))}
          <div className="w-4 flex-shrink-0 sm:w-6 md:w-8"></div>
        </div>
        <button
          onClick={() => scroll(320)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-200/80 p-1 transition-colors hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light sm:p-2"
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
