import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  className?: string;
}

export default function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAllSelected =
    selected.includes("All") ||
    selected.length === 0 ||
    selected.length === options.length;

  const displayText = isAllSelected
    ? "All"
    : selected.length === 1
      ? selected[0]
      : `${selected.length} Selected`;

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("touchstart", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const renderOptionRow = (option: string, active: boolean) => (
    <button
      key={option}
      type="button"
      role="option"
      aria-selected={active}
      onClick={() => onToggle(option)}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-800/70"
    >
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
          active
            ? "border-red-500 bg-red-500 text-white"
            : "border-gray-400/60 bg-transparent dark:border-gray-600"
        }`}
      >
        {active && <FaCheck className="h-2.5 w-2.5" />}
      </div>
      <span className="truncate">{option}</span>
    </button>
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-1 flex-col gap-1.5 min-w-[170px] ${className}`}
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </span>
        {!isAllSelected && (
          <span className="rounded-full bg-red-500/15 px-1.5 py-0.2 text-[10px] font-black text-red-600 dark:text-red-400">
            {selected.length} active
          </span>
        )}
      </div>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Filter by ${label}: currently ${displayText}`}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex h-10 w-full cursor-pointer select-none items-center justify-between rounded-xl px-3.5 text-sm font-medium transition-all duration-200 hover:brightness-105 active:scale-[0.98] ${
          !isAllSelected
            ? "border border-red-500/30 text-red-600 dark:text-red-400 font-bold shadow-sm"
            : "text-gray-800 dark:text-gray-200"
        }`}
      >
        <span
          className={`truncate ${
            isAllSelected
              ? "text-gray-600 dark:text-gray-400"
              : "font-bold text-red-600 dark:text-red-400"
          }`}
        >
          {displayText}
        </span>
        <FaChevronDown
          className={`ml-2 h-3 w-3 shrink-0 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-red-500" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={`Options for ${label}`}
          className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card absolute top-full left-0 z-50 mt-2 w-72 sm:w-80 max-h-76 overflow-y-auto rounded-2xl border border-gray-300/80 p-3 shadow-2xl backdrop-blur-md dark:border-gray-700/80"
        >
          <div className="mb-2 flex items-center justify-between border-b border-gray-300/60 pb-2 px-1 dark:border-gray-700/60">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Select {label}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-600 hover:bg-red-500/20 active:scale-95 dark:text-red-400"
            >
              Done
            </button>
          </div>
          <div className="space-y-1">
            {renderOptionRow("All", isAllSelected)}
            {options.map((opt) =>
              renderOptionRow(opt, selected.includes(opt) && !isAllSelected),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
