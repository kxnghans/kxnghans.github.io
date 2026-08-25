import { useState } from "react";
import type { MultiplierPoint } from "../../../types/data";

export interface ValueMultiplierBarChartProps {
  data: MultiplierPoint[];
}

export default function ValueMultiplierBarChart({
  data,
}: ValueMultiplierBarChartProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const maxValue =
    data.length > 0 ? Math.max(...data.map((d) => d.value)) : 0;

  return (
    <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex flex-col justify-between rounded-2xl p-5 transition-all duration-300">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Velocity Multipliers
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Cycle-Time Acceleration Factors
          </h3>
        </div>
        <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
          {data.length} Workflows
        </span>
      </div>

      {/* Columns Grid or Empty State */}
      {data.length > 0 ? (
        <div className="grid grid-cols-2 items-end gap-2 pb-2 pt-6 sm:grid-cols-4 lg:h-48">
          {data.map((item) => {
            const heightPercent = Math.max((item.value / maxValue) * 100, 14);
            const isSelected = activeId === item.id;

            return (
              <div
                key={item.id}
                className="group flex h-full cursor-pointer flex-col items-center justify-end"
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Speedup pill */}
                <span
                  className={`mb-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-black transition-all duration-200 ${
                    isSelected
                      ? "scale-110 bg-red-600 text-white shadow-md dark:bg-red-500"
                      : "bg-gray-200/80 text-gray-700 dark:bg-black/40 dark:text-gray-300"
                  }`}
                >
                  {item.displayValue} faster
                </span>

                {/* Bar */}
                <div className="flex h-32 w-full max-w-[44px] items-end overflow-hidden rounded-t-xl bg-gray-200/60 dark:bg-black/30">
                  <div
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: item.color,
                    }}
                    className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-125 ${
                      isSelected ? "opacity-100 ring-2 ring-white/50" : "opacity-85"
                    }`}
                  />
                </div>

                {/* Label */}
                <span className="mt-2 w-full truncate text-center text-[10px] font-bold text-gray-600 dark:text-gray-400">
                  {item.label}
                </span>
                <span className="w-full truncate text-center text-[9px] text-gray-500 dark:text-gray-500">
                  {item.metric}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-48 flex-col items-center justify-center text-center text-xs text-gray-500 dark:text-gray-400">
          <span>No acceleration workflows match the active filter criteria.</span>
          <span className="mt-1 text-[11px] text-gray-400">
            Adjust the domain, category, or era slicers above.
          </span>
        </div>
      )}

      {/* Interactive Detail Box */}
      <div className="mt-4 min-h-[52px] rounded-xl border border-gray-300/60 bg-gray-200/50 p-2.5 text-xs transition-all dark:border-gray-700/60 dark:bg-black/30">
        {activeId !== null ? (
          (() => {
            const activeItem = data.find((d) => d.id === activeId);
            if (!activeItem) return null;
            return (
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {activeItem.label} ({activeItem.domain}):
                  </span>
                  <div className="text-[11px] text-gray-600 dark:text-gray-400">
                    From{" "}
                    <span className="font-semibold text-red-500">
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
                  className="text-sm font-black"
                >
                  {activeItem.displayValue}
                </span>
              </div>
            );
          })()
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-gray-500 dark:text-gray-400">
            Hover over any column to inspect measured before &rarr; after cycle-time
            speedups.
          </div>
        )}
      </div>
    </div>
  );
}
