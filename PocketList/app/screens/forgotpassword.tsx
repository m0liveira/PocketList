import { useState } from "react";
import { useColorScheme, View, Image, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { forgotPasswordStyles } from "@/src/styles/forgotPassword/styles";
import AuthForm from "../../components/authForm/AuthForm";
import * as CustomSvgs from "../../components/svgs/Svgs";

export default function ForgotPassword() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = forgotPasswordStyles(colors);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

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
        formType="ForgotPassword"
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </View>
  );
}
