import { useState } from "react";
import {
  useColorScheme,
  View,
  Image,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { useRouter, Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { registerStyles } from "@/src/styles/signup/styles";
import { globalStyles } from "@/constants/GlobalStyles";
import { registerUser } from "@/services/firebaseService";
import AuthForm from "../../components/authForm/AuthForm";
import Loading from "@/components/loading/loading";
import ValidateEmail from "@/components/validateEmail/validateEmail";
import * as CustomSvgs from "../../components/svgs/Svgs";

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
    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const passwordValue = watch("password");

  const confirmPasswordRules = {
    required: "O campo é obrigatório",
    validate: (value: any) =>
      value === passwordValue || "As senhas não coincidem",
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const result = await registerUser(data);

      router.push("/screens/login");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <CustomSvgs.Wave classname={styles.wave} color={colors.p400} />

        <Pressable onPress={() => router.back()} style={styles.arrowContainer}>
          <CustomSvgs.BackArrow
            classname={styles.arrow}
            color={colors.text_l}
          />
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
          isLoading={isLoading}
        />

        <Text style={[globalStyles.text, styles.linkText]}>
          Já está no PocketList?{" "}
          <Link href="/screens/login" style={[globalStyles.text, styles.link]}>
            Entrar
          </Link>
        </Text>
      </View>

      {isLoading ? <Loading colors={colors} /> : null}

      <ValidateEmail colors={colors} />
    </>
  );
}
