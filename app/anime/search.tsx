import AnimeSearch from "@/components/AnimeSearch";
import { useTheme } from "@/hooks/use-theme";
import { SearchParam } from "@/types/SearchParam";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function searchScreen() {
  // Get the theme
  const theme = useTheme();

  // Query parameters (if any)
  const [searchParams, setSearchParams] = useState<SearchParam>({
    searchQuery: "",
    type: "ANIME",
    page: null,
    perPage: null,
    sort: "TRENDING_DESC",
  });

  // Define dynamic styles based on the theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
  };

  return (
    <ScrollView
      style={dynamicStyles.container} // Set background color based on theme and make it take full height "screen"
      contentContainerStyle={styles.container} // Add padding to the container
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
    >
      {/* Search Bar and Results Filter */}
      <AnimeSearch
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Placeholder for search results */}
      <View style={styles.resultsContainer}>
        <Text style={{ color: theme.primary }}>
          {`((baseURL))/anime/search-animes?\n perPage=${searchParams.perPage}\n &page=${searchParams.page}\n &type=ANIME\n &searchQuery=${searchParams.searchQuery}\n &sort=${searchParams.sort}`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Screen padding
    gap: 16, // Gap between elements
  },
  resultsContainer: {},
});
