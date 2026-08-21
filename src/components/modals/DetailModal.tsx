import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "../icons/Icons";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import type { Highlight, SkillModalDetails } from "../../types/data";

export interface DetailModalItem {
  title?: string;
  subtitle?: string;
  challenge?: string;
  action?: string;
  outcome?: string;
  modalDetails?: SkillModalDetails;
  details?: string[] | unknown;
  highlights?: Highlight[];
}

export interface DetailModalProps {
  item: DetailModalItem;
  onClose: () => void;
}

const DetailModal = ({ item, onClose }: DetailModalProps) => {
  const modalRef = useFocusTrap<HTMLDivElement>(Boolean(item), onClose);

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
      aria-labelledby="detail-modal-title"
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="modal-shadow dark:bg-dark-card relative flex h-5/6 w-11/12 transform flex-col rounded-lg bg-gray-100 transition-all duration-300 focus:outline-none md:w-4/5 lg:h-3/4 lg:w-3/5"
      >
        <button
          onClick={onClose}
          aria-label="Close detail modal"
          className="absolute top-3 right-3 z-10 text-3xl text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
        >
          <CloseIcon />
        </button>
        <div className="max-h-full overflow-y-auto p-6 py-4">
          <h2
            id="detail-modal-title"
            className="mb-2 text-3xl font-bold text-red-500"
          >
            {item.modalDetails ? item.modalDetails.title : item.title}
          </h2>
          {(item.modalDetails?.subtitle || item.subtitle) && (
            <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
              {item.modalDetails?.subtitle || item.subtitle}
            </p>
          )}
          <div className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
            {item.challenge && (
              <p>
                <span className="font-semibold">Challenge:</span>{" "}
                {item.challenge}
              </p>
            )}
            {item.action && (
              <p>
                <span className="font-semibold">Action:</span> {item.action}
              </p>
            )}
            {item.outcome && (
              <p>
                <span className="font-semibold">Outcome:</span> {item.outcome}
              </p>
            )}

            {/* Render details from modalDetails if available, otherwise fallback to item.details */}
            {item.modalDetails ? (
              <ul className="list-inside list-disc space-y-3 text-gray-600 dark:text-gray-300">
                {item.modalDetails.details &&
                  item.modalDetails.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                {item.modalDetails.exposure &&
                  item.modalDetails.exposure.length > 0 && (
                    <li className="mt-2">
                      <span className="font-semibold">Exposure to:</span>
                      <ul className="ml-5 list-inside list-disc">
                        {item.modalDetails.exposure.map((exp, index) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    </li>
                  )}
              </ul>
            ) : (
              Array.isArray(item.details) &&
              (item.title === "LinkedIn Learning Courses" ? (
                (() => {
                  const elements: ReactNode[] = [];
                  let currentGroup: string[] = [];

                  const renderGroup = (group: string[]) => {
                    if (group.length > 0) {
                      elements.push(
                        <ul
                          key={`group-${elements.length}`}
                          className="grid grid-cols-1 gap-x-4 sm:grid-cols-2"
                        >
                          {group.map((detail, index) => (
                            <li key={index} className="mb-2">
                              {detail.includes(":") ? (
                                <>
                                  <span className="font-semibold">
                                    {detail.split(":")[0]}
                                  </span>
                                  :{detail.split(":").slice(1).join(":")}
                                </>
                              ) : (
                                detail
                              )}
                            </li>
                          ))}
                        </ul>,
                      );
                    }
                  };

                  (item.details as string[]).forEach((detail, index) => {
                    if (detail.endsWith(":")) {
                      renderGroup(currentGroup);
                      currentGroup = [];
                      elements.push(
                        <h4
                          key={`header-${index}`}
                          className="mt-4 mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                        >
                          {detail.slice(0, -1)}
                        </h4>,
                      );
                    } else {
                      currentGroup.push(detail);
                    }
                  });
                  renderGroup(currentGroup);
                  return elements;
                })()
              ) : (
                <ul className="list-inside list-disc space-y-3 text-gray-600 dark:text-gray-300">
                  {(item.details as string[]).map((detail, index) => (
                    <li key={index}>
                      {detail.includes(":") ? (
                        <>
                          <span className="font-semibold">
                            {detail.split(":")[0]}
                          </span>
                          :{detail.split(":").slice(1).join(":")}
                        </>
                      ) : (
                        detail
                      )}
                    </li>
                  ))}
                </ul>
              ))
            )}
          </div>
          {item.highlights && (
            <div className="border-t border-gray-300 pt-4 dark:border-gray-700">
              <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Highlights
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {item.highlights.map((highlight, i) => (
                  <li key={i}>
                    <span className="font-semibold">{highlight.label}:</span>{" "}
                    {highlight.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
