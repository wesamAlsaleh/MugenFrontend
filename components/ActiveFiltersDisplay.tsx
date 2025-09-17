import { useTheme } from "@/hooks/use-theme";
import { Filter } from "@/types/Filter";
import { Tags } from "lucide-react-native";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FilterChip from "./FilterChip";

// Component to display active filters as chips
export default function ActiveFiltersDisplay({ filters }: { filters: Filter }) {
  // Get the theme colors
  const theme = useTheme();

  // dynamic styles
  const dynamicStyles = {
    filtersContainer: {},
  };

  const hasActiveFilters =
    Boolean(filters.season) ||
    Boolean(filters.year) ||
    (filters.genres && filters.genres.length > 0);

  // Convert filters object to an array of active filters
  const filtersArray = [
    filters.year,
    filters.season,
    ...(filters.genres || []), // Spread genres array if it exists
  ].filter(Boolean); // Remove null/undefined values

  // If there are no active filters, render empty view to avoid button misalignment
  if (!hasActiveFilters) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      {/* Active Filters Display */}
      <View style={[styles.filtersContainer, dynamicStyles.filtersContainer]}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Tags color={theme.primary} />
        </View>

        {/* Flat List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filtersArray}
          renderItem={({ item }) => <FilterChip label={item!} />}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // Space between chips
          contentContainerStyle={{ paddingRight: 12 }} // Padding at the end of the list
        />
      </View>

      {/* Separator */}
      {/* <Separator /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 1, // Take up remaining space in the parent container (AnimeFilter component have filter button on the right) [take the full width minus the button width]
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Space between icon and the list
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
