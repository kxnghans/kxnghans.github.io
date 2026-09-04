/**
 * @file DonutDetailBox.tsx
 * @description Detail panel displaying sector percentage allocation and career impact depth.
 */

import type { DistributionPoint } from "../../../types/data";

export interface DonutDetailBoxProps {
  activeItem: DistributionPoint | null;
}

export const DonutDetailBox = ({ activeItem }: DonutDetailBoxProps) => {
  return (
    <div className="mt-3 flex h-[68px] flex-col justify-center rounded-xl border border-gray-300/60 bg-gray-200/50 p-2.5 text-xs transition-all dark:border-gray-700/60 dark:bg-black/30">
      {activeItem ? (
        <div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-gray-800 dark:text-gray-200">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: activeItem.color }}
              />
              <strong style={{ color: activeItem.color }}>
                {activeItem.name}
              </strong>
            </span>
            <span
              style={{ color: activeItem.color }}
              className="shrink-0 text-xs font-black"
            >
              {activeItem.percentage}% Allocation
            </span>
          </div>
          <div className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
            Accounts for <strong>{activeItem.percentage}%</strong> of overall
            career impact value: {activeItem.description}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-center text-[11px] text-gray-500 dark:text-gray-400">
          Hover over ring segments or legend rows to inspect sector footprint &
          impact depth.
        </div>
      )}
    </div>
  );
};

export default DonutDetailBox;
