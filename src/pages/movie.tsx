import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatMovieDuration, getDirectorAndStars } from "@/lib/movie-utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Rating } from "@/components/rating";

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

  const { director, mainStars } = getDirectorAndStars(movie);
  console.log(director, mainStars);
  return (
    <Dialog open={open} onOpenChange={onDismiss}>
      <DialogContent
        className='p-0 rounded-md w-[92%] [&_svg]:w-4 [&_svg]:mx-auto' // Style for dialog content
        closeStyles='bg-background h-6 w-6 rounded-md' // Style for closing buttopn
      >
        {/*  VisuallyHidden.Root is a wrapper for DialogHeader
         It hides the DialogHeader from screen readers
         But it's still accessible for the Dialog component
         */}
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>{movie?.title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>

        <MoviePoster
          wrapperStyles='min-h-32 h-full bg-fixed rounded-t-md'
          path={movie.backdrop_path}
          className='rounded-t-md '
          alt='Movie backdrop'
        />

        <ScrollArea className='h-[60dvh] sm:h-[28dvh] xl:min-h-[50dvh] shadow-lg px-2 '>
          <div className='flex flex-col gap-2  h-full'>
            <h2 className='font-bold text-2xl md:text-3xl'>{movie?.title}</h2>

            <ScrollArea className=' whitespace-nowrap py-1'>
              <ScrollBar orientation='horizontal' />
              {movie.genres.map((genre) => (
                <Badge variant='outline' key={genre.id} className='mr-1'>
                  {genre.name}
                </Badge>
              ))}
            </ScrollArea>

            <div className='flex'>
              {format(movie.release_date, "yyyy")} •{" "}
              {formatMovieDuration(movie.runtime)}
            </div>

            <div className='flex items-center gap-4 flex-wrap z-20'>
              <MovieRating
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                outOf={10}
              />

              <Rating movie={movie} />
            </div>
            <p className=''>{movie.overview}</p>

            <div className='flex flex-col gap-2'>
              <h3 className='font-bold'>Director</h3>
              <p>{director}</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='font-bold'>Main Stars</h3>
              <p>{mainStars.join(", ")}</p>
            </div>

            <div className='flex flex-row p-2 gap-1 mt-auto'>
              <Button variant='outline' className='w-full'>
                Trailer
              </Button>
              <Button variant='outline' className=' w-full gap-1 '>
                <span>
                  <Plus className='w-4 h-4 ' />
                </span>
                Watch list
              </Button>

              <div className='my-6' />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
