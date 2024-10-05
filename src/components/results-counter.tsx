import { useMovies } from "@/features/movies/use-movies";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

export const ResultsCounter = ({ className }: { className?: string }) => {
  const [searchParams] = useSearchParams();
  const { count } = useMovies(); // from cache

  const sortedBy = searchParams.get("sortBy") || "popularity";
  const take = searchParams.get("take") || "20";

  return (
    <p className={cn("px-1", className)}>
      Showing
      <span className='font-semibold mx-1'>{take}</span>
      titles out of
      <span className='font-semibold mx-1'>{count.toLocaleString()}</span>
      results sorted by
      <span className='font-semibold mx-1'>
        {sortedBy[0].toUpperCase() +
          sortedBy.slice(1, sortedBy.length).replace("_", " ")}
      </span>
    </p>
  );
};
