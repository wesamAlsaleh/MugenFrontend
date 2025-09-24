import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  sectionTitle?: string;
  content?: any;
}

export default function AnimeCardDetailsSection({
  sectionTitle,
  content,
}: Props) {
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
  });
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.title}>{sectionTitle || " "}</Text>

      {/* Section Content */}
      {content}
    </View>
  );
}
