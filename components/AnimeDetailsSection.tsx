import { AnimeDetails } from "@/types/Anime";
import React from "react";
import { StyleSheet, View } from "react-native";
import AnimeDescription from "./AnimeDescription";
import AnimeGeneralInfo from "./AnimeGeneralInfo";
import AnimeGenres from "./AnimeGenres";
import AnimeTrailer from "./AnimeTrailer";
import Card from "./Card";

type Props = {
  animeDetails: AnimeDetails;
};

export default function AnimeDetailsSection({ animeDetails }: Props) {
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
      {/* Anime Genres Section */}
      <AnimeGenres genres={animeDetails?.genres!} />

      {/* Anime Description Section */}
      <AnimeDescription desc={animeDetails?.description!} />

      {/* Anime General information Card */}
      <Card cardContent={<AnimeGeneralInfo animeDetails={animeDetails} />} />

      {/* Anime Trailer Section */}
      <AnimeTrailer trailer={animeDetails?.trailer!} />

      {/* TODO: Anime Related Section */}

      {/* TODO: Anime Recommendations Section */}
    </View>
  );
}
