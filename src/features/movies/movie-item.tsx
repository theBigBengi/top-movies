import { Poster } from "@/components/poster";
import { Separator } from "@/components/ui/separator";
import { Movie } from "@/lib/types";
import { format } from "date-fns";
import { StarIcon } from "lucide-react";

const RowItem = ({ movie, rank }: { movie: Movie; rank: number }) => {
  const releaseDate = format(new Date(movie.release_date), "dd MMMM yyyy");

  return (
    <>
      <div className='flex gap-4  w-full'>
        <Poster path={movie.poster_path} className='rounded' />
        <div className='min-w-40 grow py-2  flex flex-col '>
          <h2 className='font-bold '>
            {rank}. {movie.title}
          </h2>
          <p className='text-sm'>{releaseDate}</p>
          <p className='text-sm hidden md:block'>{movie.overview}</p>
          <div className='flex items-center gap-1 mt-auto  '>
            <StarIcon className='w-4 h-4 ' />
            <span className=''> {movie.vote_average}</span>
            <span className='text-muted-foreground text-sm'>
              ({movie.vote_count})
            </span>
          </div>
        </div>
      </div>
      <Separator className='my-2' />
    </>
  );
};

const GridItem = ({
  movie,
  isGridView,
  rank,
}: {
  movie: Movie;
  isGridView: boolean;
  rank: number;
}) => {
  const releaseDate = format(new Date(movie.release_date), "dd MMMM yyyy");

  return (
    <div className='flex flex-col  border rounded-md shadow-sm'>
      <Poster
        path={movie.poster_path}
        isGridView={isGridView}
        className='rounded-t'
      />
      <div className='py-2 px-2 space-y-1 border-t'>
        <div className='flex items-center gap-1'>
          <StarIcon className='w-5 h-5 fill-yellow-400 text-yellow-400' />
          <span className=''> {movie.vote_average}</span>
          <span className='text-muted-foreground/70'>({movie.vote_count})</span>
        </div>
        <h2 className='font-bold h-12 text-ellipsis overflow-hidden line-clamp-2'>
          <span>{rank}.</span> {movie.title}
        </h2>
        <p className='text-sm hidden md:block h-36 overflow-hidden text-ellipsis line-clamp-6'>
          {movie.overview}
        </p>
        <p className='text-sm text-muted-foreground'>{releaseDate}</p>
      </div>
    </div>
  );
};

export const MovieItem = ({
  isGridView,
  movie,
  rank,
}: {
  movie: Movie;
  rank: number;
  isGridView: boolean;
}) => {
  return isGridView ? (
    <GridItem movie={movie} isGridView={isGridView} rank={rank} />
  ) : (
    <RowItem movie={movie} rank={rank} />
  );
};
