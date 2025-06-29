import { useState } from "react";
import { useColorScheme, Text, View, Image, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { globalStyles } from "@/constants/GlobalStyles";
import { Colors } from "@/constants/Colors";
import { loginStyles } from "@/src/styles/login/styles";
import AuthForm from "../../components/authForm/AuthForm";
import * as CustomSvgs from "../../components/svgs/Svgs";

const loginMethods = [
  {
    id: 1,
    name: "Google",
    src: require("@/assets/images/google.png"),
  },
  {
    id: 2,
    name: "Facebook",
    src: require("@/assets/images/facebook.png"),
  },
];

export default function Login() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors.light;
  // const colors = Colors[colorScheme ?? "light"];
  const styles = loginStyles(colors);

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
        formType="Login"
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <View style={styles.separator}>
        <View style={styles.line}></View>
        <Text style={[globalStyles.text, styles.separatorText]}>ou</Text>
      </View>

      <View style={styles.methodsContainer}>
        {loginMethods.map((method) => (
          <Pressable key={method.id} style={styles.methodBtn}>
            <Image
              source={method.src}
              style={styles.methodBtnIcon}
              resizeMode="contain"
              accessibilityLabel={`${method.name} logo`}
              accessibilityHint={`Sign in with ${method.name}`}
              accessibilityRole="image"
            />
            <Text style={[globalStyles.text, styles.methodBtnText]}>
              {method.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[globalStyles.text, styles.linkText]}>
        Novo no PocketList?{" "}
        <Link
          href="/screens/signup"
          style={[globalStyles.text, styles.link]}
        >
          Registe-se aqui
        </Link>
      </Text>
    </View>
  );
}
