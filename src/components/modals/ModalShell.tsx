import { useEffect, type ReactNode, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../icons/Icons";
import { useFocusTrap } from "../../hooks/useFocusTrap";

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
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`modal-shadow dark:bg-dark-card relative flex max-h-[88vh] w-11/12 transform flex-col rounded-lg bg-gray-100 transition-all duration-300 focus:outline-none ${maxWidthClass}`}
      >
        {/* Origin/Main Close Button */}
        <button
          onClick={onClose}
          aria-label={closeAriaLabel}
          className="absolute top-3 right-3 z-10 text-3xl text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
        >
          <CloseIcon />
        </button>

        {/* Scrollable Modal Content */}
        <div className="max-h-full overflow-y-auto p-6 py-4">
          <h2
            id={titleId}
            className="mb-2 pr-8 text-3xl font-bold text-red-500"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            {children}
            {footer}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body) as unknown as ReactElement;
};

export default ModalShell;
