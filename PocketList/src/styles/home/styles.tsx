import { StyleSheet } from "react-native";

export const homeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      marginBottom: 30,
    },
  });
