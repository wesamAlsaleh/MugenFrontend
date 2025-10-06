import Button from "@/components/Button";
import RowInputField from "@/components/RowInputField";
import { useTheme } from "@/hooks/use-theme";
import { IsTablet } from "@/Utility/screenUtils";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  // Get the theme colors
  const theme = useTheme();

  // Router Instance
  const router = useRouter();

  // State for input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dynamic styles based on the theme
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Full screen
      backgroundColor: theme.backgroundColor, // Use theme background color
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
      paddingHorizontal: 16, // Horizontal padding
    },
    headerContainer: {
      marginBottom: 24, // Space below the header
      alignItems: "center", // Center header text
      width: "100%",
    },
    headerText: {
      fontSize: IsTablet() ? 32 : 24, // Responsive font size
      fontWeight: "bold", // Bold text
      color: theme.primary, // Use theme text color
    },
    contentContainer: {
      width: "100%", // Full width for content
      gap: 14, // Space between input fields
      marginBottom: 24, // Space below the header
    },
    buttonsContainer: {
      width: "100%", // Full width for buttons
    },
    additionalText: {
      fontSize: IsTablet() ? 16 : 14, // Responsive font size
      color: theme.secondaryText, // Use secondary text color from theme
      textAlign: "center", // Center the text
      marginTop: 16, // Space above the text
    },
    registerText: {
      fontSize: IsTablet() ? 16 : 14, // Responsive font size
      color: theme.primary, // Use primary color from theme
      textAlign: "center", // Center the text
      marginTop: 16, // Space above the text
      textDecorationLine: "underline", // Underline the text
    },
  });

  // Handler for register button press
  const onPress = () => {
    // Handle register logic here
    console.log(
      "Register button pressed " + username + " " + email + " " + password
    );
  };

  // Handler for login link press
  const handleLoginPress = () => {
    router.push("/(auth)/login");
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Register to Mugen</Text>
      </View>

      {/* Login form components will go here */}
      <View style={styles.contentContainer}>
        {/* Username Field */}
        <RowInputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={setUsername}
        />

        {/* Email Field */}
        <RowInputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
        />

        {/* Password Field */}
        <RowInputField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChange={setPassword}
        />
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Submit Button */}
        <Button title="Register" onPress={onPress} />

        {/* Register Link */}
        <Text style={styles.registerText} onPress={handleLoginPress}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
}
