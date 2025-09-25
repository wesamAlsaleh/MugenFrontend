import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";
import DetailsSection from "./DetailsSection";

interface Props {
  genres?: string[]; // Array of genre strings
}

export default function AnimeGenres({ genres }: Props) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 8, // Space between Title and genres
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryText,
    },
    genresContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap", // Allow genres to wrap to the next line
      gap: 8, // Space between genre tags
    },
    text: {
      fontSize: 14,
      color: theme.secondaryText,
    },
  });

  // If no genres, return nothing
  if (!genres || genres.length === 0) {
    return <View></View>;
  }

  return (
    <DetailsSection
      title="Genres"
      children={
        <View style={styles.genresContainer}>
          {genres && genres.length > 0 ? (
            genres.map((g, i) => {
              return <Badge key={i} content={g} />;
            })
          ) : (
            <Text style={styles.text}>No genres available.</Text>
          )}
        </View>
      }
    />
  );
}
