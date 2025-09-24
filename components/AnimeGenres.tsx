import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";

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

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.title}>Genres</Text>

      {/* Genres list */}
      <View style={styles.genresContainer}>
        {genres && genres.length > 0 ? (
          genres.map((g, i) => {
            return <Badge key={i} content={g} />;
          })
        ) : (
          <Text style={styles.text}>No genres available.</Text>
        )}
      </View>
    </View>
  );
}
