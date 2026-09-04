/**
 * @file App.tsx
 * @description Main application shell, state-based view router, Suspense boundaries,
 * and layout coordination for Hanson-Tube.
 */

import { useState, lazy, Suspense } from "react";
import Toast from "./components/ui/Toast";
import PageSkeleton from "./components/ui/PageSkeleton";
import { usePWA } from "./hooks/usePWA";
import { useResponsiveSidebar } from "./hooks/useResponsiveSidebar";
import { FEATURE_FLAGS } from "./config/features";

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

export default function App() {
  usePWA();
  const [activePage, setActivePage] = useState<string>("Home");
  const { isSidebarOpen, setIsSidebarOpen, sidebarRef } =
    useResponsiveSidebar();

  // Dynamic route dispatcher resolving eager home or lazy code-split pages
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
