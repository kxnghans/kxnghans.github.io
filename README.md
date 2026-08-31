# Hanson-Tube | Professional Portfolio

Hanson-Tube is an interactive web portfolio built with React, TypeScript, and Tailwind CSS. It features voice search, neumorphic dark mode, and a modular data layer for work history, projects, metrics, and engineering skills.

---

## Tech Stack

| Layer                  | Technology                                                                  |
| :--------------------- | :-------------------------------------------------------------------------- |
| **Frontend Framework** | React (Functional Components, Hooks, Context API)                           |
| **Language**           | TypeScript (Strict Type-Checking)                                           |
| **Build Tooling**      | Vite, `@vitejs/plugin-react-swc` (SWC Fast Refresh)                         |
| **Styling**            | Tailwind CSS (`@tailwindcss/vite`, `@theme` Design Tokens)                  |
| **Offline & PWA**      | Workbox Window & `vite-plugin-pwa` (Service Worker Caching)                 |
| **Package Manager**    | pnpm                                                                        |
| **State Management**   | React Context API (`ThemeContext`, `SearchContext`)                         |
| **Testing**            | Vitest, React Testing Library, JSDOM (26 Passing Suites, 113 Tests)         |
| **Deployment**         | GitHub Pages (via `gh-pages`)                                               |
| **Icons**              | Centralized Icon Registry (`<Icon />` primitive via `src/components/icons`) |
| **Forms & Toasts**     | React Hook Form, Sonner, EmailJS Browser                                    |

---

## Project Structure & Logical Domains

