import PageHeader from "@/components/PageHeader";
import StudioAnimesGrid from "@/components/StudioAnimesGrid";
import { studioDataSample } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { Studio } from "@/types/Studio";
import { useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeStudioDetails() {
  const { id } = useLocalSearchParams(); // get the id from URL

  // Get the theme colors
  const theme = useTheme();

  // State to hold studio details
  const [studioData, setStudioData] = useState<Studio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Take full height of the screen after header
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 16, // Horizontal padding
    },
  });

  // Fetch studio details using the id
  useEffect(() => {
    // TODO: Fetch studio details from API using the id
    setStudioData(studioDataSample);

    // Simulate loading delay
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Text>Loading..</Text>;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.backgroundColor }}
      edges={["top", "bottom"]}
    >
      <PageHeader
        title={`${studioData?.data?.name} Animes`}
        rightComponent={<Search color={theme.primary} size={24} />}
      />
      {/* Page Content */}
      <View style={styles.container}>
        {/* Studio Animes Grid */}
        <StudioAnimesGrid edges={studioData?.data?.media?.edges} />
      </View>
    </SafeAreaView>
  );
}
