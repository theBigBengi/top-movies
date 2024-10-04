import { LayoutProvider as MoviesLayoutProvider } from "@/context";
import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";

export const MoviesPage: React.FC = () => {
  return (
    <MoviesLayoutProvider>
      <MoviesTableOperations />
      <Movies />
    </MoviesLayoutProvider>
  );
};
