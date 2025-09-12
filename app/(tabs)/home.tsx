import FeaturedSection from "@/components/FeaturedSection";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function HomePage() {
  // Detect the color scheme (light or dark) of the device using built-in hook
  let colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      {/* Adjust status bar style based on theme */}
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <FeaturedSection />
      <Text style={[styles.text, themeTextStyle]}>Home Page</Text>
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
  lightContainer: {
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#1f1f1f",
  },
  lightThemeText: {
    color: "#22c55e",
  },
  darkThemeText: {
    color: "#ffffff",
  },
});
