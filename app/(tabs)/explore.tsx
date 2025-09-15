import AnimeFilter from "@/components/AnimeFilter";
import Card from "@/components/Card";
import { useTheme } from "@/hooks/use-theme";
import { getScreenHeight } from "@/Utility/screenUtils";
import { ScrollView, StyleSheet } from "react-native";

export default function ExplorePage() {
  // get the theme
  const theme = useTheme();

  // dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
  };

  // Calculate card height to get the 10% of the screen height
  const cardHeight = getScreenHeight() * 0.1;

  return (
    <ScrollView
      style={dynamicStyles.container} // Set background color based on theme and make it take full height "screen"
      contentContainerStyle={styles.container} // Add padding to the container
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
    >
      {/* Filter Card */}
      <Card cardContent={<AnimeFilter />} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Home screen padding (16 on left and right, total 32)
  },
});
