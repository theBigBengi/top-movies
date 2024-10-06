import {
  DetailedMovie,
  MoviesApiResponse,
  MoviesErrorResponse,
  MoviesSuccessResponse,
} from "@/lib/types";

export const getMovies = async ({
  pageParam = 1,
  sortBy = "vote_count.desc",
}: {
  pageParam?: number; // Page number to fetch
  sortBy?: string; // Sorting criteria, e.g., 'popularity.desc'
}): Promise<MoviesSuccessResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US&page=${pageParam}&sort_by=${sortBy}`
  );

  const data: MoviesApiResponse = await response.json();

  // Handle the error response, only ErrorResponse will have the 'success' property
  if ("success" in data && !data.success) {
    throw new Error(data.status_message);
  }
  // Return the movies data as a successful response
  return data as MoviesSuccessResponse;
};

export const getMovieById = async (id: number): Promise<DetailedMovie> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/movie/${id}?api_key=${
      import.meta.env.VITE_API_KEY
    }&append_to_response=credits`
  );

  const data: DetailedMovie | MoviesErrorResponse = await response.json();

  // Handle the error response, only ErrorResponse will have the 'success' property
  if ("success" in data && !data.success) {
    throw new Error(data.status_message);
  }

  // Return the movie data as a successful response
  return data as DetailedMovie;
};
