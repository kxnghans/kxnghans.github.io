# Hanson-Tube | Professional Portfolio

Hanson-Tube is a high-performance, responsive portfolio platform built with a modern React stack. It features a neumorphic dark-mode aesthetic, voice-integrated search, and a modular data-driven architecture to showcase professional milestones, projects, and technical competencies.

---

## Tech Stack

| Layer                  | Technology                                                   |
| :--------------------- | :----------------------------------------------------------- |
| **Frontend Framework** | React 18 (Functional Components, Hooks)                      |
| **Build Tooling**      | Vite 7, `@vitejs/plugin-react-swc` (SWC Fast Refresh)        |
| **Styling**            | Tailwind CSS 4 (`@tailwindcss/vite`, `@theme` Design Tokens) |
| **Package Manager**    | pnpm (`pnpm@11.9.0`)                                         |
| **State Management**   | React Context API (Search/UI State), Local State             |
| **Testing**            | Vitest, React Testing Library, JSDOM                         |
| **Deployment**         | GitHub Pages (via `gh-pages`)                                |
| **Icons**              | React Icons (`react-icons/fa`, `react-icons/fa6`)            |
| **Forms & Toasts**     | React Hook Form, Sonner, EmailJS Browser                     |

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
│   ├── review.md             # Security, a11y, and technical gaps tracker
│   ├── testing.md            # Testing strategy and resilience verification
│   └── theme.md              # Neumorphic tokens & interactive physics
├── public/                   # [Static Assets Domain] Pre-compiled resources
│   ├── assets/               # Branding and preview media
│   │   ├── favicon.svg       # SVG optimized icon
│   │   ├── hanson-tube.png   # OpenGraph social preview
│   │   └── generated/        # High-fidelity portfolio visual assets
├── src/                      # [Application Core Domain] Main source code
│   ├── assets/               # Global media assets
│   ├── components/           # [UI/UX Domain] Reusable UI component library
│   │   ├── icons/            # Custom SVG icon wrappers (Icons.jsx)
│   │   ├── layout/           # Orchestration (Header.jsx, Sidebar.jsx)
│   │   ├── modals/           # Overlays (DetailModal.jsx, ProjectModal.jsx)
│   │   ├── search/           # Interactive tools (SearchBar.jsx, SearchResults.jsx)
│   │   └── ui/               # Primitive components (Slideshows, Cards, FormField, Section)
│   ├── context/              # [Global State Domain] State orchestrators
│   │   └── SearchContext.jsx # Search, Voice, and Modal logic hub
│   ├── data/                 # [Domain Data] Static content definitions (SSOT)
│   │   ├── certifications.js # Certifications & credentials
│   │   ├── community.js      # Community involvement & leadership
│   │   ├── contactData.js    # Contact channels & metadata
│   │   ├── education.js      # Academic degrees & coursework
│   │   ├── formData.js       # Form fields definition
│   │   ├── honors.js         # Awards and honors
│   │   ├── navigation.js     # Sidebar routes & navigation icons
│   │   ├── projects.js       # Project showcase items & architecture notes
│   │   ├── skills.js         # Competency mappings & tech categories
│   │   ├── work.js           # Work experience timeline
│   │   └── index.js          # Barrel export & data aggregation
│   ├── pages/                # [Routing Domain] View compositions
│   │   ├── ContactPage.jsx   # Contact form & communication channels
│   │   ├── EducationPage.jsx # Academic milestones & achievements
│   │   ├── HomePage.jsx      # Entry point, summary card, and carousels
│   │   ├── HonorsPage.jsx    # Awards & distinctions
│   │   ├── ProjectsPage.jsx  # Full project listing & categorization
│   │   └── WorkExperiencePage.jsx # Professional work timeline
│   ├── test/                 # [Verification Domain] Test setups
│   │   └── setup.js          # Vitest & RTL configuration
│   ├── utils/                # [Utilities Domain] Pure logic helpers
│   │   └── searchableData.js # Search index generation
│   ├── App.jsx               # [Orchestration Layer] Root routing and theme logic
│   ├── index.css             # [Design System] Tailwind v4 tokens & neumorphic shadows
│   └── main.jsx              # [Entry Point] DOM mounting
├── eslint.config.js          # ESLint 9 flat configuration
├── vite.config.js            # Vite build, React SWC, and test configuration
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
- **Styling**: Tailwind CSS 4 utility classes; reserve `src/index.css` for custom `@theme` variables and neumorphic shadow definitions.
- **Data**: Keep data decoupled from UI; all content resides in `src/data/` as the Single Source of Truth (SSOT).
- **Testing**: UI components and state orchestrators must maintain unit test coverage in `*.test.jsx`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
