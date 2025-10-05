import { useTheme } from "@/hooks/use-theme";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "warning" | "danger" | "success";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  style?: object;
  textStyle?: object;
}

export default function Button({
  title = "Button",
  onPress = () => {},
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  icon = null,
  iconPosition = "right",
  style = {},
  textStyle = {},
}: Props) {
  // Get the theme colors
  const theme = useTheme();

  // Function to get font size based on button size
  const getFontSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return 12;
      case "large":
        return 18;
      case "medium":
        return 14;
      default:
        return 14;
    }
  };

  // Function to get the button background color based on variant
  const getBackgroundColor = (
    variant: "primary" | "secondary" | "warning" | "danger" | "success"
  ) => {
    switch (variant) {
      case "primary":
        return theme.primary;
      case "secondary":
        return theme.secondary;
      case "warning":
        return theme.warning;
      case "danger":
        return theme.error;
      case "success":
        return theme.success;
      default:
        return theme.primary;
    }
  };

  // Function to determine the padding based on size
  const getPadding = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return 8;
      case "medium":
        return 12;
      case "large":
        return 16;
      default:
        return 12;
    }
  };

  // Function to determine the text color based on variant
  const getTextColor = (
    variant: "primary" | "secondary" | "warning" | "danger" | "success"
  ) => {
    switch (variant) {
      case "primary":
      case "secondary":
      case "warning":
      case "danger":
      case "success":
        return "#fff"; // White text for colored buttons
      default:
        return "#fff";
    }
  };

  // Dynamic styles based on the theme and props
  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center", // Center vertically
      justifyContent: "center", // Center horizontally
      backgroundColor: getBackgroundColor(variant),
      padding: getPadding(size),
      borderRadius: 8,
      opacity: disabled || loading ? 0.6 : 1, // Dim the button if disabled or loading
      gap: icon ? 8 : 0, // Space between icon and text if icon exists
    },
    text: {
      fontSize: getFontSize(size),
      color: theme.primaryText,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {/* Icon If left */}
      {icon && iconPosition === "left" && icon}

      {/* Title */}
      <Text style={[styles.text, textStyle]}>{title}</Text>

      {/* Icon If right */}
      {icon && iconPosition === "right" && icon}
    </TouchableOpacity>
  );
}
