import { Colors } from "@/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme, StyleSheet } from "react-native";

export default function TabLayout() {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home" // Set initial route to "index"
      screenOptions={{
        tabBarActiveTintColor: "#10b981", // active tab color
        tabBarInactiveTintColor: "gray", // inactive tab color

        tabBarShowLabel: true, // tab bar labels
        tabBarStyle: {
          backgroundColor: "#262626ff",
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
            backgroundColor: "#262626", // header background
          },
          headerTintColor: "#10b981", // text & back button color
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerRight: () => (
            <FontAwesome
              name="search"
              size={22}
              color="#10b981"
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
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="fire" color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list" color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
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
  lightContainer: {
    backgroundColor: Colors.light.foreground,
  },
  darkContainer: {
    backgroundColor: "#242c40",
  },
  lightThemeText: {
    color: "#15803d",
  },
  darkThemeText: {
    color: "#ffffff",
  },
});
