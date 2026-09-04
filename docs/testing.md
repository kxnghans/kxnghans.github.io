# Testing & Verification Strategy (testing.md)

## Resilience and Verification Plan

Hanson-Tube enforces a dual-verification strategy focusing on logical unit resilience, accessibility compliance, and UI integrity across desktop and mobile viewports.

---

## Core Tooling & Test Pipeline

- **Test Runner**: Vitest with native Vite integration for rapid ESM-native execution.
- **DOM Verification**: React Testing Library paired with `@testing-library/jest-dom`.
- **Environment**: JSDOM.
- **Linting & Code Standards**: ESLint Flat Config (`eslint.config.js`) enforcing `react-hooks` and `jsx-a11y` accessibility rules.
- **Formatting**: Prettier with `prettier-plugin-tailwindcss`.

### Execution Commands

| Workflow                     | Command             | Context                                                                      |
| :--------------------------- | :------------------ | :--------------------------------------------------------------------------- |
| **Interactive Watch Mode**   | `pnpm test`         | Local test development                                                       |
| **Deterministic Run**        | `pnpm test:run`     | CI/CD and pre-push validation                                                |
| **TypeScript Type Check**    | `pnpm typecheck`    | Strict compiler type verification                                            |
| **Code Linting**             | `pnpm lint`         | Zero-tolerance ESLint enforcement                                            |
| **Lint & Autofix**           | `pnpm lint:fix`     | Automated code formatting/linting                                            |
| **Production Build Check**   | `pnpm build`        | Static bundle compilation validation                                         |
| **Interactive Browser Test** | Chrome DevTools MCP | Full two-iteration test matrix ([`docs/browser-test.md`](./browser-test.md)) |

---

## Environmental Constraints & Resilience

1. **Offline/Low-Bandwidth Resilience**:
   - All domain data is bundled statically into the application chunk. Once the bundle loads, navigation and global search function without active internet connectivity.
   - PWA Workbox service worker precaches application shell assets (~413 KiB) and caches WebP media at runtime using a `CacheFirst` strategy.
   - Images in `public/assets/generated/` and `src/assets/` feature descriptive `alt` tags and fallback card backgrounds.

2. **Web Speech API Graceful Fallback**:
   - The `Header.tsx` component checks `window.SpeechRecognition || window.webkitSpeechRecognition`.
   - When unsupported (or denied), clicking the mic triggers a Sonner toast notifying the user and gracefully returns without throwing unhandled exceptions.

3. **EmailJS Contact Form Throttling & Cooldown**:
   - Form submission in `ContactPage.tsx` enforces a 60-second cooldown timer via `localStorage` (`SUBMIT_COOLDOWN_MS = 60000`) and disables the submit button during flight (`isLoading`) and on resolution to prevent duplicate dispatches and abuse.

---

## Active Test Suite Inventory

The Vitest test suite verifies 33 test suites (140 unit and integration tests):

1. **`utils/searchEngine.test.ts`** (15 tests):
   - In-memory indexing and query caching.
   - Exact query, prefix, and substring matching.
   - Field-weighted score hierarchy (Title > Tags > Subtitle > Summary > Content).
   - Tech and management alias expansion (`c++`/`cpp`, `next.js`/`nextjs`, `tpm`/`scrum`/`conops`, `ai`/`machine learning`, `open heavens`/`church`).
   - Multi-token scoring and full-match bonus calculation.
   - Typo-tolerant fuzzy matching via Levenshtein distance.
   - Smart recommendation engine (`getRecommendations`) category diversity and rotation.
   - Navigation category ordering and relevance tie-breaking.

2. **`components/search/SearchResults.test.tsx`** (8 tests):
   - Multi-token term highlighting with YouTube red styling.
   - Safe regex character escaping (`C++`, `.NET`, brackets).
   - Contextual smart snippet truncation centered around matching tokens.
   - Recommended topics panel rendering upon empty query focus.
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

4. **`App.test.tsx`** (5 tests):
   - Root mounting and default view rendering.
   - Dark/Light mode theme class toggle on `document.documentElement`.
   - Sidebar responsive auto-close behavior on viewport resize.
   - Recommended topics display on search input focus and navigation to results.
   - Custom state routing view switching and navigation to Value page.

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
    - Input and textarea rendering with error messaging states and accessibility associations.

13. **`components/ui/Section.test.tsx`** (1 test):
    - Dynamic timeline section header, period, and children rendering.

14. **`components/ui/FilterDropdown.test.tsx`** (7 tests):
    - Multi-select checkbox toggling, "All" option reset, popover open/close, and keyboard navigation.

15. **`hooks/useFocusTrap.test.tsx`** (3 tests):
    - Focus trapping within modal dialogs and tab order cycling.

