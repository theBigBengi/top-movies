import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import ScrollToTopButton from "@/components/scroll-top-button";
import { LayoutProvider as MoviesLayoutProvider } from "@/context/layout-provider";
import { Movies } from "@/features/movies/movies";
import { MoviesTableOperations } from "@/features/movies/movies-operations";

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
      </PageHeader>

      <div className='mb-2'>
        <MoviesTableOperations />
      </div>
      <Movies />
      <ScrollToTopButton />
    </MoviesLayoutProvider>
  );
};
