import { useState } from "react";
import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import LazyImage from "../components/ui/LazyImage";
import { work } from "../data";
import { UI_SURFACES, UI_TYPOGRAPHY } from "../theme";
import type { WorkDetails } from "../types/data";

const WorkExperiencePage = () => {
  const [selectedItem, setSelectedItem] = useState<WorkDetails | null>(null);

  return (
    <>
      <title>Work Experience | Hanson-Tube</title>
      <meta
        name="description"
        content="Work history across Lockheed Martin Space, UCCS, and the US Air Force."
      />
      <Section title="Work Experience">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {work.map((job, index) => (
            <div
              key={index}
              id={`work-${index}`}
              role="button"
              tabIndex={0}
              className={UI_SURFACES.cardInteractive}
              onClick={() => setSelectedItem(job.details)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedItem(job.details);
                }
              }}
            >
              <LazyImage
                src={job.imageUrl}
                alt={job.title}
                className="h-48 w-full object-cover"
                containerClassName="h-48 w-full"
              />
              <div className="p-4">
                <h4 className="truncate text-xl font-bold text-red-500 dark:text-red-400">
                  {job.title}
                </h4>
                <div className={`mt-2 h-24 overflow-hidden ${UI_TYPOGRAPHY.cardSummary}`}>
                  {job.summary.map((line, i) => (
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
    </>
  );
};

export default WorkExperiencePage;
