# Linting & Code Quality Standards (`docs/lint.md`)

This document defines the automated linting policies, ESLint configuration, AST guardrails, and remediation procedures for the **Hanson-Tube** codebase.

---

## 1. ESLint Policy & Philosophy

- **Zero Tolerance Policy**: All code merged into any branch must pass `pnpm run lint` with `0` errors and `0` warnings.
- **No Manual Disables**: `// eslint-disable-next-line` is strictly prohibited unless approved with an architectural rationale.
- **Automated Verification**: Lint checks are executed during CI pipelines and local pre-commit workflows (`pnpm run verify`).

---

## 2. Active ESLint Configuration (`eslint.config.js`)

Our Flat Config integrates:
- `@eslint/js` recommended rules
- `typescript-eslint` (`@typescript-eslint/recommended`)
- `eslint-plugin-react` (`recommended` with `react-in-jsx-scope: off`)
- `eslint-plugin-react-hooks` (`recommended`)
- `eslint-plugin-jsx-a11y` (`recommended`)
- `eslint-config-prettier` (conflict resolution)

---

## 3. Strict AST Guardrails & Rules

### A. Centralized Iconography Enforcement (`no-restricted-imports`)
- **Rule**: Direct imports from `react-icons` or `react-icons/*` are blocked outside of [`src/components/icons/iconRegistry.ts`](../src/components/icons/iconRegistry.ts).
- **Remediation**: Import `{ Icon, ICONS }` from `src/components/icons`.
  ```tsx
  // ❌ Disallowed:
  import { FaBars } from "react-icons/fa";

  // ✅ Allowed:
  import { Icon, ICONS } from "../components/icons";
  <Icon name={ICONS.MENU} className="text-xl" />
  ```

### B. Centralized Color & Hex Code Prohibition (`no-restricted-syntax`)
- **Rule**: Hardcoded color literals (`#hex`, `rgb(...)`, `rgba(...)`, `hsl(...)`) and arbitrary hex classes in JSX (`bg-[#...]`, `text-[#...]`) are blocked outside of `src/theme/**`.
- **Remediation**: Use semantic Tailwind classes or dynamic `useTheme().colors` / `src/theme/theme.ts` tokens.
  ```tsx
  // ❌ Disallowed:
  <div style={{ color: "#db2926" }} />
  <div style={{ color: "rgba(59, 130, 246, 0.1)" }} />
  <div className="dark:bg-[#181818]" />

  // ✅ Allowed:
  const { colors, tokens } = useTheme();
  <div style={{ color: colors.brandRed }} />
  <div style={{ boxShadow: tokens.shadows.autofillTint }} />
  // or
  <div className="text-red-600 dark:text-red-500 dark:bg-dark-bg" />
  ```

### C. Type Safety Enforcement
- **Rule**: `@typescript-eslint/no-explicit-any` is set to `"error"`. Any is the enemy.
- **Unused Variables**: `@typescript-eslint/no-unused-vars` triggers an error on any unreferenced identifier (except those prefixed with `_`).

---

## 4. Whitelist Exemptions

The following files are exempt from `no-restricted-syntax` and `no-restricted-imports`:
- `src/theme/**` (Theme definitions and SSOT token mappings)
- `src/components/icons/iconRegistry.ts` (Icon registration and react-icons mapping)
- `**/*.test.ts`, `**/*.test.tsx` (Test mocks and snapshot assertions)
- `vite.config.ts`, `vitest.config.ts` (Build orchestration)

---

## 5. Verification Commands

```bash
# Run linting check across entire project
pnpm run lint

# Run type check
pnpm run typecheck

# Run full test suite
pnpm test:run
```
