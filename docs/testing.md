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

| Workflow                   | Command         | Context                              |
| :------------------------- | :-------------- | :----------------------------------- |
| **Interactive Watch Mode** | `pnpm test`     | Local test development               |
| **Deterministic Run**      | `pnpm test:run` | CI/CD and pre-push validation        |
| **Code Linting**           | `pnpm lint`     | Zero-tolerance ESLint enforcement    |
| **Lint & Autofix**         | `pnpm lint:fix` | Automated code formatting/linting    |
| **Production Build Check** | `pnpm build`    | Static bundle compilation validation |

---

## Environmental Constraints & Resilience

1. **Offline/Low-Bandwidth Resilience**:
   - All domain data is bundled statically into the application chunk. Once the bundle loads, navigation and global search function without active internet connectivity.
   - Images in `public/assets/generated/` and `src/assets/` feature descriptive `alt` tags and fallback card backgrounds.

2. **Web Speech API Graceful Fallback**:
   - The `Header.jsx` component checks `window.SpeechRecognition || window.webkitSpeechRecognition`.
   - When unsupported (or denied), clicking the mic triggers a Sonner toast notifying the user and gracefully returns without throwing unhandled exceptions.

3. **EmailJS Contact Form Throttling**:
   - Form submission in `ContactPage.jsx` disables the submit button during submission (`isLoading`) and upon resolution to prevent duplicate dispatches.

---

## Active Test Suite Inventory

As of current milestone, the Vitest test suite verifies:

1. **`App.test.jsx`**:
   - Root mounting and default view rendering.
   - Dark/Light mode theme class toggle on `document.documentElement`.
   - Sidebar responsive auto-close behavior on viewport resize.
   - Custom state routing view switching.

2. **`components/layout/Header.test.jsx`**:
   - Search query input binding and submission.
   - Web Speech API fallback toast notification.
   - Mobile sidebar toggle button trigger.

3. **`components/layout/Sidebar.test.jsx`**:
   - Navigation links rendering and active route highlighting.
   - `onClose` callback invocation on route selection.

4. **`context/SearchContext.test.jsx`**:
   - Context provider initialization.
   - In-memory data filtering across `searchableData`.
   - Modal state management (`openModal`, `closeModal`).

5. **`components/ui/FormField.test.jsx`**:
   - Input and textarea rendering with error messaging states.

6. **`components/ui/Section.test.jsx`**:
   - Dynamic timeline section header, period, and children rendering.

7. **`components/ui/Slideshow.test.jsx`**:
   - Carousel navigation, automatic interval stepping, and responsive card rendering.
