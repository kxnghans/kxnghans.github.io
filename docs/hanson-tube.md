# Hanson-Tube Architecture Guide

## How It Works

Hanson-Tube is a client-side React 18 single-page app. It runs on Vite 7 with React SWC and Tailwind CSS 4. There is no backend server or database. All data lives in static JavaScript files under `src/data/`, which gets bundled directly at build time and served through GitHub Pages.

---

## App Boot & Lifecycle

1. **Mounting**: `main.jsx` attaches the root React component to `<div id="root"></div>` and pulls in `src/index.css`.
2. **State Setup**:
   - `App.jsx` tracks `activePage` (defaults to `"Home"`), `isSidebarOpen`, and `theme` (defaults to `"dark"`).
   - `SearchProvider` wraps the app tree so any component can read or update search queries, voice state, and open modals.
3. **Theme Toggle**:
   - A `useEffect` in `App.jsx` listens for changes to `theme` and adds `.dark` or `.light` to `document.documentElement`. Tailwind CSS 4 picks this up for dark mode styling.
4. **State-Based Navigation**:
   - We avoid `react-router` or URL hash routing. `App.jsx` holds `activePage` in state.
   - When a user picks a page from the sidebar, `setActivePage` updates the state.
   - `renderPage()` runs a `switch` statement on `activePage` and renders the selected view:
     - `HomePage`
     - `ProjectsPage`
     - `WorkExperiencePage`
     - `EducationPage`
     - `HonorsPage`
     - `ContactPage`
   - This keeps page switches instant and avoids 404 routing headaches on GitHub Pages.

---

## Key Workflows

### 1. Search & Voice Input

- **Search Bar**: Typing in `SearchBar.jsx` updates `searchQuery` in `SearchContext`. A `useMemo` filter checks `searchableData` and returns matching titles, categories, and content.
- **Voice Search**: Clicking the microphone calls `window.SpeechRecognition` (or `webkitSpeechRecognition`). As the user speaks, interim text updates `searchQuery`. If the browser lacks speech support, the app catches the error and triggers a Sonner toast instead of crashing.
- **Selecting Results**: Clicking any search result changes `activePage` to that item's category and opens its detail modal via `setActiveModal(id)`.

### 2. Modals

- Project cards and search results open overlays for deeper reading (`ProjectModal.jsx` and `DetailModal.jsx`).
- Setting `activeModal` to an item ID displays the overlay and locks background scroll.
- Clicking the backdrop, the close button, or pressing `Escape` resets `activeModal` to `null`.

### 3. Responsive Sidebar

- On desktop screens (1024px and wider), the sidebar stays open on the left.
- On mobile screens (under 1024px), the sidebar stays closed by default. Tapping the header hamburger icon opens it as a slide-out drawer.
- Selecting any link or clicking outside the drawer closes it automatically.

---

## Data Flow & SSOT

1. **Source Files**: All portfolio content is defined in plain JavaScript arrays under `src/data/*.js`.
2. **Index Utility**: `src/utils/searchableData.js` imports these arrays from `src/data/index.js` and flattens them into a clean search index with `{ id, title, content, category, componentType }`.
3. **Consumption**:
   - Pages import their respective data files directly to render cards and lists.
   - `SearchContext` uses `searchableData.js` for instant filtering.
4. **Local Images**: Media assets live in `public/assets/generated/` and `src/assets/`, referenced directly by path.
