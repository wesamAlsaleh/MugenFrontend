import { Dimensions } from "react-native";

// Function to determine number of columns based on screen width
export const getNumColumns = (): number => {
  const screenWidth = getScreenWidth();

  // Columns based on common breakpoints
  if (screenWidth < 600) {
    return 3; // Regular phones
  } else if (screenWidth < 900) {
    return 4; // Large phones / small tablets
  } else {
    return 5; // Tablets and larger screens
  }
};

// Function to get the screen width
export const getScreenWidth = (): number => {
  return Dimensions.get("window").width;
};

// Function to get the screen height
export const getScreenHeight = (): number => {
  return Dimensions.get("window").height;
};

// Baseline sizes from a standard phone
const BASELINE_WIDTH = 375;
const BASELINE_HEIGHT = 812;

// Function to scale width based on screen size
export const scaleWidth = (size: number): number => {
  // Get the screen width
  const screenWidth = getScreenWidth();

  // Scale the size based on the ratio of current screen width to baseline width
  return (screenWidth / BASELINE_WIDTH) * size;
};

// Function to scale height based on screen size
export const scaleHeight = (size: number): number => {
  // Get the screen height
  const screenHeight = getScreenHeight();

  // Scale the size based on the ratio of current screen height to baseline height
  return (screenHeight / BASELINE_HEIGHT) * size;
};

// Function to scale font size based on screen size
export const scaleFont = (size: number): number => {
  // Use width scaling for font size to maintain consistency
  const screenWidth = getScreenWidth();

  // Scale the size based on the ratio of current screen width to baseline width
  return (screenWidth / BASELINE_WIDTH) * size;
};

// Function to check if the device is a tablet based on screen width
export const isTablet = (): boolean => {
  // Get screen width
  const screenWidth = getScreenWidth();

  // Consider tablets 768px and above
  return screenWidth >= 768;
};
