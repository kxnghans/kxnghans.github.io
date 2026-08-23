import type { ReactElement } from "react";

export interface CategorizedListProps {
  items: string[];
  className?: string;
}

interface ItemGroup {
  category?: string;
  items: string[];
}

export const CategorizedList = ({
  items,
  className = "",
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
            return (
              <li key={index}>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {label}:
                </span>
                {value}
              </li>
            );
          }
          return <li key={index}>{detail}</li>;
        })}
      </ul>
    );
  }

  // Group items by category headers
  const groups: ItemGroup[] = [];
  let currentGroup: ItemGroup = { items: [] };

  items.forEach((item) => {
    const trimmed = item.trim();
    if (trimmed.endsWith(":")) {
      if (currentGroup.category || currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = {
        category: trimmed.slice(0, -1),
        items: [],
      };
    } else {
      currentGroup.items.push(trimmed);
    }
  });

  if (currentGroup.category || currentGroup.items.length > 0) {
    groups.push(currentGroup);
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {groups.map((group, groupIdx) => (
        <div key={groupIdx}>
          {group.category && (
            <h4 className="mt-3 mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-gray-800 first:mt-0 dark:border-gray-700 dark:text-gray-200">
              {group.category}
            </h4>
          )}
          <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            {group.items.map((detail, itemIdx) => {
              const colonIndex = detail.indexOf(":");
              if (colonIndex > 0) {
                const label = detail.slice(0, colonIndex);
                const value = detail.slice(colonIndex + 1);
                return (
                  <li key={itemIdx} className="text-sm sm:text-base">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {label}:
                    </span>
                    {value}
                  </li>
                );
              }
              return (
                <li
                  key={itemIdx}
                  className="text-sm text-gray-600 sm:text-base dark:text-gray-300"
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
