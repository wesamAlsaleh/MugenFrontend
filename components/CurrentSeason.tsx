import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CurrentSeasonProps {
  season: string;
  year: number;
}

export default function CurrentSeason(props: CurrentSeasonProps) {
  // Destructure props
  const { season, year } = props;

  // Get the theme (light or dark) based on system preferences
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    text: {
      color: theme.primaryText,
    },
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, dynamicStyles.text]}
      >{`${season} ${year}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, // Vertical margin for spacing between sections in the ScrollView
    paddingHorizontal: 16, // Horizontal padding to align with other components
    // Center the text
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
