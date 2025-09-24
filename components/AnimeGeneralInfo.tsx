import { useTheme } from "@/hooks/use-theme";
import { AnimeDetails } from "@/types/Anime";
import {
  formatMediaDates,
  FormatMediaDuration,
  formatMediaStudios,
  formatMediaType,
} from "@/Utility/mediaUtils";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";

export default function AnimeGeneralInfo({
  animeDetails,
}: {
  animeDetails: AnimeDetails;
}) {
  // Get the theme colors
  const theme = useTheme();

  // Router Instance
  const router = useRouter();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between", // Space between items
      gap: 16, // Space between items
      marginBottom: 8, // Space below the row
      flexWrap: "nowrap", // Prevent wrapping
    },
    columnContainer: {
      flexDirection: "column",
      gap: 8, // Space between items
    },
  });

  // Reusable components for displaying
  const RowItem = ({ label, value }: { label: string; value: any }) => {
    const styles = StyleSheet.create({
      row: {
        flexDirection: "row",
        marginVertical: 4, // Add vertical spacing between rows
        alignItems: "center", // Center items vertically
        gap: 8, // Space between label and value
        flexWrap: "wrap", // Allow wrapping for long text
      },
      label: {
        color: theme.primaryText,
        fontSize: 14,
        fontWeight: "bold",
      },
      value: {
        color: theme.primaryText,
      },
    });

    // If value is null or empty, return null to skip rendering
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return null;
    }

    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  // Prepare studios and producers
  const { mainStudios, producers } = formatMediaStudios(animeDetails.studios);

  return (
    <View style={styles.container}>
      {/* Anime Source and Episode Duration */}
      <View style={styles.rowContainer}>
        <RowItem label="Source" value={formatMediaType(animeDetails.source!)} />
        <RowItem
          label="Episode Duration"
          value={FormatMediaDuration(animeDetails.duration!)}
        />
      </View>

      {/* Start Date and End Date */}
      <View style={styles.rowContainer}>
        <RowItem
          label="Start Date"
          value={formatMediaDates({
            day: animeDetails.startDate!.day,
            month: animeDetails.startDate!.month,
            year: animeDetails.startDate!.year,
          })}
        />
        <RowItem
          label="End Date"
          value={formatMediaDates({
            day: animeDetails.endDate!.day,
            month: animeDetails.endDate!.month,
            year: animeDetails.endDate!.year,
          })}
        />
      </View>

      <View style={styles.columnContainer}>
        {/* Naming */}
        <RowItem label="English" value={animeDetails.title.userPreferred} />
        <RowItem label="Romaji" value={animeDetails.title.romaji} />
        <RowItem label="Native" value={animeDetails.title.native} />
        {/* <RowItem label="Synonyms" value={animeDetails.title.synonyms.join(", ")} /> */}

        {/* Studios */}
        <RowItem
          label="Studios"
          value={mainStudios.map((ms, i) => {
            return (
              <Badge
                content={ms.name}
                key={i}
                onPress={() => router.push(`/anime/studio/${ms.id}`)}
                borderColor={theme.primary}
              />
            );
          })}
        />

        {/* Producers */}
        <RowItem label="Producers" value={producers} />
      </View>
    </View>
  );
}
