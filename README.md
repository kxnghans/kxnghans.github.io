# Hanson-Tube | Professional Portfolio

Hanson-Tube is a high-performance, responsive portfolio platform built with a modern React stack. It features a neumorphic dark-mode aesthetic, voice-integrated search, and a modular data-driven architecture to showcase professional milestones, projects, and technical competencies.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Functional Components, Hooks) |
| **Build Tooling** | Vite 7 (ES Modules, Hot Module Replacement) |
| **Styling** | Tailwind CSS 3 (Utility-first, Custom Neumorphic Tokens) |
| **State Management** | React Context API (Search/UI State), Local State |
| **Testing** | Vitest, React Testing Library |
| **Deployment** | GitHub Pages (via `gh-pages`) |
| **Icons** | React Icons (Fa, Fa6) |
| **Utility** | Sonner (Toasts), React Hook Form |

---

## Project Structure

```text
kxnghans.github.io/
├── public/                 # Static public assets (Favicon, etc.)
├── src/                    # Main application source
│   ├── assets/             # Global media assets (Images, Icons) [Infrastructure]
│   ├── components/         # Reusable UI library [UI/UX]
│   │   ├── icons/          # Custom SVG icon wrappers
│   │   ├── layout/         # Orchestration (Header, Sidebar)
│   │   ├── modals/         # Detail views and overlays
│   │   └── ui/             # Primitive components (Buttons, Cards)
│   ├── context/            # Global state orchestrators (Search) [State]
│   ├── data/               # Static content definitions [Domain Data]
│   ├── pages/              # View compositions [Routing]
│   ├── utils/              # Pure logic helpers [Utilities]
│   ├── App.jsx             # Root orchestrator and routing logic
│   ├── main.jsx            # DOM entry point
│   └── index.css           # Global design system and Neumorphic tokens
├── tailwind.config.js      # Custom theme and animation definitions
├── vite.config.js          # Build and development orchestration
└── package.json            # Dependency manifest and lifecycle scripts
```

---

## Getting Started

### Prerequisites

*   **Node.js**: Latest LTS version recommended.
*   **npm**:
    ```sh
    npm install npm@latest -g
    ```

### Installation & Development

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/kxnghans/kxnghans.github.io.git
    ```
2.  **Install dependencies**:
    ```sh
    npm install
    ```
3.  **Start development server**:
    ```sh
    npm run dev
    ```
4.  **Execute tests**:
    ```sh
    npm run test
    ```

---

## Coding Standards

*   **Logic**: Prefer functional components and hooks over class components.
*   **Styling**: Use Tailwind utility classes; reserve `index.css` for complex neumorphic shadows and global layer base styles.
*   **Data**: Keep data decoupled from UI; all content should reside in `src/data/`.
*   **Testing**: All new UI components must include a `.test.jsx` file in `src/test/`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
