import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ResultsCounter } from "@/components/results-counter";
import ScrollToTopButton from "@/components/scroll-top-button";
import { SortBy } from "@/components/sort-by";
import { Button, buttonVariants } from "@/components/ui/button";
import { LayoutProvider as MoviesLayoutProvider } from "@/context/layout-provider";
import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";
import { useSearchParams } from "react-router-dom";

export const MoviesPage: React.FC = () => {
  return (
    <MoviesLayoutProvider>
      <PageHeader>
        <PageHeaderHeading className='hidden md:block'>
          Top Movies
        </PageHeaderHeading>
        <PageHeaderHeading className='md:hidden'> Top Movies</PageHeaderHeading>
        <PageHeaderDescription>
          Corona virus? war? Stuck at home again? Grab a bucket of popcorn, lay
          your head back and watch a movie. <ResultsCounter />
        </PageHeaderDescription>
        <PageActions>
          <ShowAllButton />

          <SortBy
            className={buttonVariants({ size: "sm", variant: "outline" })}
            defaultParamValue='popularity'
            options={[
              { value: "popularity", label: "Popularity" },
              { value: "vote_count", label: "Votes count" },
              { value: "vote_average", label: "Votes average" },
            ]}
          />
        </PageActions>
      </PageHeader>

      <div className='mb-2'>
        <MoviesTableOperations />
      </div>

      <Movies />
      <ResultsCounter className='text-muted-foreground px-0 text-sm mt-4' />
      <ScrollToTopButton />
    </MoviesLayoutProvider>
  );
};

const ShowAllButton: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isInfiniteScroll = searchParams.get("take") === "infinite";

  return (
    <Button
      size='sm'
      disabled={isInfiniteScroll}
      onClick={() => {
        searchParams.set("take", "infinite");
        setSearchParams(searchParams);
      }}
    >
      Show all titles
    </Button>
  );
};
