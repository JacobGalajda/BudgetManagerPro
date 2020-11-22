import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Header from "../components/header";

export default class Budget extends React.Component {
  render() {
    return (
      <View>
        {/* <Header /> */}
        <Text>Budget</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 4,
    backgroundColor: "#68A047",
    alignItems: "center",
    justifyContent: "center"
  }
});
