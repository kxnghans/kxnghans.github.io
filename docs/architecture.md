# System Architecture & Technical Topology (architecture.md)

This document maps the architectural structure, component trees, and runtime data flows for Hanson-Tube.

---

## 1. System Topology & Infrastructure

Hanson-Tube runs as a client-side Single Page Application (SPA) hosted on GitHub Pages CDN with zero server-side infrastructure. Built on **React 19**, **TypeScript 5.8+**, **Vite 7**, and **Tailwind CSS 4**, all domain data is strongly-typed and bundled into static modules with route code-splitting and Workbox PWA service-worker caching.

```mermaid
flowchart LR
    %% Entry & Shell
    DOMEntry(["DOM Mount (main.tsx)"]) --> ThemeCtx[["ThemeContext (src/context/)"]]
    ThemeCtx --> SearchCtx[["SearchContext (src/context/)"]]
    SearchCtx --> AppShell["App Root (App.tsx)"]

    %% UI Presentation Layers
    AppShell --> Layout["Layout Shell (Header & Sidebar)"]
    AppShell --> ActiveView["Active Page View (src/pages/ - Lazy Code-Split)"]
    AppShell --> ModalOverlay["Modal Overlays (src/components/modals/)"]

    %% External & Static Integrations
    Layout -. "Voice Input" .-> WebSpeech["Web Speech API"]
    ActiveView -- "Contact Form POST" --> EmailJS["EmailJS REST API"]
    ActiveView -- "Load Images" --> LocalMedia[("public/assets/generated/")]
    AppShell -- "Offline Precaching" --> PWAWorker["Workbox Service Worker (sw.js)"]

    %% Data Layer
    DataIndex[("Static SSOT Index (src/data/)")] --> SearchCtx
    DataIndex --> ActiveView
```

### Layer Summary

