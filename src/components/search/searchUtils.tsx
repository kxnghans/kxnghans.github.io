import type { ReactNode } from "react";
import { escapeRegExp } from "../../utils/searchEngine";

export interface HighlightProps {
  text: string;
  highlight: string;
}

/**
 * Renders text with all matching query tokens highlighted safely with regex escaping.
 */
export const Highlight = ({ text, highlight }: HighlightProps): ReactNode => {
  if (!highlight.trim() || !text) {
    return <span>{text}</span>;
  }

  // Extract individual query tokens, stripping punctuation
  const tokens = highlight
    .split(/\s+/)
    .map((t) => t.replace(/[,;:!?()[\]{}"'’`]/g, "").trim())
    .filter((t) => t.length > 0);

  if (tokens.length === 0) {
    return <span>{text}</span>;
  }

  // Match longer tokens first to avoid partial truncation
  const pattern = tokens
    .map(escapeRegExp)
    .sort((a, b) => b.length - a.length)
    .join("|");

  try {
    const regex = new RegExp(`(${pattern})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span
              key={i}
              className="rounded-xs bg-red-500/15 px-0.5 font-semibold text-red-600 dark:bg-red-500/25 dark:text-red-400"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  } catch {
    return <span>{text}</span>;
  }
};

/**
 * Truncates text intelligently, centering around the first occurrence of any query token.
 */
export const smartTruncate = (
  str: string,
  numWords: number,
  query: string,
): string => {
  if (!str) return "";
  const words = str.split(/\s+/).filter(Boolean);
  if (words.length <= numWords) return str;

  const lowerCaseStr = str.toLowerCase();
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[,;:!?()[\]{}"'’`]/g, "").trim())
    .filter((t) => t.length > 1);

  // Find the earliest matching query token in the string
  let queryIndex = -1;
  for (const token of tokens) {
    const idx = lowerCaseStr.indexOf(token);
    if (idx !== -1 && (queryIndex === -1 || idx < queryIndex)) {
      queryIndex = idx;
    }
  }

  if (queryIndex !== -1) {
    let charCount = 0;
    let wordIndex = 0;
    for (let i = 0; i < words.length; i++) {
      charCount += words[i].length + 1;
      if (charCount > queryIndex) {
        wordIndex = i;
        break;
      }
    }

    const half = Math.floor(numWords / 2);
    const start = Math.max(0, wordIndex - half);
    const end = Math.min(words.length, start + numWords);

    let snippet = words.slice(start, end).join(" ");
    if (start > 0) snippet = `...${snippet}`;
    if (end < words.length) snippet = `${snippet}...`;
    return snippet;
  }

  return `${words.slice(0, numWords).join(" ")}...`;
};
