import { Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>hello world</Text>
        <Link href="/explore" style={styles.text}>
          Go to Explore
        </Link>
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
