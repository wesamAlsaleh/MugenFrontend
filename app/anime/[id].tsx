import ActionBar from "@/components/ActionBar";
import AnimeAdultsContentWarning from "@/components/AnimeAdultsContentWarning";
import AnimeDetailsHeader from "@/components/AnimeDetailsHeader";
import AnimeDetailsSection from "@/components/AnimeDetailsSection";
import CustomBottomSheet from "@/components/BottomSheet";
import UserWatchStatusSheetContent from "@/components/UserWatchStatusSheetContent";
import { singleAnime } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { AnimeDetails, UserLists } from "@/types/Anime";
import { formatWatchStatus } from "@/Utility/mediaUtils";
import { IsTablet } from "@/Utility/screenUtils";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type AnimeDetailsResponse = {
  data: AnimeDetails[];
  userList?: UserLists | null;
};

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams(); // get the id from URL

  // State to store anime details
  const [animeDetails, setAnimeDetails] = useState<AnimeDetailsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    safeAreaStyle: {
      flex: 1, // Full height of the screen! (Do not remove this)
      backgroundColor: theme.backgroundColor,
    },
    scrollView: {
      flex: 1, // Make ScrollView take full height of the screen
      backgroundColor: theme.backgroundColor, // Set background color based on theme
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", // Align items to the top to keep content stacked
      backgroundColor: theme.backgroundColor, // optional for contrast
      // paddingHorizontal: 16, // Horizontal padding for the screen
      paddingBottom: 16, // Bottom padding to avoid content being cut off
    },
    pageContent: {
      display: "flex",
      flexDirection: "column",
      flex: 1, // Take up remaining space
      gap: 16, // Space between elements
      // marginTop: 16,
      paddingHorizontal: 16, // Horizontal padding for the content
      marginBottom: 16, // Bottom margin to avoid content being cut off
    },
  });

  // Ref to control BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points for the bottom sheet
  const snapPoints = React.useMemo(() => [IsTablet() ? "40%" : "36%"], []);

  // Function to handle opening the bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // Function to handle closing the bottom sheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Fetch anime details when the component mounts or id changes
  useEffect(() => {
    // TODO: Fetch anime details using the id

    // Set the fetched data to state
    setAnimeDetails(singleAnime);

    // Set loading to false after data is set
    setIsLoading(false);
  }, [id]);

  // Prepare the anime details data
  const animeDetailsData = animeDetails?.data[0];
  const userListData = animeDetails?.userList;

  // State to manage user watch status
  const [watchStatus, setWatchStatus] = useState<string | null>();

  useEffect(() => {
    // Set the user watch status from user list data
    setWatchStatus(formatWatchStatus(userListData?.progressStatus!) || null);
  }, [userListData]);

  // If loading, you can return a loading indicator here
  if (isLoading) {
    // TODO: Show a simple loading view for now
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={styles.safeAreaStyle} // Safe area style
        edges={["top", "left", "right", "bottom"]} // Safe area for all edges
      >
        {/* ScrollView for main content */}
        <ScrollView
          style={styles.scrollView} // Set background color based on theme and make it take full height "screen"
          contentContainerStyle={styles.container} // Add padding to the main container
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        >
          {/* Header Container */}
          <AnimeDetailsHeader animeDetails={animeDetailsData!} />

          {/* Page Content */}
          <View style={styles.pageContent}>
            {/* Adult Content Warning */}
            <AnimeAdultsContentWarning
              adultContent={animeDetailsData?.isAdult!}
            />

            {/* Action Buttons */}
            <ActionBar
              animeRating={animeDetailsData?.averageScore!}
              userList={userListData!}
              openBottomSheet={openBottomSheet}
              closeBottomSheet={closeBottomSheet}
            />

            {/* Anime Details */}
            <AnimeDetailsSection animeDetails={animeDetailsData!} />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom sheet mounted at the screen level */}
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        children={
          <UserWatchStatusSheetContent
            watchStatus={watchStatus}
            setWatchStatus={setWatchStatus}
            closeBottomSheet={closeBottomSheet}
          />
        }
      />
    </GestureHandlerRootView>
  );
}
