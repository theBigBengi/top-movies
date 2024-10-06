import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { calculatePageLimit } from "@/lib/api-utils";
import { getMovies } from "@/services/api-movies";

export function useMovies() {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get("sortBy") || "popularity";
  const sortBy = `${sortParam}.desc&vote_count.gte=500`;

  const takeParam = searchParams.get("take");

  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    data,
  } = useInfiniteQuery({
    queryKey: ["movies", sortBy],
    queryFn: ({ pageParam = 1 }) => getMovies({ pageParam, sortBy }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.page + 1;
      const limit = calculatePageLimit(takeParam, allPages);

      // Limit the number of pages to 3
      return nextPage <= lastPage.total_pages && allPages.length < limit
        ? nextPage
        : undefined;
    },
  });

  // Flatten results and adjust movie list based on "take" parameter
  const movies =
    data?.pages
      .flatMap((page) => page.results)
      .slice(0, takeParam === "all" ? undefined : Number(takeParam || 20)) ||
    [];
  const count = data?.pages[0].total_results || 0;

  return {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    movies,
    error,
    count,
  };
}
