import React, { useEffect, useRef } from "react";
import { CloseIcon } from "../icons/Icons";

const DetailModal = ({ item, onClose }) => {
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
        className="bevel-light dark:bevel-dark relative flex h-5/6 w-11/12 transform flex-col rounded-lg bg-gray-100 transition-all duration-300 dark:bg-[#181818] md:w-4/5 lg:h-3/4 lg:w-3/5"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-3xl text-gray-400 hover:text-white"
        >
          <CloseIcon />
        </button>
        <div className="max-h-full overflow-y-auto p-6 py-4">
          <h2 className="mb-2 text-3xl font-bold text-red-500">
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
                  const elements = [];
                  let currentGroup = [];

                  const renderGroup = (group) => {
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

                  item.details.forEach((detail, index) => {
                    if (detail.endsWith(":")) {
                      renderGroup(currentGroup);
                      currentGroup = [];
                      elements.push(
                        <h4
                          key={`header-${index}`}
                          className="mb-2 mt-4 border-b border-gray-300 pb-1 text-lg font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200"
                        >
                          {detail.slice(0, -1)}
                        </h4>,
                      );
                    } else {
                      currentGroup.push(detail);
                    }
                  });
                  renderGroup(currentGroup); // Render any remaining items
                  return elements;
                })()
              ) : (
                <ul className="list-inside list-disc space-y-3 text-gray-600 dark:text-gray-300">
                  {item.details.map((detail, index) => (
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
