import React from "react";
import {
  FaHome,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaMedal,
  FaBars,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setActivePage, activePage, theme, setTheme }) => {
  const navItems = [
    {
      name: "Home",
      icon: (
        <div className="text-[1.6rem]">
          <FaHome />
        </div>
      ),
    },
    {
      name: "Education",
      icon: (
        <div className="text-[1.6rem]">
          <FaGraduationCap />
        </div>
      ),
    },
    {
      name: "Work Experience",
      icon: (
        <div className="text-[1.6rem]">
          <FaBriefcase />
        </div>
      ),
    },
    {
      name: "Projects",
      icon: (
        <div className="text-[1.6rem]">
          <FaCode />
        </div>
      ),
    },
    {
      name: "Honors",
      icon: (
        <div className="text-[1.6rem]">
          <FaMedal />
        </div>
      ),
    },
    {
      name: "More",
      icon: (
        <div className="text-[1.6rem]">
          <FaBars />
        </div>
      ),
    },
  ];

  return (
    <aside
      className={`sticky top-0 z-50 flex h-screen flex-col border-r border-gray-300 bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-[#181818] dark:text-gray-300 ${isOpen ? "w-64" : "w-20"}`}
    >
      <nav className="mt-8 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="px-2">
              <button
                onClick={() => setActivePage(item.name)}
                className={`my-1 flex items-center rounded-lg transition-colors duration-200 ${isOpen ? "w-full justify-start p-3" : "flex h-14 w-14 items-center justify-center"} ${activePage === item.name ? "bg-red-600/20 text-red-500" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span
                  className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? "ml-4 opacity-100" : "pointer-events-none h-0 w-0 opacity-0"}`}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mb-5 px-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`flex w-full items-center rounded-lg p-3 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 ${isOpen ? "justify-start" : "justify-center"}`}
        >
          <div className="flex-shrink-0 text-[1.4rem]">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </div>
          <span
            className={`ml-4 whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "pointer-events-none h-0 w-0 opacity-0"}`}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
