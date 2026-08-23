import type { SearchableItem } from "../types/search";
import { navOrder } from "../data/navigation";

// Tech term aliases and synonyms for enhanced recall
const ALIASES: Record<string, string[]> = {
  "next.js": ["nextjs", "next"],
  nextjs: ["next.js", "next"],
  "react.js": ["reactjs", "react"],
  reactjs: ["react.js", "react"],
  "node.js": ["nodejs", "node"],
  nodejs: ["node.js", "node"],
  "vue.js": ["vuejs", "vue"],
  vuejs: ["vue.js", "vue"],
  "c#": ["csharp"],
  csharp: ["c#"],
  "c++": ["cpp"],
  cpp: ["c++"],
  typescript: ["ts"],
  ts: ["typescript"],
  javascript: ["js"],
  js: ["javascript"],
  postgres: ["postgresql"],
  postgresql: ["postgres"],
  tailwind: ["tailwindcss"],
  tailwindcss: ["tailwind"],
  "react native": ["react-native"],
  "react-native": ["react native"],
  ai: ["artificial intelligence", "machine learning", "ml"],
  ml: ["machine learning", "ai"],
  ui: ["ux", "frontend", "front-end"],
  ux: ["ui", "design"],
  aws: ["amazon web services"],
  gcp: ["google cloud"],
  "ci/cd": ["cicd", "devops"],
  cicd: ["ci/cd", "devops"],
  tpm: ["technical program manager", "project management", "scrum", "agile", "leadership", "program management"],
  scrum: ["scrum master", "agile", "sprint", "kanban"],
  agile: ["scrum", "kanban", "safe", "sprint"],
  conops: ["concept of operations", "governance", "architecture"],
  governance: ["arb", "carb", "sia", "conops", "compliance"],
  roi: ["cost savings", "operational savings", "business analysis"],
  ba: ["business analyst", "business analysis"],
};

/**
 * Escapes regex special characters to prevent regex crashes.
 */
export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Normalizes text for consistent matching: lowercases, trims, and strips accents.
 */
export const normalizeText = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

/**
 * Splits text into normalized search tokens while preserving alphanumeric and special tech keywords.
 */
