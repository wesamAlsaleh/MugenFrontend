import { RecommendationDto } from "./(small_dtos)/RecommendationDto";

export type RecommendationsDto = {
  edges: RecommendationDto[]; // Array of recommendation edges
};
