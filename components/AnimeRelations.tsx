import { useTheme } from "@/hooks/use-theme";
import { RelationsDto } from "@/types/dtos/RelationsDto";
import React from "react";
import { StyleSheet, View } from "react-native";
import AnimeRelationsGrid from "./AnimeRelationsGrid";
import DetailsSection from "./DetailsSection";

interface Props {
  relations: RelationsDto | null; // RelationsDto is Array of relation edges
}

export default function AnimeRelations({ relations }: Props) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles based on theme
  const styles = StyleSheet.create({});

  // If no relations, return nothing
  if (!relations || relations.edges.length === 0) {
    return <View></View>;
  }

  return (
    <DetailsSection
      title="Anime Relations"
      children={<AnimeRelationsGrid edges={relations.edges} />}
    />
  );
}

// Edge is Array<{relationType: string, node: {id: number, title: {romaji: string, english: string, native: string, userPreferred: string}, coverImage: {extraLarge: string, large: string, medium: string, color: string}}}>
