import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function ExplorePage() {
  const images = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=6",
    "https://picsum.photos/200/300?random=7",
    "https://picsum.photos/200/300?random=8",
    "https://picsum.photos/200/300?random=9",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Tab</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollContent: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
});
