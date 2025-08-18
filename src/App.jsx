import React from 'react';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Page Components
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import EducationPage from './pages/EducationPage';
import WorkExperiencePage from './pages/WorkExperiencePage';
import AwardsPage from './pages/AwardsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [activePage, setActivePage] = React.useState('Home');
    const [theme, setTheme] = React.useState('dark');

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    const renderPage = () => {
        switch (activePage) {
            case 'Home': return <HomePage />;
            case 'Projects': return <ProjectsPage />;
            case 'Education': return <EducationPage />;
            case 'Work Experience': return <WorkExperiencePage />;
            case 'Awards': return <AwardsPage />;
            case 'More': return <ContactPage />;
            default: return <HomePage />;
        }
    };

    return (
        <div className="bg-gray-200 dark:bg-dark-bg text-gray-800 dark:text-gray-400 min-h-screen font-sans flex">
            <Sidebar 
                isOpen={isSidebarOpen} 
                setActivePage={setActivePage} 
                activePage={activePage} 
                theme={theme} 
                setTheme={setTheme} 
            />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header 
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
                    setActivePage={setActivePage} 
                />
                <main className={`flex-1 overflow-y-auto bg-gray-100 dark:bg-dark-bg ${activePage === 'Home' ? 'overflow-y-hidden' : ''}`}>
                    <div className={`p-4 sm:p-6 md:p-8 ${activePage === 'Home' ? 'h-full flex flex-col' : ''}`}>
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
}