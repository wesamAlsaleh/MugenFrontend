import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  withBackButton?: boolean;
  title?: string;
  //   subtitle?: string;
  rightComponent?: ReactNode;
}

export default function PageHeader({
  withBackButton = true,
  title,
  //   subtitle,
  rightComponent,
}: Props) {
  // Get the theme colors
  const theme = useTheme();

  // Get the router object
  const router = useRouter();

  // Dynamic styles based on theme and device type
  const styles = StyleSheet.create({
    container: {
      width: "100%", // Full width of the parent
      height: 64, // Fixed height for the header

      flexDirection: "row", // Align items horizontally
      alignItems: "center", // Vertically center items
      backgroundColor: theme.headerBackgroundColor, // Set background color based on theme
    },
    backButton: {
      flexDirection: "row", // Align icon and text horizontally
      alignItems: "center", // Vertically center icon and text
      padding: 8, // Padding around the button
      marginLeft: 8, // Space from the left edge (total 16 with padding)
    },
    subContainer: {
      flex: 1, // Take up remaining space
      flexDirection: "row", // Align items horizontally
      justifyContent: "space-between", // Space between title/subtitle and right component
      //   backgroundColor: theme.primary + "cc", // Debugging purpose only
    },
    titlesContainer: {
      width: "80%", // 80% width to prevent overflow with long titles
      //   backgroundColor: "blue", // Debugging purpose only
    },
    titleText: {
      color: theme.primaryText, // Set text color based on theme
      fontWeight: "bold",
      fontSize: 18,
    },
    subtitleText: {
      color: theme.secondaryText, // Set text color based on theme
      fontSize: 11,
    },
    rightComponentContainer: {
      width: "20%", // Fixed width for right component
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {withBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={theme.primary} size={26} />
        </TouchableOpacity>
      )}

      {/* Bar Content */}
      <View style={styles.subContainer}>
        <View style={styles.titlesContainer}>
          {/* Title */}
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>

          {/* Subtitle */}
          {/* {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>} */}
        </View>

        {/* Right Component */}
        <View style={styles.rightComponentContainer}>
          <Text>{rightComponent}</Text>
        </View>
      </View>
    </View>
  );
}
