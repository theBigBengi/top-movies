import { LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMovies } from "./use-movies";
import { MovieItem } from "./movie-item";
import { Pagination } from "@/components/pagination";

export const Movies = () => {
  const { movies, isLoading, error, count } = useMovies();
  const [isGridView, setIsGridView] = useState(true);

  if (error) {
    // console.log(error.message);
    return <div>{}</div>;
  }

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
          onClick={() => setIsGridView(!isGridView)}
          className='h-9 w-9  rounded [&_svg]:w-5'
        >
          {ViewButtonIcon}
        </Button>
      </div>

      <ul className={cn(viewStyles)}>
        {movies?.map((movie, i) => (
          <li key={movie.id}>
            <MovieItem rank={i + 1} movie={movie} isGridView={isGridView} />
          </li>
        ))}
      </ul>

      <Pagination count={count!} />
    </>
  );
};
