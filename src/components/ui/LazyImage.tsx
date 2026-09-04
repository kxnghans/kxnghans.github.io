import {
  useState,
  useEffect,
  useRef,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";
import { Icon, ICONS } from "../icons";

// Session-level in-memory cache of URLs that have successfully loaded
const loadedImageCache = new Set<string>();

/**
 * Checks whether an image URL has already completed loading in the current session.
 */
export const isImageCached = (url?: string): boolean => {
  if (!url) return false;
  return loadedImageCache.has(url);
};

/**
 * Manually records an image URL into the session cache.
 */
export const markImageCached = (url?: string): void => {
  if (url) loadedImageCache.add(url);
};

/**
 * Resets the session image cache (primarily for unit test isolation).
 */
export const clearImageCache = (): void => {
  loadedImageCache.clear();
};

export interface LazyImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "onLoad" | "onError"
> {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string | null;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * Reusable LazyImage component featuring:
 * - Native loading="lazy" & decoding="async"
 * - In-memory session caching for instant 0ms re-renders without skeleton flicker
 * - Neumorphic skeleton shimmer state
 * - Smooth fade-in on load
 * - Fallback handling on error
 */
const LazyImage = ({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  fallbackSrc = null,
  loading = "lazy",
  decoding = "async",
  onLoad,
  onError,
  ...restProps
}: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isInitiallyCached = Boolean(src && loadedImageCache.has(src));
  const [isLoaded, setIsLoaded] = useState<boolean>(isInitiallyCached);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  // Synchronize internal state when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    const cached = Boolean(src && loadedImageCache.has(src));
    setIsLoaded(cached);
    setHasError(false);
  }, [src]);

  // Handle immediate browser-cache completions where onLoad might not fire
  useEffect(() => {
    if (
      imgRef.current?.complete &&
      imgRef.current.naturalWidth > 0 &&
      !isLoaded
    ) {
      if (currentSrc) markImageCached(currentSrc);
      setIsLoaded(true);
    }
  }, [currentSrc, isLoaded]);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc) markImageCached(currentSrc);
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      return;
    }
    setHasError(true);
    setIsLoaded(true);
    if (onError) onError(e);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Neumorphic Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div
          data-testid="lazy-image-skeleton"
          className="animate-gentle-pulse absolute inset-0 z-0 bg-gray-200/80 transition-opacity duration-300 dark:bg-white/[0.04]"
          aria-hidden="true"
        />
      )}

      {/* Error Fallback Surface */}
      {hasError ? (
        <div
          data-testid="lazy-image-error"
          className={`dark:bg-dark-card flex h-full w-full flex-col items-center justify-center bg-gray-200 p-4 text-gray-400 dark:text-gray-500 ${className}`}
        >
          <Icon name={ICONS.IMAGE} className="mb-1 text-2xl" />
          <span className="truncate text-xs">{alt || "Image unavailable"}</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-opacity duration-300 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...restProps}
        />
      )}
    </div>
  );
};

export default LazyImage;
