import { useTheme } from "@/hooks/use-theme";
import { SortBy } from "@/types/Filter";

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RadioButton from "./RadioButton";

// Define the SortByFilter component props
type Props = {
  filters: SortBy[];
  setSelectedFilter: (value: string) => void;
  selectedFilter?: string | null;
};

export default function SortByFilter({
  filters,
  setSelectedFilter,
  selectedFilter,
}: Props) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    filterHeaderText: {
      color: theme.primaryText,
    },
    filterLabel: {
      color: theme.primaryText,
    },
  };

  // Function to handle filter selection
  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {/* Filter Header */}
        <View style={styles.filterHeader}>
          <Text
            style={[styles.filterHeaderText, dynamicStyles.filterHeaderText]}
          >
            Sort By
          </Text>
        </View>

        {/* Filter options */}
        <View style={styles.filterOptionsContainer}>
          {filters.map((filter) => {
            return (
              <Pressable
                onPress={() => handleFilterSelect(filter.value)}
                key={filter.value}
              >
                <View style={styles.filterOptionContainer} key={filter.value}>
                  {/* Radio Icon */}
                  <RadioButton selected={filter.value === selectedFilter} />

                  {/* Filter Label */}
                  <Text style={[styles.filterLabel, dynamicStyles.filterLabel]}>
                    {filter.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height of the parent
    flexDirection: "column",
    justifyContent: "flex-start", // Align items to the top
  },
  filterContainer: {
    padding: 16,
    gap: 12, // Space between elements
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Space between icon and text
  },
  filterHeaderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  filterOptionsContainer: {
    flexDirection: "column",
    gap: 10, // Space between filter options
    maxHeight: 300, // Limit height to make it scrollable if too many options
    overflow: "scroll", // Enable scrolling if content overflows
  },
  filterOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Space between radio button and text
  },
  filterLabel: {
    fontSize: 15,
  },
});
