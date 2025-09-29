import { useTheme } from "@/hooks/use-theme";
import { Star } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import BarContent from "./BarContent";

export default function AnilistRating({ rating }: { rating: number }) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      height: "100%", // Full height of the parent container
      minWidth: 100, // Ensures stable width
      // Center the content
      justifyContent: "center",
      alignItems: "center",
      // Padding for touch area
      padding: 8,
      gap: 4, // Space between icon and text
    },
    icon: {
      color: theme.primary,
    },
    text: {
      color: theme.secondaryText,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
      lineHeight: 18,
      includeFontPadding: false, // Remove extra padding for better alignment
    },
  });

  // Anime rating out of 100, convert to out of 10
  const ratingOutOf10 = rating ? `${(rating / 10).toFixed(1)} / 10` : "N/A";

  return (
    <BarContent
      icon={<Star color={styles.icon.color} size={28} />}
      text={ratingOutOf10}
      specialTextStyle={{ fontSize: 14, fontWeight: "600" }}
    />
  );
}
