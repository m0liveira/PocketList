import Svg, { Path } from "react-native-svg";
import { useColorScheme, Text, View, TextInput, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { formStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";
import * as CustmoSvgs from "../svgs/Svgs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function AuthForm(props: any) {
  const router = useRouter();
  const styles = formStyles(props.colors);
  const loginInputs = [
    {
      svg: (
        <CustmoSvgs.Email classname={styles.svg} color={props.colors.n400} />
      ),
      name: "email",
      placeholder: "Ex. pocketList@email.com",
      rules: {
        required: "O campo é obrigatório",
        pattern: {
          value: emailRegex,
          message: "O email deve ser válido",
        },
      },
    },
    {
      svg: <CustmoSvgs.Lock classname={styles.svg} color={props.colors.n400} />,
      name: "password",
      placeholder: "Ex. safePassword123",
      rules: {
        required: "O campo senha é obrigatório",
        pattern: {
          value: passwordRegex,
          message:
            "A senha deve ter pelo menos 8 caracteres, incluindo letras e números",
        },
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text, styles.title]}>
        {props.formType === "Login"
          ? "Entrar"
          : props.formType === "Register"
          ? "Registar"
          : "Esqueceu a senha?"}
      </Text>

      {loginInputs.map((input, index) => (
        <View key={index} style={styles.inputContainer}>
          {input.svg}

          <Controller
            control={props.control}
            name={input.name}
            rules={input.rules}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  globalStyles.text,
                  styles.input,
                  props.errors[input.name] ? styles.inputError : null,
                ]}
                placeholder={input.placeholder}
                placeholderTextColor={props.colors.n300}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {props.errors[input.name] ? (
            <Text style={[globalStyles.text, styles.error]}>
              {props.errors[input.name].message}
            </Text>
          ) : null}
        </View>
      ))}

      {props.formType === "Login" ? (
        <Link
          style={[globalStyles.text, styles.link]}
          href="/screens/auth/login/login"
        >
          Esqueceu a senha?
        </Link>
      ) : null}

      <Pressable onPress={props.handleSubmit} style={styles.button}>
        <Text style={[globalStyles.text, styles.btnText]}>
          {props.formType === "Login"
            ? "Entrar"
            : props.formType === "Register"
            ? "Registar"
            : "Enviar"}
        </Text>
      </Pressable>
    </View>
  );
}
