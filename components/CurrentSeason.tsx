import React from "react";
import { Text, View } from "react-native";

interface CurrentSeasonProps {
  season: string;
  year: number;
}

export default function CurrentSeason(props: CurrentSeasonProps) {
  // Destructure props
  const { season, year } = props;

  return (
    <View>
      <Text>{`${season} ${year}`}</Text>
    </View>
  );
}

const styles = {};
