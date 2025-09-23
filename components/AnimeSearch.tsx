import { useTheme } from "@/hooks/use-theme";
import { SortBy } from "@/types/Filter";
import { SearchParam } from "@/types/SearchParam";
import { IsTablet, scaleHeight } from "@/Utility/screenUtils";
import { ArrowDownWideNarrow } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomModal from "./CustomModal";
import SortByFilter from "./SortByFilter";

// Define props for the AnimeSearch component
type Props = {
  searchParams: SearchParam;
  setSearchParams: Dispatch<SetStateAction<{}>>;
};

const filterOptions: SortBy[] = [
  { label: "Trending", value: "TRENDING_DESC" }, // Default
  { label: "Title (A-Z)", value: "TITLE_ENGLISH" },
  { label: "Title (Z-A)", value: "TITLE_ENGLISH_DESC" },
  { label: "Start Date (Oldest First)", value: "START_DATE" },
  { label: "Start Date (Newest First)", value: "START_DATE_DESC" },
];

export default function AnimeSearch({ searchParams, setSearchParams }: Props) {
  // Get the theme
  const theme = useTheme();

  // State to manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State to manage selected filters
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    filterOptions[0].value
  );

  // Check if the device is tablet
  const isTablet = IsTablet();

  // Dynamic styles
  const dynamicStyles = {
    searchBar: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      placeholderTextColor: theme.secondaryText,
      color: theme.primary,
    },
    filterButton: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      color: theme.mutedText,
    },
  };

  // Function to handle search input change
  const handleSearchInputChange = (text: string) => {
    setSearchParams((prev) => ({ ...prev, searchQuery: text }));
  };

  // Function to handle filter button press
  const handleOpenModalPress = () => {
    // Open the modal
    setModalVisible(true);
  };

  // Function to handle filter selection
  const handleFilterSelect = (value: string) => {
    // Set the selected filter state
    setSelectedFilter(value);
  };

  // Function to handle applying the selected filter
  const handleApplyFilter = () => {
    // Update the search parameters with the selected filter
    setSearchParams((prev) => ({ ...prev, sort: selectedFilter }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={[styles.searchBar, dynamicStyles.searchBar]}
          placeholder="Search anime / manga..."
          placeholderTextColor={dynamicStyles.searchBar.placeholderTextColor}
          value={searchParams.searchQuery ?? ""}
          onChangeText={(text) => handleSearchInputChange(text)}
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity
        style={[styles.filterButton, dynamicStyles.filterButton]}
        onPress={() => handleOpenModalPress()}
        onLongPress={() => {}}
      >
        <ArrowDownWideNarrow color={dynamicStyles.filterButton.color} />
      </TouchableOpacity>

      {/* Modal Component */}
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        width={scaleHeight(300)}
        height={scaleHeight(isTablet ? 300 : 270)}
        closeButtonText="Apply"
        closeButtonAction={handleApplyFilter}
        children={
          <SortByFilter
            filters={filterOptions}
            selectedFilter={selectedFilter}
            setSelectedFilter={handleFilterSelect}
          />
        }
      />
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
