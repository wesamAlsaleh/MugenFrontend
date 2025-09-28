import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

interface CardProps {
  cardContent: React.ReactNode;
  width?: DimensionValue; // only fixed if provided
  height?: DimensionValue; // only fixed if provided
}

export default function Card(props: CardProps) {
  // Get the current color scheme (light or dark)
  const theme = useTheme();

  // Calculate card height
  const cardHeight = props.height ?? "auto";

  // Dynamic styles
  const dynamicStyles = {
    cardContainer: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      width: props.width ? props.width : "100%",
      height: cardHeight,
    },
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, dynamicStyles.cardContainer]}>
        {/* Card content goes here */}
        {props.cardContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  cardContainer: {
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 5,
    overflow: "hidden",
    position: "relative",
  },
});
