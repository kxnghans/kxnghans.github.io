import { useEffect, type ReactNode, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../icons/Icons";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { UI_SURFACES, UI_TYPOGRAPHY, UI_BUTTONS } from "../../theme";

export interface ModalShellProps {
  title: ReactNode;
  subtitle?: ReactNode;
  titleId?: string;
  closeAriaLabel?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClass?: string;
}

export const ModalShell = ({
  title,
  subtitle,
  titleId = "modal-title",
  closeAriaLabel = "Close modal",
  onClose,
  children,
  footer,
  maxWidthClass = "md:w-4/5 lg:w-3/5",
}: ModalShellProps): ReactElement | null => {
  const modalRef = useFocusTrap<HTMLDivElement>(true, onClose);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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

  if (typeof document === "undefined") {
    return null;
  }

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={UI_SURFACES.modalBackdrop}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`${UI_SURFACES.modalShell} ${maxWidthClass}`}
      >
        {/* Origin/Main Close Button */}
        <button
          onClick={onClose}
          aria-label={closeAriaLabel}
          className={`absolute top-3 right-3 z-10 ${UI_BUTTONS.close}`}
        >
          <CloseIcon />
        </button>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 py-4">
          <h2 id={titleId} className={`mb-2 pr-8 ${UI_TYPOGRAPHY.modalTitle}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mb-4 ${UI_TYPOGRAPHY.modalSubtitle}`}>{subtitle}</p>
          )}

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            {children}
          </div>
        </div>

        {/* Sticky/Fixed Bottom Footer (Divider + Content) */}
        {footer && <div className={UI_SURFACES.modalFooter}>{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body) as unknown as ReactElement;
};

export default ModalShell;
