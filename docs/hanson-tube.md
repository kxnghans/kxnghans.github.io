# Hanson-Tube System Blueprint

## System Architecture

Hanson-Tube is a Single Page Application (SPA) built with React 18 and Vite 7. It utilizes a custom state-driven routing mechanism and a modular UI library supported by a centralized static data layer, bypassing the need for a traditional backend.

---

## Application Lifecycle & Bootstrapping

1.  **Initialization**: `main.jsx` injects the React tree into the `#root` DOM node.
2.  **Global Hydration**:
    *   `App.jsx` mounts and initializes core states: `activePage` (defaulting to "Home"), `isSidebarOpen`, and `theme` (defaulting to "dark").
    *   The `SearchProvider` wraps the application, initializing the global search query, voice recognition states, and modal orchestration logic.
3.  **Theme Injection & Persistence**: 
    *   A `useEffect` hook in `App.jsx` monitors the `theme` state. It strips the opposing class and applies `.dark` or `.light` to `document.documentElement`, enabling Tailwind's global dark-mode utilities.
4.  **Routing Paradigm (Custom State Router)**:
    *   Instead of a traditional history-based router (like `react-router`), navigation is purely state-driven.
    *   Clicking a navigation item triggers `setActivePage(pageName)`.
    *   The `renderPage()` function in `App.jsx` uses a `switch` statement on `activePage` to dynamically unmount and mount the main content components (`HomePage`, `ProjectsPage`, etc.).
    *   *Advantage*: Instantaneous transitions and persistent global state (e.g., search context remains active across page changes).

---

## Core Feature Loops & State Transitions

### 1. Global Search & Voice Integration
*   **Core Loop**: User clicks the search bar OR clicks the microphone icon -> Inputs text/voice -> Search Context filters the global dataset -> Results are displayed in a dropdown -> User clicks a result -> System navigates to the item and opens its detail modal.
*   **State Machine Transitions**:
    *   `Idle`: `searchQuery` is `""`, `isListening` is `false`.
    *   `Listening`: Mic activated, Web Speech API captures interim results.
    *   `Processing`: Transcript updates `searchQuery`. The `useMemo` hook in `SearchContext` recalculates `searchResults` by filtering the `searchableData` array.
    *   `Navigation`: User selects a result -> `setActivePage()` is called if needed -> `setActiveModal()` triggers the detail overlay.

### 2. Deep-Dive Modal Ecosystem
*   **Core Loop**: User views a project card -> Clicks "View Details" -> A standardized modal overlay appears with full project context (Challenge, Action, Outcome) -> User closes modal to return exactly to previous scroll position.
*   **State Machine Transitions**:
    *   `Hidden`: `activeModal` in `SearchContext` is `null`.
    *   `Active`: `activeModal` is set to the item's `id`. The `DetailModal` or `ProjectModal` component renders via a portal or absolute overlay, blocking background scrolling.
    *   `Dismissed`: User clicks the backdrop or 'X' -> `activeModal` returns to `null`.

### 3. Responsive Navigation (Sidebar Orchestration)
*   **Core Loop**: On mobile viewports, the user clicks the hamburger menu -> Sidebar slides in -> User selects a page -> Sidebar automatically dismisses.
*   **State Machine Transitions**:
    *   `Desktop (>= 1024px)`: `isSidebarOpen` locked to `true`.
    *   `Mobile (< 1024px)`: `isSidebarOpen` defaults to `false`.
    *   `Toggle`: Header button flips `isSidebarOpen` to `true`.
    *   `Auto-Dismiss`: An event listener detects clicks outside the `sidebarRef` OR detects a page transition, resetting `isSidebarOpen` to `false`.

---

## Internal Data Flow

Hanson-Tube relies on a **Decoupled Static Data Layer**. 

1.  **Data Definition (SSOT)**: Domain data (Projects, Skills, Honors) lives in plain JavaScript arrays exported from `src/data/*.js`.
2.  **Aggregation**: `src/utils/searchableData.js` aggregates these disparate arrays into a single, uniform index containing `{ id, title, content, category, componentType }`.
3.  **Consumption**: 
    *   UI components (e.g., `ProjectsPage.jsx`) import the static arrays directly to map and render list views.
    *   The `SearchContext` imports `searchableData.js` to perform global filtering. 
4.  **Immutability**: Because there is no backend, all state mutations (like search inputs or active modals) are strictly ephemeral (client-side only).
