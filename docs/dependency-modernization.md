# Dependency modernization - 2026-10-29

Pre-production baseline; prior user edits preserved. Verification results and open gates are recorded below. No deployments/commits/pushes.

| Manifest     | Package           | Previous declaration | New declaration |
| ------------ | ----------------- | -------------------- | --------------- |
| package.json | react             | ^19.0.0              | 19.3.1          |
| package.json | react-dom         | ^19.0.0              | 19.3.1          |
| package.json | @eslint/js        | ^10.0.1              | 9.39.5          |
| package.json | @types/react      | ^19.0.0              | ~19.3.0         |
| package.json | @types/react-dom  | ^19.0.0              | ~19.3.0         |
| package.json | eslint            | ^9.39.5              | 9.39.5          |
| package.json | typescript        | ^5.8.2               | 6.0.3           |
| package.json | typescript-eslint | ^8.67.0              | 8.73.0          |
| package.json | vite              | ^7.1.2               | 8.3.8           |
| package.json | vite-plugin-pwa   | ^1.3.0               | 2.0.0           |
| package.json | vitest            | ^3.2.4               | 5.1.1           |

## Verification and open gates

- Type checks, lint, all 35 files / 157 tests and the final Vite production build pass. Peer check passes and `pnpm audit --prod` reports 0 vulnerabilities. Production PWA generation includes the service worker and precache output.
- React 19.3.1, Vite 8.3.8, Vitest 5.1.1, Tailwind CSS 4.3.5, and PWA plugin 2.0 replace the earlier React 19 / Vite 7 / Vitest 3 / PWA 1 baseline. Testing Library's Vitest matcher entry point and constructible mocks match current tooling.
- React hook cleanup removes effect-driven derived state, render-time component creation and captured chart mutation. Lazy image state resets by image key, and the selected project is derived from the active filter context.
- Additional branch polish: fixed Value page Era/Category filter KPI total (`ValuePage.tsx`), routed Skills search clicks to `Home` for accurate sidebar active state (`searchableData.ts`), added grounded agentic development and Microsoft Teams AI training highlights (`work.ts`, `lifetimeValue.ts`), sanitized remaining `"branch"` terminology, and aligned `predeploy` to `pnpm`.
- Vitest uses a small PWA module mock and skips the PWA build plugin in test mode; production remains enabled. Browser install/update/offline lifecycle, microphone permission behavior and visual acceptance remain open.

ESLint 9 remains EOL; current React/native/a11y plugin peers prevent an uncomplicated move to 10. No forced peer overrides were added.

## Local repository repair

The corrupt non-monotonic Git pack index was rebuilt from the existing pack (hash `6a987f00442f7e3494c87576e6aaf0e616772d88`). The old index is preserved as `.idx.before-modernization`; connectivity checking now passes, with only dangling objects reported. No commits or source history were removed.

Local development uses Node 26.13.0 and pnpm 11.28.9. Installs use an isolated pnpm store with copied files; the shared corrupt cache was not modified.
