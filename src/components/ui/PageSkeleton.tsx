/**
 * @file PageSkeleton.tsx
 * @description Neumorphic placeholder skeleton displayed while lazy-loaded page routes
 * resolve within React Suspense boundaries.
 */

import { UI_SURFACES } from "../../theme";

export const PageSkeleton = () => (
  <div
    data-testid="page-skeleton"
    className={`${UI_SURFACES.section} transition-opacity duration-300`}
  >
    <div className="border-b-2 border-gray-300 p-6 dark:border-gray-700/60">
      <div className="animate-gentle-pulse h-8 w-48 rounded-lg bg-gray-200/90 dark:bg-white/[0.05]" />
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className={`${UI_SURFACES.cardStatic} transition-all duration-300`}
          >
            <div className="animate-gentle-pulse h-48 w-full bg-gray-300/60 dark:bg-white/[0.04]" />
            <div className="space-y-3 p-4">
              <div className="animate-gentle-pulse h-5 w-3/4 rounded bg-gray-300/70 dark:bg-white/[0.06]" />
              <div className="space-y-2 pt-1">
                <div className="animate-gentle-pulse h-3 w-full rounded bg-gray-300/50 dark:bg-white/[0.03]" />
                <div className="animate-gentle-pulse h-3 w-5/6 rounded bg-gray-300/50 dark:bg-white/[0.03]" />
                <div className="animate-gentle-pulse h-3 w-2/3 rounded bg-gray-300/50 dark:bg-white/[0.03]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PageSkeleton;
