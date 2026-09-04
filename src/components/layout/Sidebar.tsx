/**
 * @file Sidebar.tsx
 * @description Collapsible vertical navigation drawer with route links, section icons,
 * and dark/light mode toggle control.
 */

import { useMemo } from "react";
import { Icon, ICONS } from "../icons";
import { useTheme } from "../../context/ThemeContext";
import { FEATURE_FLAGS } from "../../config/features";

export interface SidebarProps {
  isOpen: boolean;
  setActivePage: (page: string) => void;
  activePage: string;
}

const Sidebar = ({ isOpen, setActivePage, activePage }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();

  // Memoize navigation configuration to avoid array recreation per render
  const navItems = useMemo(
    () => [
      { name: "Home", icon: <Icon name={ICONS.HOME} /> },
      { name: "Education", icon: <Icon name={ICONS.EDUCATION} /> },
      { name: "Work Experience", icon: <Icon name={ICONS.WORK} /> },
      { name: "Projects", icon: <Icon name={ICONS.SKILLS} /> },
      { name: "Honors", icon: <Icon name={ICONS.MEDAL} /> },
      ...(FEATURE_FLAGS.showValuePage
        ? [{ name: "Value", icon: <Icon name={ICONS.VALUE} /> }]
        : []),
      { name: "More", icon: <Icon name={ICONS.MENU} /> },
    ],
    [],
  );

  return (
    <aside
      className={`dark:bg-dark-header sticky top-0 z-50 flex h-screen flex-col border-r border-gray-300 bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out dark:border-gray-800 dark:text-gray-300 ${
        isOpen ? "w-56" : "w-25"
      }`}
    >
      <nav aria-label="Main Navigation" className="mt-8 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="px-4">
              <button
                type="button"
                onClick={() => setActivePage(item.name)}
                aria-label={`Navigate to ${item.name}`}
                aria-current={activePage === item.name ? "page" : undefined}
                className={`my-1 flex w-full items-center rounded-lg p-2 transition-colors duration-200 ${
                  activePage === item.name
                    ? "bg-red-600/15 text-red-600 dark:bg-red-600/20 dark:text-red-500"
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
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="flex w-full items-center rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-[1.4rem]">
            {theme === "dark" ? (
              <Icon name={ICONS.SUN} />
            ) : (
              <Icon name={ICONS.MOON} />
            )}
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
