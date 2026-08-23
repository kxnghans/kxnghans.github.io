# Visual & Interactive Philosophy (theme.md)

## Design Language: Dark Neumorphism ("Soft-UI")

Hanson-Tube employs a Neumorphic design system. This aesthetic relies on precise shadow orchestration and light sources to create depth, simulating physical objects extruded from or recessed into the background. It provides a tactile, premium feel suitable for a technical portfolio.

---

## Centralized Theme Management (`ThemeContext`)

Theme state is managed globally through React Context via [`src/context/ThemeContext.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/context/ThemeContext.tsx) and mounted at the root in [`src/main.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/main.tsx).

### Lifecycle & Resolution Precedence

1. **Local Storage**: Checks `localStorage.getItem("theme")` (`"dark"` or `"light"`).
2. **System Preference**: Falls back to `window.matchMedia("(prefers-color-scheme: dark)")`.
3. **Default**: Fallback default is `"dark"`.
4. **DOM Synchronization**: Directly synchronizes `document.documentElement.classList` (`dark` / `light`) and persists selection to `localStorage`.

### `useTheme()` Hook API

```typescript
const { theme, setTheme, toggleTheme, isDarkMode } = useTheme();
```

- `theme`: Current active theme string (`"dark"` | `"light"`).
- `setTheme(theme)`: Sets the theme explicitly.
- `toggleTheme()`: Alternates between `"dark"` and `"light"`.
- `isDarkMode`: Boolean helper indicating whether dark mode is active.

---

## Token Architecture (Tailwind CSS 4)

Design tokens are defined directly via Tailwind CSS 4's `@theme` directive and `@layer components` inside [`src/index.css`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/index.css), replacing legacy configuration files.

### 1. Elevated Surface (Outset)

- **Token / Class**: `bevel-light dark:neumorphic-outset-dark bg-gray-100 dark:bg-dark-card`
- **Rule**: Applied to primary structural surfaces elevated above the background canvas.
- **Shadow Vector**: `6px 6px 12px #1a1b1e` (dark ambient) / `-6px -6px 12px #2e2f34` (specular highlight). Responsive adjustment to `4px 4px 8px #1a1b1e` / `-4px -4px 8px #2e2f34` on mobile (`<= 768px`).
- **Usage**: Project Cards, Profile Cards, Navigation Buttons, Modal Containers.

### 2. Recessed Surface (Inset)

- **Token / Class**: `bevel-light-inset bevel-dark-inset bg-gray-200 dark:bg-[#141416]`
- **Rule**: Applied to interactive inputs or well surfaces accepting user focus/input.
- **Shadow Vector**:
  - **Light Mode (`bevel-light-inset`)**: `inset 2px 2px 4px rgba(0, 0, 0, 0.1)` / `inset -2px -2px 4px rgba(255, 255, 255, 0.7)` (responsive adjustment to `inset 1px 1px 3px` on mobile `<= 768px`).
  - **Dark Mode (`bevel-dark-inset`)**: `border: 1px solid rgba(255, 255, 255, 0.08)` with `inset 2.5px 2.5px 5px rgba(0, 0, 0, 0.8)` / `inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.06)` (responsive adjustment to `inset 1.5px 1.5px 3px` / `inset -1px -1px 2px` on mobile `<= 768px`).
- **Usage**: Search Bar, Voice Input Buttons, Form Fields (`input`, `textarea`).

### 3. Modal Floating Surface

