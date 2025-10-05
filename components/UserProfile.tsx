import { useTheme } from "@/hooks/use-theme";
import { IsTablet } from "@/Utility/screenUtils";
import { Camera, PencilLine } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import Card from "./Card";
import RowInputField from "./RowInputField";

export default function UserProfile({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  // Get the theme colors
  const theme = useTheme();

  // State to manage edit mode
  const [localUsername, setLocalUsername] = useState<string | null>(username);
  const [localEmail, setLocalEmail] = useState<string | null>(email);

  // Dynamic styles based on the theme
  const styles = StyleSheet.create({
    cardWrapper: {
      width: "100%", // Full width of the card content
      paddingHorizontal: 16, // Standard horizontal padding
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 10,
      paddingTop: 10,
    },
    headerText: {
      fontSize: IsTablet() ? 18 : 16,
      fontWeight: "bold",
      color: theme.primaryText,
    },
    container: {
      width: "100%",
      paddingHorizontal: 10, // Extra padding for better spacing
      gap: 10, // Space between input fields
    },
    avatarContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 20, // Space between avatar and button
      // backgroundColor: theme.primary + "10", // Debugging color
    },
    imageContainer: {
      // Circle avatar
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 2,
      backgroundColor: theme.inputBackgroundColor,
      borderColor: theme.inputBorderColor,
    },
    imageText: {
      flex: 1, // Take full space of the container
      textAlign: "center", // Center horizontally
      textAlignVertical: "center", // Center vertically
      lineHeight: 40,
      fontSize: 32,
      fontWeight: "600",
      color: theme.primary,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.inputBackgroundColor,
      borderWidth: 1,
      borderColor: theme.inputBorderColor,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    buttonText: {
      marginLeft: 6,
      fontSize: 12,
      color: theme.primaryText,
      fontWeight: "500",
      flexShrink: 1, // Allow text to shrink if needed
    },
  });

  // Set the user data from the context
  useEffect(() => {
    setLocalUsername(username);
    setLocalEmail(email);
  }, [username, email]);

  // Function to handle saving changes
  const handlePress = () => {
    // TODO: Send the updated username and email to the server (localUsername, localEmail)
  };

  // If no username or email is provided, return null
  if (!username || !email) {
    return (
      <View>
        <Text style={styles.headerText}>No user information available</Text>
      </View>
    );
  }

  return (
    <Card
      width={"100%"} // Full width of the page
      marginBottom={16}
      cardContent={
        <View style={styles.cardWrapper}>
          {/* Header */}
          <View style={styles.headerContainer}>
            {/* Icon */}
            <PencilLine color={theme.primary} />

            {/* Text */}
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          {/* Content */}
          <View style={styles.container}>
            {/* User Avatar */}
            <View style={styles.avatarContainer}>
              {/* Placeholder for user avatar */}
              <View style={styles.imageContainer}>
                {/* Put the First letter of the username */}
                <Text style={styles.imageText}>{localUsername?.charAt(0)}</Text>
              </View>

              {/* Change Avatar Button */}
              <TouchableOpacity style={styles.button}>
                {/* Icon */}
                <Camera color={theme.primaryText} />

                {/* Text */}
                <Text style={styles.buttonText}>Change Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Username Field */}
            <RowInputField
              label="Username"
              placeholder="Alice"
              value={localUsername}
              onChange={setLocalUsername}
            />

            {/* Email Field */}
            <RowInputField
              label="Email"
              placeholder="alice@example.com"
              keyboardType="email-address"
              value={localEmail}
              onChange={setLocalEmail}
            />

            {/* Save Changes button */}
            <Button
              title="Save Changes"
              onPress={handlePress}
              style={{ marginVertical: 12 }}
            />
          </View>
        </View>
      }
    />
  );
}
