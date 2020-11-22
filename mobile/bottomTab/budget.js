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
        <Header />
        <View style={styles.container}>
          <Text style={styles.head}>Current Monthly Budget</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  head: {
    fontWeight: "bold",
    fontSize: 26
  }
});
