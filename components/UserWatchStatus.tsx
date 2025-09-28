import { useTheme } from "@/hooks/use-theme";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserWatchStatus({
  progressStatus,
}: {
  progressStatus?: string | null;
}) {
  // Get the theme styles
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      // Center the content
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
      color: theme.secondaryText, // Use text color from theme
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
        {progressStatus ? (
          <></>
        ) : (
          <>
            <Plus size={28} color={styles.icon.color} />
            <Text style={styles.text}>Add to Watchlist</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
