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
import { useEffect, useRef, useState } from "react";

export function SortBy({
  className,
  defaultParamValue,
  options,
  label,
}: {
  className?: string;
  label?: string;
  defaultParamValue: string;
  options: {
    value: string;
    label: string;
    callBack?: (value: string) => void;
  }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentWidth, setContentWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sortBy = searchParams.get("sortBy") || defaultParamValue;

  useEffect(() => {
    const currentWidth = triggerRef?.current?.offsetWidth;

    window.addEventListener("resize", () => {
      if (!triggerRef?.current) return;
      setContentWidth(currentWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setContentWidth(currentWidth);
      });
    };
  }, []);

  useEffect(() => {
    if (!triggerRef?.current) return;
    setContentWidth(triggerRef?.current?.offsetWidth);
  }, [triggerRef?.current?.offsetWidth]);

  function handleChange(newValue: string) {
    searchParams.set("sortBy", newValue);
    setSearchParams(searchParams);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        ref={triggerRef}
        className={cn("flex items-center text-sky-600", className)}
      >
        <span>{options.find((o) => o.value === sortBy)?.label}</span>
        <ChevronDown className='size-3.5 ml-1.5' />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='p-0'
        style={{
          minWidth: contentWidth ? `${contentWidth}px` : "auto",
          width: contentWidth ? `${contentWidth}px` : "auto",
        }}
      >
        <DropdownMenuLabel className='text-xs sm:text-sm'>
          {label ?? "Sort by"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className='my-0' />

        {options.map((opt) => (
          <DropdownMenuItem
            className='text-xs sm:text-sm py-2.5 min-w-40  rounded-none'
            onClick={() => {
              handleChange(opt.value);
              if (opt.callBack) opt.callBack(opt.value);
            }}
            key={opt.value}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
