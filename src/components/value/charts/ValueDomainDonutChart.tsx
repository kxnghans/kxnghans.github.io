import { useState } from "react";
import type { DistributionPoint } from "../../../types/data";

export interface ValueDomainDonutChartProps {
  data: DistributionPoint[];
  selectedDomains?: string[];
}

export default function ValueDomainDonutChart({
  data,
  selectedDomains = ["All"],
}: ValueDomainDonutChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const isDomainFiltered = !selectedDomains.includes("All") && selectedDomains.length > 0;

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 62;
  const circumference = 2 * Math.PI * r;
  const baseStrokeWidth = 14;
  const gapSize = 8;

  let cumulativeOffset = 0;
  const segments = data.map((item) => {
    const rawDash = (item.percentage / 100) * circumference;
    const strokeDash = Math.max(rawDash - baseStrokeWidth - gapSize, 1);
    const offset = cumulativeOffset + (baseStrokeWidth + gapSize) / 2;
    cumulativeOffset += rawDash;

    return {
      ...item,
      strokeDasharray: `${strokeDash} ${circumference - strokeDash}`,
      strokeDashoffset: -offset,
    };
  });

  const activeIdx =
    hoveredIdx !== null
      ? hoveredIdx
      : isDomainFiltered
        ? data.findIndex((d) => selectedDomains.includes(d.domain))
        : null;

  const activeItem = activeIdx !== null && activeIdx !== -1 ? data[activeIdx] : null;

  return (
    <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex flex-col justify-between rounded-2xl p-5 transition-all duration-300">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Portfolio Allocation
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Domain Impact Footprint
          </h3>
        </div>
        <span className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400">
          5 Sectors
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 my-auto">
        {/* SVG Ring with Pill Segments */}
        <div className="relative flex shrink-0 items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="h-36 w-36 -rotate-90 select-none">
            {segments.map((seg, i) => {
              const isMatch = !isDomainFiltered || selectedDomains.includes(seg.domain);
              const isHighlight = activeIdx === i;

              return (
                <circle
                  key={seg.name}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHighlight ? 19 : isMatch ? 14 : 10}
                  strokeLinecap="round"
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  className={`cursor-pointer transition-all duration-300 ${
                    isMatch ? "opacity-100" : "opacity-25"
                  }`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              {activeItem ? `${activeItem.percentage}%` : "100%"}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {activeItem ? activeItem.domain.split(" ")[0] : "Coverage"}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 w-full">
          {data.map((item, i) => {
            const isSelected = activeIdx === i;
            return (
              <button
                key={item.name}
                type="button"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-left text-xs transition-all ${
                  isSelected
                    ? "bg-gray-200/80 dark:bg-black/40 font-bold"
                    : "hover:bg-gray-200/40 dark:hover:bg-black/20"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <span className="ml-2 font-black text-gray-900 dark:text-white">
                  {item.percentage}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 min-h-[36px] rounded-xl border border-gray-300/60 bg-gray-200/50 p-2 text-center text-xs text-gray-600 dark:border-gray-700/60 dark:bg-black/30 dark:text-gray-400">
        {activeItem ? (
          <span>
            <strong style={{ color: activeItem.color }}>{activeItem.name}</strong> accounts for{" "}
            <strong>{activeItem.percentage}%</strong> of overall career impact value.
          </span>
        ) : (
          <span>Hover over ring segments or select domain filters to view sector contributions.</span>
        )}
      </div>
    </div>
  );
}
