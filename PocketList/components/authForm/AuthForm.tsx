import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
} from "react-native";
import { Controller } from "react-hook-form";
import { Link } from "expo-router";
import { formStyles } from "./styles";
import { globalStyles } from "@/constants/GlobalStyles";
import * as CustmoSvgs from "../svgs/Svgs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const nameRegex = /^(?!.*\s{2,})([a-zA-Z]+(?:\s[a-zA-Z]+)*){1,16}$/;

export default function AuthForm(props: any) {
  const styles = formStyles(props.colors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [inputDisplay, setInputDisplay] = useState([]);

  useEffect(() => {
    let updatedInputs;

    const loginInputs = [
      {
        svg: (
          <CustmoSvgs.Email classname={styles.svg} color={props.colors.n400} />
        ),
        name: "email",
        placeholder: "Ex. pocketList@email.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
        textContentType: "emailAddress",
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
          <CustmoSvgs.Lock classname={styles.svg} color={props.colors.n400} />
        ),
        name: "password",
        placeholder: "Ex. safePassword123",
        keyboardType: "default",
        autoCapitalize: "none",
        textContentType: "password",
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

    const forgotPasswordInputs = [
      {
        svg: (
          <CustmoSvgs.Email classname={styles.svg} color={props.colors.n400} />
        ),
        name: "email",
        placeholder: "Ex. pocketList@email.com",
        keyboardType: "email-address",
        autoCapitalize: "none",
        textContentType: "emailAddress",
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
        keyboardType: "email-address",
        autoCapitalize: "none",
        textContentType: "emailAddress",
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
          <CustmoSvgs.UserName
            classname={styles.svg}
            color={props.colors.n400}
          />
        ),
        name: "username",
        placeholder: "Ex. joão Silva",
        keyboardType: "default",
        autoCapitalize: "none",
        textContentType: "name",
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
        svg: (
          <CustmoSvgs.Lock classname={styles.svg} color={props.colors.n400} />
        ),
        name: "password",
        placeholder: "Ex. safePassword123",
        keyboardType: "default",
        autoCapitalize: "none",
        textContentType: "password",
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
        svg: (
          <CustmoSvgs.Lock classname={styles.svg} color={props.colors.n400} />
        ),
        name: "confirmPassword",
        placeholder: "Confirmar senha",
        keyboardType: "default",
        autoCapitalize: "none",
        textContentType: "password",
        rules: {
          required: "O campo é obrigatório",
          pattern: {
            value: passwordRegex,
            message:
              "A senha deve ter pelo menos 8 caracteres, incluindo letras e números",
          },
          validate: (value: any, formValues: { password: any }) =>
            value === formValues.password || "As senhas não coincidem",
        },
      },
    ];

    switch (props.formType) {
      case "Login":
        updatedInputs = loginInputs;
        break;
      case "Register":
        updatedInputs = registerInputs;
        break;
      default:
        updatedInputs = forgotPasswordInputs;
        break;
    }

    setInputDisplay(updatedInputs as any);
  }, [props.formType]);

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
          : props.formType === "Validate"
          ? "Verificar Email"
          : "Esqueceu a senha?"}
      </Text>

      {props.formType === "ForgotPassword" ? (
        <Text style={[globalStyles.text, styles.subtitle]}>
          Por vezes acontece! Por favor insira o endereço de email associado a
          sua conta.
        </Text>
      ) : null}

      {(
        inputDisplay as {
          svg: React.ReactNode;
          name: string;
          rules: object;
          placeholder: string;
          keyboardType: KeyboardTypeOptions | undefined;
          autoCapitalize: "none" | "words" | "sentences" | "characters";
          textContentType: "none" | "name" | "password" | "URL" | "addressCity" | "addressCityAndState" | "addressState" | "countryName" | "creditCardNumber" | "creditCardExpiration" | "creditCardExpirationMonth" | "creditCardExpirationYear" | "creditCardSecurityCode" | "creditCardType" | "creditCardName" | "creditCardGivenName" | "creditCardMiddleName" | "creditCardFamilyName" | "emailAddress" | "familyName" | "fullStreetAddress" | "givenName" | "jobTitle" | "location" | "middleName" | "namePrefix" | "nameSuffix" | "nickname" | "organizationName" | "postalCode" | "streetAddressLine1" | "streetAddressLine2" | "sublocality" | "telephoneNumber" | "username" | "newPassword" | "oneTimeCode" | "birthdate" | "birthdateDay" | "birthdateMonth" | "birthdateYear" | "cellularEID" | "cellularIMEI" | "dateTime" | "flightNumber" | "shipmentTrackingNumber" | undefined;
        }[]
      ).map((input, index) => (
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
                keyboardType={input.keyboardType}
                autoCapitalize={input.autoCapitalize}
                textContentType={input.textContentType}
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
          href="/screens/forgotpassword"
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
          <Link style={[globalStyles.text, styles.link]} href="/screens/login">
            Termos de serviço
          </Link>{" "}
          e{" "}
          <Link style={[globalStyles.text, styles.link]} href="/screens/login">
            Politica de privacidade
          </Link>
        </Text>
      ) : null}

      <Pressable
        onPress={props.handleSubmit}
        style={styles.button}
        disabled={props.isLoading}
      >
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
