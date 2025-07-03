import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Animated,
  Easing,
} from "react-native";

// Styles
import { globalStyles } from "@/constants/GlobalStyles";
import { actionSheetStyles } from "./styles";

// Services

const { height } = Dimensions.get("window");

export default function ActionSheet(props: any) {
  const translateY = useRef(new Animated.Value(height)).current;
  const styles = actionSheetStyles(props.colors);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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

  if (!props.visible) return null;

  return (
    <Pressable style={styles.overlay} onPress={props.onClose}>
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: props.colors.bg200,
            transform: [{ translateY }],
          },
        ]}
      >
        {!isEditing && !isDeleting ? (
          <>
            <Text style={[globalStyles.text, styles.title]}>
              {props.listName}
            </Text>

            {props.options.map((option: any, index: any) => (
              <Pressable
                key={index}
                style={styles.option}
                onPress={() => {
                  if (option.edit === true) {
                    setIsEditing(true);
                    // props.onEdit();
                  } else {
                    setIsDeleting(true);
                    // props.onDelete();
                  }
                }}
              >
                <Text
                  style={[
                    globalStyles.text,
                    styles.optionText,
                    {
                      color: option.destructive
                        ? props.colors.danger
                        : option.edit
                        ? props.colors.p300
                        : props.colors.text,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
            <Pressable style={styles.option} onPress={props.onClose}>
              <Text style={[globalStyles.text, styles.optionText]}>Fechar</Text>
            </Pressable>
          </>
        ) : isEditing ? (
          <View>
            <Text
              style={[globalStyles.text, styles.back]}
              onPress={() => setIsEditing(false)}
            >
              Voltar
            </Text>
          </View>
        ) : isDeleting ? (
          <View>
            <Text
              style={[globalStyles.text, styles.back]}
              onPress={() => setIsDeleting(false)}
            >
              Voltar
            </Text>

            <Text style={[globalStyles.text, styles.text]}>
              {props.deleteText}
            </Text>

            <View style={styles.btnContainer}>
              <Pressable
                style={[styles.btn]}
                onPress={() => setIsDeleting(false)}
              >
                <Text style={[globalStyles.text, styles.btnLabel]}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                style={[styles.btn, { backgroundColor: props.colors.danger }]}
                onPress={() => {
                  props.onDelete();
                  props.onClose();
                }}
              >
                <Text
                  style={[
                    globalStyles.text,
                    styles.btnLabel,
                    { color: "white" },
                  ]}
                >
                  {props.collaborators > 1 ? "Sair" : "Eliminar"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}
