import { getMovies } from "@/services/api-movies";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export function useMovies() {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get("sortBy") || "popularity";
  const sortBy = `${sortParam}.desc&vote_count.gte=500`;

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", sortBy],
    queryFn: ({ pageParam = 1 }) => getMovies({ pageParam, sortBy }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  // Flatten the results so it's easier to work with.
  const movies = data?.pages.flatMap((page) => page.results) || [];
  const count = data?.pages[0].total_results || 0;

  return {
    isLoading,
    error,
    movies,
    count,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

// import { getMovies } from "@/services/api-movies";
// import {
//   useQuery,
//   //  useQueryClient
// } from "react-query";
// import { useSearchParams } from "react-router-dom";

// export function useMovies() {
//   //   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();

//   const page = parseInt(searchParams.get("page") || "1");
//   const sortBy = searchParams.get("sort_by") || "vote_count.desc";

//   const {
//     isLoading,
//     data: { total_results: count, results: movies } = {},
//     error,
//   } = useQuery({
//     queryKey: ["movies", page, sortBy],
//     queryFn: () => getMovies({ page, sortBy }),
//   });

//   return { isLoading, error, movies, count };
// }
