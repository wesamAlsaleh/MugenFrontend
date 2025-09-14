import { ThisSeasonAnimeType } from "@/types/thisSeasonAnime";
import React from "react";
import { StyleSheet, View } from "react-native";
import AnimeCard from "./AnimeCard";

import { thisSeasonAnimes } from "@/constants/dummyData";

// TODO: If AnimesGrid is itself scrollable (like a FlatList or ScrollView), don’t wrap it again in another scroll container — otherwise you’ll get nested scroll issues.

export default function AnimesGrid() {
  return (
    <View style={styles.container}>
      {thisSeasonAnimes.map((anime) => {
        return (
          <AnimeCard key={anime.id} anime={anime as ThisSeasonAnimeType} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    direction: "ltr", // Ensures left-to-right layout
    gap: 10,
  },
  text: {
    fontSize: 20,
  },
});
