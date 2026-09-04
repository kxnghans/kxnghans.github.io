import Slideshow from "./Slideshow";
import ProjectModal from "../modals/ProjectModal";
import LazyImage from "./LazyImage";
import SummaryTextLines from "./SummaryTextLines";
import { projects } from "../../data";
import type { ProjectItem, ProjectDetails } from "../../types/data";

interface ProjectCardProps {
  item: ProjectItem;
  index: number;
}

const ProjectCard = ({ item, index }: ProjectCardProps) => (
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
      <div className="space-y-1 overflow-hidden text-xs text-gray-600 sm:text-sm dark:text-gray-400">
        <SummaryTextLines lines={item.summary} />
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
    renderCard={(item, index) => <ProjectCard item={item} index={index} />}
    renderModal={({ item, onClose }) => (
      <ProjectModal project={item} onClose={onClose} />
    )}
    getModalItem={(item) => item.details}
  />
);

export default ProjectSlideshow;
