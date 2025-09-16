import { useTheme } from "@/hooks/use-theme";
import { Filters } from "@/types/filter";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Separator from "./Separator";

export default function ActiveFiltersDisplay({
  filters,
}: {
  filters: Filters;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = StyleSheet.create({});

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Active Filters:</Text>
      <Text>{filters.season || "No season selected"}</Text>

      {/* Separator */}
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8, // Space between Active Filters Title and filter tags
  },
});
