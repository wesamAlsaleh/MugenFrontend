import { useTheme } from "@/hooks/use-theme";
import { getScreenWidth } from "@/Utility/screenUtils";
import React from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
  cardContent: React.ReactNode;
  width?: number;
  height?: number;
}

export default function Card(props: CardProps) {
  // Get the current color scheme (light or dark)
  const theme = useTheme();

  // Get screen width
  const screenWidth = getScreenWidth();

  // Calculate card width based on screen width and padding (16 on each side)
  const cardWidth = !props.width ? screenWidth - 32 : props.width; // Default full width minus padding, or fixed width if provided

  // Calculate card height to maintain a 16:9 aspect ratio
  const cardHeight = !props.height ? (cardWidth * 9) / 16 : props.height; // Default 16:9 ratio, or fixed height if provided

  // Dynamic styles
  const dynamicStyles = {
    cardContainer: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      width: cardWidth,
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
  container: { marginVertical: 20, marginBottom: 10 },
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
