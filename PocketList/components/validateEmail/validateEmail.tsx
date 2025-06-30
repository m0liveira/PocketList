import { Text, View, Image } from "react-native";
import { validateStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";

export default function ValidateEmail(props: any) {
  const styles = validateStyles(props.colors);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/mascot.png")}
        resizeMode="contain"
        accessibilityLabel={"PocketList Mascot"}
        accessibilityHint={"A friendly mascot representing PocketList"}
        accessibilityRole="image"
        style={styles.image}
      />
      <Text style={[globalStyles.text, styles.text]}>
        
      </Text>
    </View>
  );
}
