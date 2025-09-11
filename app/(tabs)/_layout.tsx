import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home" // Set initial route to "index"
      screenOptions={{
        tabBarActiveTintColor: "green", // active tab color
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
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
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
