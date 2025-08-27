import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const listItemStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      backgroundColor: colors.bg400,
      borderColor: colors.n100,
      borderBottomWidth: 1,
      height: "auto",
      paddingHorizontal: "5%",
      paddingVertical: 20,
    },
    checkedCard: {
      backgroundColor: "transparent",
      borderBottomWidth: 0,
      // opacity: 0.75,
    },
    checkbox: {
      borderColor: colors.p400,
      borderWidth: 2,
      borderRadius: 100,
      width: 24,
      height: 24,
      marginRight: 20,
    },
    checkedCheckbox: {
      backgroundColor: colors.p100,
      borderColor: colors.p100,
      alignItems: "center",
      justifyContent: "center",
    },
    svg: {
      alignSelf: "center",
      width: 16,
      height: 12,
    },
    itemName: {
      flexWrap: "wrap",
      width: "auto",
      maxWidth: screenWidth * 0.5,
      paddingRight: 25,
    },
    infoText: {
      color: colors.n500,
      fontSize: 14,
      fontWeight: "400",
      marginRight: 15,
    },
    user: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      width: 24,
      height: 24,
    },
    userName: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "600",
    },
    checkedTextColor: { color: colors.n400 },
  });
