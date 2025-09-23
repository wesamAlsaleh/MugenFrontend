import { MediaStatus } from "../MediaStatus";
import { MediaType } from "../MediaType";
import { TitleDto } from "../TitleDto";

export type MediaRecommendationDto = {
  id: number;
  title: TitleDto;
  coverImage: MediaRecommendationCoverImageDto;
  type: MediaType | string;
  format: MediaStatus | string;
  episodes: number | null;
  siteUrl: string;
};
