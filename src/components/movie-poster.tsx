import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

/**
 * MoviePoster component displays a movie poster image.
 * It handles loading and error states, showing placeholders when the image is loading or if it fails to load.
 *
 * @param wrapperStyles - Optional styles applied to the wrapper div.
 * @param className - Optional styles applied to the img element.
 * @param path - The image path.
 * @param alt - Descriptive alt text for accessibility.
 * @returns JSX Element to display the poster with loading/error handling.
 */
export const MoviePoster = ({
  wrapperStyles,
  className,
  path,
  alt,
}: {
  wrapperStyles?: string;
  className?: string;
  path: string;
  alt?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // Tracks if the image has successfully loaded
  const [hasError, setHasError] = useState(false); // Tracks if an error occurred while loading the image

  // Handler for successful image load, sets isLoaded to true
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Handler for image loading errors, sets hasError to true
  const handleImageError = () => {
    setHasError(true);
  };

  // Construct the full image URL based on the path prop
  const imgSrc = `https://image.tmdb.org/t/p/w500/${path}`;

  // Define the image sizes to optimize responsiveness
  const imgSizes = "(max-width: 768px) 200px, (max-width: 1024px) 300px, 500px";

  // Define the image styles, with a fade-in transition once the image has loaded
  const imgStyles = cn(
    `w-full min-w-20 h-full object-cover transition-opacity duration-500 ${
      isLoaded ? "opacity-100" : "opacity-0"
    }`,
    className
  );

  return (
    <div className={cn("relative", wrapperStyles)}>
      {/* Show a loading placeholder while the image is not yet loaded and no error has occurred */}
      {!isLoaded && !hasError && (
        <Skeleton className='absolute inset-0 ah-full w-full' />
      )}

      {/* Show an error message if the image fails to load */}
      {hasError ? (
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-muted-foreground'>Image not available</span>
        </div>
      ) : (
        // Display the image with event handlers for load and error states
        <img
          onError={handleImageError} // Handle image loading errors
          onLoad={handleImageLoad} // Handle successful image load
          className={imgStyles} // Apply dynamic image styles
          sizes={imgSizes} // Responsive image sizes
          alt={alt || "popcrown image"} // Descriptive alt text for accessibility
          loading='lazy' // Lazy loading for performance optimization
          src={imgSrc} // Image source URL
        />
      )}
    </div>
  );
};
