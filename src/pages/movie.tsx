import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { MovieRating } from "@/components/movie-rating";
import { useMovie } from "@/features/movies/use-movie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoviePoster } from "@/components/movie-poster";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Movie() {
  const navigate = useNavigate();

  const { movie, isLoading, error } = useMovie();

  const [open, setOpen] = useState(true);

  function onDismiss(open: boolean) {
    navigate("/movies");
    setOpen(open);
  }

  if (error)
    return (
      <div>
        <h1>error</h1>
        {error instanceof Error ? error.message : null}
      </div>
    );

  if (isLoading) return <div>Loading...</div>;

  if (!movie) {
    navigate("/movies");
    toast.error("Movie not found");
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onDismiss}>
      <DialogContent className='p-0  background bottom-0 left-0 max-w-2xl translate-x-0 translate-y-0 h-[65dvh] rounded-t-lg'>
        <DialogHeader>
          <DialogTitle className='py-4 px-2 bg-green-200 text-left'>
            {movie?.title}
          </DialogTitle>
          <DialogDescription className='hidden'></DialogDescription>
        </DialogHeader>
        {/* <h1 className='font-semibold  h-12  top-0'>{movie?.title}</h1> */}
        {/* <ScrollArea className='h-screen bg-purple-200 '> */}
        <div>
          {/* <MoviePoster
              wrapperStyles='min-h-56 h-full bg-fixed '
              path={movie.backdrop_path}
              className=''
              alt='Movie backdrop'
            /> */}
          <div
            className='h-56 bg-fixed '
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
            }}
          ></div>

          <div className='flex '>
            {movie.genres.map((genre) => (
              <Badge variant='outline' key={genre.id} className=''>
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between flex-wrap z-20'>
            <MovieRating
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />
          </div>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
          <p>{movie?.overview}</p>
        </div>
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
}
