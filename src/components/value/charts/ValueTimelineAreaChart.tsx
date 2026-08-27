import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { UI_SURFACES } from "../../../theme";
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
  const { colors } = useTheme();
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
      <div className={UI_SURFACES.chartCard}>
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

      const cp1x = p1.cx + (p2.cx - p0.cx) / 6;
      const cp1y = p1.cy + (p2.cy - p0.cy) / 6;
      const cp2x = p2.cx - (p3.cx - p1.cx) / 6;
      const cp2y = p2.cy - (p3.cy - p1.cy) / 6;

      d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.cx.toFixed(2)},${p2.cy.toFixed(2)}`;
    }
    return d;
  };

  const roiCurve = smoothPath(roiPts);
  const areaPath = `${roiCurve} L${roiPts[roiPts.length - 1].cx},${
    H - PAD_B
  } L${roiPts[0].cx},${H - PAD_B} Z`;

  return (
    <div className={UI_SURFACES.chartCard}>
      <TimelineHeader count={data.length} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Cumulative savings and reclaimed hours over time"
      >
        <defs>
          <linearGradient id="roiAreaFillDynamic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.brandRed} stopOpacity="0.30" />
            <stop offset="100%" stopColor={colors.brandRed} stopOpacity="0.02" />
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
        <path d={areaPath} className="fill-[url(#roiAreaFillDynamic)]" />
        <path
          d={roiCurve}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="text-red-600 dark:text-red-500"
        />

        {/* Cumulative hours line */}
        <path
          d={smoothPath(hrsPts)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="text-blue-500 dark:text-blue-400"
        />

        {/* Axis unit labels */}
        <text
          x={PAD_L - 8}
          y={PAD_T + 4}
          textAnchor="end"
          className="fill-red-600 dark:fill-red-500 text-[10px] font-bold"
        >
          $M
        </text>
        <text
          x={W - PAD_R + 10}
          y={PAD_T + 4}
          textAnchor="start"
          className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold"
        >
          hrs
        </text>

        {/* Interactive points */}
        {data.map((d, i) => {
          const colWidth = (W - PAD_L - PAD_R) / (data.length - 1 || 1);
          const colX = roiPts[i].cx - colWidth / 2;

            return (
              <g
                key={d.period}
                className="cursor-pointer"
                style={{
                  opacity: activeIdx === i ? 1 : activeIdx !== null ? 0.28 : isDimmed(d.era) ? 0.25 : 1,
                  transition: "opacity 260ms ease",
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Visual ROI Point */}
                <circle
                  cx={roiPts[i].cx}
                  cy={roiPts[i].cy}
                  r={activeIdx === i ? 7 : 4.5}
                  fill="currentColor"
                  strokeWidth="1.5"
                  className="text-red-600 stroke-white dark:text-red-500"
                  style={{
                    transition: "r 260ms cubic-bezier(0.4, 0, 0.2, 1), filter 260ms ease",
                    filter: activeIdx === i ? "drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))" : "none",
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  <title>{`${d.displayROI} — ${d.milestone}`}</title>
                </circle>
                {/* Visual Hours Point */}
                <circle
                  cx={hrsPts[i].cx}
                  cy={hrsPts[i].cy}
                  r={activeIdx === i ? 6 : 3.5}
                  strokeWidth="1.5"
                  className="fill-blue-500 stroke-white"
                  style={{
                    transition: "r 260ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  <title>{`${d.displayHours} — ${d.milestone}`}</title>
                </circle>
                {/* Year & Period Labels */}
                <text
                  x={roiPts[i].cx}
                  y={H - PAD_B + 16}
                  textAnchor="middle"
                  className={`fill-current text-[9px] select-none transition-all duration-200 ${
                    activeIdx === i
                      ? "font-black text-gray-900 dark:text-white scale-105"
                      : "font-bold text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {d.year}
                </text>
              <text
                x={roiPts[i].cx}
                y={H - PAD_B + 28}
                textAnchor="middle"
                className="fill-current text-[8px] text-gray-400 dark:text-gray-500 select-none"
              >
                {d.period}
              </text>
              {/* Stable Full-Height Vertical Hit Strip */}
              <rect
                x={colX}
                y={PAD_T}
                width={colWidth}
                height={H - PAD_T}
                fill="transparent"
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Detail Box */}
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
          <span className="inline-block h-0.5 w-4 rounded bg-red-600 dark:bg-red-500" /> $ Saved
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
}
