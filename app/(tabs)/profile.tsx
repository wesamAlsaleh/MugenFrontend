import { Stack } from "expo-router";
import { Button, Text, Image, StyleSheet, View } from "react-native";
import { useState } from "react";

export default function ProfilePage() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Profile Page",
          headerRight: () => (
            <Button
              onPress={() => setCount((c) => c + 1)}
              title="Update count"
            />
          ),
        }}
      />

      <View style={styles.container}>
        <Text>Profile Tab</Text>
        <Text>Count: {count}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
