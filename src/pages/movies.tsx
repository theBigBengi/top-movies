import ScrollToTopButton from "@/components/scroll-top-button";
import { LayoutProvider as MoviesLayoutProvider } from "@/context";
import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";

export const MoviesPage: React.FC = () => {
  return (
    <MoviesLayoutProvider>
      <MoviesTableOperations />
      <Movies />
      <ScrollToTopButton />
    </MoviesLayoutProvider>
  );
};
