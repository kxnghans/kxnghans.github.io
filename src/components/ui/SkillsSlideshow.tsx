import { useState } from "react";
import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import LazyImage from "./LazyImage";
import { skills } from "../../data";
import { useSearch } from "../../context/SearchContext";
import type { SkillCategory, SkillDetail } from "../../types/data";

interface SkillCardContentProps {
  item: SkillCategory;
}

const SkillCardContent = ({ item }: SkillCardContentProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createSummary = (maxWords = 8, minItems = 3) => {
    let allDetails: { name: string }[] = [];
    if (item.details) {
      const formatted = item.details.map((d) =>
        typeof d === "string" ? { name: d, priority: 99 } : d,
      );
      const sortedDetails = [...formatted].sort(
        (a: SkillDetail, b: SkillDetail) => a.priority - b.priority,
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
    const truncatedDetails: { name: string }[] = [];
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
        role="button"
        tabIndex={0}
        className="h-16 cursor-pointer overflow-hidden text-left text-xs text-gray-600 sm:text-sm dark:text-gray-400"
        onClick={handleOpenModal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpenModal();
          }
        }}
      >
        {summaryText}
      </div>
      {showModal && <DetailModal item={item} onClose={handleCloseModal} />}
    </>
  );
};

interface SkillCardProps {
  item: SkillCategory;
}

const SkillCard = ({ item }: SkillCardProps) => (
  <>
    <LazyImage
      src={item.imageUrl}
      alt={item.title}
      className="h-32 w-full object-cover sm:h-40"
      containerClassName="h-32 sm:h-40 w-full"
    />
    <div className="p-3 sm:p-4">
      <h3 className="text-md mb-2 truncate font-bold text-gray-900 sm:text-lg dark:text-gray-300">
        {item.title}
      </h3>
      <SkillCardContent item={item} />
    </div>
  </>
);

const SkillsSlideshow = () => {
  const { activeSlides } = useSearch();
  return (
    <Slideshow<SkillCategory>
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
