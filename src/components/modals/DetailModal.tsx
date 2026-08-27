import type { ReactElement } from "react";
import ModalShell from "./ModalShell";
import ModalCARSection from "./ModalCARSection";
import ModalHighlightsGrid from "./ModalHighlightsGrid";
import CategorizedList from "./CategorizedList";
import type { Highlight, ProjectDetails, SkillDetail, SkillModalDetails } from "../../types/data";

export interface DetailModalItem {
  title?: string;
  subtitle?: string;
  challenge?: string;
  action?: string;
  outcome?: string;
  modalDetails?: SkillModalDetails;
  details?: string[] | (string | SkillDetail)[];
  exposure?: string[];
  highlights?: Highlight[];
}

export interface DetailModalProps {
  item: DetailModalItem;
  onClose: () => void;
  onSelectProject?: (project: ProjectDetails) => void;
}

const DetailModal = ({
  item,
  onClose,
  onSelectProject,
}: DetailModalProps): ReactElement => {
  const title = item.modalDetails?.title || item.title || "Details";
  const subtitle = item.modalDetails?.subtitle || item.subtitle;

  const detailsList: string[] = item.modalDetails?.details
    ? item.modalDetails.details
    : Array.isArray(item.details)
      ? item.details.map((d) => (typeof d === "string" ? d : d.name))
      : [];

  const exposureList: string[] =
    item.modalDetails?.exposure || item.exposure || [];

  const exposureFooter =
    exposureList.length > 0 ? (
      <div>
        <span className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
          Exposure to:
        </span>
        <div className="flex flex-wrap gap-2">
          {exposureList.map((exp, index) => (
            <span
              key={index}
              className="rounded-md border border-gray-300/80 bg-gray-200/80 px-2.5 py-1 text-xs font-medium text-gray-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-200"
            >
              {exp}
            </span>
          ))}
        </div>
      </div>
    ) : undefined;

  return (
    <ModalShell
      title={title}
      subtitle={subtitle}
      titleId="detail-modal-title"
      closeAriaLabel="Close detail modal"
      onClose={onClose}
      footer={exposureFooter}
    >
      {/* Challenge, Action, Outcome callouts */}
      <ModalCARSection
        challenge={item.challenge}
        action={item.action}
        outcome={item.outcome}
      />

      {/* Listed Highlights (placed first) */}
      <ModalHighlightsGrid
        highlights={item.highlights}
        onSelectProject={onSelectProject}
      />

      {/* Main Details / Categorized List */}
      {detailsList.length > 0 && (
        <CategorizedList
          items={detailsList}
          onSelectProject={onSelectProject}
        />
      )}
    </ModalShell>
  );
};

export default DetailModal;
