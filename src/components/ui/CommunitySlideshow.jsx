import React, { useContext } from "react";
import Slideshow from "./Slideshow";
import DetailModal from "../modals/DetailModal";
import { community } from "../../data";
import { SearchContext } from "../../context/SearchContext";

const DefaultCard = ({ item }) => (
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
      <div className="h-12 space-y-1 overflow-hidden text-xs text-gray-600 dark:text-gray-400 sm:h-16 sm:text-sm">
        {item.summary.map((line, i) => (
          <p key={i} className="truncate">
            {line}
          </p>
        ))}
      </div>
    </div>
  </>
);

const CommunitySlideshow = () => {
  const { activeSlides } = useContext(SearchContext);
  return (
    <Slideshow
      title="Community Involvement"
      data={community}
      renderCard={(item) => <DefaultCard item={item} />}
      renderModal={({ item, onClose }) => (
        <DetailModal item={item} onClose={onClose} />
      )}
      getModalItem={(item) => item.details}
      activeSlide={activeSlides["community-slideshow"]}
    />
  );
};

export default CommunitySlideshow;