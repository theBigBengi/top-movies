import { useLayout } from "@/hooks/use-layout";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Poster = ({
  path,
  className,
}: {
  path: string;
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { layout } = useLayout();

  const isGridView = layout === "grid";

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const imgSizes = "(max-width: 768px) 200px, (max-width: 1024px) 300px, 500px";
  const imgStyles = cn(
    `w-full  min-w-20 h-full object-cover transition-opacity duration-500 ${
      isLoaded ? "opacity-100" : "opacity-0"
    }`,
    className
  );

  return (
    <div
      className={`relative ${
        isGridView
          ? "max-w-[290px] min-h-56  h-full"
          : "w-24 min-h-32 md:min-w-40 md:min-h-52 "
      }`}
    >
      {!isLoaded && !hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse '></div>
      )}

      {hasError ? (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
          <span className='text-red-500'>Image not available</span>
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500/${path}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={imgStyles}
          sizes={imgSizes}
          alt='Movie poster'
          loading='lazy'
        />
      )}
    </div>
  );
};
