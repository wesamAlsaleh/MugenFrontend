import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  // Import the theme hook
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
