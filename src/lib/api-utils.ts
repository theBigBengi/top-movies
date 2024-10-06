import { Movie } from "./types";

// Helper function to determine the page limit based on "take" parameter
export const calculatePageLimit = (
  takeParam: string | null,
  allPages: { page: number; results: Movie[] }[]
) => {
  if (takeParam === "all") return allPages.length + 1;

  const takeNumber = Number(takeParam);
  if (!isNaN(takeNumber) && takeNumber % 20 === 0) {
    return takeNumber / 20;
  }

  return 1;
};
