import React, { useContext, useState } from "react";
import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import skills from "../../data/skills";
import { SearchContext } from "../../context/SearchContext";

const SkillCardContent = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createSummary = (maxWords = 8, minItems = 3) => {
    let allDetails = [];
    if (item.details) {
      const sortedDetails = [...item.details].sort(
        (a, b) => a.priority - b.priority,
      );
      allDetails = allDetails.concat(sortedDetails);
    }

    if (item.subcategories) {
      item.subcategories.forEach((subcat) => {
        if (subcat.details) {
          allDetails = allDetails.concat(
            subcat.details.map((d) => ({ name: `${subcat.title}: ${d}` })),
          );
        }
      });
    }

    let wordCount = 0;
    let truncatedDetails = [];
    for (const detail of allDetails) {
      const detailWords = detail.name.split(" ").length;
      if (
        truncatedDetails.length >= minItems &&
        wordCount + detailWords > maxWords
      ) {
        if (truncatedDetails.length === 0) {
          truncatedDetails.push(detail);
        }
        break;
      }
      truncatedDetails.push(detail);
      wordCount += detailWords;
    }

    const summaryText = truncatedDetails.map((d) => d.name).join(", ");

    return (
      <>
        {summaryText}
        <span className="text-red-500">...</span>
      </>
    );
  };

  const summaryText = createSummary();

  return (
    <>
      <div
        className="h-16 cursor-pointer overflow-hidden text-xs text-gray-600 dark:text-gray-400 sm:text-sm"
        onClick={handleOpenModal}
      >
        {summaryText}
      </div>
      {showModal && <DetailModal item={item} onClose={handleCloseModal} />}
    </>
  );
};

const SkillCard = ({ item }) => (
  <>
    <img
      src={item.imageUrl}
      alt={item.title}
      className="h-32 w-full object-cover sm:h-40"
    />
    <div className="p-3 sm:p-4">
      <h3 className="text-md mb-2 truncate font-bold text-gray-900 dark:text-gray-300 sm:text-lg">
        {item.title}
      </h3>
      <SkillCardContent item={item} />
    </div>
  </>
);

const SkillsSlideshow = () => {
  const { activeSlides } = useContext(SearchContext);
  return (
    <Slideshow
      title="Skills"
      data={skills}
      renderCard={(item) => <SkillCard item={item} />}
      renderModal={({ item, onClose }) => (
        <DetailModal item={item} onClose={onClose} />
      )}
      sectionClassName="flex min-h-0 flex-1 flex-col"
      activeSlide={activeSlides["skills-slideshow"]}
    />
  );
};

export default SkillsSlideshow;
