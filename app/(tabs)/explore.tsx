import AnimeFilter from "@/components/AnimeFilter";
import CustomBottomSheet from "@/components/BottomSheet";
import FilterSheetContent from "@/components/FilterSheetContent";
import { useTheme } from "@/hooks/use-theme";
import { Filter } from "@/types/Filter";
import { getScreenHeight, getScreenWidth } from "@/Utility/screenUtils";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AnimesGrid from "@/components/AnimesGrid";
import { exploreAnimes } from "@/constants/dummyData";
import { Anime } from "@/types/Anime";

export default function ExploreScreen() {
  // get the theme
  const theme = useTheme();

  // Get screen width
  const screenWidth = getScreenWidth();

  // If its tablet, decrease the width of the selector
  const isTablet = screenWidth >= 768; // Consider tablets 768px and above

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
  const snapPoints = useMemo(() => {
    // If tablet, make the bottom sheet 42% of the screen height, else 63%
    if (isTablet) {
      return ["42%"];
    }

    // Else, return 63%
    return ["63%"];
  }, []);

  // Function to open the BottomSheet
  const openFilterSheet = () => bottomSheetRef.current?.expand();

  // Function to close the BottomSheet
  const closeFilterSheet = () => bottomSheetRef.current?.close();

  // Filters (from bottom sheet)
  const [filters, setFilters] = useState<Filter>({
    season: null,
    year: null,
    genres: null,
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

        {/* Anime Results Grid */}
        <AnimesGrid animes={exploreAnimes as Anime[]} />
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
