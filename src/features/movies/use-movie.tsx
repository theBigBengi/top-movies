import { getMovieById } from "@/services/api-movies";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function useMovie() {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    isLoading,
    data: movie,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(Number(movieId)),
  });

  return { isLoading, error, movie };
}
