import { useTheme } from "@/hooks/use-theme";
import { ThisSeasonAnimeType } from "@/types/thisSeasonAnime";
import { capitalizeFirstLetter } from "@/Utility/capitalizeFirstLetter";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnimeCard({
  anime,
  cardWidth, // Default width to 120 to show 3 columns on phone
}: {
  anime: ThisSeasonAnimeType;
  cardWidth: number; // Prop to set card width to adjust number of columns
}) {
  // Set the theme based on the device's color scheme
  const theme = useTheme();

  // Calculate responsive dimensions based on card width
  const imageHeight = cardWidth * 1.4; // Maintain aspect ratio
  const cardHeight = imageHeight + 70; // Add space for text content

  // D
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

  const handlePress = () => {
    alert(`You pressed on ${anime.title.userPreferred}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={[styles.container, dynamicStyles.container]}>
        {/* Anime Image */}
        <View style={styles.animeImageContainer}>
          <Image
            source={{ uri: anime.coverImage.extraLarge! }}
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
            {anime.title.userPreferred}
          </Text>

          {/* Anime main genre and rating */}
          <View style={styles.animeGenresAndRatingContainer}>
            <Text
              style={[
                styles.animeGenresAndRatingText,
                { color: theme.secondaryText },
              ]}
            >
              {anime.genres[0] || "--"}
            </Text>

            <Text
              style={[
                styles.animeGenresAndRatingText,
                { color: theme.secondaryText },
              ]}
            >
              {anime.averageScore ? `${anime.averageScore}%` : ""}
            </Text>
          </View>

          {/* Anime Episodes Status */}
          {anime.status === "RELEASING" ? (
            <>
              <Text style={[styles.animeStatusText, { color: theme.primary }]}>
                {capitalizeFirstLetter("Ongoing")}
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.animeStatusText, { color: theme.primary }]}>
                {/* Get the status  */}
                {capitalizeFirstLetter(anime.status)}
              </Text>
            </>
          )}
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
    fontSize: 10,
    fontWeight: "300",
    textAlign: "left",
  },
  animeStatusText: {
    fontSize: 10,
    fontWeight: "300",
    textAlign: "left",
    marginTop: 2, // Add some spacing between genre and status
  },
});
