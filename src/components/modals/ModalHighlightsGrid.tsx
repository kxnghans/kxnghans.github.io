import type { ReactElement } from "react";
import type { Highlight, ProjectDetails } from "../../types/data";
import { Icon, ICONS } from "../icons";
import { projects } from "../../data";

export interface ModalHighlightsGridProps {
  highlights?: Highlight[];
  title?: string;
  className?: string;
  showBorder?: boolean;
  onSelectProject?: (project: ProjectDetails) => void;
}

export const ModalHighlightsGrid = ({
  highlights,
  title = "Highlights",
  className = "",
  showBorder = false,
  onSelectProject,
}: ModalHighlightsGridProps): ReactElement | null => {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  const borderClass = showBorder
    ? "border-t border-gray-300 pt-4 dark:border-gray-700"
    : "";

  return (
    <div className={`${borderClass} ${className}`}>
      <h3 className="mb-2.5 text-base font-bold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {highlights.map((highlight, index) => {
          const matchedProject =
            onSelectProject && highlight.value.toLowerCase().includes("fretwork")
              ? projects.find((p) => p.title.toLowerCase().includes("fretwork"))?.details
              : undefined;

          if (matchedProject) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectProject?.(matchedProject)}
                className="group flex flex-col rounded-lg border border-gray-300/70 bg-gray-200/50 p-2.5 text-left transition-all hover:border-red-500/50 hover:bg-gray-200/90 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-red-500/40 dark:hover:bg-white/[0.06]"
                title={`View ${highlight.value} Project Modal`}
                aria-label={`View ${highlight.value} project modal`}
              >
                <span className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                  <span>{highlight.label}:</span>
                  <Icon
                    name={ICONS.EXTERNAL_LINK}
                    className="h-3 w-3 text-red-500 transition-transform group-hover:scale-110 dark:text-red-400"
                  />
                </span>
                <span className="mt-0.5 block text-sm font-medium text-gray-700 underline-offset-2 group-hover:underline dark:text-gray-200">
                  {highlight.value}
                </span>
              </button>
            );
          }

          return (
            <div
              key={index}
              className="rounded-lg border border-gray-300/70 bg-gray-200/50 p-2.5 dark:border-white/5 dark:bg-white/[0.03]"
            >
              <span className="block text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                {highlight.label}:
              </span>
              <span className="mt-0.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                {highlight.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalHighlightsGrid;
