import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";

export default class Edit extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Account</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    alignItems: "center",
    justifyContent: "center"
  }
});
