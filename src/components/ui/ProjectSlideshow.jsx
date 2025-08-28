import React from "react";
import Slideshow from "./Slideshow";
import ProjectModal from "../modals/ProjectModal";
import { projects } from "../../data";

const ProjectCard = ({ item }) => (
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
      <div className="space-y-1 overflow-hidden text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
        {item.summary.map((line, i) => (
          <p key={i} className="truncate">
            {line}
          </p>
        ))}
      </div>
    </div>
  </>
);

const ProjectSlideshow = () => (
  <Slideshow
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