import { useTheme } from "@/hooks/use-theme";
import { StudioNode } from "@/types/Studio";
import { formatMediaFormat, formatMediaSeason } from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StudioAnimeCard({ anime }: { anime: StudioNode }) {
  // Get the theme colors
  const theme = useTheme();

  // Router Instance for navigation
  const router = useRouter();

  // Styles
  const styles = StyleSheet.create({
    cardContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: IsTablet() ? 240 : 180, // Fixed height for tablet and phone
      // backgroundColor: theme.primary + "99", // Debug color
    },
    imageContainer: {
      width: IsTablet() ? "15%" : "30%", // 15% for tablet and 30% for phone
      height: "100%",
      borderRadius: 8,
      overflow: "hidden", // To ensure the image respects border radius
      // backgroundColor: theme.backgroundColor + "99", // Debug color
    },
    detailsContainer: {
      flex: 1, // Take the remaining space after image
      paddingHorizontal: 10,
      paddingVertical: 5,
      // backgroundColor: "gainsboro", // Debug color
      gap: 5, // Gap between elements
    },
    animeTitle: {
      fontSize: IsTablet() ? 18 : 14, // Larger font for tablet
      fontWeight: "bold",
      color: theme.primaryText,
      flexShrink: 1, // Allow text to shrink if needed
    },
    animeDateContainer: {
      flexDirection: "row",
      alignItems: "center", // Center vertically
      gap: 3, // Gap between elements in the row
    },
    animeDate: {
      fontSize: IsTablet() ? 17 : 13, // Larger font for tablet
      color: theme.secondaryText,
      fontWeight: "600",
      flexShrink: 1, // Allow text to shrink if needed
    },
    statusText: {
      fontSize: IsTablet() ? 16 : 12, // Larger font for tablet
      color: theme.secondaryText,
      fontWeight: "500",
      flexShrink: 1, // Allow text to shrink if needed
    },
  });

  // Function to handle card press and navigate to anime details page
  const handlePress = () => {
    router.push({ pathname: "/anime/[id]", params: { id: anime.id } });
  };

  // Function to render anime date info
  const renderAnimeDateInfo = (year: number, season?: string) => {
    // Handle invalid year values
    if (!year || typeof year !== "number" || isNaN(year)) {
      return "TBA";
    }

    // If season and year are available, format as "Season Year" (e.g., "Spring 2023")
    if (season && year) {
      return formatMediaSeason({ season, year });
    }

    // If only year is available, return just the year
    return year.toString();
  };

  // Function to render anime episode count
  const renderAnimeEpisodeCount = (
    episodes?: number,
    status?: string,
    format?: string
  ) => {
    let text = "";

    // Handle invalid episode values
    if (!episodes || typeof episodes !== "number" || isNaN(episodes)) {
      // If episodes is not available, return empty text
      return <Text style={styles.statusText}></Text>;
    }

    // Handle invalid status values if any
    if (status && typeof status !== "string") {
      return <Text style={styles.statusText}>--</Text>;
    }

    // Handle invalid format values if any
    if (format && typeof format !== "string") {
      return <Text style={styles.statusText}>--</Text>;
    }

    // If no format is provided, just show episodes
    if (!format) {
      return (
        <Text style={styles.statusText}>{`${episodes} ${
          episodes > 1 ? "Episodes" : "Episode"
        }`}</Text>
      );
    }

    // Handle different status and format cases
    if (episodes && format) {
      switch (format) {
        case "MOVIE":
          text = `Movie - ${episodes} ${episodes > 1 ? "Episodes" : "Episode"}`;
          break;
        default:
          text = `${formatMediaFormat(format)} - ${episodes} ${
            episodes > 1 ? "Episodes" : "Episode"
          }`;
          break;
      }
    }

    return <Text style={styles.statusText}>{text}</Text>;
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} key={anime.id}>
      <View style={styles.cardContainer}>
        {/* Anime Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: anime.coverImage.extraLarge! }}
            style={{ width: "100%", height: "100%" }} // Full size of container
            resizeMode="cover" // Cover the container
          />
        </View>

        {/* Anime Details Container */}
        <View style={styles.detailsContainer}>
          {/* Anime Title*/}
          <Text
            style={styles.animeTitle}
            lineBreakMode="tail"
            numberOfLines={3} // Limit to 3 lines
          >
            {anime.title.userPreferred}
          </Text>

          {/* Anime Release Date Information */}
          <Text style={styles.animeDate}>
            {renderAnimeDateInfo(anime.startDate.year, anime.season!)}
          </Text>

          {/* Anime Episode Count */}
          {renderAnimeEpisodeCount(anime.episodes!, anime.status, anime.format)}
        </View>
      </View>
    </TouchableOpacity>
  );
}
