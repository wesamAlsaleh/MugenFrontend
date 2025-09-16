import { useTheme } from "@/hooks/use-theme";
import { Filters } from "@/types/filter";
import { FunnelPlus, FunnelX } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// Define the props for the AnimeFilter component
type Props = {
  onOpenFilter: () => void; // Function to open the filter bottom sheet
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

// AnimeFilter component to render the filter section (handle search input and filter button that opens the bottom sheet)
export default function AnimeFilter({
  onOpenFilter,
  filters,
  setFilters,
}: Props) {
  // Get the theme of the app
  const theme = useTheme();

  // Does the user have any active filters?
  const hasActiveFilters =
    Boolean(filters.season) ||
    Boolean(filters.year) ||
    Boolean(filters.searchQuery) ||
    (filters.genres && filters.genres.length > 0);

  const dynamicStyles = {
    headerText: {
      color: theme.secondaryText,
    },
    subHeaderText: {
      color: theme.mutedText,
    },
    filterButton: {
      BackgroundColor: theme.cardBackgroundColor,
      borderColor: hasActiveFilters ? theme.primary : theme.cardBorderColor,
    },
    filterIcon: {
      color: hasActiveFilters ? theme.primary : theme.mutedText,
    },
    searchBarInput: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      placeholderTextColor: theme.mutedText,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[styles.searchBarInput, dynamicStyles.searchBarInput]}
          placeholder="Search anime / manga..."
          placeholderTextColor={
            dynamicStyles.searchBarInput.placeholderTextColor
          }
          value={filters.searchQuery ?? ""}
          onChangeText={(text) =>
            setFilters((prev) => ({ ...prev, searchQuery: text }))
          }
        />
      </View>

      {/* Buttons Section */}
      <View>
        {/* Filter Button */}
        <TouchableOpacity
          style={[styles.filterButton, dynamicStyles.filterButton]}
          onPress={onOpenFilter}
          onLongPress={() => {
            // Clear all filters except search query
            setFilters((prev) => ({
              ...prev,
              season: null,
              year: null,
              genres: null,
            }));
          }}
        >
          {hasActiveFilters ? (
            <FunnelX color={dynamicStyles.filterIcon.color} />
          ) : (
            <FunnelPlus color={dynamicStyles.filterIcon.color} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 10,
    gap: 10,
  },
  searchBarContainer: {
    flex: 1, // Take up remaining space
  },
  searchBarInput: {
    height: 45,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
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

  // Text Styles
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
