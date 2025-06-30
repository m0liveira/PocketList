import { StyleSheet } from "react-native";

export const validateStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.bg400,
      width: "100%",
      height: "100%",
      zIndex: 2,
      paddingTop: "82%",
    },
    wave: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      transform: [{ rotate: "180deg" }, { scaleX: -1 }],
      zIndex: 0,
    },
    image: {
      position: "absolute",
      top: "10%",
      aspectRatio: 1 / 1,
      zIndex: 1,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      marginBottom: 30,
      width: "85%",
    },
    subtitle: {
      color: colors.n400,
      fontSize: 16,
      marginBottom: 20,
      width: "85%",
    },
    subtitle2: {
      marginBottom: 80,
      marginTop: 30,
    },
    span: {
      color: colors.n600,
      fontSize: 18,
      width: "85%",
      textAlign: "center",
      marginBottom: 20,
    },
    link: {
      color: colors.p200,
      textDecorationColor: colors.p200,
      textDecorationLine: "underline",
      fontSize: 16,
    },
    linkBtn: {
      backgroundColor: colors.p400,
      boxShadow: colors.shadow,
      borderRadius: 100,
      color: colors.text_l,
      fontSize: 18,
      textAlign: "center",
      width: "85%",
      paddingVertical: 15,
    },
  });
