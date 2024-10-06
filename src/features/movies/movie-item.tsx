import { CalendarIcon, InfoIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

import { MovieRating } from "@/components/movie-rating";
import { MoviePoster } from "@/components/movie-poster";
import { buttonVariants } from "@/components/ui/button";
import { useLayout } from "@/hooks/use-layout";
import { Card } from "@/components/ui/card";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Rating } from "@/components/rating";

/**
 * Formats the movie release date into two formats: compact and full.
 * Returns fallback text if no release date is available.
 * @param {string | undefined} releaseDate - The release date from the movie data.
 * @returns {object} - Contains compact and full date formats.
 */
const getFormattedReleaseDate = (releaseDate: string | undefined) => {
  const formattedDate = releaseDate
    ? format(new Date(releaseDate), "dd MMM yyyy")
    : "No data";
  const fullFormattedDate = releaseDate
    ? format(new Date(releaseDate), "dd MMMM yyyy")
    : "No data";

  return { formattedDate, fullFormattedDate };
};

/**
 * Movie details content shared across different layouts.
 * Displays movie title, release date, overview, and rating.
 */
const MovieDetails = ({
  movie,
  rank,
  releaseDate,
  releaseDateDesktop,
}: {
  movie: Movie;
  rank: number;
  releaseDate: string;
  releaseDateDesktop: string;
}) => (
  <>
    {/* Title */}
    <h2 className='font-bold'>
      {rank}. {movie.title}
    </h2>

    {/* Release date */}
    <p className='text-xs sm:text-sm text-muted-foreground flex items-center'>
      <CalendarIcon className='w-3.5 h-3.5 inline-block mr-1' />
      <span className='block md:hidden'>{releaseDate}</span>
      <span className='md:block hidden'>{releaseDateDesktop}</span>
    </p>

    {/* Overview */}
    <p className='text-sm hidden md:block'>{movie.overview}</p>

    {/* Rating */}
    <div className='flex items-center gap-4'>
      <MovieRating
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
      />
      <Rating
        className='[&>span>svg]:size-4 text-sm font-semibold'
        movie={movie}
      />
    </div>
  </>
);

/**
 * Component for displaying a movie in a row layout.
 * Used for list views.
 */
const RowItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const { formattedDate, fullFormattedDate } = getFormattedReleaseDate(
    movie.release_date
  );
  const location = useLocation();

  return (
    <Card className='min-w-72'>
      <div className='flex items-center gap-4 w-full'>
        {/* Poster */}
        <MoviePoster
          wrapperStyles='min-w-24 w-24 min-h-32 md:min-w-40 md:min-h-52 border-r'
          path={movie.poster_path}
          className='rounded-l-md'
          alt='Movie poster'
        />

        <div className='grow py-2 flex flex-col'>
          <MovieDetails
            releaseDateDesktop={fullFormattedDate}
            releaseDate={formattedDate}
            movie={movie}
            rank={rank}
          />
        </div>

        {/* Details button */}
        <div className='h-full min-w-10 sm:w-28'>
          <Link
            state={{ backgroundLocation: location }}
            to={`/movies/${movie.id}`}
          >
            <InfoIcon className='h-5 w-5 sm:w-7 sm:h-7 sm:mx-auto' />
          </Link>
        </div>
      </div>
    </Card>
  );
};

/**
 * Component for displaying a movie in a grid layout.
 * Used for grid views.
 */
const GridItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const { formattedDate, fullFormattedDate } = getFormattedReleaseDate(
    movie.release_date
  );
  const location = useLocation();

  return (
    <div className='flex flex-col border rounded-md shadow-sm h-full'>
      {/* Poster */}
      <MoviePoster
        wrapperStyles='max-w-[290px] min-h-56 h-full border-t'
        path={movie.poster_path}
        className='rounded-t'
        alt='Movie poster'
      />

      {/* Rating, title, overview, release date */}
      <div className='py-2 px-2 flex flex-col flex-grow space-y-1'>
        <div className='flex justify-between'>
          <MovieRating
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
          />
          <Rating
            className='[&>span>svg]:size-4 text-sm font-semibold'
            movie={movie}
          />
        </div>

        <h2 className='font-bold h-12 text-ellipsis overflow-hidden line-clamp-2'>
          <span>{rank}.</span> {movie.title}
        </h2>

        {/* Overview */}
        <div className='pb-2'>
          <p className='hidden sm:block sm:h-20 text-xs md:text-sm md:h-36 overflow-hidden text-ellipsis line-clamp-6 text-muted-foreground'>
            {movie.overview}
          </p>
        </div>

        {/* Release date */}
        <p className='text-sm text-muted-foreground flex items-center mt-auto'>
          <CalendarIcon className='w-3.5 h-3.5 inline-block mr-1' />
          <span className='block md:hidden'>{formattedDate}</span>
          <span className='md:block hidden'>{fullFormattedDate}</span>
        </p>
      </div>

      {/* Details button */}
      <div className='py-3 px-2'>
        <Link
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "w-full"
          )}
          to={`/movies/${movie.id}`}
          state={{ backgroundLocation: location }}
        >
          Details
        </Link>
      </div>
    </div>
  );
};

/**
 * Main movie item component that decides between row or grid layout.
 * Uses `useLayout` hook to determine layout type.
 */
export const MovieItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const { layout } = useLayout();
  const isGridView = layout === "grid";

  return isGridView ? (
    <GridItem movie={movie} rank={rank} />
  ) : (
    <RowItem movie={movie} rank={rank} />
  );
};
