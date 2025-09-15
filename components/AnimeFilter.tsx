import { useTheme } from "@/hooks/use-theme";
import { FunnelPlus } from "lucide-react-native";
import React, { useState } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";

export default function AnimeFilter() {
  // Get the theme of the app
  const theme = useTheme();

  // Filter states
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Dropdown states
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Function to toggle genre selection
  const toggleGenre = (genre: string) => {
    // If the genre is already selected, remove it
    if (selectedGenres.includes(genre)) {
      // Return all genres except the one that was clicked
      setSelectedGenres((prev) => prev.filter((g) => g !== genre));
    } else {
      // Add the genre to the selected genres
      setSelectedGenres((prev) => [...prev, genre]);
    }
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setSelectedSeason("");
    setSelectedYear("");
    setSelectedGenres([]);
  };

  const toggleExpand = () => {
    // Animate the expansion/collapse
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Toggle the expanded state
    setIsExpanded((prev) => !prev);
  };

  // Does the user have any active filters?
  const hasActiveFilters =
    selectedSeason !== "" || selectedYear !== "" || selectedGenres.length > 0;

  const dynamicStyles = {
    headerText: {
      color: theme.secondaryText,
    },
    subHeaderText: {
      color: theme.mutedText,
    },
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Filter Icon */}
        <FunnelPlus color={theme.mutedText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  // Text Styles
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeFilterText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
