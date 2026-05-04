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

## Project Structure & Logical Domains

```text
kxnghans.github.io/ [Root]
├── public/                 # [Static Assets Domain] Pre-compiled resources
│   └── assets/             # Branding and social preview images
│       ├── favicon.svg     # SVG optimized icon
│       └── hanson-tube.png # OpenGraph social preview
├── src/                    # [Application Core Domain] Main source code
│   ├── assets/             # Global media assets (Images) [Infrastructure]
│   │   └── Kobs DP.png     # Profile imagery
│   ├── components/         # [UI/UX Domain] Reusable UI library
│   │   ├── icons/          # Custom SVG icon wrappers (Icons.jsx)
│   │   ├── layout/         # Orchestration (Header.jsx, Sidebar.jsx)
│   │   ├── modals/         # Overlays (DetailModal.jsx, ProjectModal.jsx)
│   │   ├── search/         # Interactive tools (SearchBar.jsx)
│   │   └── ui/             # Primitive components (Slideshows, Cards, FormField)
│   ├── context/            # [Global State Domain] State orchestrators
│   │   └── SearchContext.jsx # Search and Voice logic hub
│   ├── data/               # [Domain Data] Static content definitions (SSOT)
│   │   ├── projects.js     # Project showcase items
│   │   ├── skills.js       # Competency mappings
│   │   └── index.js        # Data barrel exports
│   ├── pages/              # [Routing Domain] View compositions
│   │   ├── HomePage.jsx    # Entry point & summary
│   │   └── ProjectsPage.jsx# Full project listing
│   ├── test/               # [Verification Domain] Test setups
│   │   └── setup.js        # Vitest & RTL configuration
│   ├── utils/              # [Utilities Domain] Pure logic helpers
│   │   └── searchableData.js # Search index generation
│   ├── App.jsx             # [Orchestration Layer] Root routing and theme logic
│   ├── main.jsx            # [Entry Point] DOM mounting
│   └── index.css           # [Design System] Global neumorphic tokens
├── tailwind.config.js      # Custom theme and animation definitions
├── vite.config.js          # Build and development orchestration
└── package.json            # Dependency manifest and lifecycle scripts
```

---

## Getting Started

### Prerequisites

*   **Node.js**: Latest LTS version recommended.
*   **npm**: `npm install npm@latest -g`

### Local Setup & Development

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/kxnghans/kxnghans.github.io.git
    cd kxnghans.github.io
    ```
2.  **Install dependencies**:
    ```sh
    npm install
    ```
3.  **Configure Environment (if required)**:
    Ensure `.env` matches `.env.example` to supply variables for EmailJS or other integrations.
4.  **Start development server**:
    ```sh
    npm run dev
    ```
5.  **Execute tests**:
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
