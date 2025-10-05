import { StudioEdges } from "@/types/Studio";
import React from "react";
import { FlatList } from "react-native";
import StudioAnimeCard from "./StudioAnimeCard";

export default function StudioAnimesGrid({
  edges,
}: {
  edges: StudioEdges | undefined | null;
}) {
  return (
    <FlatList
      data={edges}
      keyExtractor={(item) => item.node.id.toString()} // Make the anime ID as key
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10, gap: 10 }} // Add some padding and gap between items
      renderItem={({ item }) => <StudioAnimeCard anime={item.node} />}
    />
  );
}
