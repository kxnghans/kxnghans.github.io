import { useEffect } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { CloseIcon } from "../icons/Icons";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import type { ProjectDetails } from "../../types/data";

export interface ProjectModalProps {
  project:
    | ProjectDetails
    | {
        title: string;
        details?: string[];
        challenge?: string;
        action?: string;
        outcome?: string;
        highlights?: { label: string; value: string }[];
        liveLink?: string;
        codeLink?: string;
      };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useFocusTrap<HTMLDivElement>(Boolean(project), onClose);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="modal-shadow dark:bg-dark-card relative w-11/12 transform rounded-lg bg-gray-100 transition-all duration-300 focus:outline-none md:w-4/5 lg:w-3/5"
      >
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-3 right-3 z-10 text-3xl text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
        >
          <CloseIcon />
        </button>
        <div className="p-6">
          <h2
            id="project-modal-title"
            className="mb-4 text-3xl font-bold text-red-500"
          >
            {project.title}
          </h2>
          <div className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
            {project.challenge ? (
              <>
                <p>
                  <span className="font-semibold">Challenge:</span>{" "}
                  {project.challenge}
                </p>
                <p>
                  <span className="font-semibold">Action:</span>{" "}
                  {project.action}
                </p>
                <p>
                  <span className="font-semibold">Outcome:</span>{" "}
                  {project.outcome}
                </p>
              </>
            ) : (
              project.details && (
                <ul className="list-inside list-disc space-y-3 text-gray-600 dark:text-gray-300">
                  {project.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )
            )}
          </div>
          {project.highlights && (
            <div className="border-t border-gray-300 pt-4 dark:border-gray-700">
              <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Highlights
              </h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-300">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>
                    <span className="font-semibold">{highlight.label}:</span>{" "}
                    {highlight.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 flex space-x-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bevel-button-dark flex transform items-center rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-red-700"
              >
                <FaCirclePlay className="mr-2" /> Demo
              </a>
            )}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bevel-button-dark transform rounded-lg bg-gray-700 px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-gray-800"
              >
                View Project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
