import { useTheme } from "@/hooks/use-theme";
import { AnimeDetails } from "@/types/Anime";
import {
  formatMediaFormat,
  formatMediaSeason,
  formatMediaStatus,
} from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Badge from "./Badge";

export default function AnimeDetailsHeader({
  animeDetails,
}: {
  animeDetails: AnimeDetails;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Get the router object
  const router = useRouter();

  // Check if the device is tablet or not
  const isTablet = IsTablet();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
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
  });

  return (
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
            <Badge
              content={formatMediaSeason({
                season: animeDetails?.season,
                year: animeDetails?.seasonYear,
              })}
              textColor={theme.secondaryText}
            />
          </View>

          {/* Anime Release Season */}
          <Text style={{ color: theme.primaryText }}>
            {formatMediaFormat(animeDetails?.format!)}
            {" | "}
            {animeDetails.episodes || "?"} Episodes
          </Text>
        </View>
      </View>

      {/* Back button stays absolute, above all */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft color={theme.primary} size={26} />
      </TouchableOpacity>
    </View>
  );
}
