import { StyleSheet } from "react-native";

export const actionSheetStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.4)",
      height: "100%",
      width: "100%",
    },
    title: {
      color: colors.n700,
      borderBottomColor: colors.n100,
      borderBottomWidth: 1,
      fontSize: 22,
      textAlign: "center",
      paddingBottom: 20,
    },
    sheet: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
      width: "100%",
    },
    option: {
      paddingVertical: 16,
      alignItems: "center",
    },
    optionText: {
      color: colors.n400,
      fontSize: 16,
    },
    back: {
      color: colors.p300,
      fontSize: 16,
      textAlign: "right",
      paddingBottom: 40,
    },
    text: {
      color: colors.text,
      fontSize: 20,
      textAlign: "center",
      paddingBottom: 40,
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btn: {
      width: "45%",
      paddingVertical: 16,
      borderRadius: 10,
    },
    btnLabel: {
      color: colors.n600,
      fontSize: 16,
      textAlign: "center",
    },
  });
