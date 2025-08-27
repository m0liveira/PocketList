import { StyleSheet } from "react-native";

export const listStyles = (colors: any) =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: colors.bg200,
    },
    container: {
      position: "relative",
      top: 0,
      left: 0,
      flex: 1,
      // paddingHorizontal: "5%",
    },
    scrollContainer: {
      justifyContent: "flex-start",
      paddingBottom: "40%",
    },
    divider: {
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.bg400,
      boxShadow: colors.shadow200,
      paddingBottom: 10,
      paddingTop: 20,
    },
    line: {
      alignItems: "center",
      justifyContent: "center",
      width: "33%",
      paddingHorizontal: 10,
      gap: 3,
    },
    title: {
      color: colors.n400,
      fontSize: 12,
      fontWeight: "400",
      textAlign: "center",
    },
    subtitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
      flexWrap: "wrap",
    },
    button: {
      position: "absolute",
      bottom: "10%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      alignSelf: "flex-end",
      gap: 5,
      backgroundColor: colors.p400,
      boxShadow: colors.shadow,
      borderRadius: 100,
      width: "40%",
      paddingVertical: 15,
      marginTop: 0,
      marginRight: "5%",
      zIndex: 2,
    },
    btnText: {
      color: "hsl(0, 0%, 96%)",
      fontSize: 14,
    },
    svg: {
      objectFit: "contain",
      aspectRatio: 1 / 1,
      height: 27,
    },
  });
