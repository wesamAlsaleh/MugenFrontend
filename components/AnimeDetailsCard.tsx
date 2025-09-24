import { useTheme } from "@/hooks/use-theme";
import { AnimeDetails } from "@/types/Anime";
import React from "react";
import { StyleSheet, View } from "react-native";
import AnimeDescription from "./AnimeDescription";
import AnimeGeneralInfo from "./AnimeGeneralInfo";
import AnimeGenres from "./AnimeGenres";
import Card from "./Card";

type Props = {
  animeDetails: AnimeDetails;
};

export default function AnimeDetailsCard({ animeDetails }: Props) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 10, // Space between sections
    },
  });

  return (
    <View style={styles.container}>
      {/* Anime Genres */}
      <AnimeGenres genres={animeDetails?.genres!} />

      {/* Anime Description */}
      <AnimeDescription desc={animeDetails?.description!} />

      {/* Anime General information */}
      <Card cardContent={<AnimeGeneralInfo animeDetails={animeDetails} />} />
    </View>
  );
}
