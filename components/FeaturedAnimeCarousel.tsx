"use client";

import Countdown from "react-countdown";
import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";

import { ThisSeasonAnimes } from "@/constants/ThisSeasonAnimes";
import { secondsToWeekDay } from "@/Utility/secondsToDate";
import { useEffect, useState } from "react";

import { ThisSeasonTopAnimes } from "@/types/thisSeasonTopAnimes";

// Countdown renderer for formatting the countdown display
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    // Render a completed state (if needed)
    return <Text style={styles.countDownText}>Aired</Text>;
  }

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

export default function FeaturedAnimeCarousel() {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();

  const [data, setData] = useState<ThisSeasonTopAnimes[]>(ThisSeasonAnimes);

  // Start at a random index (if data is not empty)
  const [currentIndex, setCurrentIndex] = useState(() => {
    return ThisSeasonAnimes.length > 0
      ? Math.floor(Math.random() * ThisSeasonAnimes.length)
      : 0;
  });

  // Set the data on component mount
  useEffect(() => {
    setData(ThisSeasonAnimes);
  }, []);

  // Cycle through featured animes every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(() => {
        // If data is empty, do nothing
        if (data.length === 0) return 0;

        // Pick a random index different from the current one
        let randomIndex;

        do {
          // Set the index to the next one in the list (cycling through)
          randomIndex = Math.floor(Math.random() * data.length);
        } while (randomIndex === currentIndex && data.length > 1); // To avoid showing the same anime twice in a row, loop until the new index is different from the current one

        return randomIndex;
      });
    }, 15000); // 15 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [data, currentIndex]);

  // Current featured anime based on random index
  const featuredAnime = data[currentIndex];

  // Safety check (in case data is empty or undefined)
  if (!featuredAnime) {
    return <Text>No anime available</Text>; // or return a fallback
  }

  // Handle potential null values gracefully
  const noImageAvailable = featuredAnime.coverImage === null;
  const noAverageScore = featuredAnime.averageScore === null;
  const noMeanScore = featuredAnime.meanScore === null;
  const noNextAiringEpisode = featuredAnime.nextAiringEpisode === null;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: colorScheme === "light" ? "#f9f9f9" : "#2f2f2f",
            borderColor: colorScheme === "light" ? "#e5e7eb" : "#3d3d3d",
          },
        ]}
      >
        {/* Left Section Container */}
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
              <Text
                style={[
                  styles.animeAiringStatusText,
                  { color: colorScheme === "light" ? "#000000" : "#ffffff" },
                ]}
              >
                {featuredAnime.status === "RELEASING"
                  ? "Airing Now"
                  : "Finished"}
              </Text>
            </View>

            {/* Anime Rating */}
            {noAverageScore && noMeanScore ? null : (
              <View
                style={[
                  styles.animeRatingContainer,
                  {
                    backgroundColor: getRatingColor(
                      featuredAnime.averageScore!
                    ),
                  },
                ]}
              >
                <Text style={styles.animeRatingText}>
                  {featuredAnime.averageScore || featuredAnime.meanScore}
                </Text>
              </View>
            )}
          </View>

          {/* Anime Details */}
          <View style={styles.animeInfoContainer}>
            {/* Anime Title */}
            <Text
              style={[
                styles.animeTitleText,
                { color: colorScheme === "light" ? "#000000" : "#ffffff" },
              ]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {featuredAnime.title.english}
            </Text>

            {/* Anime release day section */}
            {noNextAiringEpisode ? (
              <Text
                style={[
                  styles.animeAiringWeekdayText,
                  { color: colorScheme === "light" ? "#6b7280" : "#d1d5db" },
                ]}
              >
                All episodes released
              </Text>
            ) : (
              <Text
                style={[
                  styles.animeAiringWeekdayText,
                  { color: colorScheme === "light" ? "#6b7280" : "#d1d5db" },
                ]}
              >
                {featuredAnime.status === "RELEASING"
                  ? `New episode every ${secondsToWeekDay(
                      featuredAnime.nextAiringEpisode!.airingAt || 0
                    )}`
                  : "All episodes released"}
              </Text>
            )}

            {/* Anime next episode counter */}
            {noNextAiringEpisode ? null : (
              <View style={styles.animeAiringTimeContainer}>
                {/* Ep Number */}
                <Text style={styles.countDownText}>{`Ep ${
                  featuredAnime.nextAiringEpisode!.episode
                } in`}</Text>

                {/* Ep countdown */}
                <Countdown
                  date={featuredAnime.nextAiringEpisode!.airingAt * 1000} // Convert seconds to ms
                  renderer={renderer}
                />
              </View>
            )}
          </View>
        </View>

        {/* Right Section Container */}
        <View style={styles.animeImageContainer}>
          {/* Anime Image */}
          {noImageAvailable ? null : (
            <Image
              source={{ uri: featuredAnime.coverImage.extraLarge! }}
              style={styles.animeImage}
            />
          )}
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
    borderWidth: 1,
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
