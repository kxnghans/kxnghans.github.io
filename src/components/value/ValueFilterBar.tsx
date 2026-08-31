import { Icon, ICONS } from "../icons";
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
    <div className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card relative mb-8 overflow-visible rounded-2xl p-4 transition-all duration-300 sm:p-5">
      <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-2xl bg-red-600 dark:bg-red-500" />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
        {/* Domain Filter */}
        <FilterDropdown
          label="Domain Sector"
          options={VALUE_DOMAINS}
          selected={selectedDomains}
          onToggle={onToggleDomain}
        />

        {/* Business Impact Filter */}
        <FilterDropdown
          label="Business Impact"
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
        <div className="bevel-light-inset dark:bevel-dark-inset dark:bg-dark-bg hidden h-10 w-[3px] shrink-0 self-end rounded-full bg-gray-200 lg:block" />

        {/* Reset Button */}
        <div className="flex shrink-0 items-end lg:w-32">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!isFiltered}
            className={`bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold tracking-wider uppercase transition-all duration-200 active:scale-[0.98] ${
              isFiltered
                ? "text-red-600 hover:brightness-105 dark:text-red-400"
                : "cursor-not-allowed text-gray-500 opacity-40"
            }`}
          >
            <Icon
              name={ICONS.SYNC}
              className={`h-3 w-3 ${isFiltered ? "transition-transform hover:rotate-180" : ""}`}
            />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
