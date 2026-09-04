/**
 * @file routePreloaders.ts
 * @description Predictive prefetch engine for dynamic code-split route chunks.
 * Leverages hover/focus intents and browser idle periods to eliminate loading skeletons.
 */

type RouteLoader = () => Promise<unknown>;

/**
 * Registry of dynamic route loaders mapping route names to code-split chunk imports.
 */
export const ROUTE_LOADERS: Record<string, RouteLoader> = {
  Value: () => import("../pages/ValuePage"),
  Projects: () => import("../pages/ProjectsPage"),
  Education: () => import("../pages/EducationPage"),
  "Work Experience": () => import("../pages/WorkExperiencePage"),
  Honors: () => import("../pages/HonorsPage"),
  More: () => import("../pages/ContactPage"),
};

// Internal set tracking successfully initiated or completed route prefetches
const prefetchedRoutes = new Set<string>();

/**
 * Detects whether the user agent has enabled Data Saver mode to conserve network bandwidth.
 */
export const isDataSaverActive = (): boolean => {
  if (typeof navigator === "undefined") return false;
  // NetworkInformation interface is available in Chromium-based browsers
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  return Boolean(nav.connection?.saveData);
};

/**
 * Preloads a specific dynamic route chunk if not already loaded and Data Saver is inactive.
 *
 * @param routeName - The navigation route identifier (e.g. "Projects", "Education")
 */
export const prefetchRoute = (routeName: string): void => {
  if (isDataSaverActive()) return;
  if (prefetchedRoutes.has(routeName)) return;

  const loader = ROUTE_LOADERS[routeName];
  if (loader) {
    prefetchedRoutes.add(routeName);
    loader().catch(() => {
      // Delete on error to allow future retry attempts
      prefetchedRoutes.delete(routeName);
    });
  }
};

/**
 * Sequentially prefetches all code-split routes during browser idle windows post-hydration.
 */
export const prefetchAllRoutesIdle = (): void => {
  if (isDataSaverActive() || typeof window === "undefined") return;

  const routes = Object.keys(ROUTE_LOADERS);
  let currentIndex = 0;

  // Progressively schedules the next route chunk during browser idle time
  const scheduleNext = () => {
    if (currentIndex >= routes.length) return;
    const nextRoute = routes[currentIndex++];
    prefetchRoute(nextRoute);

    if (currentIndex < routes.length) {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(scheduleNext, { timeout: 2000 });
      } else {
        setTimeout(scheduleNext, 250);
      }
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(scheduleNext, { timeout: 1500 });
  } else {
    setTimeout(scheduleNext, 500);
  }
};

/**
 * Helper to reset prefetch cache (primarily for unit test isolation).
 */
export const resetPrefetchedRoutes = (): void => {
  prefetchedRoutes.clear();
};
