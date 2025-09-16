import { MediaRecommendationDto } from "./MediaRecommendationDto";

export type RecommendationNodeDto = {
  rating: number | null;
  mediaRecommendation: MediaRecommendationDto;
};
