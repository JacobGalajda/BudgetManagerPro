import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class Account extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={require("../images/Profile.png")}
        />
        <View style={styles.body}>
          <View style={styles.boxSimple}>
            <Text style={styles.boxText}>
              Hello! My name is The Budget Master! Click me to edit the contents
              of the description!
            </Text>
          </View>
          <View style={styles.bodyContent}>
            <View style={styles.buttonContainer}>
              <Text>Name</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text>Email</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text>Address</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text>Phone</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  boxSimple: {
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: "#000",
    padding: 10,
    margin: 20
  },
  boxText: {
    fontSize: 15
  },
  header: {
    backgroundColor: "#68A047",
    height: 180
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 100
  },
  name: {
    fontSize: 22,
    color: "#000",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#68A047",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#68A047"
  }
});
