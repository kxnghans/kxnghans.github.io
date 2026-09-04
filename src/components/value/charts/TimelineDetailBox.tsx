/**
 * @file TimelineDetailBox.tsx
 * @description Interactive hover inspection panel displaying period metrics and milestones.
 */

import type { TimelinePoint } from "../../../types/data";

export interface TimelineDetailBoxProps {
  activeItem?: TimelinePoint;
}

export const TimelineDetailBox = ({ activeItem }: TimelineDetailBoxProps) => {
  return (
    <div className="mt-3 min-h-[52px] rounded-xl border border-gray-300/60 bg-gray-200/50 p-2.5 text-xs transition-all dark:border-gray-700/60 dark:bg-black/30">
      {activeItem ? (
        <div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {activeItem.period}
            </span>
            <span className="flex gap-3">
              <span className="font-black text-red-600 dark:text-red-400">
                {activeItem.displayROI}
              </span>
              <span className="font-black text-blue-500 dark:text-blue-400">
                {activeItem.displayHours}
              </span>
            </span>
          </div>
          <div className="mt-0.5 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
            {activeItem.milestone}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-[11px] text-gray-500 dark:text-gray-400">
          Hover over any point to inspect cumulative savings and reclaimed hours
          by career era.
        </div>
      )}
    </div>
  );
};

export default TimelineDetailBox;
