import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
// import Header from "../components/header";

export default class Forgot extends React.Component {
  state = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: ""
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ userName: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="New Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm New Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ confirmPassword: text })}
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (this.state.password == this.state.confirmPassword) {
              try {
                let response = await fetch(
                  "https://budgetmanagerpro.herokuapp.com/api/password-reset",
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      email: this.state.email,
                      username: this.state.userName,
                      password: this.state.password
                    })
                  }
                );
                let user = await response.json();
                if (user.success) {
                  Alert.alert("Password has been reset", "Verify on Email");
                } else {
                  Alert.alert(user.message);
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              Alert.alert("Error!", "New Passwords do NOT match", [
                {
                  text: "Try again"
                }
              ]);
            }
          }}
        >
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
    marginBottom: 350
  }
});
