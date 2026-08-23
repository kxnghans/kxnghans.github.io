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
   - PWA Workbox service worker precaches application shell assets (~413 KiB) and caches WebP media at runtime using a `CacheFirst` strategy.
   - Images in `public/assets/generated/` and `src/assets/` feature descriptive `alt` tags and fallback card backgrounds.

2. **Web Speech API Graceful Fallback**:
   - The `Header.tsx` component checks `window.SpeechRecognition || window.webkitSpeechRecognition`.
   - When unsupported (or denied), clicking the mic triggers a Sonner toast notifying the user and gracefully returns without throwing unhandled exceptions.

3. **EmailJS Contact Form Throttling**:
   - Form submission in `ContactPage.tsx` disables the submit button during submission (`isLoading`) and upon resolution to prevent duplicate dispatches.

---

## Active Test Suite Inventory

The Vitest test suite verifies 15 test suites (69 unit and integration tests):

1. **`utils/searchEngine.test.ts`** (12 tests):
   - In-memory indexing and query caching.
   - Exact query, prefix, and substring matching.
   - Field-weighted score hierarchy (Title > Tags > Subtitle > Summary > Content).
   - Tech term alias expansion (`c++`/`cpp`, `next.js`/`nextjs`, `ai`/`machine learning`).
   - Multi-token scoring and full-match bonus calculation.
   - Typo-tolerant fuzzy matching via Levenshtein distance.
   - Navigation category ordering and relevance tie-breaking.

2. **`components/search/SearchResults.test.tsx`** (6 tests):
   - Multi-token term highlighting with YouTube red styling.
   - Safe regex character escaping (`C++`, `.NET`, brackets).
   - Contextual smart snippet truncation centered around matching tokens.
   - Category group headers and card item rendering.
   - Result item click selection and navigation dispatch.
   - Empty query and zero-result empty state rendering.

3. **`context/SearchContext.test.tsx`** (6 tests):
   - Context provider initialization with pre-indexed search engine.
   - Deferred query updates (`useDeferredValue`) without input blocking.
   - In-memory data filtering and relevance score dispatch across `searchableData`.
   - Modal state management (`openModal`, `closeModal`).
   - Global hotkey listener integration (`Ctrl+K`, `/`, `Escape`).
   - Clear query and active filter reset lifecycle.

4. **`App.test.tsx`** (4 tests):
   - Root mounting and default view rendering.
   - Dark/Light mode theme class toggle on `document.documentElement`.
   - Sidebar responsive auto-close behavior on viewport resize.
   - Custom state routing view switching.

5. **`components/layout/Header.test.tsx`** (6 tests):
   - Search query input binding and submission.
   - Web Speech API fallback toast notification.
   - Mobile search toggle and sidebar toggle button triggers.
   - Keyboard shortcut hints and red focus ring states.

6. **`components/layout/Sidebar.test.tsx`** (4 tests):
   - Navigation links rendering and active route highlighting.
   - `onClose` callback invocation on route selection.

7. **`context/ThemeContext.test.tsx`** (6 tests):
   - Theme provider initialization with default and custom themes.
   - LocalStorage persistence and `document.documentElement` class synchronization.
   - `toggleTheme` and `setTheme` state transitions.

8. **`components/modals/ProjectModal.test.tsx`** (5 tests):
   - Portal mounting to `document.body` and detail rendering via `ModalShell`.
   - CAR (Challenge/Action/Outcome) callouts and key highlights grid rendering.
   - Video preview and action link buttons rendering.
   - Dismissal via backdrop click, close button, and Escape key.
   - Body scroll locking and restoration during presentation.

9. **`components/modals/DetailModal.test.tsx`** (5 tests):
   - Portal mounting and structured modular content rendering.
   - Categorized list and skill exposure badging rendering.
   - Dismissal triggers and scroll restoration.

10. **`components/ui/LazyImage.test.tsx`** (4 tests):
    - Skeleton placeholder rendering while loading.
    - Smooth image load transition and onLoad callback.
    - Fallback image resolution on error.

11. **`components/ui/Slideshow.test.tsx`** (5 tests):
    - Carousel navigation, automatic interval stepping, and responsive card rendering.
    - Left/right arrow key navigation and pause on hover.

12. **`components/ui/FormField.test.tsx`** (1 test):
    - Input and textarea rendering with error messaging states.

13. **`components/ui/Section.test.tsx`** (1 test):
    - Dynamic timeline section header, period, and children rendering.

14. **`hooks/useFocusTrap.test.tsx`** (3 tests):
    - Focus trapping within modal dialogs and tab order cycling.

15. **`hooks/usePWA.test.tsx`** (1 test):
    - Service worker registration lifecycle and online/offline event listener tracking.
