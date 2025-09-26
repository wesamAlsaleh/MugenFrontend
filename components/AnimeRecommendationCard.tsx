import { useTheme } from "@/hooks/use-theme";
import { RecommendationNodeDto } from "@/types/dtos/(small_dtos)/RecommendationNodeDto";
import { formatMediaFormat, formatMediaStatus } from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnimeRecommendationCard({
  node,
  rating,
}: {
  node: RecommendationNodeDto;
  rating: number | null;
}) {
  // Set the theme based on the device's color scheme
  const theme = useTheme();

  // Router Instance for navigation
  const router = useRouter();

  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: IsTablet() ? 160 : 140, // bigger width on tablets
      height: IsTablet() ? 240 : 220, // bigger height on tablets
      // backgroundColor: theme.primary + "cc", // Slightly transparent primary color
    },
    animeImageContainer: {
      display: "flex",
      flexDirection: "column",
    },
    animeImage: {
      width: "100%",
      height: IsTablet() ? 200 : 180, // bigger height on tablets
      resizeMode: "cover",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: "#e0e0e0", // Fallback background in case image fails
    },
    animeDetailsContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: 4, // Space between image and details
    },
    animeTitleText: {
      fontSize: 12,
      fontWeight: "400",
      textAlign: "left",
      color: theme.primaryText,
    },
    animeStatusContainer: {
      position: "absolute",
      top: 4,
      left: 4,
      zIndex: 1,
      backgroundColor: theme.primary + "cc", // Slightly transparent background
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    animeStatusText: {
      fontSize: IsTablet() ? 12 : 11,
      fontWeight: "500",
      color: theme.primaryText,
    },
    animeStatsText: {
      fontSize: 11,
      color: theme.primary,
      fontWeight: "400",
      textAlign: "left",
    },
  });

  // Function to handle card press and navigate to anime details page
  const handlePress = () => {
    router.push({
      pathname: "/anime/[id]",
      params: { id: node.mediaRecommendation.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.container}>
        {/* Anime Image */}
        <View style={styles.animeImageContainer}>
          {/* Anime Status */}
          <View style={styles.animeStatusContainer}>
            <Text style={styles.animeStatusText}>
              {formatMediaStatus(node.mediaRecommendation.status!)}
            </Text>
          </View>

          <Image
            source={{ uri: node.mediaRecommendation.coverImage.large! }}
            style={styles.animeImage}
          />
        </View>

        {/* Anime Details */}
        <View style={styles.animeDetailsContainer}>
          {/* Anime Title */}
          <Text
            style={styles.animeTitleText} // Set text color based on theme
            numberOfLines={1} // Limit title to one line
            ellipsizeMode="tail" // Add ellipsis if the title is too long (ellipsizeMode to "tail" adds "..." at the end)
          >
            {node.mediaRecommendation.title.english}
          </Text>

          {/* Anime Status */}
          <Text style={styles.animeStatsText}>
            {formatMediaFormat(node.mediaRecommendation.format!)} |{" "}
            {node.mediaRecommendation.episodes ?? "?"}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
