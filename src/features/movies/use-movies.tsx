import { getMovies } from "@/services/api-movies";
import {
  useQuery,
  //  useQueryClient
} from "react-query";
import { useSearchParams } from "react-router-dom";

export function useMovies() {
  //   const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const sortBy = searchParams.get("sort_by") || "vote_count.desc";

  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies", page, sortBy],
    queryFn: () => getMovies({ page, sortBy }),
  });

  return { isLoading, error, movies };
}
