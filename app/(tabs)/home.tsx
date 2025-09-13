import FeaturedAnimeCarousel from "@/components/FeaturedAnimeCarousel";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function HomePage() {
  // Detect the color scheme (light or dark) of the device using built-in hook
  let colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {/* Adjust status bar style based on theme */}
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      {/*  */}
      <FeaturedAnimeCarousel />

      <Text style={styles.text}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
  },
  text: {
    fontSize: 20,
  },
});
