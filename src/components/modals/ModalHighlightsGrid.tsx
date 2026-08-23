import type { ReactElement } from "react";
import type { Highlight } from "../../types/data";

export interface ModalHighlightsGridProps {
  highlights?: Highlight[];
  title?: string;
}

export const ModalHighlightsGrid = ({
  highlights,
  title = "Highlights",
}: ModalHighlightsGridProps): ReactElement | null => {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-300 pt-4 dark:border-gray-700">
      <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <ul className="list-outside list-disc space-y-1.5 pl-5 text-gray-600 dark:text-gray-300">
        {highlights.map((highlight, index) => (
          <li key={index}>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {highlight.label}:
            </span>{" "}
            <span>{highlight.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalHighlightsGrid;
