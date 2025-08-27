import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const listHeaderStyles = (colors: any) =>
  StyleSheet.create({
    nav: {
      position: "relative",
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      backgroundColor: colors.bg400,
      borderColor: colors.n200,
      borderBottomWidth: 3,
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: "5%",
    },
    progress: {
      position: "absolute",
      bottom: -3,
      backgroundColor: colors.accent,
      borderEndEndRadius: 100,
      borderTopEndRadius: 100,
      height: 3,
      zIndex: 100,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    svg: {
      width: 24,
      height: 24,
    },
    svgBigger: {
      width: 26,
      height: 26,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 10,
    },
    title: {
      maxWidth: screenWidth * 0.6,
      flexWrap: "wrap",
      fontSize: 20,
      color: colors.text,
    },
  });
