import { useTheme } from "@/hooks/use-theme";
import { Filters } from "@/types/filter";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ActiveFiltersDisplay({
  filters,
}: {
  filters: Filters;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = StyleSheet.create({
    separator: {
      backgroundColor: theme.separatorColor,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Active Filters:</Text>
      <Text>{filters.season || "No season selected"}</Text>

      {/* Separator (TODO: Implement separator component) */}
      <View style={[styles.separator, dynamicStyles.separator]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8, // Space between Active Filters Title and filter tags
  },
  separator: {
    height: 1,
    marginTop: 8,
  },
});
