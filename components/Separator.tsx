import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { View } from "react-native";

export default function Separator() {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles
  const styles = {
    separator: {
      height: 1,
      marginTop: 8,
      backgroundColor: theme.separatorColor,
    },
  };

  return <View style={styles.separator} />;
}
