import React from "react";
import Section from "../components/ui/Section";
import ProjectModal from "../components/modals/ProjectModal";
import { projects } from "../data";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  return (
    <Section title="Projects">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bevel-light dark:neumorphic-outset-dark cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-300 hover:-translate-y-2"
            onClick={() => setSelectedProject(project.details)}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-48 w-full object-cover"
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
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
};

export default ProjectsPage;
