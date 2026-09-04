/**
 * @file TimelineHeader.tsx
 * @description Header banner and legend controls for the cumulative trajectory area chart.
 */

export interface TimelineHeaderProps {
  count: number;
}

export const TimelineHeader = ({ count }: TimelineHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <span className="text-xs font-bold tracking-wider text-red-600 uppercase dark:text-red-400">
          Improvement Trajectory
        </span>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Lifetime Improvements Over Time
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1 text-[10px] font-bold text-gray-500 sm:flex dark:text-gray-400">
          <span className="inline-block h-0.5 w-4 rounded bg-red-600 dark:bg-red-500" />{" "}
          $ Saved
        </span>
        <span className="hidden items-center gap-1 text-[10px] font-bold text-gray-500 sm:flex dark:text-gray-400">
          <span className="inline-block h-0.5 w-4 rounded bg-blue-500" /> Hours
        </span>
        <span className="rounded-lg border border-red-600/20 bg-red-600/10 px-2 py-0.5 text-[11px] font-bold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {count} Eras
        </span>
      </div>
    </div>
  );
};

export default TimelineHeader;
