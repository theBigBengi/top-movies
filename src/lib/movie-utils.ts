import { DetailedMovie } from "@/lib/types";

// Extracts director and main stars (actors) from movie data
export const getDirectorAndStars = (movieData: DetailedMovie) => {
  const { credits } = movieData;

  // Get the director from the crew
  const director = credits?.crew.find(
    (crewMember) => crewMember.job === "Director"
  );

  // Get the top 3 main stars (actors) from the cast
  const mainStars = credits?.cast.slice(0, 3).map((actor) => actor.name);

  return {
    director: director?.name || "Director not found",
    mainStars: mainStars || ["No stars found"],
  };
};

export const formatMovieDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60); // Get the hours part
  const minutes = totalMinutes % 60; // Get the remaining minutes part
  return `${hours}h ${minutes}min`;
};
