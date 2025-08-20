import React from 'react';
import { HomeIcon, ProjectsIcon, EducationIcon, WorkIcon, HonorsIcon, MoreIcon, SunIcon, MoonIcon } from '../icons/Icons';

const Sidebar = ({ isOpen, setActivePage, activePage, theme, setTheme }) => {
    const navItems = [
        { name: 'Home', icon: <HomeIcon /> },
        { name: 'Projects', icon: <ProjectsIcon /> },
        { name: 'Education', icon: <EducationIcon /> },
        { name: 'Work Experience', icon: <WorkIcon /> },
        { name: 'Honors', icon: <HonorsIcon /> },
        { name: 'More', icon: <MoreIcon /> },
    ];

    return (
        <aside className={`bg-gray-100 dark:bg-[#181818] text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out h-screen sticky top-0 z-50 flex flex-col border-r border-gray-300 dark:border-gray-800 ${isOpen ? 'w-64' : 'w-20'}`}>
            <nav className="mt-8 flex-1">
                <ul>
                    {navItems.map(item => (
                        <li key={item.name} className="px-2">
                            <button
                                onClick={() => setActivePage(item.name)}
                                className={`flex items-center my-1 rounded-lg transition-colors duration-200 ${isOpen ? 'justify-start w-full p-3' : 'w-14 h-14 flex justify-center items-center'} ${activePage === item.name ? 'bg-red-600/20 text-red-500' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
                                <div className="flex-shrink-0">{item.icon}</div>
                                <span className={`ml-4 whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 w-0 ml-0 pointer-events-none'}`}>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="px-2 mb-5">
                 <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${isOpen ? 'justify-start' : 'justify-center'}`}
                >
                    <div className="flex-shrink-0">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</div>
                    <span className={`ml-4 whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 w-0 pointer-events-none'}`}>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;