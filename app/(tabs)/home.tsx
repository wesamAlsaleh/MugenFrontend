import AnimesGrid from "@/components/AnimesGrid";
import CurrentSeason from "@/components/CurrentSeason";
import FeaturedAnimeCarousel from "@/components/FeaturedAnimeCarousel";
import { thisSeasonAnimes } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { Anime } from "@/types/Anime";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";

export default function HomeScreen() {
  // Detect the color scheme (light or dark) of the device using built-in hook
  const colorScheme = useColorScheme();

  // Get the theme (light or dark) based on system preferences
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
  };

  return (
    <ScrollView
      style={[dynamicStyles.container]} // Set background color based on theme and make it take full height "screen"
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
      <AnimesGrid animes={thisSeasonAnimes as Anime[]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
  },
});
