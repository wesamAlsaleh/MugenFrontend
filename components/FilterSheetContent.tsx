import { genres } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { Filter } from "@/types/Filter";
import { Picker } from "@react-native-picker/picker";
import { CalendarDays, Leaf, Tag } from "lucide-react-native";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Define the props for the FilterSheetContent component
type Props = {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
  closeFilterSheet: () => void; // Function to open the filter bottom sheet
};

export default function FilterSheetContent({
  filters,
  setFilters,
  closeFilterSheet,
}: Props) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles
  const dynamicStyles = {
    inputTitleText: {
      color: theme.secondaryText,
    },
    genreButtonStyle: {
      borderColor: theme.cardBorderColor,
    },
    genreButtonText: {
      color: theme.primaryText,
    },
    applyFilterButtonStyle: {
      backgroundColor: theme.primary,
      borderColor: theme.cardBorderColor,
    },
    clearFilterButtonStyle: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.primary,
    },
    pickerTextStyle: {
      color: theme.primaryText,
    },
    resetButtonText: {
      color: theme.primaryText,
    },
  };

  // Input Title Section (with icon and title)
  function InputTitleSection({
    icon,
    title,
  }: {
    icon?: React.ReactNode;
    title: string;
  }) {
    return (
      <View style={styles.inputTitleContainer}>
        {icon}
        <Text style={[styles.inputTitleText, dynamicStyles.inputTitleText]}>
          {title}
        </Text>
      </View>
    );
  }

  // Genre Button Component
  function GenreButton({
    title,
    selected,
  }: {
    title: string;
    selected?: boolean;
  }) {
    return (
      <TouchableOpacity
        style={[
          styles.genreButtonStyle,
          selected ? { backgroundColor: theme.primary } : {}, // If selected, change background color to primary color
          dynamicStyles.genreButtonStyle,
        ]}
        onPress={() => handleSelectGenre(title)}
      >
        <Text style={[styles.genreButtonText, dynamicStyles.genreButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Handle selecting a genre
  const handleSelectGenre = (genre: string) => {
    // Toggle genre selection
    if (filters.genres?.includes(genre)) {
      // If genre is already selected, remove it
      setFilters({
        ...filters,
        genres: filters.genres.filter((g) => g !== genre), // Remove the genre
      });
    } else {
      // If genre is not selected, add it
      setFilters({
        ...filters,
        genres: filters.genres ? [...filters.genres, genre] : [genre], // Add the genre (if genres is null, initialize it with the new genre, otherwise append to the existing array)
      });
    }
  };

  // Handle resetting all filters
  const handleResetFilters = () => {
    // Reset filters to initial state
    setFilters({
      season: null,
      year: null,
      genres: null,
    });

    // Close the bottom sheet
    closeFilterSheet();
  };
  // Get list of years from 1950 to current year + 1
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 2 }, (_, i) =>
    (1950 + i).toString()
  ).reverse(); // Reverse to have the latest year first

  return (
    <View style={styles.container}>
      {/* Filters Section */}
      <View style={styles.filtersContainer}>
        {/* Release Time Filters */}
        <View style={styles.animeReleaseTimeFilterContainer}>
          {/* Season Filter */}
          <View style={styles.dropDownFilterContainer}>
            <InputTitleSection
              icon={<Leaf size={20} color={theme.secondaryText} />}
              title="Season"
            />

            {/* Select Season Dropdown */}
            <Picker
              selectedValue={filters.season || "null"}
              style={[styles.pickerTextStyle, dynamicStyles.pickerTextStyle]}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev, // Keep other filters unchanged
                  season: value === "null" ? null : value, // Set season to null if "-" is selected
                }));
              }}
            >
              <Picker.Item label="Any" value="null" />
              <Picker.Item label="Winter" value="Winter" />
              <Picker.Item label="Spring" value="Spring" />
              <Picker.Item label="Summer" value="Summer" />
              <Picker.Item label="Fall" value="Fall" />
            </Picker>
          </View>

          {/* Year Filter */}
          <View style={styles.dropDownFilterContainer}>
            <InputTitleSection
              icon={<CalendarDays size={20} color={theme.secondaryText} />}
              title={"Year"}
            />

            {/* Select Year Dropdown */}
            <Picker
              selectedValue={filters.year || "null"}
              style={[styles.pickerTextStyle, dynamicStyles.pickerTextStyle]}
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev, // Keep other filters unchanged
                  year: value === "null" ? null : value, // Set season to null if "-" is selected
                }));
              }}
            >
              <Picker.Item label="Any" value="null" />
              {years.map((year) => (
                <Picker.Item
                  key={year}
                  label={year.toString()}
                  value={year.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Select Genres Filter */}
        <View style={styles.animeGenresFilterContainer}>
          <InputTitleSection
            icon={<Tag size={20} color={theme.secondaryText} />}
            title="Genres"
          />

          {/* Genre Buttons Section */}
          <View style={styles.genreButtonsContainer}>
            {genres.map((genre) => {
              return (
                <GenreButton
                  key={genre}
                  title={genre}
                  selected={filters.genres?.includes(genre)}
                />
              );
            })}
          </View>
        </View>
      </View>

      {/* Reset Button Section */}
      {/* <View style={styles.resetButtonContainer}>
        <TouchableOpacity
          onPress={() => handleResetFilters()}
          style={[
            styles.clearFilterButtonStyle,
            dynamicStyles.clearFilterButtonStyle,
          ]}
        >
          <View style={styles.resetButtonInnerContainerStyle}>
            <CircleX size={23} color={theme.primaryText} />
            <Text
              style={[styles.resetButtonText, dynamicStyles.resetButtonText]}
            >
              Clear Filters
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
    justifyContent: "space-between",
    height: "100%", // Take full height of the bottom sheet
    flex: 1, // Make the container take full height to push the buttons to the bottom
    gap: 16, // Space between sections (like between filters and buttons)
    paddingVertical: 5, // Vertical padding for the entire container
  },
  filtersContainer: {
    gap: 12, // Space between different filter sections (like between release time and genres)
  },
  animeReleaseTimeFilterContainer: {
    display: "flex",
    flexDirection: "row",
  },
  dropDownFilterContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1, // Each dropdown takes equal space
  },
  inputTitleContainer: {
    marginBottom: 4, // Space between title and dropdown
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // Space between title and info icon
  },
  animeGenresFilterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8, // Space between title and genre buttons
  },
  genreButtonsContainer: {
    display: "flex",
    flexDirection: "row", // Arrange buttons in a row
    flexWrap: "wrap", // Allow wrapping to next line
    gap: 8, // Space between genre buttons
  },
  genreButtonStyle: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  resetButtonContainer: {
    marginTop: 40, // Push the reset button to the bottom
  },
  resetButtonInnerContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8, // Space between the Icon and the text
  },
  clearFilterButtonStyle: {
    width: "100%", // Take 15% of the width to leave space between the two buttons
    height: 50, // Fixed height for consistency
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Text styles
  inputTitleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  genreButtonText: {
    fontSize: 14,
    fontWeight: "400",
  },
  pickerTextStyle: {
    fontSize: 16,
    fontWeight: "400",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
