import { useTheme } from "@/hooks/use-theme";
import { CharactersDto } from "@/types/dtos/CharactersDto";
import React from "react";
import { StyleSheet, View } from "react-native";
import AnimeCharactersGrid from "./AnimeCharactersGrid";
import DetailsSection from "./DetailsSection";

export default function AnimeCharacters({
  Characters,
}: {
  Characters: CharactersDto | null;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    charactersGridContainer: {},
  });

  // If no characters, return nothing
  if (!Characters || Characters.edges.length === 0) {
    return <View></View>;
  }

  return (
    <DetailsSection
      title="Characters"
      children={<AnimeCharactersGrid edges={Characters.edges} />}
    />
  );
}
