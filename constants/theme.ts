import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#22c55e",
    secondary: "#FCDFC2",
  },
  dark: {
    primary: "#ef4444",
    secondary: "#FCDFC2",
  },
};

export const themes = {
  light: {
    // Primary brand colors
    primary: "#f97316",
    primaryDark: "#ea580c",
    primaryDarker: "#c2410c",
    primaryLight: "#ffedd5",
    primaryExtraLight: "#fff7ed",

    // Background colors
    backgroundColor: "#ffffff",
    headerBackgroundColor: "#f3f4f6",

    // Tab bar background
    tabBarBackgroundColor: "#f3f4f6",

    // Card colors
    cardBackgroundColor: "#f9f9f9",
    cardBorderColor: "#e5e7eb",

    // Text colors
    primaryText: "#000000",
    secondaryText: "#6b7280",
    mutedText: "#9ca3af",

    // Status colors
    airingStatus: "#06b6d4",
    finishedStatus: "#6b7280",

    // Interactive colors
    success: "#22c55e",
    warning: "#fbbf24",
    error: "#ef4444",

    // Separator color (light gray)
    separatorColor: "#e5e7eb",
  },
  dark: {
    // Primary brand colors
    primary: "#ef4444",
    primaryDark: "#dc2626",
    primaryDarker: "#b91c1c",
    primaryLight: "#fee2e2",
    primaryExtraLight: "#fef2f2",

    // Background colors
    backgroundColor: "#1f1f1f",
    headerBackgroundColor: "#262626",

    // Tab bar background
    tabBarBackgroundColor: "#262626",

    // Card colors
    cardBackgroundColor: "#2f2f2f",
    cardBorderColor: "#3d3d3d",

    // Text colors
    primaryText: "#ffffff",
    secondaryText: "#d1d5db",
    mutedText: "#9ca3af",

    // Status colors
    airingStatus: "#06b6d4",
    finishedStatus: "#6b7280",

    // Interactive colors
    success: "#22c55e",
    warning: "#fbbf24",
    error: "#ef4444",

    // Separator color (dark gray)
    separatorColor: "#3d3d3d",
  },
} as const;

export type ThemeKey = keyof typeof themes; // "light" | "dark"
export type Theme = (typeof themes)[ThemeKey]; // Both themes share the same structure

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
