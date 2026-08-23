import type { ReactElement } from "react";

export interface ModalCARSectionProps {
  challenge?: string;
  action?: string;
  outcome?: string;
}

export const ModalCARSection = ({
  challenge,
  action,
  outcome,
}: ModalCARSectionProps): ReactElement | null => {
  if (!challenge && !action && !outcome) {
    return null;
  }

  return (
    <div className="space-y-2 text-sm sm:text-base">
      {challenge && (
        <div className="rounded-l-lg rounded-r-md border-l-4 border-red-600 bg-red-500/[0.07] px-3.5 py-2 leading-relaxed dark:border-red-500 dark:bg-red-500/[0.06]">
          <span className="mr-1.5 font-bold text-red-600 dark:text-red-400">
            Challenge:
          </span>
          <span className="text-gray-700 dark:text-gray-200">{challenge}</span>
        </div>
      )}

      {action && (
        <div className="rounded-l-lg rounded-r-md border-l-4 border-blue-600 bg-blue-500/[0.07] px-3.5 py-2 leading-relaxed dark:border-[#3ea6ff] dark:bg-[#3ea6ff]/[0.06]">
          <span className="mr-1.5 font-bold text-blue-600 dark:text-[#3ea6ff]">
            Action:
          </span>
          <span className="text-gray-700 dark:text-gray-200">{action}</span>
        </div>
      )}

      {outcome && (
        <div className="rounded-l-lg rounded-r-md border-l-4 border-emerald-600 bg-emerald-500/[0.07] px-3.5 py-2 leading-relaxed dark:border-emerald-500 dark:bg-emerald-500/[0.06]">
          <span className="mr-1.5 font-bold text-emerald-700 dark:text-emerald-400">
            Outcome:
          </span>
          <span className="text-gray-700 dark:text-gray-200">{outcome}</span>
        </div>
      )}
    </div>
  );
};

export default ModalCARSection;
