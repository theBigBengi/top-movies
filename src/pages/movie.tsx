import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MovieRating } from "@/components/movie-rating";
import { useMovie } from "@/features/movies/use-movie";

export function Movie() {
  const navigate = useNavigate();

  const { movie, isLoading, error } = useMovie();

  const [open, setOpen] = useState(true);

  function onDismiss(open: boolean) {
    navigate(-1);
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

  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onDismiss}>
      <DialogContent className='p-0 gap-0 bottom-0 left-0  translate-x-0 translate-y-0 '>
        <DialogHeader className='hidden'>
          <DialogTitle className='p-0'></DialogTitle>
          <DialogDescription className='p-0'></DialogDescription>
        </DialogHeader>

        <div>
          <h1 className='font-semibold bg-red-100'>{movie?.title}</h1>

          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            //   onError={handleImageError}
            //   onLoad={handleImageLoad}
            //   className={imgStyles}
            //   sizes={imgSizes}
            sizes='500px'
            alt='Movie poster'
            loading='lazy'
          />
        </div>
        <div>
          <div className='flex items-center justify-between flex-wrap'>
            <MovieRating
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />
          </div>
          <p>{movie?.overview}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
