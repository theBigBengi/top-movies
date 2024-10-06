import { Link, useSearchParams } from "react-router-dom";
import { ArrowRightIcon, PieChart } from "lucide-react";

import { MoviesListCustomization } from "@/features/movies/movies-list-customization";
import { LayoutProvider as MoviesLayoutProvider } from "@/context/layout-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import ScrollToTopButton from "@/components/scroll-top-button";
import { ResultsCounter } from "@/components/results-counter";
import { MoviesList } from "@/features/movies/movies-list";
import { Separator } from "@/components/ui/separator";
import { SortBy } from "@/components/sort-by";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

const sortByOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "vote_count", label: "Votes count" },
  { value: "vote_average", label: "Votes average" },
];

export const MoviesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <MoviesLayoutProvider>
      <PageHeader>
        <Link
          className='group inline-flex items-center px-0.5 text-sm font-medium'
          to='#'
        >
          <PieChart className='h-4 w-4' />{" "}
          <Separator className='mx-2 h-4' orientation='vertical' />{" "}
          <span className='underline-offset-4 group-hover:underline'>
            npx shadcn init
          </span>
          <ArrowRightIcon className='ml-1 h-4 w-4' />
        </Link>
        <PageHeaderHeading className='hidden md:block'>
          Top Movies
        </PageHeaderHeading>
        <PageHeaderHeading className='md:hidden'> Top Movies</PageHeaderHeading>

        <PageHeaderDescription>
          Corona virus ? war ? Stuck at home again? Grab a bucket of popcorn,
          lay your head back and watch a movie. <ResultsCounter />
        </PageHeaderDescription>

        <PageActions>
          <Button
            size='sm'
            disabled={searchParams.get("take") === "all"}
            onClick={() => {
              searchParams.set("take", "all");
              setSearchParams(searchParams);
            }}
          >
            Show all titles
          </Button>

          <SortBy
            className={buttonVariants({ size: "sm", variant: "outline" })}
            defaultParamValue='popularity'
            options={sortByOptions}
          />
        </PageActions>
      </PageHeader>

      <div className='mb-2'>
        <MoviesListCustomization />
      </div>

      <MoviesList />

      <ScrollToTopButton />
    </MoviesLayoutProvider>
  );
};
