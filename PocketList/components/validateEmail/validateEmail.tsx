import { useState } from "react";
import { View, Image, Alert, Text } from "react-native";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { validateStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";
import AuthForm from "../../components/authForm/AuthForm";
import * as CustomSvgs from "../../components/svgs/Svgs";
import { emailVerification } from "@/services/firebaseService";

export default function ValidateEmail(props: any) {
  const styles = validateStyles(props.colors);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleReSendEmail = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      await emailVerification(props.user);
      setIsLoading(false);
      Alert.alert(
        "Email enviado com sucesso!",
        "Verifique seu correio eletrônico!"
      );
    } catch (error) {
      Alert.alert(
        "Erro ao enviar o email! Tente novamente mais tarde.",
        (error as Error).message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomSvgs.Wave classname={styles.wave} color={props.colors.p400} />

      <Image
        style={styles.image}
        source={require("@/assets/images/mascot.png")}
        resizeMode="contain"
        accessibilityLabel={"PocketList Mascot"}
        accessibilityHint={"A friendly mascot representing PocketList"}
        accessibilityRole="image"
      />

      <Text style={[globalStyles.text, styles.title]}>Verificar Email</Text>

      <Text style={[globalStyles.text, styles.subtitle]}>
        Foi enviado um email de verificação para
      </Text>

      <Text style={[globalStyles.text, styles.span]}>
        {props.email || "erro"}
      </Text>

      <Text style={[globalStyles.text, styles.subtitle]}>
        Para concluir o registo da sua conta, verifique o seu email.
      </Text>

      <Text style={[globalStyles.text, styles.subtitle, styles.subtitle2]}>
        Não recebeu o email?{" "}
        <Text
          style={[globalStyles.text, styles.subtitle, styles.link]}
          onPress={handleReSendEmail}
        >
          Re-enviar email
        </Text>
        {"\n"}
        {"\n"}
        Email errado? Lamentamos, mas terá de criar uma nova conta.
      </Text>

      <Link href={"screens/login"} style={[globalStyles.text, styles.linkBtn]}>
        Voltar para o login
      </Link>
    </View>
  );
}
