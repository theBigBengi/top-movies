import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: { value: string; label: string | ReactNode }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function handleClick(value: string) {
    console.log("first");
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }
  console.log(currentFilter);

  return (
    <div className=' bg-accent px-0.5 rounded-md h-8 flex items-center'>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          //   disabled={option.value === currentFilter}
          className={cn(
            `h-7 px-3 text-xs w-10 font-medium py-0 rounded-md transition-all duration-300`,
            option.value === currentFilter
              ? "bg-background text-forground"
              : "text-muted-foreground "
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
