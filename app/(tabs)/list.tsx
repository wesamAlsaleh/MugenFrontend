import StatusSelector from "@/components/StatusSelector";
import { useTheme } from "@/hooks/use-theme";
import { CircleCheck, Clock, Pause, Play, X } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ListScreen() {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles based on the theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
    iconColor: {
      color: theme.primaryText,
    },
  };

  // Status options for the selector
  const statuses = [
    {
      label: "Planning",
      value: "Planning",
      icon: <Clock size={18} color={dynamicStyles.iconColor.color} />,
    },
    {
      label: "Paused",
      value: "Paused",
      icon: <Pause size={18} color={dynamicStyles.iconColor.color} />,
    },
    {
      label: "Watching",
      value: "Watching",
      icon: <Play size={18} color={dynamicStyles.iconColor.color} />,
      default: true,
    },
    {
      label: "Completed",
      value: "Completed",
      icon: <CircleCheck size={18} color={dynamicStyles.iconColor.color} />,
    },
    {
      label: "Dropped",
      value: "Dropped",
      icon: <X size={18} color={dynamicStyles.iconColor.color} />,
    },
  ];

  const [status, setStatus] = useState<string>("Watching");

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Status Selector */}
      <StatusSelector
        options={statuses}
        currentOption={status}
        setOption={setStatus}
      />

      {/* Results Selector */}
      <Text style={{ color: theme.primaryText }}>My List: {status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // Screen padding (16 on left and right, total 32)
    gap: 12, // Gap between status selector and results
  },
});
