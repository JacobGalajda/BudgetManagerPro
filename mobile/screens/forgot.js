import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
// import Header from "../components/header";

export default class Forgot extends React.Component {
  state = {
    email: "",
    resetPassword: ""
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Budget Manager</Text>
        <Text style={styles.logo2}>Pro</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <TouchableOpacity onPress={() => alert("Password Reset Sent to Email")}>
          <Text style={styles.SignUp}>Reset Password</Text>
        </TouchableOpacity>
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
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginTop: 120,
    // marginBottom: 50,
    textAlign: "center",
    fontStyle: "italic"
  },
  logo2: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#000",
    // marginTop: 180,
    marginBottom: 70,
    textAlign: "center",
    fontStyle: "italic"
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "white",
    fontSize: 11,
    textDecorationLine: "underline"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 200
  },
  loginText: {
    color: "white"
  },
  SignUp: {
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 500
  }
});
