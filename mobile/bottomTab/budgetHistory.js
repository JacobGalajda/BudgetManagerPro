import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Header from "../components/header";

export default class BudgetHistory extends React.Component {
  render() {
    return (
      <View>
        <Header />
        <View style={styles.container}>
          <Text style={styles.head}>Previous Monthly</Text>
          <Text style={styles.secondLine}>
            Budgets (Edit this to make a stack with current budgets)
          </Text>
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
  },
  secondLine: {
    fontSize: 26,
    fontStyle: "italic"
  }
});
