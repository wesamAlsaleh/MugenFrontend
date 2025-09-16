import { CoverImageDto } from "../CoverImageDto";
import { MediaStatus } from "../MediaStatus";
import { MediaType } from "../MediaType";
import { TitleDto } from "../TitleDto";

export type MediaRecommendationDto = {
  id: number;
  title: TitleDto;
  coverImage: CoverImageDto;
  type: MediaType;
  format: MediaStatus;
  episodes: number | null;
  siteUrl: string;
};