export const tokenize = (text: string): string[] => {
  if (!text) return [];
  const normalized = normalizeText(text);
  // Split on whitespace and common punctuation, while preserving terms like c++, c#, .net
  const rawTokens = normalized
    .replace(/[,;:!?()[\]{}"'’`]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const tokens = new Set<string>();

  rawTokens.forEach((token) => {
    tokens.add(token);
    // Also include dotless version if token contains dot (e.g. next.js -> nextjs)
    if (token.includes(".")) {
      const dotless = token.replace(/\./g, "");
      if (dotless) tokens.add(dotless);
    }
    // Also include hyphenless version
    if (token.includes("-")) {
      const hyphenless = token.replace(/-/g, "");
      if (hyphenless) tokens.add(hyphenless);
    }
    // Check aliases
    const aliasList = ALIASES[token];
    if (aliasList) {
      aliasList.forEach((a) => tokens.add(a));
    }
  });

  return Array.from(tokens);
};

/**
 * Fast Levenshtein distance for typo tolerance.
 */
export const levenshteinDistance = (a: string, b: string): number => {
  if (a === b) return 0;
  const aLen = a.length;
  const bLen = b.length;
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;
  if (Math.abs(aLen - bLen) > 2) return 99; // Early exit if length difference is too large

  const row = Array.from({ length: bLen + 1 }, (_, i) => i);

  for (let i = 1; i <= aLen; i++) {
    let prev = i;
    const aChar = a.charCodeAt(i - 1);
    for (let j = 1; j <= bLen; j++) {
      const bChar = b.charCodeAt(j - 1);
      const cost = aChar === bChar ? 0 : 1;
      const val = Math.min(row[j] + 1, prev + 1, row[j - 1] + cost);
      row[j - 1] = prev;
      prev = val;
    }
    row[bLen] = prev;
  }

  return row[bLen];
};

interface IndexedDocument {
  item: SearchableItem;
  titleNorm: string;
  subtitleNorm: string;
  tagsNorm: string[];
  summaryNorm: string;
  contentNorm: string;
  titleTokens: string[];
  subtitleTokens: string[];
  tagsTokens: string[];
  summaryTokens: string[];
  contentTokens: string[];
  categoryOrder: number;
}

export class SearchEngine {
  private indexedDocs: IndexedDocument[] = [];
  private cache: Map<string, SearchableItem[]> = new Map();
  private maxCacheSize = 150;

  constructor(items: SearchableItem[] = []) {
    this.indexItems(items);
  }

  public indexItems(items: SearchableItem[]): void {
    this.cache.clear();
    this.indexedDocs = items.map((item) => {
      const titleNorm = normalizeText(item.title);
      const subtitleNorm = normalizeText(item.subtitle || "");
      const tagsNorm = (item.tags || []).map(normalizeText);
      const summaryNorm = normalizeText(item.summary || "");
      const contentNorm = normalizeText(item.content || "");

      const categoryOrder = navOrder.indexOf(item.category);

      return {
        item,
        titleNorm,
        subtitleNorm,
        tagsNorm,
        summaryNorm,
        contentNorm,
        titleTokens: tokenize(item.title),
        subtitleTokens: tokenize(item.subtitle || ""),
        tagsTokens: (item.tags || []).flatMap(tokenize),
        summaryTokens: tokenize(item.summary || ""),
        contentTokens: tokenize(item.content || ""),
        categoryOrder: categoryOrder >= 0 ? categoryOrder : 99,
      };
    });
  }

  /**
   * Searches indexed items using field weighting, token scoring, and fuzzy fallback.
   */
  public search(query: string): SearchableItem[] {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const cacheKey = trimmed.toLowerCase();
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const queryNorm = normalizeText(trimmed);
    const queryTokens = tokenize(trimmed);
    if (queryTokens.length === 0) return [];

    const scoredResults: { item: SearchableItem; score: number; categoryOrder: number }[] = [];

    for (const doc of this.indexedDocs) {
      let score = 0;
      let matchedTokensCount = 0;

      // 1. Exact full query phrase matching
      if (doc.titleNorm === queryNorm) {
        score += 2000;
      } else if (doc.titleNorm.startsWith(queryNorm)) {
        score += 1200;
      } else if (doc.titleNorm.includes(queryNorm)) {
        score += 800;
      }

      if (doc.subtitleNorm && doc.subtitleNorm.includes(queryNorm)) {
        score += 450;
      }

      if (doc.tagsNorm.some((tag) => tag === queryNorm || tag.includes(queryNorm))) {
        score += 600;
      }

      if (doc.summaryNorm && doc.summaryNorm.includes(queryNorm)) {
        score += 300;
      }

      if (doc.contentNorm && doc.contentNorm.includes(queryNorm)) {
        score += 150;
      }

      // 2. Multi-token scoring across weighted fields
      for (const qToken of queryTokens) {
        let tokenMatched = false;
        let tokenScore = 0;

        // Check Title (Weight: 10)
        for (const t of doc.titleTokens) {
          if (t === qToken) {
            tokenScore = Math.max(tokenScore, 150);
            tokenMatched = true;
          } else if (t.startsWith(qToken) && qToken.length >= 2) {
            tokenScore = Math.max(tokenScore, 90);
            tokenMatched = true;
          } else if (t.includes(qToken) && qToken.length >= 3) {
            tokenScore = Math.max(tokenScore, 40);
            tokenMatched = true;
          }
        }

        // Check Tags (Weight: 8)
        for (const t of doc.tagsTokens) {
          if (t === qToken) {
            tokenScore = Math.max(tokenScore, 130);
            tokenMatched = true;
          } else if (t.startsWith(qToken) && qToken.length >= 2) {
            tokenScore = Math.max(tokenScore, 80);
            tokenMatched = true;
          } else if (t.includes(qToken) && qToken.length >= 3) {
            tokenScore = Math.max(tokenScore, 35);
            tokenMatched = true;
          }
        }

        // Check Subtitle (Weight: 6)
        for (const t of doc.subtitleTokens) {
          if (t === qToken) {
            tokenScore = Math.max(tokenScore, 100);
            tokenMatched = true;
          } else if (t.startsWith(qToken) && qToken.length >= 2) {
            tokenScore = Math.max(tokenScore, 60);
            tokenMatched = true;
          } else if (t.includes(qToken) && qToken.length >= 3) {
            tokenScore = Math.max(tokenScore, 25);
            tokenMatched = true;
          }
        }

        // Check Summary (Weight: 4)
        for (const t of doc.summaryTokens) {
          if (t === qToken) {
            tokenScore = Math.max(tokenScore, 60);
            tokenMatched = true;
          } else if (t.startsWith(qToken) && qToken.length >= 2) {
            tokenScore = Math.max(tokenScore, 35);
            tokenMatched = true;
          } else if (t.includes(qToken) && qToken.length >= 3) {
            tokenScore = Math.max(tokenScore, 15);
            tokenMatched = true;
          }
        }

        // Check Content (Weight: 2)
        for (const t of doc.contentTokens) {
          if (t === qToken) {
            tokenScore = Math.max(tokenScore, 25);
            tokenMatched = true;
          } else if (t.startsWith(qToken) && qToken.length >= 3) {
            tokenScore = Math.max(tokenScore, 12);
            tokenMatched = true;
          }
        }

        // 3. Typo-tolerant fuzzy matching (for query tokens >= 4 characters)
        if (!tokenMatched && qToken.length >= 4) {
          const maxDistance = qToken.length >= 7 ? 2 : 1;

          // Fuzzy check on Title & Tags
          const highPriorityTokens = [...doc.titleTokens, ...doc.tagsTokens];
          for (const t of highPriorityTokens) {
            if (t.length >= 4 && levenshteinDistance(qToken, t) <= maxDistance) {
              tokenScore = Math.max(tokenScore, 45);
              tokenMatched = true;
              break;
            }
          }

          // Fuzzy check on Subtitle & Summary
          if (!tokenMatched) {
            const medPriorityTokens = [...doc.subtitleTokens, ...doc.summaryTokens];
            for (const t of medPriorityTokens) {
              if (t.length >= 4 && levenshteinDistance(qToken, t) <= maxDistance) {
                tokenScore = Math.max(tokenScore, 25);
                tokenMatched = true;
                break;
              }
            }
          }
        }

        if (tokenMatched) {
          matchedTokensCount++;
          score += tokenScore;
        }
      }

      // If multiple query tokens exist, award a bonus if all or most tokens matched
      if (queryTokens.length > 1 && matchedTokensCount > 0) {
        const matchRatio = matchedTokensCount / queryTokens.length;
        if (matchRatio === 1) {
          score *= 1.6; // All terms matched bonus
        } else if (matchRatio >= 0.5) {
          score *= 1.1;
        } else {
          score *= 0.6; // Heavy penalty if fewer than half tokens matched
        }
      }

      if (score > 0) {
        scoredResults.push({
          item: doc.item,
          score,
          categoryOrder: doc.categoryOrder,
        });
      }
    }

    // Primary sort: Category Order (navOrder), Secondary sort: Relevance Score descending within each category
    scoredResults.sort((a, b) => {
      if (a.categoryOrder !== b.categoryOrder) {
        return a.categoryOrder - b.categoryOrder;
      }
      return b.score - a.score;
    });


    const results = scoredResults.map((r) => r.item);

    // Save to LRU cache
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, results);

    return results;
  }
}
