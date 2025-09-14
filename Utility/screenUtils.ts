import { Dimensions } from "react-native";

// Function to determine number of columns based on screen width
export const getNumColumns = (): number => {
  const screenWidth = Dimensions.get("window").width;

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
