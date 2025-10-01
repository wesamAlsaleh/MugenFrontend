import { useTheme } from "@/hooks/use-theme";
import { HeartMinus, HeartPlus } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import BarContent from "./BarContent";

export default function UserFavorite({
  inFavorites,
}: {
  inFavorites?: boolean;
}) {
  // Get the theme styles
  const theme = useTheme();

  //State to manage favorite status
  const [isFavorite, setIsFavorite] = useState<boolean | null>(
    inFavorites ?? null
  );

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    icon: {
      color: theme.primary, // Use primary color from theme
    },
  });

  // Render favorite status based on inFavorites prop
  const renderFavoriteStatus = (inFav: boolean | null) => {
    switch (inFav) {
      // In favorites show remove option
      case true:
        return (
          <BarContent
            icon={<HeartMinus size={28} color={styles.icon.color} />}
            text="Remove from Favorites"
          />
        );
      // Not in favorites show add option
      case false:
        return (
          <BarContent
            icon={<HeartPlus size={28} color={styles.icon.color} />}
            text="Add to Favorites"
          />
        );
      // Null or undefined state, show add option
      case null:
        return (
          <BarContent
            icon={<HeartPlus size={28} color={styles.icon.color} />}
            text="Add to Favorites"
          />
        );
      // Default case, treat as not in favorites, Should not reach here
      default:
        return (
          <BarContent
            icon={<HeartPlus size={28} color={styles.icon.color} />}
            text="Add to Favorites"
          />
        );
    }
  };

  // Handle press event
  const handlePress = () => {
    // Toggle favorite status (local state)
    setIsFavorite((prev) => (prev === null ? true : !prev));

    console.log("Favorite status ready to sent:", isFavorite);

    //TODO: Update the favorite status in the backend
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      {renderFavoriteStatus(isFavorite)}
    </TouchableOpacity>
  );
}
