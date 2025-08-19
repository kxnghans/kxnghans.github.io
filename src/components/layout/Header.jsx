import React, { useState } from 'react';
import { MenuIcon, SearchIcon, MicIcon } from '../icons/Icons';

const Header = ({ toggleSidebar, setActivePage, activePage }) => {
    const [isMicActive, setIsMicActive] = useState(false);

    const toggleMic = () => {
        setIsMicActive(!isMicActive);
    };

    return (
        <header className="bg-gray-100/80 dark:bg-[#181818]/90 backdrop-blur-sm p-3 flex justify-between items-center sticky top-0 z-40 border-b border-gray-300 dark:border-gray-800">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors mr-4">
                    <MenuIcon />
                </button>
                <div className="flex items-center cursor-pointer" onClick={() => setActivePage('Home')}>
                     <svg className="w-8 h-8 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                     </svg>
                    <h1 className="text-xl font-bold tracking-wider hidden sm:block">Kobby Hanson</h1>
                </div>
            </div>
            <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center">
                <div className="relative w-full">
                    <input type="text" placeholder="Search" className="w-full bg-gray-200 dark:bg-black rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:outline-none bevel-light-inset dark:bevel-dark-inset" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                    </div>
                </div>
                <button onClick={toggleMic} className={`ml-3 p-2 rounded-full transition-colors ${isMicActive ? 'bg-red-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-800 bevel-light-inset dark:bevel-dark-inset'}`}>
                    <MicIcon className={isMicActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'} />
                </button>
            </div>
            <div className="flex items-center">
                <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile"
                    className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-transparent hover:border-red-500 transition-all ${activePage === 'Home' ? 'opacity-0' : 'opacity-100'}`}
                    onClick={() => setActivePage('Home')}
                />
            </div>
        </header>
    );
};

export default Header;