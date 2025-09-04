import React, { useContext } from "react";
import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import CertificationsSlideshow from "../components/ui/CertificationsSlideshow";
import { honors } from "../data";
import { SearchContext } from "../context/SearchContext";

const HonorsPage = () => {
  const { selectedItem, setSelectedItem } = useContext(SearchContext);

  return (
    <div className="flex flex-col">
      <Section title="Honors & Awards">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {honors.map((honor, index) => (
            <div
              key={index}
              id={`honor-${index}`}
              className="bevel-light dark:neumorphic-outset-dark cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-300 hover:-translate-y-2"
              onClick={() => setSelectedItem(honor.details)}
            >
              <img
                src={honor.imageUrl}
                alt={honor.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-1 truncate text-lg font-bold text-gray-900 dark:text-gray-300">
                  {honor.title}
                </h3>
                <div className="h-10 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
                  {honor.summary.map((line, i) => (
                    <p key={i} className="truncate">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div className="mb-8">
        <CertificationsSlideshow />
      </div>
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default HonorsPage;