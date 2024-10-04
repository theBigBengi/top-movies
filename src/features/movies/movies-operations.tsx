import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { LayoutToggleButton } from "./layout-toggle-button";

const options = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_count.desc", label: "Votes" },
];

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "vote_count.desc";

  function handleChange(newValue: string) {
    searchParams.set("sort_by", newValue);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <DropdownMenu>
        <div className='flex gap-1'>
          Sort by
          <DropdownMenuTrigger className='flex items-center text-sky-600'>
            <span>{options.find((o) => o.value === sortBy)?.label}</span>
            <ChevronDown className='size-4 ml-2' />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='p-0'>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>

          <DropdownMenuSeparator className='my-0' />

          {options.map((opt) => (
            <DropdownMenuItem
              className='py-2.5 min-w-40 border-b last:border-b-0 rounded-none'
              onClick={() => handleChange(opt.value)}
              key={opt.value}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const MoviesTableOperations: React.FC = () => {
  return (
    <div className='flex items-center justify-between '>
      <SortBy />
      <LayoutToggleButton />
    </div>
  );
};
