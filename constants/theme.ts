import { Platform } from "react-native";

const tintColorLight = "#10b981";
const tintColorDark = "#10b981";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#ffffff", // White: "ffffff"
    foreground: "1f2937", // Gray-800: "1f2937"
    tint: tintColorLight, //
    icon: "#687076", // Gray-400: "687076"
    tabIconDefault: "#687076", // Gray-400: "687076"
    tabIconSelected: tintColorLight,
    primary: "#15803d", // Green-700: "15803d"
    accent: "#22c55e", // Green-500: "22c55e"
  },
  dark: {
    text: "#ffffff", // White
    background: "#1f1f1f", // Dark Gray
    tint: tintColorDark, // Emerald-500
    icon: "#9BA1A6", // Gray-400
    tabIconDefault: "#9BA1A6", // Gray-400
    tabIconSelected: tintColorDark, // Emerald-500
    accent: "#22c55e", // Green-500: "22c55e"
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
