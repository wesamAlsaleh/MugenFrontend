import { useTheme } from "@/hooks/use-theme";
import { formatMediaDescription } from "@/Utility/mediaUtils";
import React from "react";
import { StyleSheet, Text } from "react-native";
import DetailsSection from "./DetailsSection";

export default function AnimeDescription({ desc }: { desc: string }) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      width: "100%", // Full width of the parent
      paddingVertical: 8, // Vertical padding for spacing
    },
    descriptionText: {
      fontSize: 16,
      color: theme.primaryText,
      lineHeight: 19, // Improved readability
      textAlign: "justify", // Horizontal centering
    },
  });

  return (
    <DetailsSection
      title="Synopsis"
      children={
        <Text style={styles.descriptionText}>
          {desc ? formatMediaDescription(desc) : "No description available."}
        </Text>
      }
    />
  );
}
