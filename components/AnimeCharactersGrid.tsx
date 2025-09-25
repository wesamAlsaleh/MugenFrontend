import { CharacterDto } from "@/types/dtos/(small_dtos)/CharacterDto";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AnimeCharacterCard from "./AnimeCharacterCard";

interface Props {
  edges: CharacterDto[] | null;
}

export default function AnimeCharactersGrid({ edges }: Props) {
  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row", // Arrange items in a row
      flexWrap: "wrap", // Allow items to wrap to the next line
      justifyContent: "space-between", // Distribute space between items
    },
  });

  return (
    <FlatList
      data={edges}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.node.id.toString()} // Use character ID as key
      renderItem={({ item }) => <AnimeCharacterCard character={item} />}
      ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // Space between items in horizontal list
      contentContainerStyle={styles.container}
    />
  );
}
