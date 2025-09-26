import { useTheme } from "@/hooks/use-theme";
import { TrailerDto } from "@/types/dtos/TrailerDto";
import { capitalizeFirstLetter } from "@/Utility/capitalizeFirstLetter";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import { Play } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DetailsSection from "./DetailsSection";

export default function AnimeTrailer({
  trailer,
}: {
  trailer: TrailerDto | null;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Get the device type (mobile or tablet)
  const isTablet = IsTablet();

  // Router Instance
  const router = useRouter();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      width: "100%", // Full width of the parent
    },
    trailerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start", // Space between title and see more
      alignItems: "center", // Vertically center the items
      gap: 8, // Space between title and see more
    },
    noTrailerContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    noTrailerText: {
      color: theme.secondaryText,
      fontWeight: "600",
    },
    playIconContainer: {
      position: "absolute",
      top: "50%", // Center vertically
      left: "50%", // Center horizontally
      zIndex: 1, // Ensure the icon is above the image
      transform: [{ translateX: -25 }, { translateY: -25 }], // Center the icon exactly
      backgroundColor: theme.primary + "cc", // Semi-transparent background
      borderRadius: 8, // Circular background
      padding: 10, // Padding around the icon
    },
    thumbnailContainer: {
      height: isTablet ? 400 : 300,
      width: "100%", // Full width of the container
      borderRadius: 8,
      overflow: "hidden", // Ensure the image respects the border radius
    },
    thumbnailStyle: {
      width: "100%",
      height: "100%",
    },
  });

  // If there's no trailer, don't render anything
  if (!trailer)
    return (
      <View style={styles.noTrailerContainer}>
        <Text style={styles.noTrailerText}>No Trailer Available</Text>
      </View>
    );

  // Handle image press to open the trailer URL
  const handleImagePress = () => {
    // If there's no trailer, do nothing
    if (!trailer?.id) alert("No trailer available");
    if (!trailer?.thumbnail) alert("No trailer available");

    // If the trailer site is not youtube, do nothing for now
    if (trailer.site.toLowerCase() !== "youtube")
      return alert("Trailer site not supported, only YouTube is supported");

    // Push to youtube with the trailer id
    router.push(`https://www.youtube.com/watch?v=${trailer.id}`);
  };

  return (
    <DetailsSection
      title="Trailer"
      subTitle={`(${capitalizeFirstLetter(trailer.site)})`}
      children={
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleImagePress()}
            activeOpacity={0.7}
          >
            <View style={styles.thumbnailContainer}>
              {/* Play Icon */}
              <View style={styles.playIconContainer}>
                <Play color={theme.primaryText} />
              </View>

              {/* Thumbnail */}
              <Image
                source={{ uri: trailer.thumbnail }}
                style={styles.thumbnailStyle}
                resizeMode={isTablet ? "contain" : "cover"} // Adjust based on device
              />
            </View>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

/**
 * "cover" → fills container, may crop image
 * "contain" → shrinks image to fit fully inside, may leave empty space (letterboxing)
 * "stretch" → forces image to fill, may distort
 * "center" → centers without scaling unless bigger than container
 */
