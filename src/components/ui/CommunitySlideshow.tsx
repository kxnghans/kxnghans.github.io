import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import LazyImage from "./LazyImage";
import SummaryTextLines from "./SummaryTextLines";
import { community } from "../../data";
import { useSearch } from "../../context/SearchContext";
import type { CommunityItem, CommunityDetails } from "../../types/data";

interface DefaultCardProps {
  item: CommunityItem;
  index: number;
}

const DefaultCard = ({ item, index }: DefaultCardProps) => (
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
      <div className="h-12 space-y-1 overflow-hidden text-xs text-gray-600 sm:h-16 sm:text-sm dark:text-gray-400">
        <SummaryTextLines lines={item.summary} />
      </div>
    </div>
  </>
);

const CommunitySlideshow = () => {
  const { activeSlides } = useSearch();
  return (
    <Slideshow<CommunityItem, CommunityDetails>
      title="Community Involvement"
      data={community}
      renderCard={(item, index) => <DefaultCard item={item} index={index} />}
      renderModal={({ item, onClose }) => (
        <DetailModal item={item} onClose={onClose} />
      )}
      getModalItem={(item) => item.details}
      activeSlide={activeSlides["community-slideshow"]}
    />
  );
};

export default CommunitySlideshow;