- **Token / Class**: `modal-shadow` + `bg-gray-100 dark:bg-dark-card`
- **Rule**: Applied to overlay modal popups ([`ProjectModal.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ProjectModal.tsx), [`DetailModal.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/DetailModal.tsx)) composed via [`ModalShell.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ModalShell.tsx). Top and left specular highlights are replaced with a lighter ambient shadow to prevent harsh top-edge glare on elevated backdrops.
- **Shadow Vector**:
  - **Light Mode**: `-4px -4px 14px rgba(0, 0, 0, 0.08)` (subtle top-left ambient shadow) / `6px 6px 20px rgba(0, 0, 0, 0.18)` (bottom-right primary shadow).
  - **Dark Mode**: `-4px -4px 16px rgba(0, 0, 0, 0.40)` (subtle top-left ambient shadow) / `8px 8px 24px rgba(0, 0, 0, 0.75)` (bottom-right primary occlusion shadow).
  - **Mobile Responsive (`<= 768px`)**: `-2px -2px 8px` / `4px 4px 14px` (Light) and `-2px -2px 10px` / `5px 5px 18px` (Dark).
- **Subcomponent Tokens**:
  - **CAR Callouts** ([`ModalCARSection.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ModalCARSection.tsx)): `border-l-4` accents (Amber for Challenge, Blue for Action, Emerald for Outcome) with `bg-gray-200/60 dark:bg-white/[0.03]`.
  - **Exposure & Tag Badges**: `rounded-md border border-gray-300/80 bg-gray-200/80 dark:border-white/10 dark:bg-white/[0.06] text-xs font-medium`.
  - **Highlights Grid** ([`ModalHighlightsGrid.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ModalHighlightsGrid.tsx)): `grid-cols-1 sm:grid-cols-2` metadata cards with `border-gray-300/70 bg-gray-200/50 dark:border-white/5 dark:bg-white/[0.03]`.
  - **Action CTAs**: `bevel-button-light dark:bevel-button-dark active:scale-95` tactile feedback buttons.
- **Usage**: [`ModalShell.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ModalShell.tsx), [`ProjectModal.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ProjectModal.tsx), [`DetailModal.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/DetailModal.tsx).


### 4. Active / Interactive Highlight

- **Token / Class**: Transition to `text-brand-red` (`#DC2626`) or `text-blue-500`.
- **Rule**: Reserved exclusively for active navigation states, primary call-to-actions, and YouTube-inspired branding accents.

### 5. Skeleton Loading & Shimmer Tokens

- **Tokens / Classes**: `animate-gentle-pulse bg-gray-200/80 dark:bg-white/[0.04]` (image / surface placeholders) & `dark:bg-white/[0.06]` (text lines).
- **Rule**: Eliminates harsh, clashing solid gray colors and strobe pulsing in dark mode. Outer layout containers remain steadily grounded while inner placeholder elements pulse gently between `opacity: 1` and `opacity: 0.75`.
- **Route Enter Transition**: `.animate-page-enter` (`opacity: 0` to `1` over `250ms ease-out`) ensures smooth, seamless crossfades when switching routes or resolving dynamic code-split components.

### Color Palette Constraints (Dark Mode)

| Token / Variable            | Hex Value | Semantic Usage                         |
| :-------------------------- | :-------- | :------------------------------------- |
| `--color-dark-bg`           | `#1E1F22` | Global background canvas.              |
| `--color-dark-card`         | `#242529` | Base surface for component cards.      |
| `--color-dark-shadow-light` | `#2E2F34` | Specular top-left illumination shadow. |
| `--color-dark-shadow-dark`  | `#1A1B1E` | Ambient bottom-right occlusion shadow. |
| `text-primary`              | `#E5E7EB` | High-contrast body text and headers.   |
| `text-secondary`            | `#9CA3AF` | Subtitles, placeholders, and captions. |

---

## Interactive Physics & Motion

The system's kinetic behavior is defined by strict motion curves to emulate physical compression and release.

- **Motion Curves**: All transitions utilize `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind `ease-in-out`).
- **Duration Tiers**:
  - `150ms` (Fast): Micro-interactions (hover states, icon highlights).
  - `250ms` (Fast-Medium): Route and view transitions (`.animate-page-enter`).
  - `300ms` (Medium): Component entry/exit (modals fading in via `.animate-fade-in`, image loaded crossfade).
  - `500ms` (Slow): Structural navigation orchestration (sidebar toggle).
- **Tactile Feedback Mandate**:
  All interactive outset elements (buttons, cards) include `active:scale-95` or `active:scale-[0.98]` to provide immediate visual feedback upon user click.
