import { MovieRating } from "@/components/movie-rating";
import { Poster } from "@/components/poster";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLayout } from "@/hooks/use-layout";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";

const RowItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const releaseDate = format(new Date(movie.release_date), "dd MMMM yyyy");

  return (
    <>
      <Card className='min-w-60'>
        <div className='flex items-center gap-4  w-full '>
          <Poster path={movie.poster_path} className='rounded-l' />
          <div className='grow py-2  flex flex-col '>
            <h2 className='font-bold '>
              {rank}. {movie.title}
            </h2>
            <p className='text-sm'>Release Date: {releaseDate}</p>
            <p className='text-sm hidden md:block'>{movie.overview}</p>
            <MovieRating
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

const GridItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const releaseDate = format(new Date(movie.release_date), "dd MMMM yyyy");
  const location = useLocation();
  return (
    <div className='flex flex-col  border rounded-md shadow-sm'>
      <Poster path={movie.poster_path} className='rounded-t' />
      <div className='py-2 px-2 space-y-1 border-t'>
        <MovieRating
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
        />
        <h2 className='font-bold h-12 text-ellipsis overflow-hidden line-clamp-2'>
          <span>{rank}.</span> {movie.title}
        </h2>
        <p className=' hidden sm:block sm:h-20 text-xs md:text-sm md:h-36 overflow-hidden text-ellipsis line-clamp-6'>
          {movie.overview}
        </p>
        <p className='text-sm text-muted-foreground'>{releaseDate}</p>
      </div>
      <div className='p-2'>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          to={`/movies/${movie.id}`}
          // This is the trick! Set the `backgroundLocation` in location state
          // so that when we open the modal we still see the current page in
          // the background.
          state={{ backgroundLocation: location }}
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export const MovieItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const { layout } = useLayout();
  const isGridView = layout === "grid";
  return isGridView ? (
    <GridItem movie={movie} rank={rank} />
  ) : (
    <RowItem movie={movie} rank={rank} />
  );
};
