import { useTheme } from "@/hooks/use-theme";
import { FunnelPlus } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      setSelectedGenres((prev) => prev.filter((genre) => genre !== genre));
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
    activeFilterChip: {
      backgroundColor: theme.primary + "20",
      borderColor: theme.primary,
    },
  };

  return (
    <View style={styles.container}>
      {/* Filter Header Button (expand/collapse) */}
      <TouchableOpacity
        style={styles.toggleButtonContainer}
        onPress={() => setIsExpanded(!isExpanded)} // Toggle expand/collapse
        activeOpacity={0.7} // Decrease opacity on press
      >
        {/* Header Left Section */}
        <View style={styles.headerLeftContainer}>
          {/* Button Icon */}
          <FunnelPlus size={18} color={theme.mutedText} />

          {/* Title */}
          <Text style={[styles.headerText, dynamicStyles.headerText]}>
            Filters
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  toggleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 8,
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  activeFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
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
