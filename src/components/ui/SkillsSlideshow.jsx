import React from "react";
import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import { skills } from "../../data";

const placeholderImageUrl =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
      src={placeholderImageUrl}
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

const SkillsSlideshow = () => (
  <Slideshow
    title="Skills"
    data={skills}
    renderCard={(item) => <SkillCard item={item} />}
    renderModal={({ item, onClose }) => (
      <DetailModal item={item} onClose={onClose} />
    )}
    sectionClassName="flex min-h-0 flex-1 flex-col"
  />
);

export default SkillsSlideshow;