import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import { toast } from "sonner";

import { MovieRating } from "@/components/movie-rating";
import { useMovie } from "@/features/movies/use-movie";
import {
  Dialog,
  DialogContent,
  dialogContentStyles,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoviePoster } from "@/components/movie-poster";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function Movie() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 600px)");
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
      <DialogContent
        className='p-0 rounded-md h-[70%] w-[90%] [&_svg]:w-4 [&_svg]:mx-auto'
        closeStyles='bg-background h-6 w-6 rounded-md '
        // className='p-0  bottom-0 left-0 max-w-2xl translate-x-0 translate-y-0 h-[75dvh] rounded-t-lg border-none'
        // className={cn(
        //   "fixed left-1/2 bottom-0 z-50 w-full max-w-lg translate-x-[-50%] border bg-background p-6 shadow-lg duration-200 top-auto",
        //   "p-0 min-h-[70dvh] rounded-t-lg border-none  max-w-2xl  translate-y-0 fixed left-1/2 bottom-0 z-50 w-full translate-x-[-50%] border bg-background shadow-lg duration-200",
        //   "data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out",
        //   matches &&
        //     `${dialogContentStyles} sm:translate-x-[-50%] sm:translate-y-[-50%] sm:left-[50%] sm:bottom-auto p-0`
        // )}
      >
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>{movie?.title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>
        {/* <h1 className='font-semibold  h-12  top-0'>{movie?.title}</h1> */}
        {/* <ScrollArea className='h-[75dvh] shadow-lg'> */}

        <MoviePoster
          wrapperStyles='min-h-28 xs:min-h-52 h-full bg-fixed rounded-t-lg'
          path={movie.backdrop_path}
          className='rounded-t-lg '
          alt='Movie backdrop'
        />

        <h2 className='font-semibold text-2xl'>{movie?.title}</h2>
        <div className='p-4'>
          <div className='flex flex-wrap'>
            {movie.genres.map((genre) => (
              <Badge variant='outline' key={genre.id} className=''>
                {genre.name}
              </Badge>
            ))}
          </div>
          {movie?.release_date}
          <div className='flex items-center justify-between flex-wrap z-20'>
            <MovieRating
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />
          </div>
          <p>{movie?.overview}</p>
        </div>
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
}
