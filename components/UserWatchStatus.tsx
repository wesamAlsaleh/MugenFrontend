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
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      // Center the content
      justifyContent: "center",
      alignItems: "center",
      // Padding for touch area
      padding: 8,
      gap: 4, // Space between icon and text
    },
    icon: {
      color: theme.primary, // Use primary color from theme
    },
    text: {
      color: theme.secondaryText, // Use text color from theme
      fontSize: 12,
      fontWeight: "500",
      textAlign: "center",
      lineHeight: 18,
      includeFontPadding: false, // Remove extra padding for better alignment
    },
  });

  // Handle press event
  const handlePress = () => {
    openBottomSheet!();
  };

  // Status Component for reuse
  const Status = ({ status, icon }: { status: string; icon: ReactNode }) => {
    return (
      <View style={styles.container}>
        {icon}
        <Text style={styles.text}>{status}</Text>
      </View>
    );
  };

  // Handle Status Display
  const renderStatus = (status: string | null) => {
    switch (status) {
      case "WATCHING":
        return (
          <Status
            status={formatWatchStatus(status)}
            icon={<CirclePlay size={28} color={styles.icon.color} />}
          />
        );
      case "COMPLETED":
        return (
          <Status
            status={formatWatchStatus(status)}
            icon={<CircleCheck size={28} color={styles.icon.color} />}
          />
        );
      case "PAUSED":
        return (
          <Status
            status={formatWatchStatus(status)}
            icon={<CirclePause size={28} color={styles.icon.color} />}
          />
        );
      case "DROPPED":
        return (
          <Status
            status={formatWatchStatus(status)}
            icon={<CircleMinus size={28} color={styles.icon.color} />}
          />
        );
      case "PLANNING":
        return (
          <Status
            status={formatWatchStatus(status)}
            icon={<Clock size={28} color={styles.icon.color} />}
          />
        );
      default:
        return (
          <Status
            status="Add to Watchlist" // Should never reach here
            icon={<Plus size={28} color={styles.icon.color} />}
          />
        );
    }
  };

  return (
    <TouchableOpacity
      style={{}}
      onPress={() => handlePress()}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        {progressStatus ? (
          renderStatus(progressStatus)
        ) : (
          <>
            <Plus size={28} color={styles.icon.color} />
            <Text style={styles.text}>Add to Watchlist</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
