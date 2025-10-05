import Button from "@/components/Button";
import UserChangePassword from "@/components/UserChangePassword";
import UserProfile from "@/components/UserProfile";
import { userData } from "@/constants/dummyData";
import { useTheme } from "@/hooks/use-theme";
import { User } from "@/types/User";
import { LogOutIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  // Get the theme colors
  const theme = useTheme();

  // State to hold user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic styles based on the theme
  const styles = StyleSheet.create({
    safeViewContainer: {
      flex: 1, // Full height
      backgroundColor: theme.backgroundColor, // Theme background color
    },
    container: {
      paddingHorizontal: 16,
    },
  });

  useEffect(() => {
    // TODO: Get the user data from context
    setUser(userData);

    //
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeViewContainer} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <UserProfile username={user?.username!} email={user?.email!} />

        {/* Change Password Card */}
        <UserChangePassword />

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={() => {}}
          variant="danger"
          icon={<LogOutIcon color={theme.primaryText} />}
          iconPosition="left"
          // style={{ marginBottom: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
