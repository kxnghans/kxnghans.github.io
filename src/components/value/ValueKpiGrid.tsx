import {
  FaDollarSign,
  FaBolt,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import { lifetimeValueData } from "../../data/lifetimeValue";

export interface ValueKpiGridProps {
  totalSavings?: string;
  totalHours?: string;
  maxAcceleration?: string;
  enterpriseScale?: string;
  isFiltered?: boolean;
}

export default function ValueKpiGrid({
  totalSavings,
  totalHours,
  maxAcceleration,
  enterpriseScale,
  isFiltered = false,
}: ValueKpiGridProps = {}) {
  const { executiveSummary } = lifetimeValueData;

  const kpis = [
    {
      label: "Total Cost Savings & Avoidance",
      value: totalSavings ?? executiveSummary.totalFinancialROI,
      subtext:
        "Boeing retread avoidance, innovation engine validation & 450-site automation",
      icon: (
        <FaDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
      ),
      tag: isFiltered ? "Filtered Savings" : "Lifetime Savings",
      color: "border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Operational Time Reclaimed",
      value: totalHours ?? executiveSummary.totalHoursSaved,
      subtext:
        "Enterprise customer workflows + nightly ETL & supply reconciliation automation",
      icon: <FaClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      tag: isFiltered ? "Filtered Hours / Yr" : "Time Saved",
      color: "border-blue-500/20 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Peak Cycle-Time Speedup",
      value: maxAcceleration ?? executiveSummary.maxAcceleration,
      subtext:
        "OAR nightly reconciliation 3 hrs → 5 min; plus 10x SNO CI/CD builds (GTB)",
      icon: <FaBolt className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      tag: "36x Faster",
      color: "border-amber-500/20 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Enterprise Operational Scale",
      value: enterpriseScale ?? executiveSummary.enterpriseScale,
      subtext:
        "Branches modernized with $662k/yr savings & 0.0% audit error rate",
      icon: (
        <FaBuilding className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      ),
      tag: "450 Sites",
      color: "border-purple-500/20 text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card group flex flex-col justify-between rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200/80 shadow-inner dark:bg-black/40">
              {kpi.icon}
            </div>
            <span
              className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${kpi.color} bg-gray-100 dark:bg-black/30`}
            >
              {kpi.tag}
            </span>
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-red-600 dark:text-gray-100 dark:group-hover:text-red-400">
              {kpi.value}
            </div>
            <div className="mt-0.5 text-xs font-bold text-gray-700 dark:text-gray-300">
              {kpi.label}
            </div>
            <div className="mt-1 text-[11px] leading-tight text-gray-500 dark:text-gray-400">
              {kpi.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
