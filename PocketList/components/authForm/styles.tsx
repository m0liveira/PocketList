import { StyleSheet } from "react-native";

export const formStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      display: "flex",
      width: "85%",
    },
    title: {
      color: colors.text,
      fontSize: 26,
      marginBottom: 30,
    },
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
      height: 70,
      marginBottom: 5,
    },
    svg: {
      width: 23,
      height: 23,
    },
    input: {
      color: colors.text,
      borderBottomWidth: 1,
      borderColor: colors.n400,
      fontSize: 14,
      width: "90%",
      paddingRight: 25,
    },
    inputError: { borderColor: colors.danger, color: colors.danger },
    error: {
      color: colors.danger,
      width: "100%",
      fontSize: 10,
      marginLeft: 32,
      marginTop: 10,
    },
    link: {
      color: colors.p200,
      fontSize: 12,
      width: "100%",
      textAlign: "right",
      marginTop: -5,
    },
    button: {
      marginTop: 30,
      backgroundColor: colors.p400,
      width: "100%",
      paddingVertical: 15,
      borderRadius: 100,
      boxShadow: colors.shadow,
    },
    btnText: {
      color: colors.text_l,
      textAlign: "center",
      fontSize: 18,
    },
  });
