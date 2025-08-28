import React from "react";
import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import { work } from "../data";

const WorkExperiencePage = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <Section title="Work Experience">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {work.map((job, index) => (
          <div
            key={index}
            className="bevel-light dark:neumorphic-outset-dark cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-300 hover:-translate-y-2"
            onClick={() => setSelectedItem(job.details)}
          >
            <img
              src={job.imageUrl}
              alt={job.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="truncate text-xl font-bold text-red-500 dark:text-red-400">
                {job.title}
              </h4>
              <div className="mt-2 h-20 space-y-1 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
                {job.summary.map((line, i) => (
                  <p key={i} className="truncate">
                    {line}
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

export default WorkExperiencePage;
