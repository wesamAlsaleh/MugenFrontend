import { RelationsDto } from "@/types/dtos/RelationsDto";
import React from "react";
import { View } from "react-native";
import AnimeRelationsGrid from "./AnimeRelationsGrid";
import DetailsSection from "./DetailsSection";

interface Props {
  relations: RelationsDto | null; // RelationsDto is Array of relation edges
}

export default function AnimeRelations({ relations }: Props) {
  // If no relations, return nothing
  if (!relations || relations.edges.length === 0) {
    return <View></View>;
  }

  return (
    <DetailsSection
      title="Relations"
      children={<AnimeRelationsGrid edges={relations.edges} />}
    />
  );
}

// Edge is Array<{relationType: string, node: {id: number, title: {romaji: string, english: string, native: string, userPreferred: string}, coverImage: {extraLarge: string, large: string, medium: string, color: string}}}>
