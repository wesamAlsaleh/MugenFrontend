import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function searchScreen() {
  // Get the theme
  const theme = useTheme();

  // Define dynamic styles based on the theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
  };

  return (
    <ScrollView
      style={dynamicStyles.container} // Set background color based on theme and make it take full height "screen"
      contentContainerStyle={styles.container} // Add padding to the container
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
    >
      <View>
        <Text style={{ color: theme.primary }}>Search Screen</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Screen padding
  },
});
