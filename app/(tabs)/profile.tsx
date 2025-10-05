import UserChangePassword from "@/components/UserChangePassword";
import UserProfile from "@/components/UserProfile";
import { userData } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  // Get the theme colors
  const theme = useTheme();

  // State to hold user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic styles based on the theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.backgroundColor,
    },
  });

  useEffect(() => {
    // TODO: Get the user data from context
    setUser(userData);

    //
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* User Profile Card */}
      <UserProfile username={user?.username!} email={user?.email!} />

      {/* Change Password Card */}
      <UserChangePassword />
      {/* Logout Button */}
    </View>
  );
}
