import { RecommendationsDto } from "@/types/dtos/RecommendationsDto";
import React from "react";
import AnimeRecommendationGrid from "./AnimeRecommendationGrid";
import DetailsSection from "./DetailsSection";

export default function AnimeRecommendations({
  animeRecommendations,
}: {
  animeRecommendations: RecommendationsDto;
}) {
  return (
    <DetailsSection
      title="Recommendations"
      children={<AnimeRecommendationGrid edges={animeRecommendations.edges} />}
    />
  );
}
