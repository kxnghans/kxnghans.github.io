# Visual & Interactive Philosophy (theme.md)

## Design Language: Dark Neumorphism

Hanson-Tube employs a "Soft-UI" or Neumorphic design system. This aesthetic relies on shadows and light sources to create depth, simulating physical objects extruded from or recessed into the background.

### Color Palette (Dark Mode Primary)

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `dark-bg` | `#1E1F22` | Global background. |
| `dark-card` | `#242529` | Component surfaces. |
| `dark-shadow-light` | `#2E2F34` | Top-left "light" shadow. |
| `dark-shadow-dark` | `#1A1B1E` | Bottom-right "dark" shadow. |
| `brand-red` | `#DC2626` | Interaction highlights (Play Icon). |
| `text-primary` | `#E5E7EB` | High-contrast headers. |
| `text-secondary` | `#9CA3AF` | Body text and captions. |

---

## Token Marriage Rules

To ensure 100% visual consistency, use the following pairings:

1.  **Elevated Surface (Outset)**:
    *   `bg-dark-card` + `neumorphic-outset-dark`.
    *   *Usage*: Project Cards, Profile Cards, Navigation Buttons.
2.  **Recessed Surface (Inset)**:
    *   `bg-dark-card` + `neumorphic-inset-dark`.
    *   *Usage*: Search Bar, Voice Input, Form Fields.
3.  **Active/Hover Highlight**:
    *   Transition to `text-red-600` or `scale-105`.
    *   *Usage*: Icons, Links, Branding text.

---

## Interactive Physics

*   **Motion Curves**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for all transitions.
*   **Duration**:
    *   `150ms`: Fast feedback (Hover, Active).
    *   `300ms`: Component entry/exit (Modals, Page transitions).
    *   `500ms`: Orchestration (Sidebar collapse).
*   **Tactile Feedback**: Interactive elements must scale down (`scale-95`) on `active` state to simulate physical compression.
