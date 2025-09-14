type ThisSeasonAnimeType = {
  id: number;
  title: {
    english: string | null;
    native: string | null;
    romaji: string | null;
    userPreferred: string;
  };
  coverImage: {
    color: string | null;
    extraLarge: string | null;
    large: string | null;
    medium: string | null;
  };
  averageScore: number | null;
  meanScore: number | null;
  type: "ANIME" | "MANGA";
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";
  episodes: number | null;
  genres: string[]; // Array of genre strings
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
    timeUntilAiring: number;
  } | null;
};

export { ThisSeasonAnimeType };
