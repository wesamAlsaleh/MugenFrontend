import { useTheme } from "@/hooks/use-theme";
import { CharacterDto } from "@/types/dtos/(small_dtos)/CharacterDto";
import { formatMediaCharacterRole } from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnimeCharacterCard({
  character,
}: {
  character: CharacterDto;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      width: IsTablet() ? 140 : 120, // bigger width on tablets
      height: IsTablet() ? 240 : 210, // bigger height on tablets
      //   backgroundColor: theme.primary + "22", // Slightly transparent background
    },
    characterImageContainer: {
      flexDirection: "column",
      borderRadius: 8,
      overflow: "hidden",
    },
    characterRoleContainer: {
      position: "absolute",
      top: 4,
      left: 4,
      zIndex: 1,
      backgroundColor: theme.primary + "cc", // Slightly transparent background
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    characterRoleText: {
      fontSize: IsTablet() ? 12 : 11,
      fontWeight: "500",
      color: theme.primaryText,
    },
    characterImage: {
      width: "100%",
      height: IsTablet() ? 160 : 150,
    },
    characterDetailsContainer: {
      marginTop: 6, // Space between image and details
      flexDirection: "column",
      gap: 6, // Space between character name and voice actor details
    },
    characterNameText: {
      fontSize: IsTablet() ? 14 : 12,
      fontWeight: "400",
      textAlign: "left",
      color: theme.primaryText,
    },
    voiceActorContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center", // Align items vertically centered
      gap: 6, // Space between voice actor image and voice actor name
    },
    voiceActorImage: {
      width: IsTablet() ? 35 : 30,
      height: IsTablet() ? 35 : 30,
      borderRadius: 8,
      backgroundColor: theme.primary + "44", // Placeholder background color
    },
    voiceActorNameText: {
      fontSize: IsTablet() ? 12 : 11,
      fontWeight: "400",
      color: theme.secondaryText,
      flexShrink: 1, // Allow text to shrink if necessary
    },
  });

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.cardContainer}>
        {/* Character Image Container */}
        <View style={styles.characterImageContainer}>
          {/* Character Role Badge */}
          <View style={styles.characterRoleContainer}>
            <Text style={styles.characterRoleText}>
              {formatMediaCharacterRole(character.role)}
            </Text>
          </View>

          {/* Character Image */}
          <View style={styles.characterImage}>
            <Image
              source={{ uri: character.node.image?.large }}
              style={styles.characterImage}
            />
          </View>
        </View>

        {/* Character Name and Voice Actor Container */}
        <View style={styles.characterDetailsContainer}>
          {/* Character Name */}
          <Text
            style={styles.characterNameText}
            numberOfLines={1} // Limit title to one line
            ellipsizeMode="tail" // Add ellipsis if the title is too long (ellipsizeMode to "tail" adds "..." at the end)
          >
            {character.node.name.userPreferred}
          </Text>

          {/* Voice Actor Details (Name and Image) */}
          <View style={styles.voiceActorContainer}>
            {/* Voice Actor Image */}
            <Image
              source={{ uri: character.voiceActors[0]?.image?.large }} // Each character has at least one voice actor, so we access the first one
              style={styles.voiceActorImage}
            />

            {/* Voice Actor Name */}
            <Text
              style={styles.voiceActorNameText}
              numberOfLines={1} // Limit title to one line
              ellipsizeMode="tail" // Add ellipsis if the title is too long (ellipsizeMode to "tail" adds "..." at the end)
            >
              {character.voiceActors[0]?.name.userPreferred}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
