# Testing & Verification Strategy (testing.md)

## Resilience and Verification Plan

Hanson-Tube enforces a dual-verification strategy focusing on logical unit resilience, accessibility compliance, and UI integrity across desktop and mobile viewports.

---

## Core Tooling & Test Pipeline

- **Test Runner**: Vitest 3.x with native Vite integration for rapid ESM-native execution.
- **DOM Verification**: React Testing Library (RTL) paired with `@testing-library/jest-dom`.
- **Environment**: JSDOM.
- **Linting & Code Standards**: ESLint 9 Flat Config (`eslint.config.js`) enforcing `react-hooks` and `jsx-a11y` accessibility rules.
- **Formatting**: Prettier with `prettier-plugin-tailwindcss`.

### Execution Commands

| Workflow                   | Command          | Context                              |
| :------------------------- | :--------------- | :----------------------------------- |
| **Interactive Watch Mode** | `pnpm test`      | Local test development               |
| **Deterministic Run**      | `pnpm test:run`  | CI/CD and pre-push validation        |
| **TypeScript Type Check**  | `pnpm typecheck` | Strict compiler type verification    |
| **Code Linting**           | `pnpm lint`      | Zero-tolerance ESLint enforcement    |
| **Lint & Autofix**         | `pnpm lint:fix`  | Automated code formatting/linting    |
| **Production Build Check** | `pnpm build`     | Static bundle compilation validation |

---

## Environmental Constraints & Resilience

1. **Offline/Low-Bandwidth Resilience**:
   - All domain data is bundled statically into the application chunk. Once the bundle loads, navigation and global search function without active internet connectivity.
   - PWA Workbox service worker precaches application assets and caches WebP media at runtime.
   - Images in `public/assets/generated/` and `src/assets/` feature descriptive `alt` tags and fallback card backgrounds.

2. **Web Speech API Graceful Fallback**:
   - The `Header.tsx` component checks `window.SpeechRecognition || window.webkitSpeechRecognition`.
   - When unsupported (or denied), clicking the mic triggers a Sonner toast notifying the user and gracefully returns without throwing unhandled exceptions.

3. **EmailJS Contact Form Throttling**:
   - Form submission in `ContactPage.tsx` disables the submit button during submission (`isLoading`) and upon resolution to prevent duplicate dispatches.

---

## Active Test Suite Inventory

As of current milestone, the Vitest test suite verifies 13 test suites (46 unit/integration tests):

1. **`App.test.tsx`** (4 tests):
   - Root mounting and default view rendering.
   - Dark/Light mode theme class toggle on `document.documentElement`.
   - Sidebar responsive auto-close behavior on viewport resize.
   - Custom state routing view switching.

2. **`components/layout/Header.test.tsx`** (6 tests):
   - Search query input binding and submission.
   - Web Speech API fallback toast notification.
   - Mobile search toggle and sidebar toggle button triggers.

3. **`components/layout/Sidebar.test.tsx`** (4 tests):
   - Navigation links rendering and active route highlighting.
   - `onClose` callback invocation on route selection.

4. **`context/SearchContext.test.tsx`** (4 tests):
   - Context provider initialization.
   - In-memory data filtering across `searchableData`.
   - Modal state management (`openModal`, `closeModal`).

5. **`context/ThemeContext.test.tsx`** (6 tests):
   - Theme provider initialization with default and custom themes.
   - LocalStorage persistence and `document.documentElement` class synchronization.
   - `toggleTheme` and `setTheme` state transitions.

6. **`components/modals/ProjectModal.test.tsx`** (4 tests):
   - Portal mounting to `document.body` and detail rendering.
   - Dismissal via backdrop click, close button, and Escape key.
   - Body scroll locking during presentation.

7. **`components/modals/DetailModal.test.tsx`** (3 tests):
   - Portal mounting and structured content rendering.
   - Dismissal triggers and scroll restoration.

8. **`components/ui/LazyImage.test.tsx`** (4 tests):
   - Skeleton placeholder rendering while loading.
   - Smooth image load transition and onLoad callback.
   - Fallback image resolution on error.

9. **`components/ui/Slideshow.test.tsx`** (5 tests):
   - Carousel navigation, automatic interval stepping, and responsive card rendering.
   - Left/right arrow key navigation and pause on hover.

10. **`components/ui/FormField.test.tsx`** (1 test):
    - Input and textarea rendering with error messaging states.

11. **`components/ui/Section.test.tsx`** (1 test):
    - Dynamic timeline section header, period, and children rendering.

12. **`hooks/useFocusTrap.test.tsx`** (3 tests):
    - Focus trapping within modal dialogs.
    - Forward and backward Tab cycling.
    - Focus restoration to original trigger on unmount.

13. **`hooks/usePWA.test.tsx`** (1 test):
    - Service worker registration and offline/online network status tracking.
