import { Tabs, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { House, List, Search, Tv, User } from "lucide-react-native";

export default function TabLayout() {
  // Get the current theme (light or dark) based on system preferences
  const theme = useTheme();

  // Router Instance (For navigation)
  const router = useRouter();

  return (
    <Tabs
      initialRouteName="home" // Set initial route to "index"
      screenOptions={{
        tabBarActiveTintColor: theme.primary, // active tab color
        tabBarInactiveTintColor: "#9ca3af", // inactive tab color

        tabBarShowLabel: true, // tab bar labels
        tabBarStyle: {
          backgroundColor: theme.tabBarBackgroundColor, // tab bar background
          height: 70, // height of tab bar
          position: "absolute", // ensure absolute positioning to overlap content
          paddingBottom: 10, // add bottom padding
          borderTopWidth: 0, // remove default border (removes the white line)
          marginHorizontal: 0, // remove horizontal margin
          marginTop: 0, // remove top margin
          paddingTop: 5, // add top padding
          overflow: "hidden", // hide tab bar overflow "overflow is the content that is outside the tab bar"
        },
        headerRight: () => {
          return (
            <Search
              size={24}
              color={theme.primary}
              style={{ marginRight: 15 }}
              onPress={() => {
                router.push("/anime/search");
              }}
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: "Mugen", // Set a custom title for the header
          headerTitleStyle: {
            fontWeight: "bold",
          }, // Header title style
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // Header background
          },
          headerTintColor: theme.primary, // Header text & back button color
          headerShadowVisible: false, // Remove header shadow
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerTitle: "Explore", // Set a custom title for the header
          headerTitleStyle: {
            fontWeight: "bold",
          }, // Header title style
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTintColor: theme.primary, // Header text & back button color
          headerShadowVisible: false, // Remove header shadow
          tabBarIcon: ({ color }) => <Tv size={28} color={color} />, // Tab icon
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          headerTitle: "My List",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTintColor: theme.primary, // Header text & back button color
          headerShadowVisible: false, // Remove header shadow
          tabBarIcon: ({ color }) => <List size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "Profile",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTintColor: theme.primary, // Header text & back button color
          headerShadowVisible: false, // Remove header shadow
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
