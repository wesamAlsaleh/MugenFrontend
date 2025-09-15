import AnimeFilter from "@/components/AnimeFilter";
import CustomBottomSheet from "@/components/BottomSheet";
import FilterSheetContent from "@/components/FilterSheetContent";
import { useTheme } from "@/hooks/use-theme";
import { Filters } from "@/types/filter";
import { getScreenHeight } from "@/Utility/screenUtils";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
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

  // Ref to control the BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for the BottomSheet (useMemo to avoid recalculating on every render)
  const snapPoints = useMemo(() => ["80%"], []);

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

  // Calculate card height to get the 10% of the screen height
  const cardHeight = getScreenHeight() * 0.1;

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
        <Text>
          {filters.genres?.map((g) => {
            return g;
          }) || "No genres selected"}
        </Text>
      </ScrollView>

      {/* Filter BottomSheet Component */}
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        children={
          <FilterSheetContent
            filters={filters}
            setFilters={setFilters}
            closeFilterSheet={closeFilterSheet}
          />
        }
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
  },
  filterBottomSheetInnerView: {
    flex: 1,
    // paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
  },
});
