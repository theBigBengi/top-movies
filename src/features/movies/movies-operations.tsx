import { Button } from "@/components/ui/button";
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
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(newValue: string) {
    searchParams.set("page", newValue);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <SortBy />
      <Button
        variant='secondary'
        onClick={() => {
          handleChange(
            searchParams.get("page")
              ? (parseInt(searchParams.get("page") || "1") + 1).toString()
              : "1"
          );
        }}
      >
        Next
      </Button>
      <Button
        onClick={() => {
          const searchParams = new URLSearchParams(window.location.search);

          handleChange(
            searchParams.get("page")
              ? (parseInt(searchParams.get("page") || "1") - 1).toString()
              : "1"
          );
        }}
      >
        Previous
      </Button>
    </div>
  );
};
