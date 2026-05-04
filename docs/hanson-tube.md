# Hanson-Tube System Blueprint

## System Architecture

Hanson-Tube is a Single Page Application (SPA) built with React and Vite. It utilizes a custom state-driven routing mechanism and a modular UI library supported by a centralized data layer.

### Application Lifecycle

1.  **Bootstrapping**: `main.jsx` initializes the React application and mounts it to the `#root` element in `index.html`.
2.  **Global Hydration**:
    *   `App.jsx` initializes core states: `activePage`, `isSidebarOpen`, `theme`.
    *   `SearchContext` is provided to the entire tree to manage search queries and voice recognition state.
3.  **Theme Injection**: A `useEffect` in `App.jsx` monitors the `theme` state and applies the `.dark` or `.light` class to the `document.documentElement`, triggering Tailwind's dark-mode variants.
4.  **Routing Paradigm**:
    *   Navigation triggers an `setActivePage(pageName)` call.
    *   The `renderPage` function in `App.jsx` performs a switch-case on `activePage` to swap the main content component.
    *   State remains persistent in memory across page "transitions" without browser reloads.

---

## Feature Implementations

### 1. Voice-Integrated Search
*   **Logic**: Located in `Header.jsx`. Uses the `Web Speech API` (`window.SpeechRecognition`).
*   **State Machine**:
    *   `Idle`: Waiting for user interaction.
    *   `Listening`: Mic active, capturing interim results.
    *   `Processing`: Parsing transcript and updating `SearchContext`.
    *   `Timeout`: Automatically stops listening after 2s of silence.
*   **Data Flow**: `SpeechRecognition` -> `setSearchQuery` -> `ProjectsPage`/`HomePage` filters results based on query.

### 2. Neumorphic UI Components
*   **Shadow Strategy**: Standardized in `index.css` using CSS variables and `@layer components`.
*   **Variants**:
    *   `outset`: Elevated elements (cards, buttons).
    *   `inset`: Sunken elements (inputs, search bar).
*   **Implementation**: Applied via Tailwind utility classes like `neumorphic-outset-dark`.

### 3. Modular Data Layer
*   **Structure**: Every section of the portfolio (Work, Education, Skills, Projects) has a corresponding `.js` file in `src/data/`.
*   **Integration**: Components (e.g., `ProjectSlideshow`) import these objects and map over them to generate UI, ensuring that updating content never requires modifying component logic.

---

## Routing Paradigms

*   **Custom Router**: A lightweight, state-based switcher in `App.jsx`.
*   **Side Effects**: Page changes trigger a scroll-to-top behavior via `window.scrollTo(0, 0)`.
*   **Active State**: `Sidebar` and `Header` receive `activePage` to highlight the current location.
