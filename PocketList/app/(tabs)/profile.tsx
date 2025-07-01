import { useState } from "react";
import { useColorScheme, View, Text } from "react-native";

// Styles
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/GlobalStyles";
import { homeStyles } from "@/src/styles/home/styles";

// Services
import { getUserData } from "@/services/userService";

// Components

export default function Profile() {
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = homeStyles(colors);

  const [userData, setUserData] = useState(getUserData());

  return (
    <>
      <View style={styles.container}>
        <Text style={[globalStyles.text, styles.title]}>
          Hello {userData?.displayName} 4
        </Text>
      </View>
    </>
  );
}
