import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Header from "../components/header";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Current}>Current Monthly Budget: </Text>
        <Text style={styles.Budget}>$4,000</Text>

        <Text style={styles.Current}>Current Monthly Spending: </Text>
        <Text style={styles.Spending}>$4,700</Text>

        <Text style={styles.Body}>
          <Text style={styles.red}>Uh oh</Text>
          ...It looks like you are currently [-$difference] according to your
          current budget. lets fix that (if statement whether or not you are
          above or below a budget)
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  Current: {
    marginTop: 70,
    fontSize: 30,
    alignItems: "center"
  },
  Budget: {
    marginTop: 10,
    fontSize: 50,
    color: "green",
    alignItems: "center"
  },
  Spending: {
    marginTop: 10,
    fontSize: 50,
    color: "red",
    alignItems: "center"
  },
  Body: {
    marginTop: 40,
    fontSize: 20,
    alignItems: "center",
    textAlign: "center"
  },
  red: {
    marginTop: 40,
    fontSize: 20,
    color: "red",
    alignItems: "center"
  }
});
