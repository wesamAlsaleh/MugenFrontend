import { useTheme } from "@/hooks/use-theme";
import {
  Check,
  CircleCheck,
  CircleMinus,
  CirclePause,
  CirclePlay,
  Clock,
} from "lucide-react-native";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  watchStatus?: string | null;
  setWatchStatus?: (status: string | null) => void;
  closeBottomSheet?: () => void;
}

export default function UserWatchStatusSheetContent({
  watchStatus,
  setWatchStatus,
  closeBottomSheet,
}: Props) {
  // Get the theme styles
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      display: "flex",
      flexDirection: "column",
      gap: 16, // Space between header and content
    },
    optionsWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    optionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12, // Space between icon and text
      paddingVertical: 12, // Vertical padding for touch area
    },
    optionIcon: {
      color: theme.primary, // Use primary color from theme
    },
    optionText: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "500",
      includeFontPadding: false, // Remove extra padding for better alignment
    },
  });

  // Option Component for reuse
  const option = (status: string, icon: ReactNode) => {
    // Normalize status for comparison
    const normalizedStatus = status.toUpperCase();

    // Check if this status is the currently selected one
    const isSelected = watchStatus?.toUpperCase() === normalizedStatus; // Client comparison, server will handle only the normalized value

    // Function to handle option selection
    const handleOptionSelect = () => {
      // Update the watch status
      setWatchStatus?.(normalizedStatus);

      // TODO: Update the watch status in the backend

      // Optionally close the bottom sheet here if needed
      closeBottomSheet?.();
    };

    return (
      <TouchableOpacity onPress={handleOptionSelect} activeOpacity={0.7}>
        <View style={styles.optionsWrapper}>
          {/* Progress Status */}
          <View style={styles.optionsContainer}>
            {/* Icon */}
            {icon}

            {/* Text */}
            <Text style={styles.optionText}>{status}</Text>
          </View>

          {/* Checkmark for selected status */}
          <View>
            {/* Checkmark for selected status */}
            {isSelected && <Check size={28} color={theme.primary} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Logging for debugging
  console.log("Anime Progress status ready to sent:", watchStatus);

  return (
    <View style={styles.container}>
      {/* Options Container */}
      <View>
        {option(
          "Planning",
          <Clock size={28} color={styles.optionIcon.color} />
        )}
        {option(
          "Completed",
          <CircleCheck size={28} color={styles.optionIcon.color} />
        )}
        {option(
          "Watching",
          <CirclePlay size={28} color={styles.optionIcon.color} />
        )}
        {option(
          "Paused",
          <CirclePause size={28} color={styles.optionIcon.color} />
        )}
        {option(
          "Dropped",
          <CircleMinus size={28} color={styles.optionIcon.color} />
        )}
      </View>
    </View>
  );
}