| Layer                   | Responsibility                                                 | Key Files                                                                                                                                                                                                                                                                                                                              |
| :---------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DOM Entry**           | Injects React 19 tree into `#root` and loads global styles.    | [`main.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/main.tsx), [`index.css`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/index.css)                                                                                                                                             |
| **Theme Context**       | Manages light/dark mode, localStorage sync, and system theme.  | [`ThemeContext.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/context/ThemeContext.tsx)                                                                                                                                                                                                                     |
| **Search Context**      | Orchestrates search queries, voice state, and open modals.     | [`SearchContext.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/context/SearchContext.tsx)                                                                                                                                                                                                                   |
| **App Shell**           | Manages `activePage`, PWA lifecycle, hotkeys, and layout.      | [`App.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/App.tsx), [`Header.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/layout/Header.tsx)                                                                                                                             |
| **Static Data**         | Single Source of Truth for projects, skills, and work history. | [`src/data/*.ts`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/data)                                                                                                                                                                                                                                           |
| **Search & Indexing**   | In-memory token scoring, weighted ranking, and regex snippets. | [`searchEngine.ts`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/utils/searchEngine.ts), [`searchableData.ts`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/utils/searchableData.ts), [`searchUtils.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/search/searchUtils.tsx) |
| **Hooks & a11y**        | Focus containment, PWA registration, and speech recognition.   | [`useFocusTrap.ts`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/hooks/useFocusTrap.ts), [`usePWA.ts`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/hooks/usePWA.ts)                                                                                                                 |
| **External APIs**       | Contact email dispatch and browser speech recognition.         | EmailJS REST, Browser Web Speech API                                                                                                                                                                                                                                                                                                   |

---

## 2. Component Hierarchy & Page Routing

Navigation is handled via a state router inside `App.tsx`. Secondary pages are code-split using `React.lazy` and wrapped in `Suspense` with a neumorphic skeleton fallback.

```mermaid
flowchart LR
    subgraph CoreShell["Application Shell"]
        App["App.tsx"]
        Header["Header.tsx"]
        Sidebar["Sidebar.tsx"]
        SearchBarComp["SearchBar.tsx"]
        SearchResultsComp["SearchResults.tsx"]
        App --> Header
        App --> Sidebar
        Header --> SearchBarComp
        Header --> SearchResultsComp
    end

    subgraph PageRouter["Page Switch Router (React.lazy + Suspense)"]
        HomeView["HomePage.tsx (Eager)"]
        ProjView["ProjectsPage.tsx (Lazy)"]
        WorkView["WorkExperiencePage.tsx (Lazy)"]
        EduView["EducationPage.tsx (Lazy)"]
        HonorsView["HonorsPage.tsx (Lazy)"]
        ContactView["ContactPage.tsx (Lazy)"]
    end

    subgraph SharedUI["Primitive UI Library (src/components/ui/)"]
        ProfileCard["ProfileSummaryCard.tsx"]
        Slideshows["Category Slideshows (*Slideshow.tsx)"]
        SectionComp["Section.tsx"]
        FormComp["FormField.tsx"]
        LazyImg["LazyImage.tsx"]
    end

    subgraph ModalLayer["Overlays (src/components/modals/)"]
        DetailMod["DetailModal.tsx"]
        ProjMod["ProjectModal.tsx"]
    end

    %% Routing connections
    App --> PageRouter

    %% Component usage
    HomeView --> ProfileCard
    HomeView --> Slideshows
    ProjView --> SectionComp
    WorkView --> SectionComp
    EduView --> SectionComp
    HonorsView --> SectionComp
    ContactView --> FormComp

    %% Modal triggers
    App --> ModalLayer
```

---

## 3. Search & Voice Data Flow

The global search engine compiles all typed static dataset files into an in-memory weighted index on startup using [`SearchEngine.ts`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/utils/searchEngine.ts). Typing in the search bar or speaking through the microphone performs instant, sub-millisecond multi-token matching, field-weighted scoring, alias resolution, and typo-tolerant retrieval.

```mermaid
flowchart LR
    %% Data Preparation Pipeline
    subgraph DataPipeline["1. In-Memory Search Indexing"]
        direction LR
        DataFiles[("src/data/*.ts Datasets")] --> BarrelExport[("data/index.ts")]
        BarrelExport --> SearchableUtil["utils/searchableData.ts"]
        SearchableUtil --> EngineInst["utils/searchEngine.ts (SearchEngine)"]
    end

    %% User Input Pipeline
    subgraph InputPipeline["2. Query Capture"]
        direction LR
        TextInput["User Types Query"] --> SearchBar["SearchBar.tsx"]
        VoiceInput["User Speaks"] --> MicButton["Header.tsx (Speech API)"]
        SearchBar --> UpdateQuery["setSearchQuery(query)"]
        MicButton --> UpdateQuery
    end

    %% Context Filtering
    subgraph FilterPipeline["3. Search Context & Result Dispatch"]
        direction LR
        UpdateQuery --> ContextState[["SearchContext.tsx"]]
        EngineInst --> ContextState
        ContextState --> FilterAction["useDeferredValue + SearchEngine Scorer"]
        FilterAction --> OutputResults["SearchResults.tsx + searchUtils.tsx"]
    end

    %% Action
    subgraph ActionPipeline["4. Modal & Slideshow Resolution"]
        direction LR
        OutputResults -- "Select Item" --> OpenModal["setActiveModal(id) & setActivePage(category)"]
        OpenModal --> RenderModal["Render ProjectModal / DetailModal"]
    end

    DataPipeline --> FilterPipeline
    InputPipeline --> FilterPipeline
    FilterPipeline --> ActionPipeline
```

---

## 4. State Lifecycles

The application manages four independent state lifecycles: **Routing**, **Modal Overlays**, **Theme**, and **PWA Cache/Service Worker**.

```mermaid
flowchart LR
    subgraph RouteMachine["1. Page Routing State"]
        direction LR
        R_Home["'Home' (Default)"]
        R_Projects["'Projects'"]
        R_Work["'Work Experience'"]
        R_Edu["'Education'"]
        R_Honors["'Honors'"]
        R_Contact["'Contact'"]

        R_Home <--> R_Projects
        R_Home <--> R_Work
        R_Home <--> R_Edu
        R_Home <--> R_Honors
        R_Home <--> R_Contact
    end

    subgraph ModalMachine["2. Modal Overlay State"]
        direction LR
        M_Closed["activeModal = null (Default)"]
        M_Open["activeModal = item.id (Overlay Visible)"]
        M_Closed -- "Click Card or Search Item" --> M_Open
        M_Open -- "Click Backdrop, 'X', or Escape" --> M_Closed
    end

    subgraph ThemeMachine["3. Theme State (ThemeContext & localStorage)"]
        direction LR
        T_Dark["theme = 'dark' (Default / OS Dark)"]
        T_Light["theme = 'light' (OS Light)"]
        T_Dark -- "toggleTheme()" --> T_Light
        T_Light -- "toggleTheme()" --> T_Dark
    end

    subgraph PWAMachine["4. PWA / Service Worker State (usePWA)"]
        direction LR
        P_Online["Online (Precaching Assets)"]
        P_Offline["Offline (Serving Stored Cache)"]
        P_Update["Update Available (Toast Prompt)"]
        P_Online <--> P_Offline
        P_Online --> P_Update
    end
```

---

## 5. Modal Component Architecture & Data Flow

All modal dialogs consume a centralized, modular component system centered on [`ModalShell.tsx`](file:///C:/Users/kobby/Downloads/gitProjects/kxnghans.github.io/src/components/modals/ModalShell.tsx).

```mermaid
flowchart LR
    %% Data Layer
    subgraph DataSources["Data Layer (src/data/)"]
        direction LR
        WorkData[("work.ts")]
        SkillsData[("skills.ts")]
        EduData[("education.ts")]
        HonorsData[("honors.ts")]
        CertsData[("certifications.ts")]
        ProjData[("projects.ts")]
    end

    %% Modal Composers
    subgraph ModalComposers["Modal Entry Points (src/components/modals/)"]
        direction LR
        DetailModal["DetailModal.tsx"]
        ProjectModal["ProjectModal.tsx"]
    end

    %% Primitive Subcomponents
    subgraph ModalPrimitives["Modular Primitives"]
        direction LR
        Shell["ModalShell.tsx (Portal, FocusTrap, Lock)"]
        CARSection["ModalCARSection.tsx (STAR/CAR Callouts)"]
        HighlightsGrid["ModalHighlightsGrid.tsx (Key Metrics)"]
        CatList["CategorizedList.tsx (2-Col & Bullets)"]
    end

    %% DOM Rendering
    subgraph TargetDOM["DOM Layer"]
        direction LR
        PortalTarget["document.body (Full-Screen Overlay)"]
    end

    %% Linkages
    WorkData --> DetailModal
    SkillsData --> DetailModal
    EduData --> DetailModal
    HonorsData --> DetailModal
    CertsData --> DetailModal
    ProjData --> ProjectModal

    DetailModal --> Shell
    DetailModal --> CARSection
    DetailModal --> CatList
    DetailModal --> HighlightsGrid

    ProjectModal --> Shell
    ProjectModal --> CARSection
    ProjectModal --> CatList
    ProjectModal --> HighlightsGrid

    Shell --> PortalTarget
```

