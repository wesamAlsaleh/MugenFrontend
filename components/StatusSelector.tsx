import { useTheme } from "@/hooks/use-theme";
import { getScreenWidth, isTablet, scaleHeight } from "@/Utility/screenUtils";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Declaration of Props interface
interface Props {
  options: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
    default?: boolean;
  }>; // Array of status objects
  currentOption: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function StatusSelector({
  options,
  currentOption,
  setOption,
}: Props) {
  // Get the theme
  const theme = useTheme();

  // Get the screen width
  const screenWidth = getScreenWidth();

  // If its tablet, decrease the width of the selector
  const IsTablet = isTablet();

  // Dynamic styles based on the theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      height: scaleHeight(55),
      width: IsTablet ? screenWidth * 0.45 : null, // 45% width for tablets, auto for phones
    },
    activeChip: {
      backgroundColor: theme.primary,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    chipText: {
      color: theme.primaryText,
    },
  };

  // Ref to control FlatList programmatically
  const flatListRef = useRef<FlatList>(null);

  // Find the index of the current option from the options array
  const currentIndex = options.findIndex(
    (option) => option.value === currentOption
  );

  // Auto-scroll to the default option on mount
  useEffect(() => {
    // If there's a valid current index, scroll to it
    if (flatListRef.current && currentIndex > 0) {
      // Scroll to the current index with animation
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewPosition: 0.5, // Center the item in the view
      });
    }
  }, [currentIndex]);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => {
          // Check if the item is the currently selected value
          const isActive = item.value === currentOption;
          return (
            <TouchableOpacity
              style={[styles.chip, isActive && dynamicStyles.activeChip]}
              onPress={() => setOption(item.value)}
            >
              {/* Icon */}
              <View style={styles.icon}>{item.icon}</View>

              {/* Label */}
              <Text
                style={[
                  styles.chipText,
                  dynamicStyles.chipText,
                  isActive && { fontWeight: "600" },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        contentContainerStyle={{
          flexGrow: 1, // Ensure it takes full width
          // Make the list vertically centered
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12, // Spacing from the top
    alignSelf: "center", // Center the selector horizontally
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 80, // Set minimum width for consistency
  },

  icon: {
    marginRight: 6, // Space between icon and text
  },
  chipText: {
    fontSize: 14,
    fontWeight: "400",
  },
});
