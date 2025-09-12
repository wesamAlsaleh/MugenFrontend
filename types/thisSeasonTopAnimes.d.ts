interface ThisSeasonTopAnimes {
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
  status: string;
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
    timeUntilAiring: number;
  } | null;
}

export { ThisSeasonTopAnimes };
