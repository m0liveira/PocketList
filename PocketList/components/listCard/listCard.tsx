import { useColorScheme, View, Text, ScrollView } from "react-native";

// Styles
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/constants/GlobalStyles";
import { listCardStyles } from "@/components/listCard/styles";

// Services

// Components
import * as Svgs from "@/components/svgs/Svgs";

export default function ListCard() {
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = listCardStyles(colors);

  return (
    <>
      <View style={styles.container}>
        
      </View>
    </>
  );
}
