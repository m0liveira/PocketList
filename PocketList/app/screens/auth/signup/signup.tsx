import {
  useColorScheme,
  View,
  Image,
  Pressable,
  Text
} from "react-native";
import { useForm } from "react-hook-form";
import { useRouter, Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { registerStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";
import AuthForm from "../../../../components/authForm/AuthForm";
import * as CustomSvgs from "../../../../components/svgs/Svgs";

export default function Signup() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = registerStyles(colors);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <View style={styles.container}>
      <CustomSvgs.Wave classname={styles.wave} color={colors.p400} />

      <Pressable onPress={() => router.back()} style={styles.arrowContainer}>
        <CustomSvgs.BackArrow classname={styles.arrow} color={colors.text_l} />
      </Pressable>

      <Image
        style={styles.image}
        source={require("@/assets/images/mascot.png")}
        resizeMode="contain"
        accessibilityLabel={"PocketList Mascot"}
        accessibilityHint={"A friendly mascot representing PocketList"}
        accessibilityRole="image"
      />

      <AuthForm
        colors={colors}
        formType="Register"
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
      />

      <Text style={[globalStyles.text, styles.linkText]}>
        Já está no PocketList?{" "}
        <Link
          href="/screens/auth/login/login"
          style={[globalStyles.text, styles.link]}
        >
          Entrar
        </Link>
      </Text>
    </View>
  );
}
