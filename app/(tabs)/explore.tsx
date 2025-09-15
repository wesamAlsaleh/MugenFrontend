import AnimeFilter from "@/components/AnimeFilter";
import CustomBottomSheet from "@/components/BottomSheet";
import { useTheme } from "@/hooks/use-theme";
import { Filters } from "@/types/filter";
import { getScreenHeight } from "@/Utility/screenUtils";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ExplorePage() {
  // get the theme
  const theme = useTheme();

  // dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
    bottomSheetBackgroundStyle: {
      backgroundColor: theme.cardBackgroundColor,
    },
    bottomSheetIndicatorStyle: {
      backgroundColor: theme.primary,
    },
  };

  // Calculate card height to get the 10% of the screen height
  const cardHeight = getScreenHeight() * 0.1;

  // Ref to control the BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for the BottomSheet (useMemo to avoid recalculating on every render)
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  // Function to open the BottomSheet
  const openFilterSheet = () => bottomSheetRef.current?.expand();

  // Function to close the BottomSheet
  const closeFilterSheet = () => bottomSheetRef.current?.close();

  // Filters (from bottom sheet)
  const [filters, setFilters] = useState<Filters>({
    season: null,
    year: null,
    genres: null,
    searchQuery: null,
  });

  return (
    <GestureHandlerRootView>
      {/* Page with filter section and the results */}
      <ScrollView
        style={dynamicStyles.container} // Set background color based on theme and make it take full height "screen"
        contentContainerStyle={styles.container} // Add padding to the container
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      >
        {/* Filter Section */}
        <AnimeFilter
          onOpenFilter={openFilterSheet}
          filters={filters}
          setFilters={setFilters}
        />

        <Text>{filters.season || "No"}</Text>
      </ScrollView>

      {/* Filter BottomSheet Component */}
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        children={
          <>
            <TouchableOpacity
              onPress={() =>
                setFilters({
                  season: "Spring",
                  year: "2025",
                  genres: [],
                  searchQuery: null,
                })
              }
            >
              <Text>Apply Spring 2025</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setFilters({
                  season: null,
                  year: null,
                  genres: [],
                  searchQuery: null,
                })
              }
            >
              <Text>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => closeFilterSheet()}>
              <Text>Close</Text>
            </TouchableOpacity>
          </>
        }
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Home screen padding (16 on left and right, total 32)
  },
  filterBottomSheetInnerView: {
    flex: 1,
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
  },
});
