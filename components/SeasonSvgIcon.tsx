import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, G, Line, Path } from "react-native-svg";

// Wrap SVG <G> (group) in Animated so we can animate rotation, scale, etc.
const AnimatedG = Animated.createAnimatedComponent(G);

type Season = "summer" | "spring" | "autumn" | "winter";

interface SeasonIconProps {
  season: Season;
  size?: number; // default size = 100
}

export default function SeasonSvgIcon({
  season,
  size = 100, // default size = 100 if not provided
}: SeasonIconProps) {
  // Shared values for animation
  const rotation = useSharedValue(0); // For rotation animations
  const scale = useSharedValue(1); // For scale animations
  const sway = useSharedValue(0); // For leaf sway
  const drift = useSharedValue(0); // For snow drift

  // Start the animations based on season when component mounts
  useEffect(() => {
    if (season === "summer" || season === "winter") {
      // Continuous rotation (sun rays / snowflake)
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 6000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }

    if (season === "spring") {
      // Petals pulsing in/out
      scale.value = withRepeat(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }

    if (season === "autumn") {
      // Leaf swaying left/right
      sway.value = withRepeat(
        withTiming(15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }

    if (season === "winter") {
      // Snowflake drifting slightly up/down
      drift.value = withRepeat(
        withTiming(5, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [season]);

  // Animated props for each case
  const animatedProps = useAnimatedStyle(() => {
    switch (season) {
      case "summer":
        return { transform: [{ rotate: `${rotation.value}deg` }] };
      case "spring":
        return { transform: [{ scale: scale.value }] };
      case "autumn":
        return { transform: [{ rotate: `${sway.value}deg` }] };
      case "winter":
        return {
          transform: [
            { rotate: `${rotation.value}deg` },
            { translateY: drift.value },
          ],
        };
      default:
        return {};
    }
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {season === "summer" && (
        <>
          {/* Sun rays that rotate */}
          <AnimatedG animatedProps={animatedProps}>
            <Line
              x1="50"
              y1="6"
              x2="50"
              y2="22"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="50"
              y1="94"
              x2="50"
              y2="78"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="6"
              y1="50"
              x2="22"
              y2="50"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="94"
              y1="50"
              x2="78"
              y2="50"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="20"
              y1="20"
              x2="30"
              y2="30"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="80"
              y1="20"
              x2="70"
              y2="30"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="20"
              y1="80"
              x2="30"
              y2="70"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Line
              x1="80"
              y1="80"
              x2="70"
              y2="70"
              stroke="#FFD166"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </AnimatedG>
          {/* Sun core */}
          <Circle
            cx="50"
            cy="50"
            r="20"
            fill="#FFB703"
            stroke="#FB8500"
            strokeWidth="2"
          />
        </>
      )}

      {season === "spring" && (
        <>
          {/* Flower center */}
          <Circle cx="50" cy="56" r="6" fill="#FFB4C6" />

          {/* Animated petals (scaling group) */}
          <AnimatedG animatedProps={animatedProps}>
            <Ellipse rx="10" ry="18" cx="50" cy="26" fill="#95D5B2" />
            <Ellipse
              rx="10"
              ry="18"
              cx="74"
              cy="50"
              transform="rotate(90,74,50)"
              fill="#5EEAD4"
            />
            <Ellipse
              rx="10"
              ry="18"
              cx="50"
              cy="74"
              transform="rotate(180,50,74)"
              fill="#C7F9CC"
            />
            <Ellipse
              rx="10"
              ry="18"
              cx="26"
              cy="50"
              transform="rotate(-90,26,50)"
              fill="#8EE4AF"
            />
          </AnimatedG>
          {/* Stem */}
          <Path
            d="M50 62 V88"
            stroke="#2D6A4F"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}

      {season === "autumn" && (
        <AnimatedG animatedProps={animatedProps}>
          {/* Leaf swaying */}
          <Path
            d="M50 30 C64 24, 68 36, 54 50 C42 40, 38 34, 50 30 Z"
            fill="#F97316"
            stroke="#C2410C"
            strokeWidth="1.5"
          />
        </AnimatedG>
      )}

      {season === "winter" && (
        <AnimatedG animatedProps={animatedProps}>
          {/* Snowflake arms */}
          <Line
            x1="50"
            y1="30"
            x2="50"
            y2="70"
            stroke="#E6F0FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Line
            x1="30"
            y1="50"
            x2="70"
            y2="50"
            stroke="#E6F0FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Line
            x1="35"
            y1="35"
            x2="65"
            y2="65"
            stroke="#E6F0FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Line
            x1="35"
            y1="65"
            x2="65"
            y2="35"
            stroke="#E6F0FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </AnimatedG>
      )}
    </Svg>
  );
}
