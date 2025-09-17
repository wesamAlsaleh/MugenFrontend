import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, View } from "react-native";

export default function ListScreen() {
  // Get the theme
  const theme = useTheme();

  // Dynamic styles based on the theme
  const dynamicStyles = {
    container: {
      backgroundColor: theme.backgroundColor,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Status Selector */}
      <View></View>

      {/* Results Selector */}
      <Text style={{ color: theme.primaryText }}>My List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
