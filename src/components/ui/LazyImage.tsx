import {
  useState,
  useEffect,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";
import { FaImage } from "react-icons/fa6";

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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
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
          <FaImage className="mb-1 text-2xl" />
          <span className="truncate text-xs">{alt || "Image unavailable"}</span>
        </div>
      ) : (
        <img
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
