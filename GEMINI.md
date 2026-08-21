# Hanson-Tube | AI Operating Instructions

This document codifies the core architecture, constraints, and interaction guidelines for the Hanson-Tube portfolio platform. As an AI agent working on this codebase, you must adhere strictly to these rules to maintain systemic integrity.

## 🛠 Preferred Tech Stack

- **Frontend**: React 19 (Hooks, Context API) and TypeScript 5.8+. NO Redux or Zustand; stick to the native Context API for global state.
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite`), integrated with custom `@theme` and Neumorphic tokens in `src/index.css`.
- **Build/Routing**: Vite 7 with `@vitejs/plugin-react-swc`. The app is an SPA using custom state-based routing (`activePage` in `App.tsx`) with `React.lazy` code splitting, NOT `react-router-dom`.
- **Package Manager**: pnpm (`packageManager: pnpm@11.9.0`).
- **Testing**: Vitest with React Testing Library (RTL) and JSDOM.
- **Form/Validation**: React Hook Form, Sonner for Toast notifications, EmailJS for contact dispatch.

---

## 🛑 Operational Constraints

- **Zero-Tolerance ESLint Policy**: All generated code must be free of linting errors (`pnpm run lint`). Do not disable rules (e.g., `// eslint-disable-next-line`) without explicit user permission.
- **Strict Dependency Management**: Do not introduce new dependencies (e.g., UI libraries like Material UI or Chakra) unless explicitly requested. Rely on the existing primitive components in `src/components/ui`.
- **Performance Targets**: Keep components lightweight. Favor `useMemo` and `useCallback` when filtering or sorting data (e.g., search results) to prevent unnecessary re-renders.
- **Data Immutability**: The `src/data/` layer is the Single Source of Truth (SSOT). All UI components must read from these static files. DO NOT hardcode content directly into components.
- **Accessibility (a11y)**: Semantic HTML tags (`<nav>`, `<main>`, `<article>`) and `aria-labels` are mandatory for all interactive elements, especially custom inputs and buttons.

---

## 📋 Interaction Guidelines

- **Surgical Precision**: Only modify the files directly relevant to the current objective. Avoid unrelated refactoring.
- **Communication**: Be direct and concise. State your technical intent clearly. Provide progress updates during multi-step tasks.
- **Documentation Maintenance**: When adding a new feature, you must also update the relevant markdown files in `/docs` to reflect the new architecture or state transition.
- **Component Architecture**: Always split logic from UI. If a component exceeds 150 lines, refactor it by extracting smaller primitive components or custom hooks.
