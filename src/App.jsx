import React from "react";
import Toast from "./components/ui/Toast";

// Layout Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

// Page Components
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import EducationPage from "./pages/EducationPage";
import WorkExperiencePage from "./pages/WorkExperiencePage";
import HonorsPage from "./pages/HonorsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(
    window.innerWidth >= 1024,
  );
  const [activePage, setActivePage] = React.useState("Home");
  const [theme, setTheme] = React.useState("dark");
  const [isMediumScreen, setIsMediumScreen] = React.useState(
    window.innerWidth < 1024,
  );
  const sidebarRef = React.useRef(null);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
  }, [theme]);

  React.useEffect(() => {
    const handleResize = () => {
      const medium = window.innerWidth < 1024;
      setIsMediumScreen(medium);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    let timer;
    if (isMediumScreen && isSidebarOpen) {
      timer = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isMediumScreen, isSidebarOpen]);

  React.useEffect(() => {
    const handleInteraction = (e) => {
      if (
        isMediumScreen &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("scroll", handleInteraction, true);

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleInteraction, true);
    };
  }, [isMediumScreen, isSidebarOpen]);

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <HomePage />;
      case "Projects":
        return <ProjectsPage />;
      case "Education":
        return <EducationPage />;
      case "Work Experience":
        return <WorkExperiencePage />;
      case "Honors":
        return <HonorsPage />;
      case "More":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200 font-sans text-gray-800 dark:bg-dark-bg dark:text-gray-400">
      <Toast />
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isSidebarOpen}
          setActivePage={setActivePage}
          activePage={activePage}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setActivePage={setActivePage}
          activePage={activePage}
          theme={theme}
        />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-dark-bg">
          <div className="p-4 sm:p-6 md:p-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}
