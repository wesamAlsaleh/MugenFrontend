import { useTheme } from "@/hooks/use-theme";
import { RelationDto } from "@/types/dtos/(small_dtos)/RelationDto";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AnimeRelationCard from "./AnimeRelationCard";

interface Props {
  edges: RelationDto[] | null; // RelationDto is {relationType: string, node: {id: number, title: {romaji: string, english: string, native: string, userPreferred: string}, coverImage: {extraLarge: string, large: string, medium: string, color: string}}}
}

export default function AnimeRelationsGrid({ edges }: Props) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row", // Arrange items in a row
      justifyContent: "space-between", // Distribute space between items
    },
  });

  return (
    <FlatList
      data={edges}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.node.id.toString()} // Use anime ID as key
      renderItem={({ item }) => <AnimeRelationCard edge={item} />}
      ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // Space between items in horizontal list
      contentContainerStyle={styles.container}
    />
  );
}
