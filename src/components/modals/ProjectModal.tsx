import type { ReactElement } from "react";
import { Icon, ICONS } from "../icons";
import ModalShell from "./ModalShell";
import ModalCARSection from "./ModalCARSection";
import ModalHighlightsGrid from "./ModalHighlightsGrid";
import CategorizedList from "./CategorizedList";
import type { ProjectDetails } from "../../types/data";

export interface ProjectModalProps {
  project:
    | ProjectDetails
    | {
        title?: string;
        details?: string[];
        challenge?: string;
        action?: string;
        outcome?: string;
        highlights?: { label: string; value: string }[];
        liveLink?: string;
        codeLink?: string;
        video?: string;
      };
  onClose: () => void;
}

const ProjectModal = ({
  project,
  onClose,
}: ProjectModalProps): ReactElement => {
  const actions =
    project.liveLink || project.codeLink ? (
      <div className="flex space-x-4">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bevel-button-light dark:bevel-button-dark flex transform items-center rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-red-700 active:scale-95"
          >
            <Icon name={ICONS.PLAY_CIRCLE} className="mr-2" /> Demo
          </a>
        )}
        {project.codeLink && (
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bevel-button-light dark:bevel-button-dark transform rounded-lg bg-gray-700 px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-gray-800 active:scale-95 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            View Project
          </a>
        )}
      </div>
    ) : undefined;

  return (
    <ModalShell
      title={project.title || "Project Details"}
      titleId="project-modal-title"
      closeAriaLabel="Close project modal"
      onClose={onClose}
      footer={actions}
    >
      {/* Video preview if provided */}
      {project.video && (
        <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-white/10">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={project.video}
              title={`${project.title || "Project"} demonstration video`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Challenge, Action, Outcome callouts */}
      <ModalCARSection
        challenge={project.challenge}
        action={project.action}
        outcome={project.outcome}
      />

      {/* Supplementary details if present */}
      {project.details && project.details.length > 0 && (
        <CategorizedList items={project.details} />
      )}

      {/* Listed Highlights */}
      <ModalHighlightsGrid highlights={project.highlights} showBorder={true} />
    </ModalShell>
  );
};

export default ProjectModal;
