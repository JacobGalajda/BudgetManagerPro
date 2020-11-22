// import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Landing from "./screens/landing";
// import Navigator from "./routes/homeStack";
import Login from "./screens/login";
import Sign from "./screens/signUp";
import Home from "./bottomTab/home";
import Account from "./bottomTab/accountScreen";
import Budget from "./bottomTab/budget";
import Manage from "./bottomTab/manage";
import Spending from "./bottomTab/spending";
import Forgot from "./screens/forgot";

const Tab = createBottomTabNavigator();

function ProfileScreen({ navigate }) {
  return (
    <View>
      <Account />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="Manage" component={Manage} />
      <Tab.Screen name="Home" component={homeScreen} />
      <Tab.Screen name="Spending" component={Spending} />
      <Tab.Screen name="Profile" component={ProfileScreen} headerMode="none" />
    </Tab.Navigator>
  );
}

function SignUpScreen() {
  return (
    <View style={styles.container1}>
      <Sign />
    </View>
  );
}

function homeScreen({ navigation }) {
  return (
    <View>
      <View>
        <Home />
      </View>
      <View style={styles.Home}>
        <TouchableOpacity onPress={() => navigation.navigate("Manage")}>
          <Text style={styles.navBudget}>Manage Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Spending")}>
          <Text style={styles.navBudget}>View Spending</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

{
  /* <TouchableOpacity onPress={() => navigation.navigate("Manage")}>
        <Text style={styles.navBudget}> Manage Budget</Text>
      </TouchableOpacity> */
}

function ForgotPassword({ navigation }) {
  return (
    <View style={styles.container1}>
      <Forgot />
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Login />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("MyTabs")}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.SignUp}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "LogIn",
              headerMode: "none",
              headerStyle: { backgroundColor: "#68A047" },
              headerTitleStyle: {
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 20,
                color: "#68A047"
              }
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "",
              fontSize: 35,
              headerStyle: { backgroundColor: "#68A047" }
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: "",
              fontSize: 35,
              headerStyle: { backgroundColor: "#68A047" }
            }}
          />

          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              title: "Budget Manager Pro",
              headerStyle: {
                backgroundColor: "#68A047"
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 20,
                color: "white"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      // <View style={styles.container}>
      //   {/* <Navigator /> */}
      //   <Login />
      //   {/* <Sign /> */}
      //   {/* <Home /> */}
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#68A047",
    justifyContent: "center",
    alignItems: "center"
  },
  container1: {
    flex: 1,
    backgroundColor: "#68A047",
    marginBottom: 100
    // justifyContent: "center",
    // alignItems: "center"
  },
  Home: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  forgot: {
    color: "white",
    fontSize: 11,
    textDecorationLine: "underline"
  },
  navBudget: {
    color: "black",
    fontSize: 11,
    textDecorationLine: "underline",
    justifyContent: "center"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  SignUp: {
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 300
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
