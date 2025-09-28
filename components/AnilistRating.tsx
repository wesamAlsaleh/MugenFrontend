import { useTheme } from "@/hooks/use-theme";
import { Star } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AnilistRating({ rating }: { rating: number }) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
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
    <View style={styles.container}>
      {/* Rating Icon */}
      <Star color={styles.icon.color} size={24} />

      {/* Anime Rating */}
      <Text style={styles.text}>{ratingOutOf10} </Text>
    </View>
  );
}
