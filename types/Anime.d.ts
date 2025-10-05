import { AnimeSeasons } from "./dtos/AnimeSeasons";
import { CharactersDto } from "./dtos/CharactersDto";
import { CoverImageDto } from "./dtos/CoverImageDto";
import { EndDateDto } from "./dtos/EndDateDto";
import { MediaFormat } from "./dtos/MediaFormat";
import { MediaType } from "./dtos/MediaType";
import { NextAiringEpisodeDto } from "./dtos/NextAiringEpisodeDto";
import { RecommendationsDto } from "./dtos/RecommendationsDto";
import { RelationsDto } from "./dtos/RelationsDto";
import { StartDateDto } from "./dtos/StartDateDto";
import { StudiosDto } from "./dtos/StudiosDto";
import { TitleDto } from "./dtos/TitleDto";
import { TrailerDto } from "./dtos/TrailerDto";

type Anime = {
  id: number;
  title: TitleDto;
  coverImage: CoverImageDto;
  averageScore: number | null;
  meanScore: number | null;
  status: MediaStatus | string;
  type?: MediaType | string | null;
  episodes?: number | null;
  genres?: string[] | null; // Array of genre strings, sometimes can be null
  nextAiringEpisode?: NextAiringEpisodeDto | null;
};

// Specific type for AnimeDetails which extends Anime type
type AnimeDetails = Anime & {
  idMal: number | null;
  format: MediaFormat | string;
  description: string | null;
  startDate: StartDateDto | null;
  endDate: EndDateDto | null;
  season: AnimeSeasons | string | null;
  seasonYear: number | null;
  duration: number | null;
  countryOfOrigin: string | null;
  source: string | null;
  hashtag: string | null;
  trailer: TrailerDto | null;
  bannerImage: string | null;
  popularity: number | null;
  trending: number | null;
  studios: StudiosDto | null;
  characters: CharactersDto | null;
  isAdult: boolean | null;
  siteUrl: string | null;
  relations: RelationsDto | null;
  recommendations: RecommendationsDto | null;
};

// Additional type for user lists
type UserLists = {
  progressStatus?: string | null;
  inFavorites?: boolean | null;
};

export { Anime, AnimeDetails, UserLists };
