import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";

export const MoviesPage: React.FC = () => {
  return (
    <>
      <MoviesTableOperations />
      <Movies />
    </>
  );
};