```text
kxnghans.github.io/ [Root]
├── docs/                     # [Architecture & Standards Domain]
│   ├── PRD.md                # Product requirements & user intent classifications
│   ├── architecture.md       # High-fidelity Mermaid architectural diagrams
│   ├── backend.md            # Data strategy, SSOT rules, and EmailJS infrastructure
│   ├── checklist.md          # Execution milestones and context tracker
│   ├── hanson-tube.md        # System blueprint & lifecycle transitions
│   ├── images.md             # Visual imagery spec & generation roadmap
│   ├── lint.md               # Linting policies, AST guardrails, and quality standards
│   ├── review.md             # Security, a11y, and technical gaps tracker
│   ├── testing.md            # Testing strategy and resilience verification
│   └── theme.md              # Neumorphic tokens & interactive physics
├── public/                   # [Static Assets Domain] Pre-compiled resources
│   ├── assets/               # Branding and preview media
│   │   ├── favicon.svg       # SVG optimized icon
│   │   ├── hanson-tube.png   # OpenGraph social preview
│   │   └── generated/        # High-fidelity portfolio visual assets (WebP)
├── src/                      # [Application Core Domain] Main source code
│   ├── assets/               # Global media assets
│   ├── components/           # [UI/UX Domain] Reusable UI component library
│   │   ├── icons/            # Centralized icon registry and <Icon /> primitive
│   │   ├── layout/           # Orchestration (Header.tsx, Sidebar.tsx)
│   │   ├── modals/           # Overlays & Portals (DetailModal.tsx, ProjectModal.tsx)
│   │   ├── search/           # Interactive tools (SearchBar.tsx, SearchResults.tsx)
│   │   ├── ui/               # Primitive components (Slideshows, Cards, FormField, Section, LazyImage)
│   │   └── value/            # Analytical charts (Radar, Columns, Timeline, Donut, KPI grids)
│   ├── context/              # [Global State Domain] State orchestrators
│   │   ├── SearchContext.tsx # Search, Voice, and Modal logic hub
│   │   └── ThemeContext.tsx  # Global dark/light theme state & persistence
│   ├── data/                 # [Domain Data] Static content definitions (SSOT)
│   │   ├── certifications.ts # Certifications & credentials
│   │   ├── community.ts      # Community involvement & leadership
│   │   ├── contactData.ts    # Contact channels & metadata
│   │   ├── education.ts      # Academic degrees & coursework
│   │   ├── formData.ts       # Form fields definition
│   │   ├── honors.ts         # Awards and honors
│   │   ├── lifetimeValue.ts  # Verified financial ROI, quantitative metrics & qualitative pillars
│   │   ├── navigation.ts     # Sidebar routes & navigation icons
│   │   ├── projects.ts       # Project showcase items & architecture notes
│   │   ├── skills.ts         # Competency mappings & tech categories
│   │   ├── work.ts           # Work experience timeline
│   │   └── index.ts          # Barrel export & data aggregation
│   ├── hooks/                # [Custom React Hooks]
│   │   ├── useFocusTrap.ts   # WCAG modal focus containment
│   │   └── usePWA.ts         # Service worker & offline state management
│   ├── pages/                # [Routing Domain] View compositions (React.lazy)
│   │   ├── ContactPage.tsx   # Contact form & communication channels
│   │   ├── EducationPage.tsx # Academic milestones & achievements
│   │   ├── HomePage.tsx      # Entry point, summary card, and carousels
│   │   ├── HonorsPage.tsx    # Awards & distinctions
│   │   ├── ProjectsPage.tsx  # Full project listing & categorization
│   │   ├── ValuePage.tsx     # Lifetime ROI & quantitative impact visualizers
│   │   └── WorkExperiencePage.tsx # Professional work timeline
│   ├── theme/                # [Design System Domain] Central tokens & style recipes
│   │   ├── theme.ts          # Color tokens, shadows, palettes, and Tailwind recipes
│   │   └── index.ts          # Theme barrel export
│   ├── test/                 # [Verification Domain] Test setups
│   │   └── setup.ts          # Vitest & RTL configuration
│   ├── types/                # [TypeScript Domain] Shared interface definitions
│   │   ├── data.ts           # Entity models & static content types
│   │   └── search.ts         # Search result & context types
│   ├── utils/                # [Utilities Domain] Pure logic helpers
│   │   ├── searchEngine.ts   # In-memory search scoring engine & alias resolution
│   │   └── searchableData.ts # Search index generation & structured mapping
│   ├── App.tsx               # [Orchestration Layer] Root routing and dynamic views
│   ├── index.css             # [Design System] Tailwind v4 tokens & neumorphic shadows
│   └── main.tsx              # [Entry Point] DOM mounting
├── eslint.config.js          # ESLint flat configuration
├── tsconfig.json             # Strict TypeScript compiler options
├── tsconfig.node.json        # TypeScript Node config for Vite
├── vite.config.ts            # Vite build, React SWC, PWA, and test configuration
└── package.json              # Dependency manifest and lifecycle scripts
```

---

## Getting Started

### Prerequisites

- **Node.js**: LTS version (v20+ recommended).
- **pnpm**: `corepack enable` or `npm install -g pnpm`

### Local Setup & Development

1. **Clone the repository**:
   ```sh
   git clone https://github.com/kxnghans/kxnghans.github.io.git
   cd kxnghans.github.io
   ```
2. **Install dependencies**:
   ```sh
   pnpm install
   ```
3. **Configure Environment (if required)**:
   Ensure `.env` matches `.env.example` to supply variables for EmailJS:
   ```sh
   cp .env.example .env
   ```
4. **Start development server**:
   ```sh
   pnpm dev
   ```
5. **Execute tests**:
   ```sh
   pnpm test:run
   ```
6. **Run linter**:
   ```sh
   pnpm lint
   ```

---

## Coding Standards

- **Logic**: Prefer functional components and hooks over class components.
- **Styling**: Tailwind CSS utility classes; reserve `src/index.css` for custom `@theme` variables and neumorphic shadow definitions.
- **Data**: Keep data decoupled from UI; all content resides in `src/data/` as the Single Source of Truth (SSOT).
- **Testing**: UI components, custom hooks, and pure utilities must maintain unit test coverage in `*.test.tsx` and `*.test.ts`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
