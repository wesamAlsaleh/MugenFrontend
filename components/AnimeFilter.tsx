import { useTheme } from "@/hooks/use-theme";
import { Filter } from "@/types/Filter";
import { FunnelPlus, FunnelX } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ActiveFiltersDisplay from "./ActiveFiltersDisplay";

// Define the props for the AnimeFilter component
type Props = {
  onOpenFilter: () => void; // Function to open the filter bottom sheet
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
};

// AnimeFilter component to render the filter section (button and active filters)
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
  };

  return (
    <View style={styles.container}>
      {/* Selected Filters Display */}
      <ActiveFiltersDisplay filters={filters} />

      {/* Filter Button */}
      <TouchableOpacity
        style={[styles.filterButton, dynamicStyles.filterButton]}
        onPress={onOpenFilter}
        onLongPress={() => {
          // Clear all filters
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
    gap: 10, // Space between the filters display and the button
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1.3,
    alignItems: "center",
    justifyContent: "center",
    width: 45, // Fixed width TODO: make it dynamic based on the screen size
    height: 45, // Fixed height TODO: make it dynamic based on the screen size
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
