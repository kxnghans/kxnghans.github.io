import Slideshow from "./Slideshow";
import ProjectModal from "../modals/ProjectModal";
import LazyImage from "./LazyImage";
import { projects } from "../../data";
import type { ProjectItem, ProjectDetails } from "../../types/data";

interface ProjectCardProps {
  item: ProjectItem;
}

const ProjectCard = ({ item }: ProjectCardProps) => (
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
      <div className="space-y-1 overflow-hidden text-xs text-gray-600 sm:text-sm dark:text-gray-400">
        {item.summary.map((line, i) => {
          const colonIndex = line.indexOf(":");
          if (colonIndex !== -1) {
            const label = line.slice(0, colonIndex + 1);
            const val = line.slice(colonIndex + 1);
            return (
              <p key={i} className="truncate">
                <strong className="text-gray-800 dark:text-gray-200">
                  {label}
                </strong>
                {val}
              </p>
            );
          }
          return (
            <p key={i} className="truncate">
              {line}
            </p>
          );
        })}
      </div>
    </div>
  </>
);

const ProjectSlideshow = () => (
  <Slideshow<ProjectItem, ProjectDetails>
    title={
      <>
        Recommendations{" "}
        <span className="text-gray-400 dark:text-gray-600">(Projects)</span>
      </>
    }
    data={projects}
    renderCard={(item) => <ProjectCard item={item} />}
    renderModal={({ item, onClose }) => (
      <ProjectModal project={item} onClose={onClose} />
    )}
    getModalItem={(item) => item.details}
  />
);

export default ProjectSlideshow;
