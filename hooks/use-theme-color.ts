/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Get the current theme (light or dark) from the built-in hook
  const theme = useColorScheme() ?? "light";

  // Check if a color is provided via props for the current theme
  const colorFromProps = props[theme];

  // If a color is provided via props, use it
  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Otherwise, use the color from the Colors object defined in constants/theme.ts
    return Colors[theme][colorName];
  }
}
