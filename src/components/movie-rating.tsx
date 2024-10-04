import { StarIcon } from "lucide-react";

export const MovieRating: React.FC<{
  voteCount: number;
  voteAverage: number;
}> = ({ voteAverage, voteCount }) => {
  return (
    <div className='flex items-center gap-1'>
      <StarIcon className='w-4 h-4 fill-yellow-400 text-yellow-400' />
      <span className=''> {voteAverage}</span>
      <span className='text-muted-foreground/70'>({voteCount})</span>
    </div>
  );
};
