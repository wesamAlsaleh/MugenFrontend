import { useTheme } from "@/hooks/use-theme";
import { IsTablet } from "@/Utility/screenUtils";
import { Shield } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import Card from "./Card";
import RowInputField from "./RowInputField";

export default function UserChangePassword() {
  // Get the theme colors
  const theme = useTheme();

  // State to hold user data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
  });

  // Function to handle saving changes
  const handlePress = () => {
    // TODO: Send the updated password to the server (currentPassword, newPassword)
  };

  return (
    <Card
      width={"100%"}
      marginBottom={16}
      cardContent={
        <View style={styles.cardWrapper}>
          {/* Header */}
          <View style={styles.headerContainer}>
            {/* Icon */}
            <Shield color={theme.primary} />

            {/* Text */}
            <Text style={styles.headerText}>Change Password</Text>
          </View>

          {/* Content */}
          <View style={styles.container}>
            {/* Username Field */}
            <RowInputField
              label="Current Password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              secureTextEntry={true}
            />

            {/* New Password Field */}
            <RowInputField
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={setNewPassword}
              secureTextEntry={true}
            />

            {/* Save Changes button */}
            <Button
              title="Update Password"
              onPress={handlePress}
              style={{ marginVertical: 12 }}
            />
          </View>
        </View>
      }
    />
  );
}
