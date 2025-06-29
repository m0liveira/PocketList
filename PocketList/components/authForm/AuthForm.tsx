import { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { Link } from "expo-router";
import { formStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";
import * as CustmoSvgs from "../svgs/Svgs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const nameRegex = /^[a-zA-Z\s]{1,16}$/;

export default function AuthForm(props: any) {
  const styles = formStyles(props.colors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const ForgotPasswordInputs = [
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
  ];
  const registerInputs = [
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
      svg: (
        <CustmoSvgs.UserName classname={styles.svg} color={props.colors.n400} />
      ),
      name: "username",
      placeholder: "Ex. joão Silva",
      rules: {
        required: "O campo é obrigatório",
        pattern: {
          value: nameRegex,
          message:
            "O nome deve ter no máximo 16 caracteres, inclui apenas letras e espaços",
        },
      },
    },
    {
      svg: <CustmoSvgs.Lock classname={styles.svg} color={props.colors.n400} />,
      name: "password",
      placeholder: "Ex. safePassword123",
      rules: {
        required: "O campo é obrigatório",
        pattern: {
          value: passwordRegex,
          message:
            "A senha deve ter pelo menos 8 caracteres, incluindo letras e números",
        },
      },
    },
    {
      svg: <CustmoSvgs.Lock classname={styles.svg} color={props.colors.n400} />,
      name: "confirmPassword",
      placeholder: "Confirmar senha",
      rules: {
        required: "O campo é obrigatório",
        pattern: {
          value: passwordRegex,
          message:
            "A senha deve ter pelo menos 8 caracteres, incluindo letras e números",
        },
      },
    },
  ];
  const [inputDisplay, setInputDisplay] = useState(loginInputs);

  useEffect(() => {
    switch (props.formType) {
      case "ForgotPassword":
        setInputDisplay(ForgotPasswordInputs);
        break;
      case "Register":
        setInputDisplay(registerInputs);
        break;
      default:
        setInputDisplay(loginInputs);
        break;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={[
          globalStyles.text,
          styles.title,
          props.formType === "ForgotPassword"
            ? styles.titleForgotPassword
            : null,
        ]}
      >
        {props.formType === "Login"
          ? "Entrar"
          : props.formType === "Register"
          ? "Registar"
          : "Esqueceu a senha?"}
      </Text>

      {props.formType === "ForgotPassword" ? (
        <Text style={[globalStyles.text, styles.subtitle]}>
          Por vezes acontece! Por favor insira o endereço de email associado a
          sua conta.
        </Text>
      ) : null}

      {inputDisplay.map((input, index) => (
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
                secureTextEntry={
                  input.name === "password"
                    ? !showPassword
                    : input.name === "confirmPassword"
                    ? !showConfirmPassword
                    : false
                }
              />
            )}
          />

          {input.name === "password" || input.name === "confirmPassword" ? (
            <Pressable
              style={styles.svgContainer}
              onPress={() =>
                input.name === "password"
                  ? setShowPassword(!showPassword)
                  : setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {input.name === "password" ? (
                showPassword ? (
                  <CustmoSvgs.Eye
                    classname={styles.svg}
                    color={props.colors.n400}
                  />
                ) : (
                  <CustmoSvgs.EyeOff
                    classname={styles.svg}
                    color={props.colors.n400}
                  />
                )
              ) : showConfirmPassword ? (
                <CustmoSvgs.Eye
                  classname={styles.svg}
                  color={props.colors.n400}
                />
              ) : (
                <CustmoSvgs.EyeOff
                  classname={styles.svg}
                  color={props.colors.n400}
                />
              )}
            </Pressable>
          ) : null}

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
          href="/screens/auth/forgotPassword/forgotpassword"
        >
          Esqueceu a senha?
        </Link>
      ) : props.formType === "Register" ? (
        <Text
          style={[
            globalStyles.text,
            styles.link,
            { color: props.colors.n400, width: "100%", marginLeft: 0 },
          ]}
        >
          Ao registar, está a concordar com os nossos{" "}
          <Link
            style={[globalStyles.text, styles.link]}
            href="/screens/auth/login/login"
          >
            Termos de serviço
          </Link>{" "}
          e{" "}
          <Link
            style={[globalStyles.text, styles.link]}
            href="/screens/auth/login/login"
          >
            Politica de privacidade
          </Link>
        </Text>
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
