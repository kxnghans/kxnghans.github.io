import { useState } from "react";
import type { RadarAxisPoint } from "../../../types/data";

export interface ValueRadarChartProps {
  data: RadarAxisPoint[];
  selectedDomains?: string[];
}

export default function ValueRadarChart({
  data,
  selectedDomains = ["All"],
}: ValueRadarChartProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 95;
  const numAxes = data.length;

  const isDomainFiltered = !selectedDomains.includes("All") && selectedDomains.length > 0;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    return {
      x: cx + radius * valueRatio * Math.cos(angle),
      y: cy + radius * valueRatio * Math.sin(angle),
    };
  };

  const points = data
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.score / 100);
      return `${x},${y}`;
    })
    .join(" ");

  const levels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex flex-col justify-between rounded-2xl p-5 transition-all duration-300">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            Core Dimensions
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Capability & Competency Radar
          </h3>
        </div>
        <span className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-600 dark:text-red-400">
          {data.length} Pillars
        </span>
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="h-64 w-full max-w-[280px] select-none"
        >
          {/* Concentric grid webs */}
          {levels.map((level) => {
            const levelPoints = data
              .map((_, i) => {
                const { x, y } = getCoordinates(i, level);
                return `${x},${y}`;
              })
              .join(" ");
            return (
              <polygon
                key={level}
                points={levelPoints}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300/70 dark:text-gray-700/60"
              />
            );
          })}

          {/* Radial axis lines */}
          {data.map((_, i) => {
            const { x, y } = getCoordinates(i, 1);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300/80 dark:text-gray-700/70"
              />
            );
          })}

          {/* Data Polygon */}
          <polygon
            points={points}
            fill="rgba(239, 68, 68, 0.25)"
            stroke="#ef4444"
            strokeWidth="2.5"
            className="transition-all duration-300 hover:fill-red-500/35"
          />

          {/* Vertices & Labels */}
          {data.map((d, i) => {
            const { x, y } = getCoordinates(i, d.score / 100);
            const labelPos = getCoordinates(i, 1.22);
            const isMatch = !isDomainFiltered || selectedDomains.includes(d.domain);
            const isActive = activeIdx === i;

            return (
              <g
                key={d.axis}
                className={`transition-opacity duration-300 ${
                  isMatch ? "opacity-100" : "opacity-35"
                }`}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? "7" : isMatch && isDomainFiltered ? "5.5" : "4"}
                  className="cursor-pointer fill-red-500 transition-all duration-200 hover:fill-red-400"
                  stroke="#ffffff"
                  strokeWidth={isMatch && isDomainFiltered ? "2" : "1.5"}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="cursor-pointer text-[10px] font-bold fill-gray-700 dark:fill-gray-300"
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  {d.axis}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic vertex context readout */}
      <div className="mt-2 min-h-[52px] rounded-xl border border-gray-300/60 bg-gray-200/50 p-2.5 text-xs transition-all dark:border-gray-700/60 dark:bg-black/30">
        {activeIdx !== null ? (
          <div>
            <div className="flex items-center justify-between font-bold text-red-600 dark:text-red-400">
              <span>
                {data[activeIdx].axis}{" "}
                {data[activeIdx].tenureDisplay
                  ? `(${data[activeIdx].tenureDisplay} Practice)`
                  : `(${data[activeIdx].domain})`}
              </span>
              <span className="rounded-md bg-red-500/15 px-1.5 py-0.5 text-[10px] font-black text-red-600 dark:text-red-400">
                {data[activeIdx].tenureDisplay ?? `${data[activeIdx].score}/100`}
              </span>
            </div>
            <div className="mt-0.5 text-[11px] text-gray-600 dark:text-gray-300">
              {data[activeIdx].benchmark}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-gray-500 dark:text-gray-400">
            Hover over any axis vertex to view lifetime experience depth and verified impact benchmarks.
          </div>
        )}
      </div>
    </div>
  );
}
