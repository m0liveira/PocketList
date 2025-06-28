import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>explore</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});
