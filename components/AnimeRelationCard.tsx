import { useTheme } from "@/hooks/use-theme";
import { RelationDto } from "@/types/dtos/(small_dtos)/RelationDto";
import { formatMediaRelations } from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AnimeRelationCard({ edge }: { edge: RelationDto }) {
  // Set the theme based on the device's color scheme
  const theme = useTheme();

  // Router Instance for navigation
  const router = useRouter();

  // Dynamic styles
  const styles = StyleSheet.create({
    cardContainer: {
      width: IsTablet() ? 120 : 120, // bigger width on tablets
      height: IsTablet() ? 220 : 220, // bigger height on tablets
      display: "flex",
      flexDirection: "column",
    },
    animeImageContainer: {
      flexDirection: "column",
    },
    relationTypeContainer: {
      position: "absolute",
      top: 4,
      left: 4,
      zIndex: 1,
      backgroundColor: theme.primary + "cc", // Slightly transparent background
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    relationTypeText: {
      fontSize: IsTablet() ? 12 : 11,
      fontWeight: "500",
      color: theme.primaryText,
    },
    animeImage: {
      width: "100%",
      height: IsTablet() ? 170 : 170,
      borderRadius: 8,
    },
    relationDetailsContainer: {
      marginTop: 4, // Space between image and title
    },
    animeRelationTitleText: {
      fontSize: IsTablet() ? 14 : 12,
      fontWeight: "400",
      textAlign: "left",
      color: theme.primaryText,
    },
  });

  // Function to handle card press and navigate to anime details page
  const handlePress = () => {
    router.push({ pathname: "/anime/[id]", params: { id: edge.node.id } });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.cardContainer}>
        {/* Relation Image */}
        <View style={styles.animeImageContainer}>
          {/* Relation Type */}
          <View style={styles.relationTypeContainer}>
            <Text style={styles.relationTypeText}>
              {formatMediaRelations(edge.relationType)}
            </Text>
          </View>

          <Image
            source={{ uri: edge.node.coverImage.large! }}
            style={styles.animeImage}
          />
        </View>

        <View style={styles.relationDetailsContainer}>
          {/* Relation Title */}
          <Text
            style={[styles.animeRelationTitleText]}
            numberOfLines={2} // Limit title to two lines
            ellipsizeMode="tail" // Add ellipsis if the title is too long (ellipsizeMode to "tail" adds "..." at the end)
          >
            {edge.node.title.userPreferred}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
