import { UserLists } from "@/types/Anime";
import { IsTablet } from "@/Utility/screenUtils";
import React from "react";
import { StyleSheet, View } from "react-native";
import AnilistRating from "./AnilistRating";
import Card from "./Card";
import UserFavorite from "./UserFavorite";
import UserWatchStatus from "./UserWatchStatus";

interface Props {
  animeRating?: number;
  userList?: UserLists | null;
  openBottomSheet?: () => void;
  closeBottomSheet?: () => void;
}

export default function ActionBar({
  animeRating,
  userList,
  openBottomSheet,
  closeBottomSheet,
}: Props) {
  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    cardWrapper: {
      alignItems: "center", // Center the card
    },
    container: {
      flexDirection: "row",
      width: "100%", // Full width of the card container
      justifyContent: "space-between", // Space buttons evenly
      minHeight: 80, // Minimum height for better touch area
    },
  });

  return (
    <View style={styles.cardWrapper}>
      <Card
        width={IsTablet() ? "45%" : "100%"} // Fixed width for tablets, full width for phones
        height={90}
        cardContent={
          <View style={styles.container}>
            {/* Anilist Rating */}
            <AnilistRating rating={animeRating!} />

            {/* User List Actions Button */}
            <UserWatchStatus
              progressStatus={userList?.progressStatus!}
              openBottomSheet={openBottomSheet!}
              closeBottomSheet={closeBottomSheet!}
            />

            {/* User Favorite Action Button */}
            <UserFavorite inFavorites={userList?.inFavorites!} />
          </View>
        }
      />
    </View>
  );
}
