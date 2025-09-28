import { useTheme } from "@/hooks/use-theme";
import { HeartMinus, HeartPlus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserFavorite({
  inFavorites,
}: {
  inFavorites?: boolean;
}) {
  // Get the theme styles
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      // Center the icon
      justifyContent: "center",
      alignItems: "center",
      // Padding for touch area
      padding: 8,
      gap: 4, // Space between icon and text
    },
    icon: {
      color: theme.primary, // Use primary color from theme
    },
    text: {
      color: theme.secondaryText,
      fontSize: 12,
      fontWeight: "500",
      textAlign: "center",
      lineHeight: 18,
      includeFontPadding: false, // Remove extra padding for better alignment
    },
  });

  return (
    <TouchableOpacity style={{}} onPress={() => {}} activeOpacity={0.7}>
      <View style={styles.container}>
        {inFavorites ? (
          <HeartMinus size={28} color={styles.icon.color} />
        ) : (
          <>
            <HeartPlus size={28} color={styles.icon.color} />
            <Text style={styles.text}>Add to Favorites</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
