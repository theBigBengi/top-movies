import ScrollToTopButton from "@/components/scroll-top-button";
import { LayoutProvider as MoviesLayoutProvider } from "@/context/layout-provider";
import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";

export const MoviesPage: React.FC = () => {
  return (
    <MoviesLayoutProvider>
      <div className='space-y-6'>
        <div className='py-2'>
          <div className='text-4xl font-extrabold tracking-tighter'>
            Top Movies
          </div>
          <p className='text-muted-foreground text-sm mt-1.5 tracking-tight'>
            Corona virus? war? Stuck at home again? Grab a bucket of popcorn,
            lay your head back and watch a movie
          </p>
        </div>

        <MoviesTableOperations />
        <Movies />
        <ScrollToTopButton />
      </div>
    </MoviesLayoutProvider>
  );
};
