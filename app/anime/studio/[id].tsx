import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function AnimeStudioDetails() {
  const { id } = useLocalSearchParams(); // get the id from URL

  return (
    <View>
      {/* TODO: Implement Custom Header */}
      <Text>Studio Details for ID: {id}</Text>
    </View>
  );
}
