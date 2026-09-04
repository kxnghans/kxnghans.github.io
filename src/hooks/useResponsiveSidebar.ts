/**
 * @file useResponsiveSidebar.ts
 * @description Controls responsive collapsible sidebar drawer behaviors, screen resize throttling,
 * medium-screen auto-dismissal timeouts, and outside interaction capture.
 */

import { useState, useEffect, useRef, type RefObject } from "react";

export interface UseResponsiveSidebarResult {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  isMediumScreen: boolean;
}

export const useResponsiveSidebar = (): UseResponsiveSidebarResult => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Throttled window resize handler syncing medium-screen viewport breakpoint
  useEffect(() => {
    let rafId: number | undefined;
    const handleResize = () => {
      if (rafId !== undefined) return;
      rafId = requestAnimationFrame(() => {
        setIsMediumScreen(window.innerWidth < 1024);
        rafId = undefined;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);

  // Auto-collapse open sidebar after 5 seconds of inactivity on smaller viewports
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isMediumScreen && isSidebarOpen) {
      timer = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isMediumScreen, isSidebarOpen]);

  // Capture outside clicks, touches, or scroll interactions to close sidebar
  useEffect(() => {
    const handleInteraction = (e: Event) => {
      if (
        isMediumScreen &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("click", handleInteraction, true);
    window.addEventListener("touchstart", handleInteraction, true);
    window.addEventListener("scroll", handleInteraction, true);

    return () => {
      window.removeEventListener("click", handleInteraction, true);
      window.removeEventListener("touchstart", handleInteraction, true);
      window.removeEventListener("scroll", handleInteraction, true);
    };
  }, [isMediumScreen, isSidebarOpen]);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarRef,
    isMediumScreen,
  };
};
