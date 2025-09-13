import { Theme, themes } from "@/constants/theme";
import { useColorScheme } from "react-native";

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();

  return themes[colorScheme === "dark" ? "dark" : "light"];
};
