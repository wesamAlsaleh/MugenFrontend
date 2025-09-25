import { useTheme } from "@/hooks/use-theme";
import { IsTablet } from "@/Utility/screenUtils";
import { CircleAlert } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Message from "./Message";

export default function AnimeAdultsContentWarning({
  adultContent,
}: {
  adultContent: boolean;
}) {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center", // Vertically center items
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: theme.adultContentWarningBackground,
      borderColor: theme.adultContentWarningBorder,
    },
    iconContainer: {
      flexShrink: 0, // Prevent icon from shrinking
      justifyContent: "center", // Vertically center icon
      alignItems: "center", // Horizontally center icon
      marginRight: 12, // Space between icon and text
    },
    textContainer: {
      flex: 1, // Take up remaining space
      flexShrink: 1, // Allow shrinking so text doesn't overflow
      justifyContent: "center",
      alignItems: "flex-start", // Left-align text
    },
    text: {
      color: theme.adultContentWarningText,
      fontWeight: "bold",
      fontSize: IsTablet() ? 16 : 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
  });

  // If not adult content, return null
  if (!adultContent) {
    return <View></View>;
  }

  return (
    <Message
      text="This anime contains adult content, so it may contain (violent scenes) or (sexual scenes) or (strong language) that may not be suitable for all audiences."
      textColor={theme.adultContentWarningText}
      icon={<CircleAlert color={theme.adultContentWarningText} />}
      condition={adultContent}
      bgColor={theme.adultContentWarningBackground}
      borderColor={theme.adultContentWarningBorder}
    />
  );
}
