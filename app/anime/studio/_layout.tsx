import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function AnimeStudioLayout() {
  // Import the theme hook
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ headerShown: false, headerTitle: "Studio Details" }}
      />
    </Stack>
  );
}
