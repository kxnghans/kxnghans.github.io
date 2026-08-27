import type { ReactElement } from "react";
import { UI_TYPOGRAPHY } from "../../theme";
import { Icon, ICONS } from "../icons";
import { projects } from "../../data";
import type { ProjectDetails } from "../../types/data";

export interface CategorizedListProps {
  items: string[];
  className?: string;
  onSelectProject?: (project: ProjectDetails) => void;
}

interface ItemGroup {
  title: string;
  items: string[];
}

// Matches item labels against the projects dataset to enable cross-modal linking
const findMatchedProject = (label: string): ProjectDetails | undefined => {
  const normalized = label.toLowerCase();
  const matched = projects.find(
    (p) =>
      normalized.includes(p.title.toLowerCase()) ||
      p.title.toLowerCase().includes(normalized) ||
      (normalized.includes("fretwork") && p.title.toLowerCase().includes("fretwork")),
  );
  return matched?.details;
};

export const CategorizedList = ({
  items,
  className = "",
  onSelectProject,
}: CategorizedListProps): ReactElement | null => {
  if (!items || items.length === 0) {
    return null;
  }

  // Detect whether the list contains section headers (strings ending with ':')
  const hasCategoryHeaders = items.some((item) => item.trim().endsWith(":"));

  if (!hasCategoryHeaders) {
    return (
      <ul
        className={`list-outside list-disc space-y-2.5 pl-5 text-gray-600 dark:text-gray-300 ${className}`}
      >
        {items.map((detail, index) => {
          const colonIndex = detail.indexOf(":");
          if (colonIndex > 0) {
            const label = detail.slice(0, colonIndex);
            const value = detail.slice(colonIndex + 1);
            const matchedProject = onSelectProject
              ? findMatchedProject(label)
              : undefined;

            return (
              <li key={index}>
                {matchedProject ? (
                  <button
                    type="button"
                    onClick={() => onSelectProject?.(matchedProject)}
                    className="group inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 hover:underline dark:text-red-400 dark:hover:text-red-300"
                    title={`View ${label} Project Modal`}
                    aria-label={`View ${label} project modal`}
                  >
                    <span>{label}:</span>
                    <Icon
                      name={ICONS.EXTERNAL_LINK}
                      className="inline h-3 w-3 transition-transform group-hover:scale-110"
                    />
                  </button>
                ) : (
                  <span className={UI_TYPOGRAPHY.metaLabel}>
                    {label}:
                  </span>
                )}
                {value}
              </li>
            );
          }
          return <li key={index}>{detail}</li>;
        })}
      </ul>
    );
  }

  // Parse items into categorized groups
  const groups: ItemGroup[] = [];
  let currentGroup: ItemGroup | null = null;

  items.forEach((item) => {
    const trimmed = item.trim();
    if (trimmed.endsWith(":")) {
      currentGroup = {
        title: trimmed.slice(0, -1),
        items: [],
      };
      groups.push(currentGroup);
    } else if (currentGroup) {
      currentGroup.items.push(item);
    } else {
      currentGroup = {
        title: "Overview",
        items: [item],
      };
      groups.push(currentGroup);
    }
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {groups.map((group, groupIdx) => (
        <div
          key={groupIdx}
          className="rounded-lg border border-gray-300/80 bg-gray-200/40 p-3 dark:border-white/5 dark:bg-white/[0.02]"
        >
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            {group.title}
          </h4>
          <ul className="list-outside list-disc space-y-2 pl-4 text-gray-600 dark:text-gray-300">
            {group.items.map((detail, itemIdx) => {
              const colonIndex = detail.indexOf(":");
              if (colonIndex > 0) {
                const label = detail.slice(0, colonIndex);
                const value = detail.slice(colonIndex + 1);
                const matchedProject = onSelectProject
                  ? findMatchedProject(label)
                  : undefined;

                return (
                  <li key={itemIdx} className="text-sm sm:text-base leading-relaxed">
                    {matchedProject ? (
                      <button
                        type="button"
                        onClick={() => onSelectProject?.(matchedProject)}
                        className="group inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 hover:underline dark:text-red-400 dark:hover:text-red-300"
                        title={`View ${label} Project Modal`}
                        aria-label={`View ${label} project modal`}
                      >
                        <span>{label}:</span>
                        <Icon
                          name={ICONS.EXTERNAL_LINK}
                          className="inline h-3 w-3 transition-transform group-hover:scale-110"
                        />
                      </button>
                    ) : (
                      <span className={UI_TYPOGRAPHY.metaLabel}>
                        {label}:
                      </span>
                    )}
                    {value}
                  </li>
                );
              }
              return (
                <li
                  key={itemIdx}
                  className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300"
                >
                  {detail}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategorizedList;
