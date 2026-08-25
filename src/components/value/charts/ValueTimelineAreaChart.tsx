import { useState } from "react";
import type { TimelinePoint } from "../../../types/data";

export interface ValueTimelineAreaChartProps {
  data: TimelinePoint[];
  selectedEras?: string[];
}

const W = 520;
const H = 280;
const PAD_L = 46;
const PAD_R = 56;
const PAD_T = 26;
const PAD_B = 46;

export default function ValueTimelineAreaChart({
  data,
  selectedEras,
}: ValueTimelineAreaChartProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const erasActive =
    !!selectedEras &&
    !selectedEras.includes("All") &&
    selectedEras.length > 0;
  const isDimmed = (era?: string) =>
    erasActive && (!era || !selectedEras!.includes(era));

  const activeItem = activeIdx !== null ? data[activeIdx] : undefined;

  if (data.length === 0) {
    return (
      <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex flex-col justify-between rounded-2xl p-5 transition-all duration-300">
        <TimelineHeader count={0} />
        <div className="flex h-48 flex-col items-center justify-center text-center text-xs text-gray-500 dark:text-gray-400">
          <span>No trajectory data matches the active filter criteria.</span>
          <span className="mt-1 text-[11px] text-gray-400">
            Adjust the domain, category, or era slicers above.
          </span>
        </div>
      </div>
    );
  }

  const minX = Math.min(...data.map((d) => d.year));
  const maxX = Math.max(...data.map((d) => d.year));
  const maxRoi = Math.max(...data.map((d) => d.cumulativeROI)) * 1.12 || 1;
  const maxHrs = Math.max(...data.map((d) => d.cumulativeHours)) * 1.12 || 1;

  const x = (yr: number) =>
    PAD_L + ((yr - minX) / (maxX - minX || 1)) * (W - PAD_L - PAD_R);
  const yRoi = (v: number) =>
    H - PAD_B - (v / maxRoi) * (H - PAD_T - PAD_B);
  const yHrs = (v: number) =>
    H - PAD_B - (v / maxHrs) * (H - PAD_T - PAD_B);

  const roiPts = data.map((d) => ({ cx: x(d.year), cy: yRoi(d.cumulativeROI) }));
  const hrsPts = data.map((d) => ({
    cx: x(d.year),
    cy: yHrs(d.cumulativeHours),
  }));

  // Catmull-Rom → cubic Bézier smoothing for gentle arcs between points
  const smoothPath = (pts: { cx: number; cy: number }[]) => {
    if (pts.length < 2)
      return pts.map((p) => `M${p.cx},${p.cy}`).join(" ");
    let d = `M${pts[0].cx.toFixed(2)},${pts[0].cy.toFixed(2)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1x = (p1.cx + (p2.cx - p0.cx) / 6).toFixed(2);
      const c1y = (p1.cy + (p2.cy - p0.cy) / 6).toFixed(2);
      const c2x = (p2.cx - (p3.cx - p1.cx) / 6).toFixed(2);
      const c2y = (p2.cy - (p3.cy - p1.cy) / 6).toFixed(2);
      d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.cx.toFixed(2)},${p2.cy.toFixed(2)}`;
    }
    return d;
  };

  const roiCurve = smoothPath(roiPts);
  const areaPath = `${roiCurve} L${roiPts[roiPts.length - 1].cx},${
    H - PAD_B
  } L${roiPts[0].cx},${H - PAD_B} Z`;

  return (
    <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex flex-col justify-between rounded-2xl p-5 transition-all duration-300">
      <TimelineHeader count={data.length} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Cumulative savings and reclaimed hours over time"
      >
        <defs>
          <linearGradient id="roiAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const gy = H - PAD_B - f * (H - PAD_T - PAD_B);
          return (
            <line
              key={f}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={gy}
              y2={gy}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-300 dark:text-gray-700"
            />
          );
        })}
        {/* Baseline */}
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={H - PAD_B}
          y2={H - PAD_B}
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-400 dark:text-gray-600"
        />

        {/* Cumulative ROI area + line */}
        <path d={areaPath} fill="url(#roiAreaFill)" />
        <path
          d={roiCurve}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Cumulative hours line */}
        <path
          d={smoothPath(hrsPts)}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Axis unit labels */}
        <text
          x={PAD_L - 8}
          y={PAD_T + 4}
          textAnchor="end"
          className="fill-red-500 text-[10px] font-bold"
        >
          $M
        </text>
        <text
          x={W - PAD_R + 10}
          y={PAD_T + 4}
          textAnchor="start"
          className="fill-blue-500 text-[10px] font-bold"
        >
          hrs
        </text>

        {/* Interactive points */}
        {data.map((d, i) => (
          <g key={d.period}>
            <circle
              cx={roiPts[i].cx}
              cy={roiPts[i].cy}
              r={activeIdx === i ? 6 : 4.5}
              fill="#ef4444"
              stroke="#fff"
              strokeWidth="1.5"
              opacity={isDimmed(d.era) ? 0.25 : 1}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <title>{`${d.displayROI} — ${d.milestone}`}</title>
            </circle>
            <circle
              cx={hrsPts[i].cx}
              cy={hrsPts[i].cy}
              r={activeIdx === i ? 5 : 3.5}
              fill="#3b82f6"
              stroke="#fff"
              strokeWidth="1.5"
              opacity={isDimmed(d.era) ? 0.25 : 1}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <title>{`${d.displayHours} — ${d.milestone}`}</title>
            </circle>
            <text
              x={roiPts[i].cx}
              y={H - PAD_B + 16}
              textAnchor="middle"
              className="fill-current text-[9px] font-bold text-gray-500 dark:text-gray-400"
            >
              {d.year}
            </text>
            <text
              x={roiPts[i].cx}
              y={H - PAD_B + 28}
              textAnchor="middle"
              className="fill-current text-[8px] text-gray-400 dark:text-gray-500"
            >
              {d.period}
            </text>
          </g>
        ))}
      </svg>

      {/* Interactive Detail Box */}
      <div className="mt-3 min-h-[56px] rounded-xl border border-gray-300/60 bg-gray-200/50 p-2.5 text-xs transition-all dark:border-gray-700/60 dark:bg-black/30">
        {activeItem ? (
          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800 dark:text-gray-200">
                {activeItem.period}
              </span>
              <span className="flex gap-3">
                <span className="font-black text-red-500 dark:text-red-400">
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
    </div>
  );
}

function TimelineHeader({ count }: { count: number }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          Improvement Trajectory
        </span>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Lifetime Improvements Over Time
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1 text-[10px] font-bold text-gray-500 sm:flex dark:text-gray-400">
          <span className="inline-block h-0.5 w-4 rounded bg-red-500" /> $ Saved
        </span>
        <span className="hidden items-center gap-1 text-[10px] font-bold text-gray-500 sm:flex dark:text-gray-400">
          <span className="inline-block h-0.5 w-4 rounded bg-blue-500" /> Hours
        </span>
        <span className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-600 dark:text-red-400">
          {count} Eras
        </span>
      </div>
    </div>
  );
}
