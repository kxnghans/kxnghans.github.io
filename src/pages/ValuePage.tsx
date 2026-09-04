import { useState, useMemo, useCallback } from "react";
import type { ReactElement } from "react";
import Section from "../components/ui/Section";
import ValueKpiGrid from "../components/value/ValueKpiGrid";
import ValueFilterBar from "../components/value/ValueFilterBar";
import ValueRadarChart from "../components/value/charts/ValueRadarChart";
import ValueMultiplierBarChart from "../components/value/charts/ValueMultiplierBarChart";
import ValueTimelineAreaChart from "../components/value/charts/ValueTimelineAreaChart";
import ValueDomainDonutChart from "../components/value/charts/ValueDomainDonutChart";
import {
  lifetimeValueData,
  FINANCIAL_LEDGER,
  VALUE_DOMAINS,
  IMPACT_CATEGORIES,
  CAREER_ERAS,
} from "../data/lifetimeValue";

export default function ValuePage(): ReactElement {
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["All"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [selectedEras, setSelectedEras] = useState<string[]>(["All"]);

  // Multi-select toggle handler supporting "All" reset and individual selection
  const toggleFilter = useCallback(
    (
      current: string[],
      item: string,
      allOptions: string[],
      setter: (val: string[]) => void,
    ) => {
      if (item === "All") {
        setter(["All"]);
        return;
      }
      const clean = current.filter((x) => x !== "All");
      if (clean.includes(item)) {
        const next = clean.filter((x) => x !== item);
        setter(next.length === 0 ? ["All"] : next);
      } else {
        const next = [...clean, item];
        setter(next.length === allOptions.length ? ["All"] : next);
      }
    },
    [],
  );

  const isFiltered =
    (!selectedDomains.includes("All") && selectedDomains.length > 0) ||
    (!selectedCategories.includes("All") && selectedCategories.length > 0) ||
    (!selectedEras.includes("All") && selectedEras.length > 0);

  const resetFilters = useCallback(() => {
    setSelectedDomains(["All"]);
    setSelectedCategories(["All"]);
    setSelectedEras(["All"]);
  }, []);

  // Memoized velocity multipliers matching current domain, category, and era slicers
  const filteredMultipliers = useMemo(() => {
    const domainMatches = (domain: string) =>
      selectedDomains.includes("All") ||
      selectedDomains.length === 0 ||
      selectedDomains.includes(domain);

    const categoryMatches = (category?: string) =>
      selectedCategories.includes("All") ||
      selectedCategories.length === 0 ||
      (category && selectedCategories.includes(category));

    const eraMatches = (era?: string) =>
      selectedEras.includes("All") ||
      selectedEras.length === 0 ||
      (era && selectedEras.includes(era));

    return lifetimeValueData.charts.multipliers.filter(
      (m) =>
        domainMatches(m.domain) &&
        categoryMatches(m.category) &&
        eraMatches(m.era),
    );
  }, [selectedDomains, selectedCategories, selectedEras]);

  // Memoized radar chart dimensions matching active domain and impact category filters
  const filteredRadar = useMemo(() => {
    const domainMatches = (domain: string) =>
      selectedDomains.includes("All") ||
      selectedDomains.length === 0 ||
      selectedDomains.includes(domain);

    const categoryMatches = (category?: string) =>
      selectedCategories.includes("All") ||
      selectedCategories.length === 0 ||
      (category && selectedCategories.includes(category));

    return lifetimeValueData.charts.radar.filter(
      (r) => domainMatches(r.domain) && categoryMatches(r.category),
    );
  }, [selectedDomains, selectedCategories]);

  // Dynamically aggregated ROI and ledger totals when domain filters are active
  const filteredSavingsTotal = useMemo(() => {
    if (!isFiltered) {
      return lifetimeValueData.executiveSummary.totalFinancialROI;
    }
    const sum = FINANCIAL_LEDGER.filter((l) =>
      selectedDomains.includes(l.domain),
    ).reduce((acc, curr) => acc + curr.amountM, 0);
    if (sum === 0) return "$0";
    if (sum >= 1) return `$${sum.toFixed(1)}M`;
    return `$${Math.round(sum * 1000)}k`;
  }, [isFiltered, selectedDomains]);

  // Stable filter toggle callbacks for ValueFilterBar
  const handleToggleDomain = useCallback(
    (d: string) =>
      toggleFilter(selectedDomains, d, VALUE_DOMAINS, setSelectedDomains),
    [selectedDomains, toggleFilter],
  );

  const handleToggleCategory = useCallback(
    (c: string) =>
      toggleFilter(
        selectedCategories,
        c,
        IMPACT_CATEGORIES,
        setSelectedCategories,
      ),
    [selectedCategories, toggleFilter],
  );

  const handleToggleEra = useCallback(
    (e: string) => toggleFilter(selectedEras, e, CAREER_ERAS, setSelectedEras),
    [selectedEras, toggleFilter],
  );

  return (
    <>
      <title>Lifetime Value & Impact Dashboard | Hanson-Tube</title>
      <meta
        name="description"
        content="Lifetime savings, reclaimed operational hours, cycle-time improvements, and architectural leadership analytics."
      />
      <Section title="Executive Value & Impact Intelligence">
        {/* Top Interactive Slicers Bar */}
        <ValueFilterBar
          selectedDomains={selectedDomains}
          onToggleDomain={handleToggleDomain}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          selectedEras={selectedEras}
          onToggleEra={handleToggleEra}
          onResetFilters={resetFilters}
          isFiltered={isFiltered}
          activeCount={filteredMultipliers.length}
        />

        <ValueKpiGrid
          totalSavings={filteredSavingsTotal}
          isFiltered={isFiltered}
        />

        {/* Visual Analytics Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ValueRadarChart
            data={
              filteredRadar.length >= 3
                ? filteredRadar
                : lifetimeValueData.charts.radar
            }
            selectedDomains={selectedDomains}
          />
          <ValueMultiplierBarChart data={filteredMultipliers} />
          <ValueTimelineAreaChart
            data={lifetimeValueData.charts.timeline}
            selectedEras={selectedEras}
          />
          <ValueDomainDonutChart
            data={lifetimeValueData.charts.distribution}
            selectedDomains={selectedDomains}
          />
        </div>
      </Section>
    </>
  );
}
