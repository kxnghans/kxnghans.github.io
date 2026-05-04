# Visual & Interactive Philosophy (theme.md)

## Design Language: Dark Neumorphism ("Soft-UI")

Hanson-Tube employs a Neumorphic design system. This aesthetic relies on precise shadow orchestration and light sources to create depth, simulating physical objects extruded from or recessed into the background. It provides a highly tactile, premium feel suitable for a technical portfolio.

---

## Token Marriage Rules

To ensure 100% visual consistency, accessibility, and the elimination of "magic numbers," components must strictly adhere to the following token pairings defined in `index.css` and `tailwind.config.js`:

1.  **Elevated Surface (Outset)**:
    *   *Tokens*: `bg-dark-card` + `neumorphic-outset-dark`.
    *   *Rule*: Use for primary structural elements that float above the background.
    *   *Usage*: Project Cards, Profile Cards, Main Navigation Buttons, Modal Containers.
2.  **Recessed Surface (Inset)**:
    *   *Tokens*: `bg-dark-card` + `neumorphic-inset-dark`.
    *   *Rule*: Use for elements designed to accept user input or act as "wells".
    *   *Usage*: Search Bar, Voice Input Buttons, Form Fields (`input`, `textarea`).
3.  **Active/Interactive Highlight**:
    *   *Tokens*: Transition to `text-brand-red` (`#DC2626`) or `text-blue-500`.
    *   *Rule*: Reserved exclusively for indicating primary actions, active navigation states, or the "Play" branding.

### Color Palette Constraints (Dark Mode)
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `dark-bg` | `#1E1F22` | Global background canvas. |
| `dark-card` | `#242529` | Base color for all component surfaces. |
| `dark-shadow-light` | `#2E2F34` | Top-left "light" specular shadow. |
| `dark-shadow-dark` | `#1A1B1E` | Bottom-right "dark" ambient shadow. |
| `text-primary` | `#E5E7EB` | High-contrast body text and headers. |
| `text-secondary` | `#9CA3AF` | Subtitles, placeholders, and captions. |

---

## Interactive Physics

The system's kinetic behavior is defined by strict motion curves to emulate physical compression and release.

*   **Motion Curves**: All transitions must utilize `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind's default `ease-in-out`).
*   **Duration Tiers**:
    *   `150ms` (Fast): Micro-interactions (Hover states, button color changes).
    *   `300ms` (Medium): Component entry/exit (Modals fading in, Page transitions).
    *   `500ms` (Slow): Structural orchestration (Sidebar collapse/expand).
*   **Tactile Feedback Mandate**: 
    All interactive, outset elements (buttons, cards) MUST include an `active:scale-95` or `active:scale-[0.98]` utility. When a user clicks, the element visually compresses into the background, confirming the interaction before the logical event fires.
