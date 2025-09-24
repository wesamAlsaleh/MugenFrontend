import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function AnimeLayout() {
  // Import the theme hook
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Home",
          headerTitle: "",
          headerTitleStyle: {
            fontWeight: "bold",
          }, // Header title style
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // Header background
          },
          headerTintColor: theme.primary, // Header text & back button color
          headerShadowVisible: false, // Remove header shadow
        }}
      />
      <Stack.Screen name="studio" options={{ headerShown: false }} />
    </Stack>
  );
}
