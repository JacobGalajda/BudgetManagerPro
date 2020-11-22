import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ART
} from "react-native";
import Header from "../components/header";
import DropDownPicker from "react-native-dropdown-picker";

export default class Spending extends React.Component {
  render() {
    return (
      <View>
        <Header />
        <View style={styles.container}>
          <Text style={styles.head}>Current Monthly Spending</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  head: {
    fontWeight: "bold",
    fontSize: 26
  }
});
