import { useState } from "react";
import { useColorScheme, View, Image, Pressable, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";

// Styles
import { Colors } from "@/constants/Colors";
import { forgotPasswordStyles } from "@/src/styles/forgotPassword/styles";

// Services
import { resetPassword } from "@/services/firebaseService";

// Components
import AuthForm from "../../components/authForm/AuthForm";
import * as CustomSvgs from "../../components/svgs/Svgs";
import Loading from "@/components/loading/loading";

const phrases = [
  "A abrir as portas do PocketList...",
  "A conectar-te ao mundo mágico das listas...",
  "A guardar os teus segredos digitais...",
  "A preparar o teu espaço pessoal...",
  "A alinhar as estrelas do PocketList...",
  "A dar vida às tuas ideias...",
  "A organizar o teu universo digital...",
  "A desbloquear o teu cantinho especial...",
  "A preparar as surpresas do PocketList...",
  "A criar ligações mágicas...",
];

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
    setError,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);

      setIsLoading(false);
      Alert.alert(
        "Email enviado",
        `Um email de recuperação foi enviado para ${data.email}.`
      );
      router.replace("screens/login");
    } catch (error: any) {
      const message = "Não foi possível enviar o email";
      setError(data.email, { type: "manual", message });
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
          formType="ForgotPassword"
          control={control}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>

      {isLoading ? <Loading colors={colors} phrases={phrases} /> : null}
    </>
  );
}
