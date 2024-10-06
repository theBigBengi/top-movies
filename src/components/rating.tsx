import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for conditional classes
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RatingProps {
  movie: { title: string; id: number };
  className?: string; // Additional classes
  totalStars?: number; // Total number of stars (default 10)
  onRatingChange?: (rating: number) => void; // Callback when rating changes
}

export const Rating: React.FC<RatingProps> = ({
  totalStars = 10,
  onRatingChange,
  className,
  movie,
}) => {
  const [rating, setRating] = useState<number>(0); // Current rating
  const [hoverRating, setHoverRating] = useState<number | null>(null); // Hovered rating
  const [open, setOpen] = useState(false);

  const handleMouseEnter = (star: number) => {
    setHoverRating(star); // Set hover state on mouse enter
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // Remove hover state on mouse leave
  };

  const handleClick = (star: number) => {
    setRating(star); // Set selected rating
    if (onRatingChange) {
      onRatingChange(star); // Trigger callback on rating change
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className=''>
        <span className='flex gap-1 text-blue-600 group items-center'>
          <Star className='group-hover:hidden block h-6 w-6 cursor-pointer transition-all duration-150' />
          <Star className='group-hover:block hidden h-6 w-6 fill-blue-600 cursor-pointer transition-all duration-150' />
          Rate
        </span>
      </PopoverTrigger>
      <PopoverContent className='w-auto relative'>
        <div className='flex flex-col items-center gap-4 px-2'>
          <div className='flex flex-col items-center '>
            <p className='text-muted-foreground text-sm'>Rate this title</p>
            <h2 className='mx-auto font-bold text-xl'>{movie.title}</h2>
          </div>
          <div className='w-16 h-16 rounded-full bg-black flex items-center justify-center dark:text-black dark:bg-white text-white text-4xl font-extrabold'>
            {rating === 0 ? "?" : rating}
          </div>
          <div className='flex gap-1'>
            {Array.from({ length: totalStars }, (_, index) => {
              const star = index + 1;
              return (
                <Star
                  key={star}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(star)}
                  className={cn(
                    "h-6 w-6 cursor-pointer transition-all duration-150",
                    hoverRating && hoverRating >= star
                      ? "fill-yellow-400 stroke-yellow-400" // Filled star when hovered
                      : rating >= star
                      ? "fill-yellow-400 stroke-yellow-400" // Filled star when selected
                      : "stroke-gray-400", // Empty star
                    className
                  )}
                />
              );
            })}
          </div>

          <Button
            className='mx-auto min-w-28'
            disabled={rating === 0}
            onClick={() => {
              setOpen(false);
              toast.info("Thanks for voting !", {
                description: "Just for demo purposes",
              });
            }}
            size='sm'
          >
            Rate
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
