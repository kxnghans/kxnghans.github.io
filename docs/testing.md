# Testing & Verification (testing.md)

## Testing Strategy

Hanson-Tube uses a dual-verification strategy focusing on unit resilience and UI integrity.

### Tooling

*   **Test Runner**: Vitest (Vite-native test runner).
*   **DOM Verification**: React Testing Library (RTL).
*   **Environment**: JSDOM.
*   **Linting**: ESLint with `react-hooks` and `jsx-a11y` plugins.

---

## Test Organization

All tests should reside in the `src/test/` directory, following the component structure.

```text
src/test/
├── components/
│   ├── ui/
│   │   └── ProfileSummaryCard.test.jsx
│   └── layout/
│       └── Header.test.jsx
└── utils/
    └── searchHelpers.test.js
```

---

## Verification Mandates

1.  **Component Rendering**: Verify that components render correctly with various data inputs (e.g., empty project lists).
2.  **User Interaction**: Test critical loops:
    *   Sidebar toggle functionality.
    *   Search query input and context update.
    *   Theme toggle class application.
3.  **Data Integrity**: Ensure `src/data/` objects are correctly typed (informally via usage) and rendered.
4.  **Responsive Breakpoints**: Test that UI elements hide/show correctly at the `1024px` breakpoint.

---

## CI/CD Integration

*   **Pre-commit**: It is recommended to run `npm run lint` and `npm run test` before committing changes.
*   **Deployment**: The `npm run build` step implicitly verifies the integrity of the JSX and dependency graph before the `gh-pages` deployment.
