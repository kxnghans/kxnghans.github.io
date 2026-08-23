import { useState, useEffect } from "react";
import Section from "../components/ui/Section";
import ProjectModal from "../components/modals/ProjectModal";
import LazyImage from "../components/ui/LazyImage";
import { projects } from "../data";
import { useSearch } from "../context/SearchContext";
import type { ProjectDetails } from "../types/data";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null,
  );
  const { activeModal, setActiveModal } = useSearch();

  useEffect(() => {
    const modalIdx =
      typeof activeModal === "number"
        ? activeModal
        : typeof activeModal === "string"
          ? parseInt(activeModal, 10)
          : null;

    if (
      modalIdx !== null &&
      !isNaN(modalIdx) &&
      modalIdx >= 0 &&
      modalIdx < projects.length
    ) {
      setSelectedProject(projects[modalIdx].details);
    } else {
      setSelectedProject(null);
    }
  }, [activeModal]);

  const handleOpenModal = (projectDetails: ProjectDetails, index: number) => {
    setSelectedProject(projectDetails);
    setActiveModal(index);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setActiveModal(null);
  };

  return (
    <>
      <title>Projects | Hanson-Tube</title>
      <meta
        name="description"
        content="Engineering projects, enterprise tools, and machine learning models built by Kobby Hanson."
      />
      <Section title="Projects">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card cursor-pointer overflow-hidden rounded-lg bg-gray-200 text-left transition-all duration-300 hover:-translate-y-2"
              onClick={() => handleOpenModal(project.details, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenModal(project.details, index);
                }
              }}
            >
              <LazyImage
                src={project.imageUrl}
                alt={project.title}
                className="h-48 w-full object-cover"
                containerClassName="h-48 w-full"
              />
              <div className="p-4">
                <h3 className="mb-2 truncate text-xl font-bold text-gray-900 dark:text-gray-300">
                  {project.title}
                </h3>
                <div className="h-24 space-y-1 overflow-hidden text-sm text-gray-600 dark:text-gray-400">
                  {project.summary.map((line, i) => (
                    <p key={i} className="truncate">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </Section>
    </>
  );
};

export default ProjectsPage;
