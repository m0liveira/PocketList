import { useState, useEffect } from "react";
import {
  useColorScheme,
  Text,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

// Styles
import { globalStyles } from "@/constants/GlobalStyles";
import { Colors } from "@/constants/Colors";
import { loginStyles } from "@/src/styles/login/styles";

// Services
import { loginUser, signInWithGoogle } from "@/services/firebaseService";
import { setUserData, getUserData } from "@/services/userService";

// Components
import AuthForm from "../../components/authForm/AuthForm";
import Loading from "@/components/loading/loading";
import ValidateEmail from "@/components/validateEmail/validateEmail";
import * as CustomSvgs from "../../components/svgs/Svgs";

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
    watch,
    setError,
  } = useForm();

  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const emailValue = watch("email");

  // # FIXME - Google auth
  // const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  // const redirectUri = "https://auth.expo.io/@moliveiraa/PocketList";

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId:
  //     "1099106249725-umpk4vp5mgjjv3cu4ushocnmn31nmjhm.apps.googleusercontent.com",
  //   redirectUri,
  // });

  const loginMethods = [
    {
      id: 1,
      name: "Google",
      src: require("@/assets/images/google.png"),
      signin: async () => {
        // if (request) {
        //   await promptAsync();
        // }
      },
    },
    {
      id: 2,
      name: "Facebook",
      src: require("@/assets/images/facebook.png"),
      signin: () => console.log("redirect new: "),
    },
  ];

  // useEffect(() => {
  //   const handleGoogleSignIn = async () => {
  //     if (response?.type === "success") {
  //       const { id_token } = response.params;

  //       try {
  //         const result = await signInWithGoogle(id_token);
  //         console.log("Firebase sign-in success:", result);
  //         // Maybe navigate or update state here
  //       } catch (error: any) {
  //         console.error("Firebase sign-in error:", error);
  //         Alert.alert("Erro no login", error.message || "Erro desconhecido");
  //       }
  //     }
  //   };

  //   handleGoogleSignIn();
  // }, [response]);

  const handleValidating = () => {
    setIsValidating(!isValidating);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const result = await loginUser(data.email, data.password);

      if ("verified" in result) {
        setUser(result.user as any);
        setIsValidating(true);
        setIsLoading(false);
        return;
      }

      setUserData(result);
      setIsLoading(false);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      const genericMessage = "Credenciais inválidas.";

      switch (error.code) {
        case "auth/user-not-found":
          break;
        case "auth/invalid-email":
          break;
        case "auth/wrong-password":
          break;
        case "auth/invalid-credential":
          setError("email", { type: "manual", message: genericMessage });
          setError("password", { type: "manual", message: genericMessage });
          break;

        default:
          Alert.alert("Erro no login", error.message || "Erro desconhecido");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isValidating ? (
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
              <Pressable
                key={method.id}
                style={styles.methodBtn}
                onPress={method.signin}
              >
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
      ) : null}

      {isLoading ? <Loading colors={colors} phrases={phrases} /> : null}

      {isValidating ? (
        <ValidateEmail
          colors={colors}
          email={emailValue}
          user={user}
          validating={handleValidating}
        />
      ) : null}
    </>
  );
}
