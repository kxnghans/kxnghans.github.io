import React, { useContext } from "react";
import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import { skills } from "../../data";
import { SearchContext } from "../../context/SearchContext";

const SkillCardContent = ({ item }) => {
  // This complex logic is now isolated here
  const createSummary = () => {
    let allDetails = [];
    if (item.details) {
      allDetails = allDetails.concat(item.details);
    }
    if (item.exposure) {
      allDetails.push("Exposure to: " + item.exposure.join(", "));
    }
    if (item.subcategories) {
      item.subcategories.forEach((subcat) => {
        allDetails.push(subcat.title + ": " + subcat.details.join(", "));
      });
    }
    return allDetails.join(", ");
  };

  const summaryText = createSummary();

  return (
    <div className="h-16 overflow-hidden text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
      {summaryText}
    </div>
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