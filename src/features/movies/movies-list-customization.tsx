import { InfinityIcon, LayoutGridIcon, Rows3Icon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/use-layout";
import Filter from "@/components/filter";

export const MoviesListCustomization: React.FC = () => {
  const { layout, toggleLayout } = useLayout();

  const isGridView = layout === "grid";
  return (
    <div className='flex items-center gap-1 flex-wrap'>
      {/* Sort by */}
      <Filter
        filterField='take'
        options={[
          {
            value: "20",
            label: "20",
            // callBack: (value) => toast.info(`Showing ${value} titles`),
          },
          {
            value: "40",
            label: "40",
            // callBack: (value) => toast.info(`Showing ${value} titles`),
          },
          { value: "all", label: <InfinityIcon className='w-4 h-4' /> },
        ]}
      />

      <div className='ml-auto' />

      {/* Change layout view */}
      <Button
        className='h-7 w-7 rounded-md sm:w-auto text-xs sm:px-2 flex gap-2 items-center [&_svg]:w-4'
        onClick={toggleLayout}
        variant='outline'
        size='icon'
      >
        {isGridView ? (
          <>
            <span className='hidden sm:inline-block'>Rows View</span>
            <Rows3Icon />
          </>
        ) : (
          <>
            <span className='hidden sm:inline-block'>Grid View</span>
            <LayoutGridIcon />
          </>
        )}
      </Button>
    </div>
  );
};
