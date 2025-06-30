import { StyleSheet } from "react-native";

export const validateStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 70,
      backgroundColor: colors.p600,
      width: "100%",
      height: "100%",
      zIndex: 2,
    },
    image: {
      height: "25%",
      aspectRatio: 1,
    },
    text: {
      color: colors.text_l,
      fontSize: 24,
      textAlign: "center",
      width: "80%",
    },
  });
