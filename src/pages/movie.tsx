import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { formatMovieDuration, getDirectorAndStars } from "@/lib/movie-utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieRating } from "@/components/movie-rating";
import { MoviePoster } from "@/components/movie-poster";
import { useMovie } from "@/features/movies/use-movie";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingSelect } from "@/components/rating-select";
import { DetailedMovie } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Movie() {
  const navigate = useNavigate();
  const { movie, isLoading, error } = useMovie();

  const [open, setOpen] = useState(true);
  function onDismiss(open: boolean) {
    navigate(-1);
    setOpen(open);
  }

  if (error) {
    toast.error("An error occurred while fetching the movie data");
    navigate("/movies");
  }

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
            <DialogTitle>Movie title</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>

        {isLoading ? (
          <div className='text-muted-foreground gap-1 min-h-[40vh] flex justify-center items-center'>
            <div className='loader' />
            Loading data...
          </div>
        ) : (
          movie && <MovieDetails movie={movie} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function MovieDetails({ movie }: { movie: DetailedMovie | undefined }) {
  const navigate = useNavigate();
  if (!movie) {
    navigate(-1);
    return null;
  }

  const { director, mainStars } = getDirectorAndStars(movie);
  return (
    <>
      <MoviePoster
        wrapperStyles='min-h-32 h-full bg-fixed rounded-t-md'
        path={movie.backdrop_path}
        className='rounded-t-md '
        alt='Movie backdrop'
      />

      <ScrollArea className='h-[60dvh] sm:h-[28dvh]  xl:min-h-[50dvh] shadow-lg px-2 '>
        <div className='flex flex-col gap-2  h-full'>
          <h2 className='font-bold text-2xl md:text-3xl'>{movie?.title}</h2>

          <ScrollArea className=' whitespace-nowrap py-1'>
            <ScrollBar orientation='horizontal' />
            {movie.genres.map((genre) => (
              <Badge variant='secondary' key={genre.id} className='mr-1'>
                {genre.name}
              </Badge>
            ))}
          </ScrollArea>

          <div className='flex text-muted-foreground'>
            {format(movie.release_date, "yyyy")} •{" "}
            {formatMovieDuration(movie.runtime)}
          </div>

          <div className='flex items-center gap-4 flex-wrap z-20'>
            <MovieRating
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              outOf={10}
            />

            <RatingSelect movie={movie} />
          </div>
          <p className='text-muted-foreground'>{movie.overview}</p>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold'>Director</h3>
            <p className='text-muted-foreground'>{director}</p>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold'>Main Stars</h3>
            <p className='text-muted-foreground'>{mainStars.join(", ")}</p>
          </div>

          <div className='flex flex-row p-2 gap-1 mt-auto'>
            <Button
              variant='outline'
              className='w-full text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
            >
              Trailer
            </Button>
            <Button
              variant='outline'
              className=' w-full gap-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
            >
              <span>
                <Plus className='w-4 h-4 ' />
              </span>
              Watch list
            </Button>

            <div className='my-6' />
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
