import AnimesGrid from "@/components/AnimesGrid";
import CurrentSeason from "@/components/CurrentSeason";
import FeaturedAnimeCarousel from "@/components/FeaturedAnimeCarousel";
import { useTheme } from "@/hooks/use-theme";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";

export default function HomePage() {
  // Detect the color scheme (light or dark) of the device using built-in hook
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: theme.backgroundColor }]} // Set background color based on theme and make it take full height "screen"
      contentContainerStyle={styles.container} // Add padding to the container
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
    >
      {/* Adjust status bar style based on theme */}
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      {/* Anime Carousel */}
      <FeaturedAnimeCarousel />

      {/* Current Season Component with animation */}
      <CurrentSeason season="Summer" year={2025} />

      {/* Animes Grid */}
      <AnimesGrid />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Home screen padding (16 on left and right, total 32)
  },
  text: {
    fontSize: 20,
  },
});
