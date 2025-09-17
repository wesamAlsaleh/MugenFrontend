import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams(); // get the id from URL

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anime Detail Page</Text>
      <Text>Anime ID: {id}</Text>
      {/* Later: Fetch anime details by id and render */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