16. **`hooks/usePWA.test.tsx`** (1 test):
    - Service worker registration lifecycle and online/offline event listener tracking.

17. **`pages/ContactPage.test.tsx`** (4 tests):
    - Contact links and input fields rendering.
    - Form submission via EmailJS and `localStorage` cooldown timestamp storage.
    - Cooldown rate limiting enforcement and countdown error toast notification.
    - Graceful error handling on EmailJS failure.

18. **`pages/EducationPage.test.tsx`** (4 tests):
    - Degree cards rendering, curriculum sections, DetailModal trigger, and nested capstone ProjectModal trigger.

19. **`pages/WorkExperiencePage.test.tsx`** (3 tests):
    - Work cards rendering, detail modal triggers, and exposure badge validations.

20. **`pages/HonorsPage.test.tsx`** (3 tests):
    - Honors heading, honor cards rendering, and certifications slideshow integration.
    - DetailModal opening on card click and close button trigger.
    - Keyboard accessibility (Enter and Space keys) for opening modals.

21. **`pages/ProjectsPage.test.tsx`** (3 tests):
    - Projects heading and all project cards rendering across categories.
    - ProjectModal opening on card click and close button trigger.
    - Keyboard accessibility (Enter and Space keys) for opening modals.

22. **`pages/ValuePage.test.tsx`** (4 tests):
    - Executive summary KPI buckets ($9.6M+ savings, 705k+ hrs, 36x peak acceleration, 450 sites), interactive filter slicing, time-cost calculations, and reset filters.

23. **`components/value/charts/ValueDomainDonutChart.test.tsx`** (2 tests):
    - Domain impact footprint rendering and sector detail callout on hover.

24. **`components/value/charts/ValueMultiplierBarChart.test.tsx`** (3 tests):
    - Velocity multiplier columns rendering, speedup calculations, and before→after cycle-time detail box.

25. **`components/value/charts/ValueRadarChart.test.tsx`** (2 tests):
    - 6-axis competency spider graph, SVG web grid, and interactive vertex tenure benchmarks.

26. **`components/value/charts/ValueTimelineAreaChart.test.tsx`** (3 tests):
    - Cumulative improvement trajectory area/line curves, era milestone callouts, and filter highlighting.

27. **`components/value/charts/chartUtils.test.ts`** (5 tests):
    - Catmull-Rom cubic Bézier curve calculation (`smoothPath`) for 0, 1, and multi-point geometries.
    - Linear scale coordinate projections (`scaleLinear`) and zero-span safety.

28. **`components/ui/SummaryTextLines.test.tsx`** (4 tests):
    - Unformatted string rendering as standard paragraphs.
    - Colon splitting with bold label styling for structured key-value lines.
    - Headline bolding on line 0 when `boldFirstLine={true}`.
    - Empty state handling.

29. **`hooks/useSearchHotkeys.test.ts`** (4 tests):
    - `Ctrl+K` global search focus dispatch.
    - Forward-slash `/` focus dispatch and active form input typing protection.
    - Escape key search query dismissal and focus release.

30. **`hooks/useResponsiveSidebar.test.ts`** (5 tests):
    - Desktop viewport (>= 1024px) initial open state.
    - Mobile/tablet viewport (< 1024px) initial collapsed state.
    - 5-second automatic inactivity collapse on medium viewports.
    - Outside click and inside click discrimination.

31. **`hooks/useContactForm.test.ts`** (3 tests):
    - Default idle form state initialization and submission status indicators.
    - Field validation error toast notifications.
    - Anti-spam submission cooldown enforcement and countdown error toast.

32. **`hooks/useVoiceSearch.test.ts`** (2 tests):
    - Unsupported Web Speech API graceful fallback toast notification.
    - Supported Web Speech API microphone start/stop toggle lifecycle.

33. **`components/modals/CategorizedList.test.tsx`** (4 tests):
    - Null check on empty items.
    - Key-value item rendering with colon splitting.
    - Project registry lookup button rendering and `onSelectProject` dispatch.
    - Categorized section group rendering for lines ending with colons.

---

## End-to-End Browser Validation Matrix

For full interactive browser testing, consult [`docs/browser-test.md`](./browser-test.md), which details the automated and interactive verification suite spanning:

- **Desktop Workflow (1440x900)**: Profile header, slideshow carousels, search indexing with red highlights, CAR modals, Work & Education details, executive value dashboard dynamic calculations, and form validation.
- **Responsive & Cross-Theme Matrix**: Viewports across Tablet (768x1024) and Mobile (375x667), drawer navigation, search dropdown outside-click and Escape key dismissals, and Light/Dark mode neumorphic contrast.
- **Telemetry**: Zero runtime errors, zero uncaught exceptions, and zero 404 broken assets across 137 HTTP network requests.
