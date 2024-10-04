import { LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const { layout, toggleLayout } = useLayout();
  const isGridView = layout === "grid";

  if (error)
    return (
      <div>
        <h1>error</h1>
        {error instanceof Error ? error.message : null}
      </div>
    );

  if (isLoading) return <div>Loading...</div>;

  const ViewButtonIcon = isGridView ? <LayoutListIcon /> : <LayoutGridIcon />;
  const viewStyles = isGridView
    ? "grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
    : "flex flex-col gap-4";

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        Top Movies
        <Button
          size='icon'
          variant='outline'
          onClick={toggleLayout}
          className='h-9 w-9  rounded [&_svg]:w-5'
        >
          {ViewButtonIcon}
        </Button>
      </div>

      <ul className={cn(viewStyles)}>
        {movies?.map((movie, i) => (
          <li key={movie.id}>
            <MovieItem rank={i + 1} movie={movie} />
          </li>
        ))}
      </ul>

      {/* Load More Button */}
      {hasNextPage && (
        <div className='flex justify-center mt-4'>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}

      {!hasNextPage && <p className='text-center mt-4'>No more movies</p>}
    </>
  );
};
