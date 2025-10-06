import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function NoUser() {
  // Get the theme colors
  const theme = useTheme();

  // Router Instance
  const router = useRouter();

  // Styles based on the theme
  const styles = StyleSheet.create({
    container: {
      // Center content
      flex: 1, // Full height
      justifyContent: "center",
      alignItems: "center",
      gap: 16, // Space between elements
      backgroundColor: theme.backgroundColor, // Theme background color
    },
  });

  // Handle button press to navigate to login screen
  const onPress = () => {
    router.push("/login"); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      {/* Text */}
      <Text>Please log in to access your profile.</Text>

      {/* Redirect Button */}
      <Button variant="primary" title="Login" onPress={onPress} />
    </View>
  );
}
