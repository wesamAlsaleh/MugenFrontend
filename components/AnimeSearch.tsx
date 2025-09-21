import { useTheme } from "@/hooks/use-theme";
import { SearchParam } from "@/types/SearchParam";
import { IsTablet, scaleHeight, scaleWidth } from "@/Utility/screenUtils";
import { Funnel } from "lucide-react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "./CustomModal";

// Define props for the AnimeSearch component
type Props = {
  searchParams: SearchParam;
  setSearchParams: Dispatch<SetStateAction<{}>>;
};

export default function AnimeSearch({ searchParams, setSearchParams }: Props) {
  // Get the theme
  const theme = useTheme();

  // State to manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Check if the device is tablet
  const isTablet = IsTablet();

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

  // Function to handle search input change
  const handleSearchInputChange = (text: string) => {
    setSearchParams((prev) => ({ ...prev, searchQuery: text }));
  };

  // Function to handle filter button press
  const handleFilterButtonPress = () => {
    // Open the modal
    setModalVisible(true);
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
        onPress={() => handleFilterButtonPress()}
        onLongPress={() => {}}
      >
        <Funnel color={dynamicStyles.filterButton.color} />
      </TouchableOpacity>

      {/* Modal Component */}
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        width={scaleWidth(300)}
        height={scaleHeight(isTablet ? 500 : 350)}
        closeButtonText="Save"
        children={
          <View>
            <Text>Hello World!</Text>
          </View>
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
