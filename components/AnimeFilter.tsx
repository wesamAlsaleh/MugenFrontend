import { useTheme } from "@/hooks/use-theme";
import { Funnel, FunnelPlus } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function AnimeFilter() {
  // Get the theme of the app
  const theme = useTheme();

  // Filter states
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    filterButton: {
      BackgroundColor: hasActiveFilters
        ? theme.primary
        : theme.cardBackgroundColor,
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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Buttons Section */}
      <View>
        {/* Filter Button */}
        <TouchableOpacity
          style={[styles.filterButton, dynamicStyles.filterButton]}
        >
          {!hasActiveFilters ? (
            <Funnel color={dynamicStyles.filterIcon.color} />
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
