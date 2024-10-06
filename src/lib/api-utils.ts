import { Movie } from "./types";

// Helper function to determine the page limit based on "take" parameter
export const calculatePageLimit = (
  takeParam: string | null,
  allPages: { page: number; results: Movie[] }[]
) => {
  // If the "take" parameter is set to "all", then we implement infinite scrolling
  if (takeParam === "all") return allPages.length + 1;

  // Well, we need to ensure that the "take" parameter is a multiple of 20
  // Why 20 ? Because that's the only number of movies we can fetch in a single page
  const takeNumber = Number(takeParam);
  if (!isNaN(takeNumber) && takeNumber % 20 === 0) {
    return takeNumber / 20;
  }

  return 1;
};
