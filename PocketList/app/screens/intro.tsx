import React from "react";
import {
  useColorScheme,
  Dimensions,
  Animated,
  Text,
  View,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { globalStyles } from "@/constants/GlobalStyles";
import { Colors } from "@/constants/Colors";
import { introStyles } from "@/src/styles/intro/styles";

export default function Intro() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = introStyles(colors);

  let [index, setIndex] = React.useState(0);
  let display = [
    {
      title: "Compras fáceis",
      subtitle: "Listas simples, rápidas e acessíveis em qualquer lugar.",
      image: require("@/assets/images/basket.png"),
    },
    {
      title: "Desejos mais perto",
      subtitle: "Guarde os seus desejos e realize os seus sonhos.",
      image: require("@/assets/images/shopbag.png"),
    },
    {
      title: "Receitas à mão",
      subtitle: "Encontre a receita perfeita para cada ocasião.",
      image: require("@/assets/images/pan.png"),
    },
  ];

  const indicators = React.useMemo(() => {
    return [
      new Animated.Value(8),
      new Animated.Value(8),
      new Animated.Value(8),
    ];
  }, []);

  React.useEffect(() => {
    indicators.forEach((anim, idx) => {
      Animated.timing(anim, {
        toValue: idx === index ? 14 : 8,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  }, [index, indicators]);

  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [index, scaleAnim]);

  const handleNext = () => {
    if (index === display.length - 1) {
      router.replace("/screens/login");
      return;
    }

    setIndex((prevIndex) => (prevIndex + 1) % display.length);
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          globalStyles.text,
          styles.title,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {display[index].title}
      </Animated.Text>
      <Animated.Text
        style={[
          globalStyles.text,
          styles.subtitle,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {display[index].subtitle}
      </Animated.Text>

      <Animated.Image
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
        source={display[index].image}
        resizeMode="contain"
        accessibilityLabel={display[index].title}
        accessibilityHint={display[index].subtitle}
        accessibilityRole="image"
      />

      <Pressable style={styles.nextButton} onPress={handleNext}>
        <Text style={[globalStyles.text, styles.btnText]}>Seguinte</Text>
      </Pressable>

      <View style={styles.indicatorContainer}>
        {indicators.map((anim, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.indicator,
              { width: anim },
              idx === index ? { backgroundColor: colors.p400 } : {},
            ]}
          />
        ))}

        <Link
          style={[globalStyles.text, styles.link]}
          href="/screens/login"
        >
          Saltar
        </Link>
      </View>

      <WaveSvg styles={styles} colors={colors} />
      <BlobSvg styles={styles} />
    </View>
  );
}

function WaveSvg(props: any) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <Svg
      width="100%"
      height={(318 / 393) * screenWidth}
      viewBox="0 0 393 318"
      style={props.styles.wave}
    >
      <Path
        d="M-82 56.3548C0.250572 32.3938 82.4994 8.43456 164.75 28.1782C247.001 47.9202 329.249 111.367 411.5 128.81C493.751 146.254 575.999 117.692 658.25 88.5578C740.501 59.4219 822.749 29.7118 905 0V318C822.749 318 740.501 318 658.25 318C575.999 318 493.751 318 411.5 318C329.249 318 247.001 318 164.75 318C82.4994 318 0.250572 318 -82 318V56.3548Z"
        fill={props.colors.bg400}
      />
    </Svg>
  );
}

function BlobSvg(props: any) {
  return (
    <Svg
      width="289"
      height="495"
      viewBox="0 0 289 495"
      style={props.styles.blob}
    >
      <Path
        d="M325.579 0.303203C273.854 -0.941089 222.527 34.1137 160.908 64.4531C99.0142 95.0417 27.3762 120.416 7.05252 166.995C-13.2711 213.573 17.9695 281.631 62.751 318.811C107.533 355.991 166.355 362.844 216.328 395.812C266.577 428.531 308.501 487.39 352.612 494.041C396.474 500.417 442.523 454.585 472.234 404.002C501.672 353.668 515.296 298.609 513.96 243.072C512.623 187.535 496.576 131.797 462.753 85.1685C428.655 38.7897 377.055 1.27224 325.579 0.303203Z"
        fill="#004C94"
      />
    </Svg>
  );
}
