import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const featuredAnime = {
  title: "Ao no Hako 2nd Season",
  description:
    "University is back in session for Iori, and so are the booze-fueled parties!",
  rating: "8.7",
  nextEpisode: "in 2 days",
  episode: "Episode 5",
  image:
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b189123-nXUVQcRCFJuS.png",
};

export default function FeaturedSection() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(59, 130, 246, 0.2)", "rgba(245, 158, 11, 0.2)"]}
        style={styles.card}
      >
        <View style={styles.row}>
          <View style={styles.content}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Now Airing</Text>
            </View>

            <Text style={styles.title}>{featuredAnime.title}</Text>
            <Text style={styles.description}>{featuredAnime.description}</Text>

            <View style={styles.metaRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{featuredAnime.rating}</Text>
              </View>

              <View style={styles.episodeContainer}>
                <Text style={styles.episodeText}>
                  {featuredAnime.nextEpisode}
                </Text>
              </View>
            </View>

            <Text style={styles.episodeLabel}>{featuredAnime.episode}</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Watch Latest</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: featuredAnime.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  badge: {
    backgroundColor: "#f97316", // orange-500
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#d1d5db", // gray-300
    fontSize: 14,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  episodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  episodeText: {
    color: "#9ca3af", // gray-400
    fontSize: 12,
  },
  episodeLabel: {
    color: "#e5e7eb", // gray-200
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#10b981", // green-500
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  imageContainer: {
    width: 96,
    height: 128,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
