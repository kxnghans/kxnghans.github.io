import React from 'react';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Page Components
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import EducationPage from './pages/EducationPage';
import WorkExperiencePage from './pages/WorkExperiencePage';
import HonorsPage from './pages/HonorsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth >= 768);
    const [activePage, setActivePage] = React.useState('Home');
    const [theme, setTheme] = React.useState('dark');
    const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 768);
    const sidebarRef = React.useRef(null);

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    React.useEffect(() => {
        const handleResize = () => {
            const small = window.innerWidth < 768;
            setIsSmallScreen(small);
            if (!small) {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        let timer;
        if (isSmallScreen && isSidebarOpen) {
            timer = setTimeout(() => {
                setIsSidebarOpen(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isSmallScreen, isSidebarOpen]);

    React.useEffect(() => {
        const handleInteraction = (e) => {
            if (isSmallScreen && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        document.addEventListener('scroll', handleInteraction, true);

        return () => {
            document.removeEventListener('mousedown', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('scroll', handleInteraction, true);
        };
    }, [isSmallScreen, isSidebarOpen]);

    const renderPage = () => {
        switch (activePage) {
            case 'Home': return <HomePage />;
            case 'Projects': return <ProjectsPage />;
            case 'Education': return <EducationPage />;
            case 'Work Experience': return <WorkExperiencePage />;
            case 'Honors': return <HonorsPage />;
            case 'More': return <ContactPage />;
            default: return <HomePage />;
        }
    };

    return (
        <div className="bg-gray-200 dark:bg-dark-bg text-gray-800 dark:text-gray-400 min-h-screen font-sans flex">
            <div ref={sidebarRef}>
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    setActivePage={setActivePage} 
                    activePage={activePage} 
                    theme={theme} 
                    setTheme={setTheme} 
                />
            </div>
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header 
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
                    setActivePage={setActivePage} 
                    activePage={activePage} 
                />
                <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-dark-bg">
                    <div className="p-4 sm:p-6 md:p-8">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
}