import type { ReactNode } from "react";
import { UI_SURFACES } from "../../theme";

export interface SectionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, children, className = "" }: SectionProps) => (
  <div className={`${UI_SURFACES.section} ${className}`}>
    <h2 className="mb-6 border-b-2 border-gray-300 p-6 text-3xl font-bold text-red-600 dark:border-gray-700 dark:text-red-500">
      {title}
    </h2>
    <div className="px-6 pb-6">{children}</div>
  </div>
);

export default Section;
