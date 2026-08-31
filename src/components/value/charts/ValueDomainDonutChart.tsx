import { useState } from "react";
import type { DistributionPoint } from "../../../types/data";
import { UI_SURFACES } from "../../../theme";

export interface ValueDomainDonutChartProps {
  data: DistributionPoint[];
  selectedDomains?: string[];
}

export default function ValueDomainDonutChart({
  data,
  selectedDomains = ["All"],
}: ValueDomainDonutChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const isDomainFiltered =
    !selectedDomains.includes("All") && selectedDomains.length > 0;

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 62;
  const circumference = 2 * Math.PI * r;
  const baseStrokeWidth = 12;
  const gapSize = 5;

  let cumulativeOffset = 0;
  const segments = data.map((item) => {
    const rawDash = (item.percentage / 100) * circumference;
    const strokeDash = Math.max(rawDash - baseStrokeWidth - gapSize, 2);
    const offset = cumulativeOffset + (baseStrokeWidth + gapSize) / 2;

    // Non-overlapping hit area dash and offset with butt linecap
    const hitDash = Math.max(rawDash - 1, 1);
    const hitOffset = cumulativeOffset + 0.5;

    cumulativeOffset += rawDash;

    return {
      ...item,
      rawDash,
      strokeDasharray: `${strokeDash} ${circumference - strokeDash}`,
      strokeDashoffset: -offset,
      hitDasharray: `${hitDash} ${circumference - hitDash}`,
      hitDashoffset: -hitOffset,
    };
  });

  const activeIdx =
    hoveredIdx !== null
      ? hoveredIdx
      : isDomainFiltered
        ? data.findIndex((d) => selectedDomains.includes(d.domain))
        : null;

  const activeItem =
    activeIdx !== null && activeIdx !== -1 ? data[activeIdx] : null;

  return (
    <div className={`${UI_SURFACES.chartCard} h-full`}>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
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

      <div className="flex flex-1 flex-col items-center justify-center gap-4 sm:flex-row">
        {/* SVG Ring with Non-Overlapping Pill Segments */}
        <div className="relative flex shrink-0 items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="h-36 w-36 -rotate-90 select-none"
          >
            {segments.map((seg, i) => {
              const isMatch =
                !isDomainFiltered || selectedDomains.includes(seg.domain);
              const isHovered = hoveredIdx === i;
              const isAnyHovered = hoveredIdx !== null;
              const isSelected = activeIdx === i;

              // Dynamic strokeWidth: active (16), default (12), inactive (11)
              const strokeWidth =
                isHovered || isSelected
                  ? 16
                  : isAnyHovered
                    ? 11
                    : isMatch
                      ? 12
                      : 11;

              // Dynamic opacity: keep active segment vivid (1), mute others (0.22) on hover
              const opacityVal =
                isHovered || isSelected
                  ? 1
                  : isAnyHovered
                    ? 0.22
                    : isMatch
                      ? 1
                      : 0.22;

              return (
                <g key={seg.name}>
                  {/* Visual Render Path with Smooth Rounded Caps */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    className="pointer-events-none"
                    style={{
                      opacity: opacityVal,
                      transition:
                        "stroke-width 260ms cubic-bezier(0.4, 0, 0.2, 1), opacity 260ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                  {/* Strictly Non-Overlapping Hit Target (Butt linecap with exact sector boundaries) */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={24}
                    strokeLinecap="butt"
                    strokeDasharray={seg.hitDasharray}
                    strokeDashoffset={seg.hitDashoffset}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Callout */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-250 ease-out">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              {activeItem ? `${activeItem.percentage}%` : "100%"}
            </span>
            <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              {activeItem ? activeItem.domain.split(" ")[0] : "Coverage"}
            </span>
          </div>
        </div>

        {/* Legend */}
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
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
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
      </div>

      {/* Interactive Detail Box (fixed height to prevent layout shift) */}
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
            Hover over ring segments or legend rows to inspect sector footprint
            & impact depth.
          </div>
        )}
      </div>
    </div>
  );
}
