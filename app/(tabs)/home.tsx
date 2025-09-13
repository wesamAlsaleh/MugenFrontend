import FeaturedAnimeCarousel from "@/components/FeaturedAnimeCarousel";
import { useTheme } from "@/hooks/use-theme";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function HomePage() {
  // Detect the color scheme (light or dark) of the device using built-in hook
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {/* Adjust status bar style based on theme */}
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      {/*  */}
      <FeaturedAnimeCarousel />

      <Text style={[styles.text, { color: theme.primaryText }]}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 20,
  },
});
