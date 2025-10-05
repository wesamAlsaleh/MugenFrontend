import { useTheme } from "@/hooks/use-theme";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  label?: string;
  icon?: ReactNode;
  value?: any;
  onChange?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  maxLength?: number;
}

export default function RowInputField({
  label = "",
  icon = null,
  value = "",
  onChange = () => {},
  placeholder = "",
  secureTextEntry = false, // Dots for password fields
  keyboardType = "default",
  autoCapitalize = "none",
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength = 100, // Default max length of 100 characters
}: Props) {
  // Get the theme colors
  const theme = useTheme();

  // Dynamic styles based on the theme
  const styles = StyleSheet.create({
    container: {
      width: "100%", // Full width of the parent container
      flexDirection: "column",
      gap: 4, // Space between label and input field
    },
    label: {
      marginBottom: 4,
      color: theme.primaryText,
      fontWeight: "500",
    },
    searchBarContainer: {
      width: "100%", // Full width of the parent container
      height: 40,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1, // Take up remaining space of the row container
      borderColor: theme.inputBorderColor,
      backgroundColor: theme.inputBackgroundColor,
      color: theme.primaryText,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      textAlignVertical: "center", // for single line stability
    },
  });

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input Field Container */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.mutedText}
          value={value}
          onChangeText={onChange}
          textAlign="left"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
          scrollEnabled={false} // Disables scrolling
        />
      </View>
    </View>
  );
}
