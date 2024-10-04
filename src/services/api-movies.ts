const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "4170bf35f7a61b8012d65de6ad644b9b";

interface SuccessResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface ErrorResponse {
  success: false;
  status_code: number;
  status_message: string;
}

type MovieApiResponse = SuccessResponse | ErrorResponse;

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

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
