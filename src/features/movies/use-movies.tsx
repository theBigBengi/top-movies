import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { calculatePageLimit } from "@/lib/api-utils";
import { getMovies } from "@/services/api-movies";

export function useMovies() {
  const [searchParams] = useSearchParams();
  // Manage state on URL level
  // Keep on less code in the components
  // ** Good for sharing links
  const sortParam = searchParams.get("sortBy") || "popularity";
  const sortBy = `${sortParam}.desc&vote_count.gte=500`;
  const takeParam = searchParams.get("take");

  // 1. Pagination ?
  // Depends on taste and design preference.

  // 2. Infinite Scroll
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

      // Limit the number of pages
      const limit = calculatePageLimit(takeParam, allPages);
      return nextPage <= lastPage.total_pages && allPages.length < limit
        ? nextPage
        : undefined;
    },
  });

  // I can fetch the next page of movies here ...
  // More smothness in the UI but i will pass :)

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
