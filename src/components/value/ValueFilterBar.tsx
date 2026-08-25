import { FaSyncAlt } from "react-icons/fa";
import FilterDropdown from "../ui/FilterDropdown";
import {
  VALUE_DOMAINS,
  IMPACT_CATEGORIES,
  CAREER_ERAS,
} from "../../data/lifetimeValue";

export interface ValueFilterBarProps {
  selectedDomains: string[];
  onToggleDomain: (domain: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedEras: string[];
  onToggleEra: (era: string) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
  activeCount?: number;
}

export default function ValueFilterBar({
  selectedDomains,
  onToggleDomain,
  selectedCategories,
  onToggleCategory,
  selectedEras,
  onToggleEra,
  onResetFilters,
  isFiltered,
}: ValueFilterBarProps) {
  return (
    <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card relative mb-8 overflow-visible rounded-2xl p-4 sm:p-5 transition-all duration-300">
      <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-2xl bg-red-600 dark:bg-red-500" />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
        {/* Domain Filter */}
        <FilterDropdown
          label="Domain Sector"
          options={VALUE_DOMAINS}
          selected={selectedDomains}
          onToggle={onToggleDomain}
        />

        {/* Impact Dimension Filter */}
        <FilterDropdown
          label="Impact Dimension"
          options={IMPACT_CATEGORIES}
          selected={selectedCategories}
          onToggle={onToggleCategory}
        />

        {/* Career Era Filter */}
        <FilterDropdown
          label="Career Era"
          options={CAREER_ERAS}
          selected={selectedEras}
          onToggle={onToggleEra}
        />

        {/* Neumorphic Inset Vertical Divider (Desktop) */}
        <div className="hidden lg:block h-10 w-[3px] shrink-0 self-end rounded-full bg-gray-200 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.22),inset_-1px_-1px_2px_rgba(255,255,255,0.85)] dark:bg-[#1a1b1e] dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.95),inset_-1px_-1px_2px_rgba(255,255,255,0.08)]" />

        {/* Reset Button */}
        <div className="flex items-end lg:w-32 shrink-0">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!isFiltered}
            className={`bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] ${
              isFiltered
                ? "text-red-600 hover:brightness-105 dark:text-red-400"
                : "opacity-40 cursor-not-allowed text-gray-500"
            }`}
          >
            <FaSyncAlt
              className={`h-3 w-3 ${isFiltered ? "hover:rotate-180 transition-transform" : ""}`}
            />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
