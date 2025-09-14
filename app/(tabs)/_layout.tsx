import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { House, List, Search, Tv, User } from "lucide-react-native";

export default function TabLayout() {
  // Get the current theme (light or dark) based on system preferences
  const theme = useTheme();

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
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTitle: "Mugen", // Set a custom title for the header
          headerTintColor: theme.primary, // text & back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
          headerRight: () => (
            <Search
              size={28}
              color={theme.primary}
              style={{ marginRight: 15 }}
              onPress={() => alert("Search button pressed")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTitle: "Explore Anime", // Set a custom title for the header
          headerTintColor: theme.primary, // text & back button color
          headerTitleStyle: {
            fontWeight: "bold",
          }, // Make the header title bold
          tabBarIcon: ({ color }) => <Tv size={28} color={color} />, // Tab icon
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTintColor: theme.primary, // text & back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color }) => <List size={28} color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: theme.headerBackgroundColor, // header background
          },
          headerTintColor: theme.primary, // text & back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
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
