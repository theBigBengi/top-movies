import {
  DetailedMovie,
  MoviesApiResponse,
  MoviesErrorResponse,
  MoviesSuccessResponse,
} from "@/lib/types";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "4170bf35f7a61b8012d65de6ad644b9b";

// https://api.themoviedb.org/3/movie/{movie_id}

export const getMovies = async ({
  pageParam = 1,
  sortBy = "vote_count.desc",
}: {
  pageParam?: number;
  sortBy?: string;
}): Promise<MoviesSuccessResponse> => {
  const response = await fetch(
    `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${pageParam}&sort_by=${sortBy}`
  );

  const data: MoviesApiResponse = await response.json();

  if ("success" in data && !data.success) {
    throw new Error(data.status_message);
  }

  return data as MoviesSuccessResponse;
};

export const getMovieById = async (id: number): Promise<DetailedMovie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );

  const data: DetailedMovie | MoviesErrorResponse = await response.json();

  // Handle the error response, only ErrorResponse will have the 'success' property
  if ("success" in data && !data.success) {
    throw new Error(data.status_message);
  }

  return data as DetailedMovie;
};
