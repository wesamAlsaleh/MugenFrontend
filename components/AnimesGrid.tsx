import { Anime } from "@/types/Anime";
import { getNumColumns } from "@/Utility/screenUtils";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AnimeCard from "./AnimeCard";

// AnimesGrid Props
type Props = {
  animes: Anime[]; // Array of anime objects
};

export default function AnimesGrid({ animes }: Props) {
  // Determine number of columns
  const numColumns = getNumColumns();

  // Get the screen width
  const screenWidth = Dimensions.get("window").width;

  // Calculate card width based on number of columns and padding
  const cardWidth = (screenWidth - 32 - (numColumns - 1) * 8) / numColumns; // (16 padding on each side and 8 gap between cards)

  return (
    <View style={styles.container}>
      {animes.map((anime) => (
        <View key={anime.id}>
          <AnimeCard anime={anime} cardWidth={cardWidth} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange items in a row
    flexWrap: "wrap", // Allow items to wrap to the next line
    justifyContent: "space-between", // Distribute space between items
    marginBottom: 70, // Add bottom margin to avoid content being cut off by bottom tab bar (tab bar height is 70 so we add 70 margin)
  },
});
