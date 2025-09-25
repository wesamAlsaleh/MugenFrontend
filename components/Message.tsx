import { useTheme } from "@/hooks/use-theme";
import { IsTablet } from "@/Utility/screenUtils";
import { CircleAlert } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  condition?: boolean;
  text: string;
  icon?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export default function Message({
  condition,
  text,
  icon,
  bgColor,
  borderColor,
  textColor,
}: Props) {
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
      backgroundColor: bgColor || theme.cardBackgroundColor,
      borderColor: borderColor || theme.cardBorderColor,
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
      color: textColor || theme.primaryText,
      fontWeight: "bold",
      fontSize: IsTablet() ? 16 : 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
  });

  // If not adult content, return nothing
  if (!text) {
    return <View></View>;
  }

  // If condition is provided and false, return nothing
  if (condition) {
    return (
      <View style={styles.container}>
        {/* Icon Container */}
        {icon && (
          <View style={styles.iconContainer}>
            {icon || (
              <CircleAlert
                size={IsTablet() ? 28 : 24}
                color={theme.adultContentWarningText}
              />
            )}
          </View>
        )}

        {/* Warning Text Container*/}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Icon Container */}
      {icon && (
        <View style={styles.iconContainer}>
          {icon || (
            <CircleAlert
              size={IsTablet() ? 28 : 24}
              color={theme.adultContentWarningText}
            />
          )}
        </View>
      )}

      {/* Warning Text Container*/}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}
