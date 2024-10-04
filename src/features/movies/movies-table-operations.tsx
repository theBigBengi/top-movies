import { Button } from "@/components/ui/button";
import React from "react";
import { useSearchParams } from "react-router-dom";

const opts = [
  { value: "popularity.desc", label: "popularity" },
  { value: "vote_count.desc", label: "vote_count" },
  { value: "primary_release_date.desc", label: "primary_release_date" },
];

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(newValue: string) {
    searchParams.set("sort_by", newValue);
    setSearchParams(searchParams);
  }

  return (
    <div>
      {opts.map((opt) => (
        <div onClick={() => handleChange(opt.value)} key={opt.value}>
          {opt.label}
        </div>
      ))}
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
