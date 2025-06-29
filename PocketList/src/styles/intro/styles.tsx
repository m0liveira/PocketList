import { StyleSheet } from "react-native";

export const introStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "relative",
      top: 0,
      left: 0,
      flex: 1,
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.p400,
      paddingTop: 100,
    },
    title: {
      fontSize: 32,
      color: "hsla(0, 0%, 100%, 1)",
      zIndex: 1,
    },
    subtitle: {
      color: "hsla(210, 11%, 93%, 1)",
      textAlign: "center",
      width: 290,
      marginTop: 30,
      zIndex: 1,
    },
    image: {
      marginTop: 30,
      zIndex: 1,
    },
    nextButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.p400,
      boxShadow: colors.shadow,
      borderRadius: 100,
      width: "50%",
      paddingTop: 20,
      paddingBottom: 20,
      marginTop: 190,
      zIndex: 1,
    },
    btnText: {
      color: "hsl(0, 0%, 96%)",
      fontSize: 14,
    },
    indicatorContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 30,
      marginTop: 20,
      paddingHorizontal: 25,
      zIndex: 1,
    },
    indicator: {
      backgroundColor: colors.p100,
      borderRadius: 100,
      height: 8,
      marginRight: 5,
    },
    activeIndicator: {
      backgroundColor: colors.p400,
    },
    link: {
      position: "absolute",
      right: 25,
      fontSize: 14,
      color: colors.s400,
    },
    wave: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0,
    },
    blob: {
      position: "absolute",
      top: 100,
      right: 0,
      zIndex: 0,
    },
  });
