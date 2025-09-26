import { RecommendationDto } from "@/types/dtos/(small_dtos)/RecommendationDto";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AnimeRecommendationCard from "./AnimeRecommendationCard";

export default function AnimeRecommendationGrid({
  edges,
}: {
  edges: RecommendationDto[]; // Array of recommendation edges
}) {
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
      keyExtractor={(item) => item.node.mediaRecommendation.id.toString()} // Use media recommendation ID as key
      renderItem={({ item }) => (
        <AnimeRecommendationCard node={item.node} rating={item.node.rating} />
      )}
      ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // Space between items in horizontal list
      contentContainerStyle={styles.container}
    />
  );
}
