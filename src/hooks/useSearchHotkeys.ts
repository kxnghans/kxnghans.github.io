/**
 * @file useSearchHotkeys.ts
 * @description Manages global keyboard shortcuts for search interaction (Ctrl+K, Cmd+K, /, Esc).
 * Prevents key interception when users are editing text in form fields.
 */

import { useEffect, type RefObject } from "react";

export interface UseSearchHotkeysOptions {
  inputRef: RefObject<HTMLInputElement | null>;
  isSearchVisible: boolean;
  setIsSearchVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
  onClearSearch: () => void;
}

export const useSearchHotkeys = ({
  inputRef,
  isSearchVisible,
  setIsSearchVisible,
  onClearSearch,
}: UseSearchHotkeysOptions): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac =
        typeof window !== "undefined" &&
        /Mac|iPhone|iPod|iPad/.test(window.navigator?.userAgent || "");
      const isCmdOrCtrlK =
        (isMac ? event.metaKey : event.ctrlKey) &&
        (event.key === "k" || event.key === "K");
      const isSlash = event.key === "/";

      // Detect whether user is actively typing inside a form or content-editable element
      const activeElement = document.activeElement as HTMLElement | null;
      const isEditingText =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable);

      // Trigger search focus on Ctrl+K, Cmd+K, or '/' (when not editing another field)
      if (isCmdOrCtrlK || (isSlash && !isEditingText)) {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select?.();
        } else {
          setIsSearchVisible(true);
        }
        return;
      }

      // Clear search query and dismiss active focus when Escape is pressed
      if (event.key === "Escape") {
        if (document.activeElement === inputRef.current || isSearchVisible) {
          event.preventDefault();
          onClearSearch();
          inputRef.current?.blur();
          setIsSearchVisible(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef, isSearchVisible, onClearSearch, setIsSearchVisible]);
};
