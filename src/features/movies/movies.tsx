import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useMovies } from "./use-movies";
import { MovieItem } from "./movie-item";
import { useLayout } from "@/hooks/use-layout";

export const Movies = () => {
  const {
    movies,
    isLoading,
    error,
    // count,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  const { layout } = useLayout();
  const isGridView = layout === "grid";

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current && sentinel) {
        observerRef.current.unobserve(sentinel);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error)
    return (
      <div>
        <h1>Error</h1>
        {error instanceof Error ? error.message : null}
      </div>
    );

  if (isLoading) return <div>Loading...</div>;

  const viewStyles = isGridView
    ? "grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
    : "flex flex-col gap-4";

  return (
    <>
      <ul className={cn(viewStyles)}>
        {movies?.map((movie, i) => (
          <li key={movie.id}>
            <MovieItem rank={i + 1} movie={movie} />
          </li>
        ))}
      </ul>

      {/* Sentinel element to observe when the user scrolls to the bottom */}
      <div ref={sentinelRef} className='h-1'></div>

      {/* Loading indicator when fetching next page */}
      {isFetchingNextPage && (
        <div className='flex justify-center mt-4'>
          <p>Loading more movies...</p>
          {/* Optionally, you can use a spinner component here */}
          <div className='loader'></div>
        </div>
      )}

      {!hasNextPage && <p className='text-center mt-4'>No more movies</p>}
    </>
  );
};
