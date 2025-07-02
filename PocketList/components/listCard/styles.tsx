import { StyleSheet } from "react-native";

export const listCardStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bg400,
      width: "100%",
      height: 90,
      padding: 10,
      borderRadius: 10,
      boxShadow: colors.shadow100,
    },
  });
