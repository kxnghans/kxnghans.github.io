/**
 * @file ValueTimelineAreaChart.tsx
 * @description Interactive dual-series area and line chart depicting cumulative cost savings ($M)
 * and reclaimed operational hours across career milestones.
 */

import { useState, useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { UI_SURFACES } from "../../../theme";
import type { TimelinePoint } from "../../../types/data";
import { smoothPath } from "./chartUtils";
import TimelineHeader from "./TimelineHeader";
import TimelineDetailBox from "./TimelineDetailBox";

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
    !!selectedEras && !selectedEras.includes("All") && selectedEras.length > 0;
  const isDimmed = (era?: string) =>
    erasActive && (!era || !selectedEras!.includes(era));

  const activeItem = activeIdx !== null ? data[activeIdx] : undefined;

  // Memoize geometry scales and spline interpolation paths across timeline points
  const chartGeometry = useMemo(() => {
    if (data.length === 0) return null;

    const minX = Math.min(...data.map((d) => d.year));
    const maxX = Math.max(...data.map((d) => d.year));
    const maxRoi = Math.max(...data.map((d) => d.cumulativeROI)) * 1.12 || 1;
    const maxHrs = Math.max(...data.map((d) => d.cumulativeHours)) * 1.12 || 1;

    const x = (yr: number) =>
      PAD_L + ((yr - minX) / (maxX - minX || 1)) * (W - PAD_L - PAD_R);
    const yRoi = (v: number) => H - PAD_B - (v / maxRoi) * (H - PAD_T - PAD_B);
    const yHrs = (v: number) => H - PAD_B - (v / maxHrs) * (H - PAD_T - PAD_B);

    const roiPts = data.map((d) => ({
      cx: x(d.year),
      cy: yRoi(d.cumulativeROI),
    }));
    const hrsPts = data.map((d) => ({
      cx: x(d.year),
      cy: yHrs(d.cumulativeHours),
    }));

    const roiCurve = smoothPath(roiPts);
    const areaPath = `${roiCurve} L${roiPts[roiPts.length - 1].cx},${
      H - PAD_B
    } L${roiPts[0].cx},${H - PAD_B} Z`;
    const hrsCurve = smoothPath(hrsPts);

    return { roiPts, hrsPts, roiCurve, areaPath, hrsCurve };
  }, [data]);

  if (data.length === 0 || !chartGeometry) {
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

  const { roiPts, hrsPts, roiCurve, areaPath, hrsCurve } = chartGeometry;

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
            <stop
              offset="100%"
              stopColor={colors.brandRed}
              stopOpacity="0.02"
            />
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
          d={hrsCurve}
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
          className="fill-red-600 text-[10px] font-bold dark:fill-red-500"
        >
          $M
        </text>
        <text
          x={W - PAD_R + 10}
          y={PAD_T + 4}
          textAnchor="start"
          className="fill-blue-500 text-[10px] font-bold dark:fill-blue-400"
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
                opacity:
                  activeIdx === i
                    ? 1
                    : activeIdx !== null
                      ? 0.28
                      : isDimmed(d.era)
                        ? 0.25
                        : 1,
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
                className="stroke-white text-red-600 dark:text-red-500"
                style={{
                  transition:
                    "r 260ms cubic-bezier(0.4, 0, 0.2, 1), filter 260ms ease",
                  filter:
                    activeIdx === i
                      ? "drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))"
                      : "none",
                }}
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
              >
                <title>{`${d.displayHours} — ${d.milestone}`}</title>
              </circle>
              {/* Year & Period Labels */}
              <text
                x={roiPts[i].cx}
                y={H - PAD_B + 16}
                textAnchor="middle"
                className={`fill-current text-[9px] transition-all duration-200 select-none ${
                  activeIdx === i
                    ? "scale-105 font-black text-gray-900 dark:text-white"
                    : "font-bold text-gray-500 dark:text-gray-400"
                }`}
              >
                {d.year}
              </text>
              <text
                x={roiPts[i].cx}
                y={H - PAD_B + 28}
                textAnchor="middle"
                className="fill-current text-[8px] text-gray-400 select-none dark:text-gray-500"
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

      <TimelineDetailBox activeItem={activeItem} />
    </div>
  );
}
