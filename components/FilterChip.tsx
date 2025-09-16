import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FilterChip({ label }: { label: string }) {
  // Get the theme colors
  const theme = useTheme();

  // dynamic styles
  const dynamicStyles = {
    chipContainer: {
      backgroundColor: theme.chipBackgroundColor,
    },
    chipLabel: {
      color: theme.primaryText,
    },
  };

  return (
    <View style={[styles.chipContainer, dynamicStyles.chipContainer]}>
      <Text style={[styles.chipLabel, dynamicStyles.chipLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
});
