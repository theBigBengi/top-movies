import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMovies } from "./use-movies";

const Poster = ({
  path,
  isGridView,
}: {
  path: string;
  isGridView?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div
      className={`relative ${isGridView ? "max-w-full  h-full" : "w-20 h-20"}`}
    >
      {!isLoaded && !hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse '></div>
      )}

      {hasError ? (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
          <span className='text-red-500'>Image not available</span>
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500/${path}`}
          sizes='(max-width: 768px) 200px, (max-width: 1024px) 300px, 500px'
          alt='Movie poster'
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading='lazy'
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

const RowItem = ({ movie }: { movie: any }) => {
  return (
    <div className='flex items-center gap-4'>
      <Poster path={movie.poster_path} />
      <div>
        <h2 className='font-bold'>{movie.title}</h2>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

const GridItem = ({
  movie,
  isGridView,
}: {
  movie: any;
  isGridView: boolean;
}) => {
  return (
    <div className='flex flex-col  border rounded-md'>
      <Poster path={movie.poster_path} isGridView={isGridView} />
      <div className='mt-2'>
        <h2 className='font-bold h-10'>{movie.title}</h2>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

export const Movies = () => {
  const { movies, isLoading, error } = useMovies();
  const [isGridView, setIsGridView] = useState(true);

  if (error) {
    console.log(error.message);
    return <div>Error</div>;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <h1>Movies</h1>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className='py-2 px-4 bg-blue-500 text-white rounded'
          >
            {isGridView ? "Switch to Row View" : "Switch to Grid View"}
          </button>
        </div>

        <ul
          className={`${
            isGridView
              ? "grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
              : "flex flex-col gap-4"
          }`}
        >
          {movies?.map((movie) => (
            <li
              key={movie.id}
              className={`flex ${
                isGridView ? "flex-col items-center" : "flex-row items-center"
              }`}
            >
              {isGridView ? (
                <GridItem movie={movie} isGridView={isGridView} />
              ) : (
                <RowItem movie={movie} />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
