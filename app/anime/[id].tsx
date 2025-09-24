import ActionBar from "@/components/ActionBar";
import AnimeDetailsHeader from "@/components/AnimeDetailsHeader";
import AnimeDetailsSection from "@/components/AnimeDetailsSection";
import { singleAnime } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { AnimeDetails } from "@/types/Anime";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams(); // get the id from URL

  // State to store anime details
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    safeAreaStyle: {
      flex: 1, // Full height of the screen! (Do not remove this)
      backgroundColor: theme.backgroundColor,
    },
    scrollView: {
      flex: 1, // Make ScrollView take full height of the screen
      backgroundColor: theme.backgroundColor, // Set background color based on theme
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", // Align items to the top to keep content stacked
      backgroundColor: theme.backgroundColor, // optional for contrast
      // paddingHorizontal: 16, // Horizontal padding for the screen
      paddingBottom: 16, // Bottom padding to avoid content being cut off
    },
    pageContent: {
      display: "flex",
      flexDirection: "column",
      flex: 1, // Take up remaining space
      gap: 16, // Space between elements
      // marginTop: 16,
      paddingHorizontal: 16, // Horizontal padding for the content
    },
  });

  // Fetch anime details when the component mounts or id changes
  useEffect(() => {
    // TODO: Fetch anime details using the id

    // Set the fetched data to state
    setAnimeDetails(singleAnime);

    // Set loading to false after data is set
    setIsLoading(false);
  }, [id]);

  // If loading, you can return a loading indicator here
  if (isLoading) {
    return <View></View>;
  }

  return (
    <SafeAreaView
      style={styles.safeAreaStyle} // Safe area style
      edges={["top", "left", "right", "bottom"]} // Safe area for all edges
    >
      {/* ScrollView for main content */}
      <ScrollView
        style={styles.scrollView} // Set background color based on theme and make it take full height "screen"
        contentContainerStyle={styles.container} // Add padding to the main container
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      >
        {/* Header Container */}
        <AnimeDetailsHeader animeDetails={animeDetails!} />

        {/* Page Content */}
        <View style={styles.pageContent}>
          {/* TODO: Adult Warning */}

          {/* TODO: Action Buttons */}
          <ActionBar />

          {/* Anime Details */}
          <AnimeDetailsSection animeDetails={animeDetails!} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
