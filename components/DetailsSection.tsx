import { useTheme } from "@/hooks/use-theme";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DetailsSection({
  title,
  subTitle,
  children,
}: {
  title?: string;
  subTitle?: string;
  children: ReactNode;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      width: "100%", // Full width of the parent
      flexDirection: "column",
      gap: 8, // Space between Title and children
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-start", // Start from the left
      alignItems: "center", // Vertically center the items
      gap: 8, // Space between title and subtitle
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryText,
    },
    subTitle: {
      color: theme.secondaryText,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Section Title */}
        {title && <Text style={styles.title}>{title}</Text>}

        {/* Section Subtitle */}
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>

      {/* Children */}
      {children}
    </View>
  );
}
