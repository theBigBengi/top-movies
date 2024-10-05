import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import ScrollToTopButton from "@/components/scroll-top-button";
import { SortBy } from "@/components/sort-by";
import { Button, buttonVariants } from "@/components/ui/button";
import { LayoutProvider as MoviesLayoutProvider } from "@/context/layout-provider";
import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";
import { cn } from "@/lib/utils";

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
          your head back and watch a movie
        </PageHeaderDescription>
        <PageActions>
          <Button size='sm'>Show all titles</Button>
          <div
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              ""
            )}
          >
            <SortBy
              defaultParamValue='popularity.desc'
              options={[
                { value: "popularity.desc", label: "Popularity" },
                { value: "vote_count.desc", label: "Votes" },
              ]}
            />
          </div>
        </PageActions>
      </PageHeader>

      <div className='mb-8'>
        <MoviesTableOperations />
      </div>

      <Movies />

      <ScrollToTopButton />
    </MoviesLayoutProvider>
  );
};
