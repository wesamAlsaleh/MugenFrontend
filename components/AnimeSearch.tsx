import { useTheme } from "@/hooks/use-theme";
import { SearchParam } from "@/types/SearchParam";
import { Funnel } from "lucide-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// Define props for the AnimeSearch component
type Props = {
  searchParams: SearchParam;
  setSearchParams: Dispatch<SetStateAction<{}>>;
};

export default function AnimeSearch({ searchParams, setSearchParams }: Props) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    searchBar: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      placeholderTextColor: theme.secondaryText,
    },
    filterButton: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      color: theme.mutedText,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[styles.searchBar, dynamicStyles.searchBar]}
          placeholder="Search anime / manga..."
          placeholderTextColor={dynamicStyles.searchBar.placeholderTextColor}
          value={searchParams.searchQuery ?? ""}
          onChangeText={(text) =>
            setSearchParams((prev) => ({ ...prev, searchQuery: text }))
          }
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity
        style={[styles.filterButton, dynamicStyles.filterButton]}
        onPress={() => {}}
        onLongPress={() => {}}
      >
        <Funnel color={dynamicStyles.filterButton.color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Full width of the screen minus the padding (16 on each side, total 32)
    marginVertical: 20, // Vertical margin to separate from header and the results
    gap: 10, // Space between the text input and the button
  },
  searchBarContainer: {
    borderRadius: 8,
    flex: 1, // Take up remaining space
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1, // Take up remaining space
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1.3,
    alignItems: "center",
    justifyContent: "center",
    width: 45, // Fixed width
    height: 45, // Fixed height
  },
});
