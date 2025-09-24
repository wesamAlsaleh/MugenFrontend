import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  content?: string | null; // Content to display inside the badge
  bgColor?: string; // Optional background color for the badge
  borderColor?: string; // Optional border color for the badge
  textColor?: string; // Optional text color for the badge
  onPress?: () => void; // Optional onPress handler for interactivity
}

export default function Badge({
  content,
  bgColor,
  borderColor,
  textColor,
  onPress,
}: Props) {
  // Get the theme styles
  const theme = useTheme();

  // Type check to ensure content is valid
  if (!content) return <View></View>;

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    statusBadgeContainer: {
      width: "auto", // Width based on content
      alignSelf: "flex-start", // Align to the start of the container
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: bgColor || theme.cardBackgroundColor,
      borderColor: borderColor || theme.cardBorderColor,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      color: textColor || theme.primaryText,
    },
  });

  // If there's no content, don't render anything
  if (!content) return <View></View>;

  // If onPress is provided, make the badge interactive
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.statusBadgeContainer}>
          <Text style={styles.statusText} onPress={onPress}>
            {content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.statusBadgeContainer}>
      <Text style={styles.statusText}>{content}</Text>
    </View>
  );
}
