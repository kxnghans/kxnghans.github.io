import type { ReactElement } from "react";
import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import LazyImage from "./LazyImage";
import { skills } from "../../data";
import { useSearch } from "../../context/SearchContext";
import type { SkillCategory } from "../../types/data";

interface SkillCardContentProps {
  item: SkillCategory;
}

// Renders preview summary badges for a skill category card
const SkillCardContent = ({ item }: SkillCardContentProps): ReactElement => {
  const summaryText = item.summary?.join(", ");

  return (
    <div className="h-16 overflow-hidden text-left text-xs text-gray-600 sm:text-sm dark:text-gray-400">
      {summaryText}
      <span className="text-red-500 dark:text-red-400">...</span>
    </div>
  );
};

interface SkillCardProps {
  item: SkillCategory;
  index: number;
}

// Renders the presentation card within the Skills slideshow
const SkillCard = ({ item, index }: SkillCardProps): ReactElement => (
  <>
    <LazyImage
      src={item.imageUrl}
      alt={item.title}
      loading={index < 3 ? "eager" : "lazy"}
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

const SkillsSlideshow = (): ReactElement => {
  const { activeSlides } = useSearch();
  return (
    <Slideshow<SkillCategory>
      title="Skills"
      data={skills}
      renderCard={(item, index) => <SkillCard item={item} index={index} />}
      renderModal={({ item, onClose }) => (
        <DetailModal item={item} onClose={onClose} />
      )}
      sectionClassName="flex min-h-0 flex-1 flex-col"
      activeSlide={activeSlides["skills-slideshow"]}
    />
  );
};

export default SkillsSlideshow;
