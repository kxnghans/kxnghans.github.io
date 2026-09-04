/**
 * @file SummaryTextLines.tsx
 * @description Single Source of Truth for rendering structured card summary lines.
 * Parses "Label: Value" lines with bold labels and supports bold first-line headlines.
 */

export interface SummaryTextLinesProps {
  lines: string[];
  boldFirstLine?: boolean;
}

export const SummaryTextLines = ({
  lines,
  boldFirstLine = false,
}: SummaryTextLinesProps) => {
  return (
    <>
      {lines.map((line, i) => {
        // Optional first-line headline emphasis (e.g. company or degree institution)
        if (i === 0 && boldFirstLine) {
          return (
            <p key={i} className="truncate">
              <strong>{line}</strong>
            </p>
          );
        }

        const colonIndex = line.indexOf(":");
        if (colonIndex !== -1) {
          const label = line.slice(0, colonIndex + 1);
          const val = line.slice(colonIndex + 1);
          return (
            <p key={i} className="truncate">
              <strong className="text-gray-800 dark:text-gray-200">
                {label}
              </strong>
              {val}
            </p>
          );
        }

        return (
          <p key={i} className="truncate">
            {line}
          </p>
        );
      })}
    </>
  );
};

export default SummaryTextLines;
