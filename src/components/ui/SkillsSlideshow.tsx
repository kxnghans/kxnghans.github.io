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
  const createSummary = () => {
    let allDetails: { name: string; priority: number }[] = [];
    if (item.details) {
      allDetails = item.details.map((d) =>
        typeof d === "string" ? { name: d, priority: 99 } : d,
      );
      allDetails.sort(
        (a: SkillDetail, b: SkillDetail) => a.priority - b.priority,
      );
    }

    if (item.subcategories) {
      item.subcategories.forEach((subcat) => {
        if (subcat.details) {
          allDetails = allDetails.concat(
            subcat.details.map((d) => ({
              name: `${subcat.title}: ${d}`,
              priority: 50,
            })),
          );
        }
      });
    }

    // Accumulate items that fit comfortably within ~55 characters (2 lines of text)
    const selected: string[] = [];
    let currentLength = 0;
    const maxChars = 55;

    for (const detail of allDetails) {
      const name = detail.name;
      // If we already have at least 2 items and adding another exceeds maxChars, stop
      if (selected.length >= 2 && currentLength + name.length > maxChars) {
        break;
      }
      selected.push(name);
      currentLength += name.length + 2; // account for comma and space
      if (currentLength >= maxChars) {
        break;
      }
    }

    const summaryText = selected.join(", ");

    return (
      <>
        {summaryText}
        <span className="text-red-500 dark:text-red-400">...</span>
      </>
    );
  };

  return (
    <div className="h-16 overflow-hidden text-left text-xs text-gray-600 sm:text-sm dark:text-gray-400">
      {createSummary()}
    </div>
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
