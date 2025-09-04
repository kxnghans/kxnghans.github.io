import React, { useEffect, useRef } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { CloseIcon } from "../icons/Icons";

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bevel-light dark:bevel-dark relative w-11/12 transform rounded-lg bg-gray-100 transition-all duration-300 dark:bg-[#181818] md:w-4/5 lg:w-3/5"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-3xl text-gray-400 hover:text-white"
        >
          <CloseIcon />
        </button>
        <div className="p-6">
          <h2 className="mb-4 text-3xl font-bold text-red-500">
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
              <ul className="list-inside list-disc space-y-3 text-gray-600 dark:text-gray-300">
                {project.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
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
