import type { ReactNode } from "react";

export interface SectionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, children, className = "" }: SectionProps) => (
  <div
    className={`bevel-light dark:neumorphic-outset-dark dark:bg-dark-card mb-8 rounded-2xl bg-gray-100 ${className}`}
  >
    <h2 className="mb-6 border-b-2 border-gray-300 p-6 text-3xl font-bold text-red-500 dark:border-gray-700">
      {title}
    </h2>
    <div className="px-6 pb-6">{children}</div>
  </div>
);

export default Section;
