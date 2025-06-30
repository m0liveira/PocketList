import { useEffect, useRef, useState } from "react";
import { Text, View, Animated } from "react-native";
import { loadingStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";

const phrases = [
  "A criar o teu cantinho...",
  "A preparar o teu espaço...",
  "A registar-te nos nossos livros mágicos...",
  "A organizar a papelada digital...",
  "Quase lá...",
];

export default function Loading(props: any) {
  const styles = loadingStyles(props.colors);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/images/mascot.png")}
        resizeMode="contain"
        accessibilityLabel={"PocketList Mascot"}
        accessibilityHint={"A friendly mascot representing PocketList"}
        accessibilityRole="image"
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
      />
      <Text style={[globalStyles.text, styles.text]}>
        {phrases[phraseIndex]}
      </Text>
    </View>
  );
}
