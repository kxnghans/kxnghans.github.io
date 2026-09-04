import { useState } from "react";
import Section from "../components/ui/Section";
import DetailModal from "../components/modals/DetailModal";
import ProjectModal from "../components/modals/ProjectModal";
import LazyImage from "../components/ui/LazyImage";
import { education } from "../data";
import { UI_SURFACES, UI_TYPOGRAPHY } from "../theme";
import SummaryTextLines from "../components/ui/SummaryTextLines";
import type { EducationDetails, ProjectDetails } from "../types/data";

const EducationPage = () => {
  const [selectedItem, setSelectedItem] = useState<EducationDetails | null>(
    null,
  );
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null,
  );

  return (
    <>
      <title>Education | Hanson-Tube</title>
      <meta
        name="description"
        content="Academic background: M.S. in Data Science from UC Berkeley and B.S. in Electrical Engineering from UCCS."
      />
      <Section title="Education">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {education.map((edu, index) => (
            <div
              key={index}
              id={`education-${index}`}
              role="button"
              tabIndex={0}
              className={UI_SURFACES.cardInteractive}
              onClick={() => setSelectedItem(edu.details)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedItem(edu.details);
                }
              }}
            >
              <LazyImage
                src={edu.imageUrl}
                alt={edu.title}
                className="h-48 w-full object-cover"
                containerClassName="h-48 w-full"
              />
              <div className="p-4">
                <h3 className="mb-2 truncate text-lg font-bold text-red-500 dark:text-red-400">
                  {edu.title}
                </h3>
                <div
                  className={`h-24 overflow-hidden ${UI_TYPOGRAPHY.cardSummary}`}
                >
                  <SummaryTextLines lines={edu.summary} boldFirstLine={true} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </Section>
    </>
  );
};

export default EducationPage;
