import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useMovies } from "./use-movies";
import { MovieItem } from "./movie-item";
import { useLayout } from "@/hooks/use-layout";
import { useSearchParams } from "react-router-dom";
import { ResultsCounter } from "@/components/results-counter";

export const Movies = () => {
  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    movies,
    error,
  } = useMovies();
  const [searchParams] = useSearchParams();
  const { layout } = useLayout();

  const takeParam = searchParams.get("take");
  const isInfiniteScroll = takeParam === "infinite";
  const isGridView = layout === "grid";

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !hasNextPage ||
      isFetchingNextPage ||
      (!isInfiniteScroll && Number(takeParam || 20) <= movies.length)
    )
      return;

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
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isInfiniteScroll,
    movies.length,
    takeParam,
  ]);

  if (error)
    return (
      <div>
        <h1>Error</h1>
        {error instanceof Error ? error.message : null}
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

  const viewStyles = isGridView
    ? "grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
    : "flex flex-col gap-4";

  const moviesList = isInfiniteScroll
    ? movies
    : movies?.slice(0, Number(takeParam || 20));

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
