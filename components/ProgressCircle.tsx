"use client";

import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ProgressCircleProps {
  CIRCLE_SIZE?: number;
  STROKE_WIDTH?: number;
  DURATION?: number;
  CIRCUMFERENCE?: number;
}

export default function ProgressCircle(props: ProgressCircleProps) {
  // Destructure props with defaults
  const { CIRCLE_SIZE, CIRCUMFERENCE, DURATION, STROKE_WIDTH } = props;

  // Animated value for the progress
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Circle radius calculation based on size and stroke width
  const RADIUS =
    CIRCLE_SIZE && STROKE_WIDTH ? (CIRCLE_SIZE - STROKE_WIDTH) / 2 : 10.5; // default radius if not provided

  useEffect(() => {
    const loop = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION || 15000, // default to 15s
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) loop(); // restart loop
      });
    };
    loop();
  }, [animatedValue]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE || 2, 0], // animate stroke from empty to full
  });

  return (
    <View>
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <Circle
          cx={CIRCLE_SIZE || 2 / 2}
          cy={CIRCLE_SIZE || 2 / 2}
          r={RADIUS}
          stroke="#444"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        <AnimatedCircle
          cx={CIRCLE_SIZE || 2 / 2}
          cy={CIRCLE_SIZE || 2 / 2}
          r={RADIUS}
          stroke="#22c55e" // green progress
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

// Trick: Animated wrapper for Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
