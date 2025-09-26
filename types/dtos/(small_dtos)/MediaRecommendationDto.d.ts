import { MediaFormat } from "../MediaFormat";
import { MediaStatus } from "../MediaStatus";
import { MediaType } from "../MediaType";
import { TitleDto } from "../TitleDto";

export type MediaRecommendationDto = {
  id: number;
  title: TitleDto;
  coverImage: MediaRecommendationCoverImageDto;
  type: MediaType | string | null;
  format: MediaFormat | string | null;
  status: MediaStatus | string | null;
  episodes: number | null;
  siteUrl: string | null;
};
