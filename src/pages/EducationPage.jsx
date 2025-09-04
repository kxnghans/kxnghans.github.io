import React from "react";
import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import { education } from "../data";

const EducationPage = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <Section title="Education">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {education.map((edu, index) => (
          <div
            key={index}
            id={`education-${index}`}
            className="bevel-light dark:neumorphic-outset-dark cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-300 hover:-translate-y-2"
            onClick={() => setSelectedItem(edu.details)}
          >
            <img
              src={edu.imageUrl}
              alt={edu.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 truncate text-lg font-bold text-red-500 dark:text-red-400">
                {edu.title}
              </h3>
              <div className="h-24 space-y-1 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
                {edu.summary.map((line, i) => (
                  <p key={i} className="truncate">
                    {i === 0 ? <strong>{line}</strong> : line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </Section>
  );
};

export default EducationPage;
