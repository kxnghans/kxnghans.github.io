/**
 * @file DonutLegend.tsx
 * @description Interactive legend row list for the portfolio allocation donut chart.
 */

import type { DistributionPoint } from "../../../types/data";

export interface DonutLegendProps {
  data: DistributionPoint[];
  activeIdx: number | null;
  hoveredIdx: number | null;
  onHoverItem: (index: number | null) => void;
}

export const DonutLegend = ({
  data,
  activeIdx,
  hoveredIdx,
  onHoverItem,
}: DonutLegendProps) => {
  return (
    <div className="w-full flex-1 space-y-1.5">
      {data.map((item, i) => {
        const isSelected = activeIdx === i;
        const isAnyHovered = hoveredIdx !== null;
        const rowOpacity = isSelected
          ? "opacity-100"
          : isAnyHovered
            ? "opacity-35"
            : "opacity-100";

        return (
          <button
            key={item.name}
            type="button"
            onMouseEnter={() => onHoverItem(i)}
            onMouseLeave={() => onHoverItem(null)}
            className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-left text-xs transition-all ${rowOpacity} ${
              isSelected
                ? "bg-gray-200/80 font-bold text-gray-900 dark:bg-black/40 dark:text-white"
                : "text-gray-700 hover:bg-gray-200/40 dark:text-gray-300 dark:hover:bg-black/20"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate">{item.name}</span>
            </div>
            <span className="ml-2 shrink-0 font-black text-gray-900 dark:text-white">
              {item.percentage}%
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DonutLegend;
