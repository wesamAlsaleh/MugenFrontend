import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Percent } from "lucide-react-native";
import Countdown from "react-countdown";

import { secondsToWeekDay, secondsToDate } from "@/Utility/secondsToDate";

// Dummy featured anime data
const featuredAnime = {
  id: 181444,
  title: {
    english: "The Fragrant Flower Blooms With Dignity",
    native: "薫る花は凛と咲く",
    romaji: "Kaoru Hana wa Rin to Saku",
    userPreferred: "Kaoru Hana wa Rin to Saku",
  },
  coverImage: {
    color: "#a1d6f1",
    extraLarge:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx181444-Ut9DDUZdfHwg.jpg",
    large:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx181444-Ut9DDUZdfHwg.jpg",
    medium:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx181444-Ut9DDUZdfHwg.jpg",
  },
  averageScore: 86,
  meanScore: 86,
  status: "RELEASING",
  nextAiringEpisode: {
    airingAt: 1757777400,
    episode: 11,
    timeUntilAiring: 138925,
  },
};

// Countdown renderer for formatting the countdown display
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <Text style={styles.countDownText}>
      {days}d {hours}h {minutes}m {seconds}s
    </Text>
  );
};

// Function to render the rating container color based on score
const getRatingColor = (score: number): string => {
  // If no score, return gray
  if (!score) return "#6b7280";

  //   if (score === 86) return "#fbbf24";

  if (score >= 95) {
    // Darker green for very high scores (95-100)
    return "#16a34a";
  } else if (score >= 90) {
    // Bright green for high scores (90-94)
    return "#22c55e";
  } else if (score >= 80) {
    // Greenish yellow shade for moderately high scores (80-89)
    return "#a3e635";
  } else if (score >= 70) {
    // Yellowish orange shade for moderate scores (70-79)
    return "#fbbf24";
  } else if (score >= 60) {
    // Orange shade for moderately low scores (60-69)
    return "#f97316";
  } else if (score >= 50) {
    // Reddish orange shade for low scores(50-59)
    return "#ef4444";
  } else {
    // Deep red for low scores
    return "#dc2626";
  }
};

export default function FeaturedSection() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.animeDetailsContainer}>
          <View style={styles.animeHeaderContainer}>
            {/* Anime Status */}
            <View
              style={[
                styles.animeAiringStatusContainer,
                {
                  backgroundColor:
                    featuredAnime.status === "RELEASING"
                      ? "#06b6d4"
                      : "#6b7280",
                },
              ]}
            >
              <Text style={styles.animeAiringStatusText}>
                {featuredAnime.status === "RELEASING"
                  ? "Airing Now"
                  : "Finished"}
              </Text>
            </View>

            {/* Anime Rating */}
            <View
              style={[
                styles.animeRatingContainer,
                { backgroundColor: getRatingColor(featuredAnime.averageScore) },
              ]}
            >
              <Text style={styles.animeRatingText}>
                {featuredAnime.averageScore ?? "N/A"}
              </Text>
            </View>
          </View>

          {/* Anime Details */}
          <View style={styles.animeInfoContainer}>
            <Text
              style={styles.animeTitleText}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {featuredAnime.title.english}
            </Text>
            <Text style={styles.animeAiringWeekdayText}>
              {featuredAnime.status === "RELEASING"
                ? `New episode every ${secondsToWeekDay(
                    featuredAnime.nextAiringEpisode.airingAt || 0
                  )}`
                : "All episodes released"}
            </Text>

            <View style={styles.animeAiringTimeContainer}>
              <Text
                style={styles.countDownText}
              >{`Ep ${featuredAnime.nextAiringEpisode.episode} in`}</Text>
              <Countdown
                date={featuredAnime.nextAiringEpisode.airingAt * 1000} // Convert seconds to ms
                renderer={renderer}
              />
            </View>
          </View>
        </View>

        <View style={styles.animeImageContainer}>
          {/* Anime Image */}
          <Image
            source={{ uri: featuredAnime.coverImage.extraLarge }}
            style={styles.animeImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginBottom: 10,
  },
  cardContainer: {
    height: 300,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2f2f2f",
    borderWidth: 1,
    borderColor: "#444857",
    padding: 5,
    overflow: "hidden",
    position: "relative",
  },
  animeDetailsContainer: {
    flex: 1, // takes the remaining space besides the image container
    height: "100%", // Let it take full height of the card
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    padding: 5,
  },
  animeHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  animeAiringStatusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  animeAiringStatusText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  animeRatingContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: "#2f2f2f",
  },
  animeRatingText: {
    color: "black",
    fontWeight: "600",
  },
  animeInfoContainer: {
    flex: 1, // takes the remaining space
    width: "100%", // Let it take full width of the details container
    padding: 10,
    gap: 5,
    justifyContent: "center",
  },
  animeTitleText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22, // make sure every line is the same vertical spacing
    height: 22 * 4, // locks the <Text> box to always fit exactly 3 lines
  },
  animeAiringWeekdayText: {
    color: "#d1d5db",
    fontWeight: "500",
    fontSize: 14,
  },
  subInfoWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  animeCheckButtonContainer: {
    borderRadius: 8,
  },
  animeAiringTimeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  animeImageContainer: {
    width: "50%", // Let it take half of the card width
    height: "100%", // Let it take full height of the card
    padding: 5, // Padding inside the image container
    alignItems: "center", // Center the image horizontally
    justifyContent: "center", // Center the image vertically
    overflow: "hidden", // Ensures the image respects the border radius
    position: "relative", // Let it be relative for absolute children
  },
  animeImage: {
    width: "100%", // Let the image take 90% of the animeImageContainer width
    height: "100%", // Let the image take 90% of the animeImageContainer height
    alignSelf: "center", // Center the image horizontally
    borderRadius: 12, // Rounded corners for the image inside the container
    resizeMode: "cover", // Ensure the image covers the container without distortion
  },
  countDownText: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "600",
  },
});
