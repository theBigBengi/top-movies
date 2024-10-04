import { Movie, MovieApiResponse, SuccessResponse } from "@/lib/types";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "4170bf35f7a61b8012d65de6ad644b9b";

export const getMovies = async ({
  page,
  sortBy = "vote_count.desc",
}: {
  page?: number;
  sortBy?: string;
}): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=${sortBy}`
  );

  const data: MovieApiResponse = await response.json();

  // Handle the error response, only ErrorResponse will have the 'success' property
  if ("success" in data && !data.success) {
    throw new Error(`Error fetching movies: ${data.status_message}`);
  }

  // In the success case, we know 'data' is of type 'SuccessResponse', so we can safely access 'results'
  return (data as SuccessResponse).results;
};
