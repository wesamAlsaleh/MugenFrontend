import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Tab</Text>
      <Text>Count:</Text>
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
