import { Dimensions } from "react-native";

// Get screen width
const screenWidth = Dimensions.get("window").width;

// Function to determine number of columns based on screen width
export const getNumColumns = (): number => {
  const screenWidth = Dimensions.get("window").width;

  // Columns based on common breakpoints
  if (screenWidth < 400) {
    return 2; // Small phones
  } else if (screenWidth < 600) {
    return 3; // Regular phones
  } else if (screenWidth < 900) {
    return 4; // Large phones / small tablets
  } else {
    return 5; // Tablets and larger screens
  }
};
