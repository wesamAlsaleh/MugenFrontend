import { useTheme } from "@/hooks/use-theme";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  icon: ReactNode;
  text: string;
  specialTextStyle?: object; // Optional prop for special text styling
}

export default function BarContent({ icon, text, specialTextStyle }: Props) {
  // Get the theme styles
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      height: "100%", // Full height of the parent container
      minWidth: 100, // Ensures stable width
      gap: 4, // Space between icon and text
      padding: 8, // Padding for touch area
    },
    subContainer: {
      // Center the content
      justifyContent: "center",
      alignItems: "center",
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
      width: 100, // Fixed width to prevent layout shift
      flexWrap: "wrap", // Allow text to wrap if too long
      // backgroundColor: "blue", // Prevent background color issues on status change
    },
  });

  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.subContainer}>{icon}</View>

      {/* Text Container */}
      <View style={styles.subContainer}>
        <Text style={[styles.text, specialTextStyle]} numberOfLines={2}>
          {text}
        </Text>
      </View>
    </View>
  );
}
