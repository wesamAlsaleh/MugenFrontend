"use client";

import Countdown from "react-countdown";
import { Image, StyleSheet, Text, View } from "react-native";

import { ThisSeasonTopAnimes } from "@/constants/dummyData";
import { secondsToWeekDay } from "@/Utility/secondsToDate";
import { useEffect, useState } from "react";

import { useTheme } from "@/hooks/use-theme";
import { Anime } from "@/types/Anime";
import { IsTablet } from "@/Utility/screenUtils";
import { Link } from "expo-router";

export default function FeaturedAnimeCarousel() {
  // Get the current color scheme (light or dark)
  const theme = useTheme();

  // Data state
  const [data, setData] = useState<Anime[]>(ThisSeasonTopAnimes); // Array of this season's top animes

  // Start at a random index (if data is not empty)
  const [currentIndex, setCurrentIndex] = useState(() => {
    return ThisSeasonTopAnimes.length > 0
      ? Math.floor(Math.random() * ThisSeasonTopAnimes.length)
      : 0;
  });

  // Set the data on component mount
  useEffect(() => {
    setData(ThisSeasonTopAnimes);
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

  // Check if this device is a tablet
  const isTablet = IsTablet();

  // Dynamic styles
  const dynamicStyles = {
    cardContainer: {
      backgroundColor: theme.cardBackgroundColor,
      borderColor: theme.cardBorderColor,
      height: isTablet ? 350 : 300, // Slightly taller card on tablets
    },
    animeAiringStatusContainer: {
      backgroundColor:
        featuredAnime.status === "RELEASING"
          ? theme.airingStatus
          : theme.finishedStatus,
    },
    animeAiringStatusText: {
      color: theme.primaryText,
    },
    animeRatingContainer: {
      backgroundColor: getRatingColor(featuredAnime.averageScore!), // Use averageScore for color coding
    },
    animeTitleText: {
      color: theme.primaryText,
    },
    animeAiringWeekdayText: {
      color: theme.primaryText,
    },
    countDownText: {
      color: theme.countDownTextColor,
    },
  };

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
      return (
        <Text style={[styles.countDownText, dynamicStyles.countDownText]}>
          Aired
        </Text>
      );
    }

    return (
      <Text style={[styles.countDownText, dynamicStyles.countDownText]}>
        {days}d {hours}h {minutes}m {seconds}s
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Card Container */}
      <Link href={`/anime/${featuredAnime.id}`}>
        <View style={[styles.cardContainer, dynamicStyles.cardContainer]}>
          {/* Left Section Container */}
          <View style={styles.animeDetailsContainer}>
            <View style={styles.animeHeaderContainer}>
              {/* Anime Status */}
              <View
                style={[
                  styles.animeAiringStatusContainer,
                  dynamicStyles.animeAiringStatusContainer,
                ]}
              >
                <Text
                  style={[
                    styles.animeAiringStatusText,
                    dynamicStyles.animeAiringStatusText,
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
                    dynamicStyles.animeRatingContainer,
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
                style={[styles.animeTitleText, dynamicStyles.animeTitleText]}
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
                    dynamicStyles.animeAiringWeekdayText,
                  ]}
                >
                  All episodes released
                </Text>
              ) : (
                <Text
                  style={[
                    styles.animeAiringWeekdayText,
                    dynamicStyles.animeAiringWeekdayText,
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
                  <Text
                    style={[styles.countDownText, dynamicStyles.countDownText]}
                  >{`Ep ${featuredAnime.nextAiringEpisode!.episode}:`}</Text>

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
          <View
            style={[
              styles.animeImageContainer,
              {
                width: isTablet ? "20%" : "50%", // Image Container is 20% on tablets, 50% on phones
              },
            ]}
          >
            {/* Anime Image */}
            {noImageAvailable ? null : (
              <Image
                source={{ uri: featuredAnime.coverImage.extraLarge! }}
                style={styles.animeImage}
              />
            )}
          </View>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginBottom: 10,
  },
  cardContainer: {
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
    padding: 5, // Padding inside the image container
    alignItems: "center", // Center the image horizontally
    justifyContent: "center", // Center the image vertically
    overflow: "hidden", // Ensures the image respects the border radius
    position: "relative", // Let it be relative for absolute children
  },
  animeImage: {
    width: "100%", // Let the image take full width of the container
    height: "100%", // Custom height for the image based on screen height
    alignSelf: "center", // Center the image horizontally
    borderRadius: 8, // Rounded corners for the image inside the container
    resizeMode: "stretch", // Cover the entire container
  },
  countDownText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
