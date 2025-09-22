import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, View } from "react-native";

// Define the RadioButton component props
interface Props {
  selected?: boolean;
}

export default function RadioButton({ selected = false }: Props) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    container: {
      borderColor: theme.cardBorderColor,
    },
    innerCircle: {
      backgroundColor: selected ? theme.primary : theme.cardBackgroundColor,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.innerCircle, dynamicStyles.innerCircle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 12, // Make the border circular
    borderWidth: 1,
    alignItems: "center", // Center the inner circle
    justifyContent: "center", // Center the inner circle
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 11, // Make the inner circle circular
  },
});
