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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    count,
  } = useMovies();

  const { layout, InfiniteScroll } = useLayout();
  const isGridView = layout === "grid";

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !InfiniteScroll) return;

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, InfiniteScroll]);

  if (error)
    return (
      <div>
        <h1>Error</h1>
        {error instanceof Error ? error.message : null}
      </div>
    );

  if (isLoading)
    return (
      <div className='bg-red-100 h-full'>
        <div className='loader mx-auto' />
      </div>
    );

  const viewStyles = isGridView
    ? "grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
    : "flex flex-col gap-4";

  const moviesList = InfiniteScroll ? movies : movies?.slice(0, 20);

  return (
    <>
      <ul className={cn(viewStyles)}>
        {moviesList.map((movie, i) => (
          <li key={movie.id}>
            <MovieItem rank={i + 1} movie={movie} />
          </li>
        ))}
      </ul>

      {/* Sentinel element to observe when the user scrolls to the bottom */}
      <div ref={sentinelRef} className='h-1' />

      {/* Loading indicator when fetching next page */}
      {isFetchingNextPage && (
        <div className='flex justify-center items-center text-muted-foreground mt-16 gap-2.5'>
          <div className='loader' />
          <p>Loading more movies...</p>
        </div>
      )}

      {!hasNextPage && <p className='text-center mt-4'>No more movies</p>}

      <div className='mt-4'>
        Showing {InfiniteScroll ? "Infinite" : 20} results out of{" "}
        {count.toLocaleString()}
      </div>
    </>
  );
};
