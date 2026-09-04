# Visual & Interactive Philosophy (`theme.md`)

## Design Language: Dark Neumorphism ("Soft-UI")

Hanson-Tube employs a Dark Neumorphic design system. The aesthetic relies on precise shadow orchestration and dual light-source vectors to simulate physical components extruded from or recessed into the background canvas.

---

## Single Source of Truth Architecture

All tokens, styles, and themes originate from four authoritative layers:

| Layer                   | Source File                                                                       | Responsibilities                                                                                                                                                                                                                                                                                                                                            |
| :---------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Theme Engine**        | [`src/theme/theme.ts`](../src/theme/theme.ts)                                     | Brand red constants (`BRAND_RED`), chart palette (`CHART_PALETTE`), runtime tokens (`tokens`), dynamic alpha utility (`getAlphaColor`), and static Tailwind class recipes (`UI_SURFACES`, `UI_TYPOGRAPHY`, `UI_BADGES`, `UI_BUTTONS`, `UI_INPUTS`).                                                                                                         |
| **CSS Core & `@theme`** | [`src/index.css`](../src/index.css)                                               | Tailwind v4 `@theme` color variables (`--color-dark-well: #141416`, `--color-dark-well-hover: #1e1e22`, `--color-dark-header: #181818`, `--color-dark-bg: #1e1f22`, `--color-dark-card: #242529`), neumorphic shadow utilities (`bevel-light`, `bevel-light-inset`, `neumorphic-outset-dark`, `bevel-dark-inset`, `modal-shadow`), and keyframe animations. |
| **State & Provider**    | [`src/context/ThemeContext.tsx`](../src/context/ThemeContext.tsx)                 | Theme mode toggle (`dark` / `light`), `localStorage` persistence, OS `prefers-color-scheme` fallback, and `useTheme()` hook.                                                                                                                                                                                                                                |
| **Icon Registry**       | [`src/components/icons/iconRegistry.ts`](../src/components/icons/iconRegistry.ts) | Centralized SVG icon mapping (`ICONS`) and compound icon helpers in [`src/components/icons/Icons.tsx`](../src/components/icons/Icons.tsx).                                                                                                                                                                                                                  |

---

## Consumption Guide

### 1. Static Tailwind Class Recipes (Zero Overhead)

Import compound recipes directly from [`src/theme/index.ts`](../src/theme/index.ts) into JSX `className` props:

```tsx
import { UI_SURFACES, UI_TYPOGRAPHY, UI_BUTTONS } from "../theme";

<div className={UI_SURFACES.cardInteractive}>
  <h3 className={UI_TYPOGRAPHY.cardTitle}>Project Title</h3>
  <button className={UI_BUTTONS.primary}>Launch</button>
</div>;
```

### 2. Runtime Tokens & SVG Styling

For dynamic SVG gradients, chart fills/strokes, or stacked inline shadows, read from `useTheme()`:

```tsx
import { useTheme } from "../context/ThemeContext";

const { colors, tokens } = useTheme();
// colors.brandRed, colors.well, colors.focusRing
// tokens.shadows.inset, tokens.shadows.autofillTint
```

### 3. CSS Utilities & Elevation

- **Navigation Chrome**: `dark:bg-dark-header/90` (Header navbar) and `dark:bg-dark-header` (Sidebar) share unified `#181818` in dark mode and `bg-gray-100` in light mode.
- **Elevated (Outset)**: `bevel-light dark:neumorphic-outset-dark bg-gray-100 dark:bg-dark-card` (Cards, Panels, Skeletons).
- **Recessed Wells**:
  - _Search Bar_: `bevel-light-inset bevel-dark-inset bg-gray-200 dark:bg-dark-well` (`#141416`).
  - _Form Inputs_: `colors.well` (`#242529` in dark mode) paired with dual-vector inset shadows (`inset 6px 6px 12px #1a1b1e, inset -6px -6px 12px #2e2f34`).
- **Floating Overlays**: `modal-shadow bg-gray-100 dark:bg-dark-card` (Modal shells, Dropdowns).

---

## Interactive Physics & Motion

- **Curves**: All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` (`ease-in-out`).
- **Durations**: `150ms` (Micro-interactions) → `250ms` (Route transitions) → `300ms` (Modals/Images) → `500ms` (Layout shifts).
- **Tactile Feedback**: All interactive cards and buttons include `active:scale-95` or `active:scale-[0.98]`.
