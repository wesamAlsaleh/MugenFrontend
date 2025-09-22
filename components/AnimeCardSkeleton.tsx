import { useTheme } from "@/hooks/use-theme";
import { scaleHeight } from "@/Utility/screenUtils";
import { Star } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SkeletonAnimeCard({
  cardWidth, // Default width to 120 to show 3 columns on phone
}: {
  cardWidth: number; // Prop to set card width to adjust number of columns
}) {
  // Set the theme based on the device's color scheme
  const theme = useTheme();

  // Calculate responsive dimensions based on card width
  const imageHeight = scaleHeight(1.4 * cardWidth);
  const cardHeight = scaleHeight(imageHeight + 70);

  // Dynamic styles based on props and theme
  const dynamicStyles = {
    container: {
      width: cardWidth,
      height: cardHeight,
    },
    animeImage: {
      width: cardWidth,
      height: imageHeight,
    },
  };

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={[styles.container, dynamicStyles.container]}>
        {/* Anime Image */}
        <View style={styles.animeImageContainer}>
          <Image
            source={{ uri: "" }}
            style={[styles.animeImage, dynamicStyles.animeImage]} // Combine static and dynamic styles
          />
        </View>

        {/* Anime Details */}
        <View style={styles.animeDetailsContainer}>
          {/* Anime Title */}
          <Text
            style={[styles.animeTitleText, { color: theme.primaryText }]} // Set text color based on theme
            numberOfLines={1} // Limit title to one line
            ellipsizeMode="tail" // Add ellipsis if the title is too long (ellipsizeMode to "tail" adds "..." at the end)
          >
            {"--"}
          </Text>

          {/* Anime main genre and rating */}
          <View style={styles.animeGenresAndRatingContainer}>
            <Text
              style={[
                styles.animeGenresAndRatingText,
                { color: theme.secondaryText },
              ]}
            >
              {"--"}
            </Text>

            <Text
              style={[
                styles.animeGenresAndRatingText,
                { color: theme.secondaryText },
              ]}
            >
              <Star size={10} color={theme.warning} /> {"--"}
            </Text>
          </View>

          {/* Anime Episodes Status */}
          {"--"}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // height: 250, // Dynamic based on screen size
    // width: 120, // Dynamic based on screen size
    // backgroundColor: "#fefefe",
  },
  animeImageContainer: {},
  animeImage: {
    // width: "100%", // Dynamic width based on parent container
    // height: 170, // Dynamic height based on width to maintain aspect ratio
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  animeDetailsContainer: {
    display: "flex",
    marginTop: 4,
  },
  animeTitleText: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "left",
  },
  animeGenresAndRatingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2, // Add some spacing between title and genre
  },
  animeGenresAndRatingText: {
    fontSize: 11,
    fontWeight: "300",
    textAlign: "left",
  },
  animeStatusText: {
    fontSize: 11,
    fontWeight: "400",
    textAlign: "left",
    // marginTop: 1, // Add some spacing between genre and status
  },
});
