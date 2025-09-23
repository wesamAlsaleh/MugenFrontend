import Badge from "@/components/Badge";
import { singleAnime } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { AnimeDetails } from "@/types/Anime";
import {
  formatDescription,
  formatMediaFormat,
  formatMediaStatus,
} from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams(); // get the id from URL

  // Get the theme colors
  const theme = useTheme();

  // Get the router object
  const router = useRouter();

  // Check if the device is tablet or not
  const isTablet = IsTablet();

  // State to store anime details
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails>();

  useEffect(() => {
    // TODO: Fetch anime details using the id

    // Set the fetched data to state
    setAnimeDetails(singleAnime);
  }, [id]);

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
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
    },
    header: {
      width: "100%",
      height: isTablet ? 400 : 300, // Taller header on tablets
      flexDirection: "column", // Stack children vertically
      position: "relative", // TODO: Add comment
      overflow: "hidden", // Ensures children don’t overflow (important for animations or parallax)
    },
    headerBackground: {
      width: "100%",
      height: "100%",
      // position: "absolute", // Position absolutely to cover the entire header
    },
    bannerImage: {
      width: "100%", // Full width of the header
      height: "60%", // Cover top half the header height (60% to leave space for anime image)
      resizeMode: "cover", // Cover the entire area
      backgroundColor: "#f0f0f0", // Fallback background in case image fails
    },
    // This container holds the anime image and name, it takes the other half of the header
    subHeader: {
      flexDirection: "row", // Align items horizontally
      flex: 1, // Take up remaining space in header (40%)
    },
    backButton: {
      flexDirection: "row", // Align icon and text horizontally
      alignItems: "center", // Vertically center icon and text
      padding: 8, // Padding around the button
      // Positioning the button to top-left
      position: "absolute", // Position absolutely within the header
      top: 16, // Distance from the top
      left: 16, // Distance from the left
      zIndex: 10, // Ensure it’s above other elements
    },
    animeImage: {
      width: isTablet ? 170 : 120, // Larger image on tablets
      height: isTablet ? 220 : 170, // Maintain aspect ratio
      borderRadius: 8, // Rounded corners
      backgroundColor: "#e0e0e0", // Fallback background in case image fails
      // Positioning the image to overlap the banner
      marginTop: isTablet ? -90 : -60, // Pull the image up to overlap the banner
      marginLeft: 16, // Space from the left edge
      marginRight: 16, // Space between image and text
    },
    animeDetailsContainer: {
      flexDirection: "column", // Stack text vertically
      flex: 1, // Take up remaining space
      gap: 8, // Space between text elements
    },
    animeName: {
      fontSize: isTablet ? 24 : 18, // Larger text on tablets
      fontWeight: "bold",
      flexShrink: 1, // Allow text to shrink if needed
      color: theme.primaryText, // Set text color based on theme
      marginTop: 8, // Align with the top of the image
    },
    animeDetailsSubContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    statusBadgeStyle: {
      color: theme.primary,
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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.backgroundColor }} // Full height and background color based on theme
      edges={["top", "left", "right", "bottom"]} // Safe area for all edges
    >
      {/* ScrollView for main content */}
      <ScrollView
        style={styles.scrollView} // Set background color based on theme and make it take full height "screen"
        contentContainerStyle={styles.container} // Add padding to the main container
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      >
        {/* Header Container */}
        <View style={styles.header}>
          {/* Top half - Banner Image */}
          <Image
            source={{ uri: animeDetails?.bannerImage! }}
            style={styles.bannerImage}
          />

          {/* Bottom half - Anime cover + Anime Details */}
          <View style={styles.subHeader}>
            {/* Anime cover */}
            <Image
              source={{ uri: animeDetails?.coverImage.large! }}
              style={styles.animeImage}
            />

            {/* Anime Details */}
            <View style={styles.animeDetailsContainer}>
              {/* Anime Title */}
              <Text style={styles.animeName} numberOfLines={2}>
                {animeDetails?.title.userPreferred}
              </Text>

              {/* Anime Details Container */}
              <View style={styles.animeDetailsSubContainer}>
                {/* Anime Status */}
                <Badge
                  content={formatMediaStatus(animeDetails?.status)}
                  bgColor={styles.statusBadgeStyle.color}
                  borderColor="transparent"
                />

                {/* Anime Format */}
                <Badge content={formatMediaFormat(animeDetails?.format!)} />
              </View>
            </View>
          </View>

          {/* Back button stays absolute, above all */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color={theme.primary} size={26} />
          </TouchableOpacity>
        </View>

        {/* Page Content */}
        <View style={styles.pageContent}>
          <Text style={{ color: theme.primaryText }}>
            {formatDescription(animeDetails?.description!)}
          </Text>
          <Text style={{ color: theme.primaryText }}>
            {animeDetails?.description}
          </Text>
          <Text style={{ color: theme.primaryText }}>
            {animeDetails?.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
