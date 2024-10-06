import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useMovies } from "./use-movies";
import { MovieItem } from "./movie-item";
import { useLayout } from "@/hooks/use-layout";
import { ResultsCounter } from "@/components/results-counter";

export const MoviesList = () => {
  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    movies,
    error,
  } = useMovies();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { isGrid } = useLayout();
  const viewStyles = isGrid
    ? "grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
    : "flex flex-col gap-4";

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    // Create the IntersectionObserver when the component mounts
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    // Sentinel element to observe when the user scrolls to the bottom
    const sentinel = sentinelRef.current;
    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      // Clean up the observer when the component unmounts
      if (observerRef.current && sentinel) {
        observerRef.current.unobserve(sentinel);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, movies.length]);

  if (error)
    return (
      <div>
        <h1>Error</h1>
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );

  if (isLoading)
    return (
      <div className='my-auto '>
        <div className=' flex justify-center gap-2 items-center text-muted-foreground'>
          <div className='loader' />
          Loading movies...
        </div>
      </div>
    );

  return (
    <>
      <ul className={cn(viewStyles)}>
        {movies.map((movie, i) => (
          <li key={movie.id}>
            <MovieItem rank={i + 1} movie={movie} />
          </li>
        ))}
      </ul>

      {/* Sentinel element to observe when the user scrolls to the bottom */}
      <div ref={sentinelRef} className='h-1' />

      <div className='mt-8'>
        <p>
          <ResultsCounter className='text-muted-foreground px-0 text-sm ' />
        </p>
      </div>

      {/* Loading indicator when fetching next page */}
      {isFetchingNextPage && (
        <div className='flex justify-center items-center text-muted-foreground mt-16 gap-2.5'>
          <div className='loader' />
          <p>Loading more movies...</p>
        </div>
      )}

      {!hasNextPage && <p className='text-center mt-4'>No more movies</p>}
    </>
  );
};
