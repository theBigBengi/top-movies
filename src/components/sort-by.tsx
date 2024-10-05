import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function SortBy({
  className,
  defaultParamValue,
  options,
  label,
}: {
  className?: string;

  label?: string;

  defaultParamValue: string;
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || defaultParamValue;

  function handleChange(newValue: string) {
    searchParams.set("sortBy", newValue);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <DropdownMenu>
        <div className={cn("flex gap-2 items-center", className)}>
          <span className=' font-semibold'>{label ?? "Sort by"}</span>
          <DropdownMenuTrigger className='flex items-center text-sky-600'>
            <span>{options.find((o) => o.value === sortBy)?.label}</span>
            <ChevronDown className='size-3.5 ml-1.5' />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='p-0'>
          <DropdownMenuLabel>{label ?? "Sort by"}</DropdownMenuLabel>

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
