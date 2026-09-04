# Hanson-Tube Architecture Guide

## How It Works

Hanson-Tube is a client-side React single-page app written in TypeScript. It runs on Vite with React SWC and Tailwind CSS. There is no backend server or database. All data lives in static, strongly-typed TypeScript files under `src/data/`, which gets bundled directly at build time and served through GitHub Pages.

---

## App Boot & Lifecycle

1. **Mounting**: `main.tsx` mounts the root React component wrapped in `ThemeProvider` and `SearchProvider` to `<div id="root"></div>` and imports `src/index.css`.
2. **State Setup**:
   - `App.tsx` tracks `activePage` (defaults to `"Home"`) and responsive `isSidebarOpen`.
   - `ThemeProvider` manages global theme state (`"dark"` | `"light"`), detects OS preference (`prefers-color-scheme`), persists to `localStorage`, and synchronizes `.dark`/`.light` on `document.documentElement`.
   - `SearchProvider` wraps the app tree so any component can read or update search queries, voice state, and open modals.
3. **State-Based Navigation**:
   - We avoid `react-router` or URL hash routing. `App.tsx` holds `activePage` in state.
   - When a user picks a page from the sidebar, `setActivePage` updates the state.
   - `renderPage()` runs a `switch` statement on `activePage` and renders the selected view (code-split via `React.lazy` and `Suspense` with a neumorphic skeleton fallback):
     - `HomePage` (eager)
     - `ValuePage` (lazy)
     - `ProjectsPage` (lazy)
     - `WorkExperiencePage` (lazy)
     - `EducationPage` (lazy)
     - `HonorsPage` (lazy)
     - `ContactPage` (lazy)
   - This keeps page switches instant, minimizes initial bundle size, and avoids 404 routing headaches on GitHub Pages.

---

## Key Workflows

### 1. Search & Voice Input

- **Search Bar**: Typing in `SearchBar.tsx` updates `searchQuery` in `SearchContext`. Queries pass through `useDeferredValue` into our in-memory `SearchEngine` ([`searchEngine.ts`](../src/utils/searchEngine.ts)), which applies multi-token matching, field-weighted scoring (Exact > Title > Tags > Subtitle > Summary > Content), tech alias expansions, and Levenshtein typo tolerance.
- **Recommended Topics & Empty States**: When the search input is focused with an empty query, the search engine displays recommended topics (a mix of flagship ventures, TPM skills, military honors, and career milestones). Typing switches directly to live search.
- **Voice Search**: Clicking the microphone calls `window.SpeechRecognition` (or `webkitSpeechRecognition`). As the user speaks, interim text updates `searchQuery`. The microphone icon turns red while listening. If the browser lacks speech support, the app catches the error and displays a toast notification.
- **Search Result Highlighting & Selection**: `SearchResults.tsx` and `searchUtils.tsx` highlight matched query terms with safe regex escaping and red background tinting. It also truncates snippets around matching terms. Clicking a result navigates to that item's page and opens its detail modal.

### 2. Modals & Portals

- Project cards and search results open full-screen overlays for deeper reading ([`ProjectModal.tsx`](../src/components/modals/ProjectModal.tsx) and [`DetailModal.tsx`](../src/components/modals/DetailModal.tsx)).
- Modals render using `createPortal(modalContent, document.body)` to escape any parent CSS transforms, overflow constraints, or slide bounds, ensuring true `fixed inset-0` full-viewport presentation.
- Mounting automatically locks background scrolling (`document.body.style.overflow = "hidden"`), and unmounting restores it.
- Clicking the backdrop, the close button, or pressing `Escape` closes the modal. Focus is trapped within the dialog using `useFocusTrap.ts`.

### 3. Responsive Sidebar

- On desktop screens (1024px and wider), the sidebar stays open on the left.
- On mobile screens (under 1024px), the sidebar stays closed by default. Tapping the header hamburger icon opens it as a slide-out drawer.
- Selecting any link or clicking outside the drawer closes it automatically.

---

## Data Flow & SSOT

1. **Source Files**: All portfolio content is defined in typed TypeScript modules under `src/data/*.ts`.
2. **Index Utility**: `src/utils/searchableData.ts` imports these datasets from `src/data/index.ts` and transforms them into a structured search index with `{ id, title, subtitle?, tags?, summary?, content, category, location }`.
3. **Consumption**:
   - Pages import their respective data files directly to render cards and lists.
   - `SearchContext` uses `SearchEngine` ([`searchEngine.ts`](../src/utils/searchEngine.ts)) and `searchableData.ts` for instant scoring and filtering.
4. **Local Images**: Media assets live in `public/assets/generated/` and `src/assets/`, referenced directly by path.
