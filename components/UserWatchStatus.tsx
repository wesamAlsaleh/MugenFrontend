import { useTheme } from "@/hooks/use-theme";
import { formatWatchStatus } from "@/Utility/mediaUtils";
import {
  CircleCheck,
  CircleMinus,
  CirclePause,
  CirclePlay,
  Clock,
  Plus,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import BarContent from "./BarContent";

export default function UserWatchStatus({
  progressStatus,
  openBottomSheet,
  closeBottomSheet,
}: {
  progressStatus?: string | null;
  openBottomSheet?: () => void;
  closeBottomSheet?: () => void;
}) {
  // Get the theme styles
  const theme = useTheme();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      height: "100%", // Full height of the parent container
      minWidth: 100, // Ensures stable width
      // Center the content
      justifyContent: "center",
      alignItems: "center",
      // Padding for touch area
      padding: 8,
      gap: 4, // Space between icon and text
    },
    icon: {
      color: theme.primary, // Use primary color from theme
      position: "fixed", // Prevent layout shift on icon change
    },
    text: {
      color: theme.secondaryText, // Use text color from theme
      fontSize: 12,
      fontWeight: "500",
      textAlign: "center",
      lineHeight: 18,
      includeFontPadding: false, // Remove extra padding for better alignment
      width: 100, // Fixed width to prevent layout shift
      flexWrap: "wrap", // Allow text to wrap if too long
      backgroundColor: "green", // Prevent background color issues on status change
    },
  });

  // Handle Status Display
  const renderStatus = (status: string | null) => {
    switch (status) {
      case "WATCHING":
        return (
          <BarContent
            text={formatWatchStatus(status)}
            icon={<CirclePlay size={28} color={styles.icon.color} />}
          />
        );
      case "COMPLETED":
        return (
          <BarContent
            text={formatWatchStatus(status)}
            icon={<CircleCheck size={28} color={styles.icon.color} />}
          />
        );
      case "PAUSED":
        return (
          <BarContent
            text={formatWatchStatus(status)}
            icon={<CirclePause size={28} color={styles.icon.color} />}
          />
        );
      case "DROPPED":
        return (
          <BarContent
            text={formatWatchStatus(status)}
            icon={<CircleMinus size={28} color={styles.icon.color} />}
          />
        );
      case "PLANNING":
        return (
          <BarContent
            text={formatWatchStatus(status)}
            icon={<Clock size={28} color={styles.icon.color} />}
          />
        );
      case null:
        return (
          <BarContent
            text="Add to Watchlist"
            icon={<Plus size={28} color={styles.icon.color} />}
          />
        );
      // Should never reach here
      default:
        return (
          <BarContent
            text="Add to Watchlist"
            icon={<Plus size={28} color={styles.icon.color} />}
          />
        );
    }
  };

  // Handle press event
  const handlePress = () => {
    openBottomSheet!();
  };

  return (
    <TouchableOpacity
      style={{}}
      onPress={() => handlePress()}
      activeOpacity={0.7}
    >
      {renderStatus(progressStatus!)}
    </TouchableOpacity>
  );
}
