import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import Header from "../components/header";

export default class Edit extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>Account</Text>
        </View>
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
