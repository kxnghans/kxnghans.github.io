import { useState } from "react";
import type { MultiplierPoint } from "../../../types/data";
import { UI_SURFACES } from "../../../theme";

export interface ValueMultiplierBarChartProps {
  data: MultiplierPoint[];
}

export default function ValueMultiplierBarChart({
  data,
}: ValueMultiplierBarChartProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 0;

  return (
    <div className={UI_SURFACES.chartCard}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold tracking-wider text-amber-600 uppercase dark:text-amber-400">
            Impact Multipliers
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Cross-Functional Impact Multipliers
          </h3>
        </div>
        <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
          {data.length} Value Vectors
        </span>
      </div>

      {/* Columns Grid or Empty State */}
      {data.length > 0 ? (
        <div className="grid grid-cols-2 items-end gap-2 pt-6 pb-2 sm:grid-cols-3 lg:h-48 lg:grid-cols-6">
          {data.map((item) => {
            const heightPercent = Math.max((item.value / maxValue) * 100, 14);
            const isSelected = activeId === item.id;
            const isAnyHovered = activeId !== null;

            return (
              <div
                key={item.id}
                className="group relative flex h-full cursor-pointer flex-col items-center justify-end rounded-xl p-1 transition-all"
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Value pill */}
                <span
                  className={`mb-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-black transition-all duration-200 ${
                    isSelected
                      ? "scale-105 bg-red-600 text-white shadow-md dark:bg-red-500"
                      : isAnyHovered
                        ? "bg-gray-200/80 text-gray-700 opacity-35 dark:bg-black/40 dark:text-gray-300"
                        : "bg-gray-200/80 text-gray-700 dark:bg-black/40 dark:text-gray-300"
                  }`}
                >
                  {item.displayValue}
                </span>

                {/* Bar */}
                <div className="flex h-32 w-full max-w-[44px] items-end overflow-hidden rounded-t-xl bg-gray-200/60 dark:bg-black/30">
                  <div
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: item.color,
                      transition:
                        "height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease, transform 200ms ease",
                    }}
                    className={`w-full rounded-t-xl ${
                      isSelected
                        ? "opacity-100 shadow-md ring-2 ring-white/50 brightness-110"
                        : isAnyHovered
                          ? "opacity-25"
                          : "opacity-90"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`mt-2 w-full truncate text-center text-[10px] font-bold transition-all duration-200 ${
                    isSelected
                      ? "font-black text-gray-900 dark:text-white"
                      : isAnyHovered
                        ? "text-gray-600 opacity-35 dark:text-gray-400"
                        : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`w-full truncate text-center text-[9px] transition-all duration-200 ${
                    isSelected
                      ? "font-bold text-red-600 dark:text-red-400"
                      : isAnyHovered
                        ? "text-gray-500 opacity-35 dark:text-gray-500"
                        : "text-gray-500 dark:text-gray-500"
                  }`}
                >
                  {item.metric}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-48 flex-col items-center justify-center text-center text-xs text-gray-500 dark:text-gray-400">
          <span>No impact vectors match the active filter criteria.</span>
          <span className="mt-1 text-[11px] text-gray-400">
            Adjust the domain, category, or era slicers above.
          </span>
        </div>
      )}

      {/* Interactive Detail Box (locked height to eliminate hover layout shift jitter) */}
      <div className="mt-3 flex h-[68px] flex-col justify-center rounded-xl border border-gray-300/60 bg-gray-200/50 p-2.5 text-xs transition-all dark:border-gray-700/60 dark:bg-black/30">
        {activeId !== null ? (
          (() => {
            const activeItem = data.find((d) => d.id === activeId);
            if (!activeItem) return null;
            return (
              <div className="flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="block truncate font-bold text-gray-800 dark:text-gray-200">
                    {activeItem.label} ({activeItem.domain}):
                  </span>
                  <div className="line-clamp-1 text-[11px] text-gray-600 dark:text-gray-400">
                    From{" "}
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {activeItem.baseline}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold text-emerald-500">
                      {activeItem.optimized}
                    </span>
                  </div>
                </div>
                <span
                  style={{ color: activeItem.color }}
                  className="shrink-0 text-sm font-black"
                >
                  {activeItem.displayValue}
                </span>
              </div>
            );
          })()
        ) : (
          <div className="flex h-full items-center justify-center text-center text-[11px] text-gray-500 dark:text-gray-400">
            Hover over any column to inspect bundled impact, baseline
            comparison, and optimization mechanisms.
          </div>
        )}
      </div>
    </div>
  );
}
