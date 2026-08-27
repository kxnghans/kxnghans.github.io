/**
 * @file theme.ts
 * @description Central Single Source of Truth (SSOT) for design tokens & Tailwind class recipes.
 * Handles both runtime JS/SVG requirements (charts, dynamic alpha, shadows) and compile-time
 * Tailwind compound recipes (cards, typography, badges, modals, form inputs) with zero overhead.
 */

// ==========================================
// 1. RUNTIME JS TOKENS & CHART PALETTES
// ==========================================

// Single Source of Truth for Brand Red
export const BRAND_RED = {
  light: "#e53935",
  dark: "#ef4444",
} as const;

// Baseline RGBA conversion utility ensuring type-safe alpha blending
export const getAlphaColor = (hex: string, alpha: number): string => {
  if (!hex || hex === "transparent") return "transparent";

  const normalizedHex = hex.startsWith("#") ? hex.slice(1) : hex;
  let fullHex = normalizedHex;
  if (normalizedHex.length === 3) {
    fullHex = normalizedHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Global Chart Domain & Multiplier Color Palette (SSOT for data visualizers)
export const CHART_PALETTE = {
  ENTERPRISE_BLUE: "#3b82f6",
  DEFENSE_RED: BRAND_RED.dark,
  ACADEMIC_AMBER: "#f59e0b",
  MILITARY_PURPLE: "#8b5cf6",
  ECOSYSTEM_EMERALD: "#10b981",
  ANALYTICS_CYAN: "#06b6d4",
  MUTED_GRAY: "#6b7280",
} as const;

// Lean Runtime Design Tokens
export const tokens = {
  light: {
    colors: {
      brandRed: BRAND_RED.light,
      focusRing: "#3b82f6",
      well: "#e5e7eb",
    },
    shadows: {
      inset: "inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)",
      autofillTint: "inset 0 0 0 1000px rgba(59, 130, 246, 0.1)",
    },
  },
  dark: {
    colors: {
      brandRed: BRAND_RED.dark,
      focusRing: "#3b82f6",
      well: "#242529",
    },
    shadows: {
      inset: "inset 6px 6px 12px #1a1b1e, inset -6px -6px 12px #2e2f34",
      autofillTint: "inset 0 0 0 1000px rgba(59, 130, 246, 0.1)",
    },
  },
} as const;

export type ThemeColorKey = keyof typeof tokens.light.colors;
export type ThemeColors = Record<ThemeColorKey, string>;
export type ThemeTokens = typeof tokens.light | typeof tokens.dark;
export type ThemeMode = "light" | "dark";

// ==========================================
// 2. STATIC TAILWIND CLASS RECIPES
// ==========================================

// Surface & Container Recipes (cards, dialog shells, backdrops, sections)
export const UI_SURFACES = {
  section:
    "bevel-light dark:neumorphic-outset-dark dark:bg-dark-card mb-8 rounded-2xl bg-gray-100",
  cardInteractive:
    "bevel-light dark:neumorphic-outset-dark dark:bg-dark-card cursor-pointer overflow-hidden rounded-lg bg-gray-200 text-left transition-all duration-300 hover:-translate-y-2",
  slideshowCard:
    "bevel-light dark:neumorphic-outset-dark dark:bg-dark-card w-64 flex-shrink-0 transform cursor-pointer snap-start overflow-hidden rounded-lg bg-gray-200 text-left transition-transform duration-300 hover:-translate-y-1 sm:w-72 md:w-80",
  chartCard:
    "bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex flex-col justify-between rounded-2xl p-5 transition-all duration-300",
  cardStatic:
    "bevel-light dark:neumorphic-outset-dark dark:bg-dark-card overflow-hidden rounded-lg bg-gray-200 text-left",
  modalBackdrop:
    "animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm",
  modalShell:
    "modal-shadow dark:bg-dark-card relative flex max-h-[88vh] w-11/12 transform flex-col overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 focus:outline-none",
  modalFooter:
    "border-t border-gray-300 bg-gray-100/95 px-6 py-3.5 backdrop-blur-sm dark:border-gray-700 dark:bg-dark-card/95",
} as const;

// Typography Hierarchy Recipes
export const UI_TYPOGRAPHY = {
  cardTitle: "truncate text-xl font-bold text-gray-900 dark:text-gray-300",
  cardTitleSm: "truncate text-lg font-bold text-gray-900 dark:text-gray-300",
  cardSummary: "space-y-1 text-sm text-gray-600 dark:text-gray-400",
  modalTitle: "text-3xl font-bold text-red-600 dark:text-red-500",
  modalSubtitle: "text-lg text-gray-500 dark:text-gray-400",
  modalHeading: "text-xl font-semibold text-gray-900 dark:text-white",
  sectionDividerHeader:
    "border-b border-gray-300 pb-1 text-lg font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200",
  bodyText: "text-gray-600 dark:text-gray-300",
  bodyTextMuted: "text-gray-600 dark:text-gray-400",
  metaLabel: "font-semibold text-gray-800 dark:text-gray-200",
  errorText: "mt-1 text-xs text-red-600 dark:text-red-500",
} as const;

// Badges & Tag Recipes
export const UI_BADGES = {
  redPill:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-600 dark:bg-red-500/25 dark:text-red-400 border border-red-500/20",
  neutralPill:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700",
} as const;

// Interactive Buttons & Controls
export const UI_BUTTONS = {
  primary:
    "px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer",
  secondary:
    "bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex w-full transform items-center justify-center rounded-lg bg-gray-100 px-4 py-3 font-bold text-gray-800 transition-all duration-200 hover:opacity-80 active:scale-95 disabled:cursor-not-allowed dark:text-gray-300",
  close:
    "text-3xl text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white cursor-pointer",
} as const;

// Form & Search Input Recipes
export const UI_INPUTS = {
  field:
    "detect-autofill w-full rounded-lg p-3 text-gray-800 transition-shadow outline-none placeholder:text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-400",
} as const;
