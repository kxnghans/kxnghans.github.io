import { useState } from "react";
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

export default function ValuePage() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["All"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [selectedEras, setSelectedEras] = useState<string[]>(["All"]);

  const toggleFilter = (
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
  };

  const isFiltered =
    (!selectedDomains.includes("All") && selectedDomains.length > 0) ||
    (!selectedCategories.includes("All") && selectedCategories.length > 0) ||
    (!selectedEras.includes("All") && selectedEras.length > 0);

  const resetFilters = () => {
    setSelectedDomains(["All"]);
    setSelectedCategories(["All"]);
    setSelectedEras(["All"]);
  };

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

  // Filtered Velocity Multipliers
  const filteredMultipliers = lifetimeValueData.charts.multipliers.filter(
    (m) =>
      domainMatches(m.domain) && categoryMatches(m.category) && eraMatches(m.era),
  );

  // Filtered Radar
  const filteredRadar = lifetimeValueData.charts.radar.filter(
    (r) => domainMatches(r.domain) && categoryMatches(r.category),
  );

  // Dynamically aggregated savings when filtered
  const filteredSavingsTotal = (() => {
    if (!isFiltered) return lifetimeValueData.executiveSummary.totalFinancialROI;
    const sum = FINANCIAL_LEDGER.filter((l) =>
      selectedDomains.includes(l.domain),
    ).reduce((acc, curr) => acc + curr.amountM, 0);
    if (sum === 0) return "$0";
    if (sum >= 1) return `$${sum.toFixed(1)}M`;
    return `$${Math.round(sum * 1000)}k`;
  })();

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
          onToggleDomain={(d) =>
            toggleFilter(selectedDomains, d, VALUE_DOMAINS, setSelectedDomains)
          }
          selectedCategories={selectedCategories}
          onToggleCategory={(c) =>
            toggleFilter(
              selectedCategories,
              c,
              IMPACT_CATEGORIES,
              setSelectedCategories,
            )
          }
          selectedEras={selectedEras}
          onToggleEra={(e) =>
            toggleFilter(selectedEras, e, CAREER_ERAS, setSelectedEras)
          }
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
