import { StyleSheet } from "react-native";

export const registerStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "relative",
      top: 0,
      left: 0,
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.bg400,
      paddingTop: "78%",
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
    arrowContainer: {
      position: "absolute",
      top: "10%",
      left: "5%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    arrow: {
      width: 30,
      height: 30,
      zIndex: 1,
    },
    linkText: {
      color: colors.n400,
      fontSize: 14,
      marginTop: 30,
    },
    link: {
      color: colors.p200,
      fontSize: 14,
    },
  });
