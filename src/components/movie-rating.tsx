import { StarIcon } from "lucide-react";

export const MovieRating: React.FC<{
  voteCount: number;
  voteAverage: number;
  outOf?: number; // Indicates display the rating is out of N
}> = ({ voteAverage, voteCount, outOf }) => {
  return (
    <div className='flex items-center gap-1'>
      <StarIcon className='w-4 h-4 fill-yellow-400 text-yellow-400' />
      <span className=''>
        {voteAverage.toFixed(1)}
        {outOf ? <span className='text-muted-foreground'>/{outOf}</span> : ""}
      </span>
      <span className='text-muted-foreground/70'>
        ({voteCount.toLocaleString()})
      </span>
    </div>
  );
};
