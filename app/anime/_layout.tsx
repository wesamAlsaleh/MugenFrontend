import { Stack } from "expo-router";

export default function AnimeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="search"
        options={{ headerShown: true, headerTitle: "" }}
      />
    </Stack>
  );
}
