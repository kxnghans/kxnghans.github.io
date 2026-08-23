import type { ReactElement } from "react";
import ModalShell from "./ModalShell";
import ModalCARSection from "./ModalCARSection";
import ModalHighlightsGrid from "./ModalHighlightsGrid";
import CategorizedList from "./CategorizedList";
import type { Highlight, SkillDetail, SkillModalDetails } from "../../types/data";

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
}

const DetailModal = ({ item, onClose }: DetailModalProps): ReactElement => {
  const title = item.modalDetails?.title || item.title || "Details";
  const subtitle = item.modalDetails?.subtitle || item.subtitle;

  const detailsList: string[] = item.modalDetails?.details
    ? item.modalDetails.details
    : Array.isArray(item.details)
      ? item.details.map((d) => (typeof d === "string" ? d : d.name))
      : [];

  const exposureList: string[] =
    item.modalDetails?.exposure || item.exposure || [];

  return (
    <ModalShell
      title={title}
      subtitle={subtitle}
      titleId="detail-modal-title"
      closeAriaLabel="Close detail modal"
      onClose={onClose}
    >
      {/* Challenge, Action, Outcome callouts */}
      <ModalCARSection
        challenge={item.challenge}
        action={item.action}
        outcome={item.outcome}
      />

      {/* Main Details / Categorized List */}
      {detailsList.length > 0 && <CategorizedList items={detailsList} />}

      {/* Exposure List */}
      {exposureList.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Exposure to:
          </span>
          <ul className="list-outside list-disc space-y-1 pl-5 mt-1 text-gray-600 dark:text-gray-300">
            {exposureList.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Listed Highlights */}
      <ModalHighlightsGrid highlights={item.highlights} />
    </ModalShell>
  );
};

export default DetailModal;
