import { useTheme } from "@/hooks/use-theme";
import { TrailerDto } from "@/types/dtos/TrailerDto";
import { capitalizeFirstLetter } from "@/Utility/capitalizeFirstLetter";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      display: "flex",
      flexDirection: "column",
      gap: 8, // Space between Title and trailer
      justifyContent: "space-between", // Space between title and see more
      width: "100%", // Full width of the parent
    },
    trailerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start", // Space between title and see more
      alignItems: "center", // Vertically center the items
      gap: 8, // Space between title and see more
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryText,
    },
    subTitle: {
      color: theme.secondaryText,
      fontWeight: "600",
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
      <View style={styles.container}>
        <Text style={styles.subTitle}>No Trailer Available</Text>
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
    <View style={styles.container}>
      <View style={styles.trailerContainer}>
        {/* Section Title */}
        <Text style={styles.title}>Trailer</Text>

        {/* Trailer Source */}
        <Text style={styles.subTitle}>
          ({capitalizeFirstLetter(trailer.site)})
        </Text>
      </View>

      {/* Trailer Thumbnail */}
      <TouchableOpacity onPress={() => handleImagePress()} activeOpacity={0.7}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: trailer.thumbnail }}
            style={styles.thumbnailStyle}
            resizeMode={isTablet ? "contain" : "cover"} // Adjust based on device
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

/**
 * "cover" → fills container, may crop image
 * "contain" → shrinks image to fit fully inside, may leave empty space (letterboxing)
 * "stretch" → forces image to fill, may distort
 * "center" → centers without scaling unless bigger than container
 */
