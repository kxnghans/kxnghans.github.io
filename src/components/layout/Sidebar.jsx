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
    { name: "Home", icon: <FaHome /> },
    { name: "Education", icon: <FaGraduationCap /> },
    { name: "Work Experience", icon: <FaBriefcase /> },
    { name: "Projects", icon: <FaCode /> },
    { name: "Honors", icon: <FaMedal /> },
    { name: "More", icon: <FaBars /> },
  ];

  return (
    <aside
      className={`sticky top-0 z-50 flex h-screen flex-col border-r border-gray-300 bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-[#181818] dark:text-gray-300 ${
        isOpen ? "w-56" : "w-25"
      }`}
    >
      <nav className="mt-8 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="px-4">
              <button
                onClick={() => setActivePage(item.name)}
                className={`my-1 flex w-full items-center rounded-lg p-2 transition-colors duration-200 ${
                  activePage === item.name
                    ? "bg-red-600/20 text-red-500"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-[1.6rem]">
                  {item.icon}
                </div>
                <span
                  className={`whitespace-nowrap transition-all duration-200 ${
                    isOpen ? "ml-2 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mb-5 px-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex w-full items-center rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-[1.4rem]">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </div>
          <span
            className={`whitespace-nowrap transition-all duration-200 ${
              isOpen ? "ml-2 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;