# Testing & Verification (testing.md)

## Resilience and Verification Plan

Hanson-Tube uses a dual-verification strategy focusing on logical unit resilience and UI integrity, ensuring the portfolio renders flawlessly across devices and network conditions.

### Core Tooling
*   **Test Runner**: Vitest (Vite-native test runner for rapid execution).
*   **DOM Verification**: React Testing Library (RTL) for user-centric interaction testing.
*   **Environment**: JSDOM.
*   **Linting**: ESLint with `react-hooks` and `jsx-a11y` plugins to enforce React safety and accessibility.

---

## Environmental Constraints & Behavior

As a client-side SPA, the application must handle varying client environments gracefully:

1.  **Offline/Low-Bandwidth Resilience**:
    *   Since all core data is bundled into the JS payload, the site remains fully navigable once the initial load is complete, even if the connection drops.
    *   *Constraint Test*: External assets (e.g., images hosted on `storage.googleapis.com`) must have `alt` tags and fallback background colors so the UI does not break if the media fails to load over a slow network.
2.  **Hardware/API Constraints**:
    *   **Voice Search**: The `Web Speech API` is not universally supported (e.g., older browsers or strict privacy settings). 
    *   *Constraint Test*: The application must degrade gracefully. If `window.SpeechRecognition` is unavailable, the microphone icon must silently hide or alert the user gracefully via a Toast, without throwing a fatal JS error.
3.  **High-Concurrency / Spam**:
    *   *Constraint Test*: The EmailJS contact form must disable the submit button immediately upon the first click to prevent multi-submission spam from impatient users on slow connections.

---

## Verification Mandates (Active Test Coverage)

1.  **Component Rendering**: Verify that critical components (`Header`, `Sidebar`, `ProfileSummaryCard`) mount without crashing when provided with mock context data.
2.  **User Interaction Loops**:
    *   Sidebar toggle functionality (verifying state flips).
    *   Theme toggle (verifying the `.dark`/`.light` class is attached to the DOM root).
3.  **Data Integrity Check**: Ensure the `searchableData.js` aggregation utility successfully compiles all disparate data arrays without throwing undefined errors.
4.  **Responsive Breakpoints**: While Vitest uses JSDOM, specific hook logic (like the `window.innerWidth` listener in `App.jsx`) must be tested by mocking the window resize event.
