import { InfinityIcon, LayoutGridIcon, LayoutListIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/use-layout";
// import { Toggle } from "@/components/ui/toggle"
import { useMovies } from "./use-movies";

export const MoviesTableOperations: React.FC = () => {
  const { layout, toggleLayout, toggleInfiniteScroll, InfiniteScroll } =
    useLayout();
  const { count } = useMovies(); // from cache
  const isGridView = layout === "grid";
  return (
    <div className='flex items-center gap-1 flex-wrap'>
      <div className='text-muted-foreground text-sm'>
        Showing {InfiniteScroll ? "Infinite" : 20} titles out of{" "}
        {count.toLocaleString()}
      </div>
      <div className='ml-auto' />

      <Button
        onClick={toggleInfiniteScroll}
        className='h-8 w-8 p-0 md:w-auto md:px-2 flex gap-2 items-center'
        variant='outline'
      >
        <span className='hidden md:inline-block'>Infinite Scroll</span>
        <InfinityIcon className='w-4 h-4' />
      </Button>

      {/* <Toggle pressed={InfiniteScroll} onPressedChange={toggleInfiniteScroll} variant="outline" aria-label="Toggle results">
      <span className='hidden md:inline-block'>Infinite Scroll</span>
        <InfinityIcon className='w-4 h-4' />
    </Toggle> */}

      <Button
        size='icon'
        variant='outline'
        onClick={toggleLayout}
        className='h-8 w-8 rounded md:w-auto md:px-2 flex gap-2 items-center [&_svg]:w-4'
      >
        {isGridView ? (
          <>
            <span className='hidden md:inline-block'>Rows View</span>
            <LayoutListIcon />
          </>
        ) : (
          <>
            <span className='hidden md:inline-block'>Grid View</span>
            <LayoutGridIcon />
          </>
        )}
      </Button>
    </div>
  );
};
