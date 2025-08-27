import { View, Text, Pressable, Dimensions } from "react-native";
import { router } from "expo-router";

// Styles
import { globalStyles } from "@/constants/GlobalStyles";
import { listHeaderStyles } from "@/components/listHeader/styles";

// Services

// Components
import * as Svgs from "@/components/svgs/Svgs";

export default function ListHeader(props: any) {
  const styles = listHeaderStyles(props.colors);
  const screenWidth = Dimensions.get("window").width;

  const itemsBought = props.list.items.filter(
    (item: any) => item.acquired === true
  );

  const progress = (screenWidth / props.list.items.length) * itemsBought.length;

  return (
    <View style={[styles.nav, props.style]}>
      <View
        style={[
          styles.progress,
          { width: progress },
          progress === screenWidth
            ? { borderEndEndRadius: 0, borderTopEndRadius: 0 }
            : null,
        ]}
      ></View>

      <View style={styles.titleContainer}>
        <Pressable onPress={() => router.back()}>
          <Svgs.BackArrow classname={styles.svg} color={props.colors.text} />
        </Pressable>

        <Text style={[globalStyles.text, styles.title]}>{props.list.name}</Text>
      </View>

      <View style={styles.actions}>
        <Svgs.Share classname={styles.svg} color={props.colors.text} />
        <Svgs.More classname={styles.svgBigger} color={props.colors.text} />
      </View>
    </View>
  );
}
