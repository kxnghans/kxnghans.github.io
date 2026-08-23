import { describe, it, expect } from "vitest";
import {
  SearchEngine,
  escapeRegExp,
  normalizeText,
  tokenize,
  levenshteinDistance,
} from "./searchEngine";
import type { SearchableItem } from "../types/search";

describe("searchEngine utilities", () => {
  it("escapes regex special characters safely", () => {
    expect(escapeRegExp("React (Hooks) [UI] + Vite?")).toBe(
      "React \\(Hooks\\) \\[UI\\] \\+ Vite\\?",
    );
  });

  it("normalizes text by trimming, lowercasing, and stripping diacritics", () => {
    expect(normalizeText("  Café Résumé  ")).toBe("cafe resume");
    expect(normalizeText("")).toBe("");
  });

  it("tokenizes strings into normalized keyword sets with aliases and dot/hyphen variants", () => {
    const tokens = tokenize("Next.js & React-Native in TypeScript");
    expect(tokens).toContain("next.js");
    expect(tokens).toContain("nextjs");
    expect(tokens).toContain("react-native");
    expect(tokens).toContain("reactnative");
    expect(tokens).toContain("typescript");
    expect(tokens).toContain("ts");
  });

  it("calculates Levenshtein distance accurately", () => {
    expect(levenshteinDistance("react", "react")).toBe(0);
    expect(levenshteinDistance("typecript", "typescript")).toBe(1);
    expect(levenshteinDistance("python", "pyton")).toBe(1);
    expect(levenshteinDistance("completely", "different")).toBe(8);
    expect(levenshteinDistance("hi", "different")).toBe(99);
  });

});

describe("SearchEngine class", () => {
  const mockItems: SearchableItem[] = [
    {
      id: "project-0",
      title: "CaroHans Event Rentals (ERMS)",
      subtitle: "CaroHans – Event Rental Management System",
      tags: ["Next.js", "Supabase", "Cloudflare Pages", "PostgreSQL"],
      summary: "Venture: HansonCreations Studio. Platform: Next.js.",
      content: "Managing event rental equipment in Accra, Ghana with live stock checks and automated return tracking.",
      category: "Projects",
      location: { pageName: "Projects", componentType: "modal", itemId: 0 },
    },
    {
      id: "project-1",
      title: "MilCalc Mobile Suite",
      subtitle: "MilCalc – Military Pension & Fitness Mobile Suite",
      tags: ["React Native", "Expo", "SQLite", "MMKV"],
      summary: "Venture: HansonCreations Suite. Focus: DAFMAN 36-2905 & Military Pensions.",
      content: "Mobile suite for active-duty Air Force and Space Force personnel with offline fitness calculators.",
      category: "Projects",
      location: { pageName: "Projects", componentType: "modal", itemId: 1 },
    },
    {
      id: "skill-0",
      title: "Programming Languages & Frameworks",
      subtitle: "Frontend & Full-Stack Core",
      tags: ["TypeScript", "JavaScript", "React", "Next.js", "Python", "C++"],
      summary: "Production proficiency in modern web & mobile architectures.",
      content: "TypeScript, JavaScript, React, Next.js, Python, C++, Tailwind CSS, GraphQL.",
      category: "Skills",
      location: { pageName: "Skills", componentType: "slideshow", itemId: 0 },
    },
    {
      id: "education-0",
      title: "Masters in Data Science",
      subtitle: "University of California, Berkeley",
      tags: ["Machine Learning", "Data Mining", "Statistics"],
      summary: "UC Berkeley graduate degree specializing in statistical modeling and machine learning.",
      content: "Advanced Machine Learning, Scalable Data Systems, and Statistical Modeling.",
      category: "Education",
      location: { pageName: "Education", componentType: "none", itemId: "education-0" },
    },
  ];

  const engine = new SearchEngine(mockItems);

  it("returns empty array for empty or whitespace query", () => {
    expect(engine.search("")).toEqual([]);
    expect(engine.search("   ")).toEqual([]);
  });

  it("finds exact title matches with top relevance", () => {
    const results = engine.search("MilCalc Mobile Suite");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("project-1");
  });

  it("finds multi-word query across distinct fields (Title + Tag)", () => {
    const results = engine.search("MilCalc Expo");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("project-1");
  });

  it("resolves tech aliases (e.g. 'nextjs' finds 'Next.js')", () => {
    const results = engine.search("nextjs");
    expect(results.some((r) => r.id === "project-0")).toBe(true);
    expect(results.some((r) => r.id === "skill-0")).toBe(true);
  });

  it("tolerates typos in search queries (e.g. 'Typecript' finds TypeScript)", () => {
    const results = engine.search("Typecript");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("skill-0");
  });

  it("groups results by category order and ranks by relevance within each category", () => {
    // Both project-0 and skill-0 match "Next.js", but Projects come before Skills in navOrder
    const results = engine.search("Next.js");
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results[0].category).toBe("Projects");
    expect(results[1].category).toBe("Skills");
  });

  it("safely handles special regex characters in query", () => {
    expect(() => engine.search("C++")).not.toThrow();
    const results = engine.search("C++");
    expect(results.some((r) => r.id === "skill-0")).toBe(true);

    expect(() => engine.search("React (Hooks) [UI] + Vite?")).not.toThrow();
  });

  it("uses LRU cache for repeated queries", () => {
    const first = engine.search("Berkeley");
    const second = engine.search("Berkeley");
    expect(first).toBe(second);
  });
});

