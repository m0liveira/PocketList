import { StyleSheet } from "react-native";

export const homeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "relative",
      top: 0,
      left: 0,
      flex: 1,
      backgroundColor: colors.bg200,
      paddingTop: "13%",
      paddingHorizontal: "5%",
      paddingBottom: "15%",
    },
    scrollContainer: {
      justifyContent: "flex-start",
    },
    header: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    pageTitle: {
      fontSize: 20,
      color: colors.text,
      marginTop: -5,
    },
    svg: {
      objectFit: "contain",
      aspectRatio: 1 / 1,
      height: 27,
    },
    hasNotification: {
      position: "absolute",
      top: -2,
      right: 3,
      backgroundColor: colors.danger,
      borderRadius: 100,
      width: 10,
      height: 10,
    },
    title: {
      fontSize: 14,
      color: colors.n200,
      marginTop: 20,
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 5,
      backgroundColor: colors.p400,
      boxShadow: colors.shadow,
      borderRadius: 100,
      width: "100%",
      paddingVertical: 15,
      marginTop: 100,
    },
    btnText: {
      color: "hsl(0, 0%, 96%)",
      fontSize: 14,
    },
  });
