import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// Styles
import { globalStyles } from "@/constants/GlobalStyles";
import { listFormStyles } from "./styles";
import { Controller } from "react-hook-form";

// Services
import { getUserData } from "@/services/userService";

// Components
import * as Svgs from "@/components/svgs/Svgs";

const { height } = Dimensions.get("window");

export default function ListForm(props: any) {
  const translateY = useRef(new Animated.Value(height)).current;
  const styles = listFormStyles(props.colors);

  const [dropdownStates, setDropdownStates] = useState<Record<string, any>>({});

  useEffect(() => {
    if (props.item) {
      props.setValue("product", props.item.product);
      props.setValue("quantity", props.item.quantity);
      props.setValue("unit", props.item.unit);
      props.setValue("price", props.item.price);
    } else {
      props.setValue("product", "");
      props.setValue("quantity", "");
      props.setValue("unit", "");
      props.setValue("price", "");
    }

    if (props.visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [props.visible]);

  useEffect(() => {
    const initialDropdownStates: Record<string, any> = {};

    props.inputOptions.forEach((input: any) => {
      if (input.type === "select" && !dropdownStates[input.name]) {
        initialDropdownStates[input.name] = {
          open: false,
          items: input.options.map((opt: any) => ({
            label: opt,
            value: opt,
          })),
        };
      }
    });

    if (Object.keys(initialDropdownStates).length > 0) {
      setDropdownStates((prev) => ({ ...prev, ...initialDropdownStates }));
    }
  }, [props.inputOptions]);

  if (!props.visible) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoiding}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={props.onClose} />

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <Pressable onPress={props.handleSubmit}>
            <Svgs.BackArrow classname={styles.svg} color={props.colors.text} />
          </Pressable>

          {props.inputOptions.map((input: any) => {
            const isSelect = input.type === "select";

            const dropdownState = dropdownStates[input.name];

            return (
              <View
                key={input.name}
                style={[
                  styles.inputContainer,
                  styles[input.size as keyof typeof styles],
                ]}
              >
                <Text
                  style={[
                    styles.label,
                    isSelect && dropdownState ? { zIndex: 9999 } : null,
                  ]}
                >
                  {input.label}
                </Text>

                <Controller
                  control={props.control}
                  name={input.name}
                  rules={{
                    required:
                      input.name === "product"
                        ? "O campo é obrigatório"
                        : false,
                  }}
                  render={({ field: { onChange, value } }) => {
                    if (isSelect && dropdownState) {
                      return (
                        <DropDownPicker
                          open={dropdownState.open}
                          value={value}
                          items={dropdownState.items}
                          setOpen={(open) =>
                            setDropdownStates((prev) => ({
                              ...prev,
                              [input.name]: { ...prev[input.name], open },
                            }))
                          }
                          setValue={(callback) => {
                            const newValue = callback(value);
                            onChange(newValue);
                          }}
                          setItems={(items) =>
                            setDropdownStates((prev) => ({
                              ...prev,
                              [input.name]: { ...prev[input.name], items },
                            }))
                          }
                          placeholder={input.placeholder}
                          style={[styles.input, { paddingHorizontal: 12 }]}
                          dropDownContainerStyle={{
                            borderColor: props.colors.n300,
                            backgroundColor: props.colors.n50,
                          }}
                          textStyle={{
                            color: props.colors.text,
                            fontSize: 14,
                            fontWeight: "700",
                          }}
                          placeholderStyle={{ color: props.colors.n500 }}
                        />
                      );
                    }

                    return (
                      <TextInput
                        style={[
                          styles.input,
                          props.errors["product"] && input.name === "product"
                            ? styles.inputError
                            : null,
                        ]}
                        placeholderTextColor={props.colors.n500}
                        placeholder={input.placeholder}
                        keyboardType={
                          input.type === "number"
                            ? "numeric"
                            : input.type === "currency"
                            ? "decimal-pad"
                            : "default"
                        }
                        value={value}
                        onChangeText={onChange}
                      />
                    );
                  }}
                />
              </View>
            );
          })}

          {props.errors["product"] ? (
            <Text style={[globalStyles.text, styles.error]}>
              {props.errors["product"].message}
            </Text>
          ) : null}

          {props.item?.addedBy === getUserData()?.uid ? (
            <Pressable
              style={styles.deleteContainer}
              onPress={() => props.handleDelete(props.item)}
            >
              <Svgs.Trash classname={styles.svg} color={props.colors.danger} />

              <Text style={[globalStyles.text, styles.deleteText]}>
                Excluir produto
              </Text>
            </Pressable>
          ) : null}
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
