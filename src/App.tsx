import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Toast from "./components/ui/Toast";
import { usePWA } from "./hooks/usePWA";

import { FEATURE_FLAGS } from "./config/features";
import { UI_SURFACES } from "./theme";

// Layout Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

// Eager Main Landing View
import HomePage from "./pages/HomePage";

// Code-Split Dynamic Route Views
const ValuePage = lazy(() => import("./pages/ValuePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const WorkExperiencePage = lazy(() => import("./pages/WorkExperiencePage"));
const HonorsPage = lazy(() => import("./pages/HonorsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));


const PageSkeleton = () => (
  <div
    data-testid="page-skeleton"
    className={`${UI_SURFACES.section} transition-opacity duration-300`}
  >
    <div className="border-b-2 border-gray-300 p-6 dark:border-gray-700/60">
      <div className="animate-gentle-pulse h-8 w-48 rounded-lg bg-gray-200/90 dark:bg-white/[0.05]" />
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className={`${UI_SURFACES.cardStatic} transition-all duration-300`}
          >
            <div className="animate-gentle-pulse h-48 w-full bg-gray-300/60 dark:bg-white/[0.04]" />
            <div className="space-y-3 p-4">
              <div className="animate-gentle-pulse h-5 w-3/4 rounded bg-gray-300/70 dark:bg-white/[0.06]" />
              <div className="space-y-2 pt-1">
                <div className="animate-gentle-pulse h-3 w-full rounded bg-gray-300/50 dark:bg-white/[0.03]" />
                <div className="animate-gentle-pulse h-3 w-5/6 rounded bg-gray-300/50 dark:bg-white/[0.03]" />
                <div className="animate-gentle-pulse h-3 w-2/3 rounded bg-gray-300/50 dark:bg-white/[0.03]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  usePWA();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );
  const [activePage, setActivePage] = useState<string>("Home");
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | undefined;
    const handleResize = () => {
      if (rafId !== undefined) return;
      rafId = requestAnimationFrame(() => {
        setIsMediumScreen(window.innerWidth < 1024);
        rafId = undefined;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isMediumScreen && isSidebarOpen) {
      timer = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isMediumScreen, isSidebarOpen]);

  useEffect(() => {
    const handleInteraction = (e: Event) => {
      if (
        isMediumScreen &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("click", handleInteraction, true);
    window.addEventListener("touchstart", handleInteraction, true);
    window.addEventListener("scroll", handleInteraction, true);

    return () => {
      window.removeEventListener("click", handleInteraction, true);
      window.removeEventListener("touchstart", handleInteraction, true);
      document.removeEventListener("scroll", handleInteraction, true);
    };
  }, [isMediumScreen, isSidebarOpen]);

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <HomePage />;
      case "Value":
        if (!FEATURE_FLAGS.showValuePage) {
          return <HomePage />;
        }
        return (
          <Suspense fallback={<PageSkeleton />}>
            <ValuePage />
          </Suspense>
        );
      case "Projects":
        return (
          <Suspense fallback={<PageSkeleton />}>
            <ProjectsPage />
          </Suspense>
        );

      case "Education":
        return (
          <Suspense fallback={<PageSkeleton />}>
            <EducationPage />
          </Suspense>
        );
      case "Work Experience":
        return (
          <Suspense fallback={<PageSkeleton />}>
            <WorkExperiencePage />
          </Suspense>
        );
      case "Honors":
        return (
          <Suspense fallback={<PageSkeleton />}>
            <HonorsPage />
          </Suspense>
        );
      case "More":
        return (
          <Suspense fallback={<PageSkeleton />}>
            <ContactPage />
          </Suspense>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="dark:bg-dark-bg flex min-h-screen bg-gray-200 font-sans text-gray-800 dark:text-gray-400">
      <Toast />
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isSidebarOpen}
          setActivePage={setActivePage}
          activePage={activePage}
        />
      </div>
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setActivePage={setActivePage}
          activePage={activePage}
        />
        <main className="dark:bg-dark-bg flex-1 overflow-y-auto bg-gray-100">
          <div
            key={activePage}
            className="animate-page-enter p-4 sm:p-6 md:p-8"
          >
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
