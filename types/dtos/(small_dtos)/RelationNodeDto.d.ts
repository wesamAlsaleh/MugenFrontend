import { CoverImageDto } from "../CoverImageDto";
import { MediaFormat } from "../MediaFormat";
import { MediaStatus } from "../MediaStatus";
import { MediaType } from "../MediaType";
import { TitleDto } from "../TitleDto";

export type RelationNodeDto = {
  id: number;
  title: TitleDto;
  coverImage: CoverImageDto;
  type: MediaType;
  format: MediaFormat;
  status: MediaStatus;
  episodes: number | null;
  siteUrl: string;
};
