// Line 394 needs to be changed back to initial route "Login" instead of "MyTabs"

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
// import Login from "./screens/login";
import Home from "./bottomTab/home";
import Account from "./bottomTab/accountScreen";
import Budget from "./bottomTab/budget";
import BudgetHistory from "./bottomTab/budgetHistory";
import Manage from "./bottomTab/manage";
import Spending from "./bottomTab/spending";
import Forgot from "./screens/forgot";
import ExpenseItem from "./bottomTab/expenseItem";
import AddExpense from "./bottomTab/addExpense";
import ViewExpenses from "./bottomTab/viewExpenses";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import viewExpenses from "./bottomTab/viewExpenses";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine
} from "victory-native";
import DropDownPicker from "react-native-dropdown-picker";

const Tab = createBottomTabNavigator();
const chart_wh = 250;
const series = [123, 321, 123, 789, 537];
const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];
var total = 0;
var name;

class Sign extends React.Component {
  state = {
    email: "",
    phone: "",
    userName: "",
    password: "",
    confirmPassword: ""
  };
  render() {
    return (
      <View style={styles.SignUpcontainer}>
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
            placeholder="Phone"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ phone: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="UserName"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ userName: text })}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ confirmPassword: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.props.navigation.navigate("Login");
            Alert.alert("Yay!", "You've Signed Up!");
          }}
        >
          <Text style={styles.SignUp2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      // </View>
      // </View>
    );
  }
}

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <View style={styles.LoginContainer}>
        <Text style={styles.LoginLogo}>Budget Manager</Text>
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
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            let response = await fetch(
              "https://budgetmanagerpro.herokuapp.com/auth/login",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: this.state.email,
                  password: this.state.password
                })
              }
            );
            let user = await response.json();
            console.log(user.success);

            if (user.success) {
              this.props.navigation.navigate("MyTabs", {
                paramKey: user
              });
            } else {
              Alert.alert("Error!", "Email or Password is Incorrect", [
                {
                  text: "Try again"
                }
              ]);
            }
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text style={styles.SignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function ProfileScreen({ navigation }) {
  return (
    <ScrollView>
      <Account />
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            Alert.alert(
              "Log Out?",
              "Are you sure you want to log out?",
              [
                {
                  text: "No",
                  onPress: () => console.log("No Pressed!")
                },
                { text: "Yes", onPress: () => navigation.navigate("Login") }
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.loginText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function BudgetScreen({ navigation }) {
  return (
    <View>
      <View>
        <Budget />
        <View style={styles.budgetContainer}>
          <TouchableOpacity
            style={styles.loginBtn1}
            onPress={() => {
              navigation.navigate("PrevBudgets");
            }}
          >
            <Text style={styles.bugdetButton}>View Previous Budgets</Text>
          </TouchableOpacity>
          <VictoryChart height={500}>
            <VictoryLine
              style={{
                data: { stroke: "#68A047" }
              }}
              data={[
                { x: "August", y: 3250 },
                { x: "July", y: 1540 },
                { x: "September", y: 1890 },
                { x: "November", y: 4260 },
                { x: "December", y: 3540 }
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" }
              }}
              data={[
                { x: "August", y: 3250 },
                { x: "July", y: 4210 },
                { x: "September", y: 4020 },
                { x: "November", y: 3223 },
                { x: "December", y: 1232 }
              ]}
            />
          </VictoryChart>
        </View>
      </View>
      <DropDownPicker
        items={[
          { label: "Two Months", value: "rent" },
          { label: "Three Months", value: "rent" },
          { label: "Six Months", value: "rent" },
          { label: "Nine Months", value: "rent" },
          { label: "1 Year", value: "rent" },
          { label: "2 Years", value: "rent" }
        ]}
        placeholder="Duration"
        containerStyle={{ height: 40 }}
        style={{ color: "#68A047" }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
      />
    </View>
  );
}
function BudgetHistoryScreen({ navigation }) {
  return (
    <View>
      <BudgetHistory />
      <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
        <VictoryBar
          barRatio={0.8}
          style={{
            data: { fill: "#c43a31" }
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 }
          ]}
          height={300}
        />
      </VictoryChart>
    </View>
  );
}
const BStack = createStackNavigator();
function BudgetStack({ navigation }) {
  return (
    <BStack.Navigator>
      <BStack.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          headerShown: false
        }}
      />
      <BStack.Screen
        name="PrevBudgets"
        component={BudgetHistoryScreen}
        options={{
          headerShown: false
        }}
      />
    </BStack.Navigator>
  );
}

function ManageScreen({ navigation }) {
  const [expenses, setExpenses] = useState([
    { text: "Cooper", key: "1" },
    { text: "Rent", key: "2" }
  ]);
  const pressHandler = key => {
    setExpenses(prevExpenses => {
      Alert.alert("Warning!", "Take this out of the budget?");
      return prevExpenses.filter(expense => expense.key != key);
    });
  };

  const submitHandler = text => {
    if (text.length > 3) {
      Alert.alert("Yay!", "Added to list!");
      setExpenses(prevExpenses => {
        return [{ text: text, key: Math.random().toString() }, ...prevExpenses];
      });
    } else {
      Alert.alert("Oops!", "expense must be at least 4 characters long!");
    }
  };

  return (
    <View>
      <Manage />
      <AddExpense submitHandler={submitHandler} />
      <View>
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <ExpenseItem item={item} pressHandler={pressHandler} />
          )}
        />
      </View>
    </View>
  );
}

function SpendingScreen({ navigation }) {
  const [expenses, setExpenses] = useState([
    { text: "Figure out", key: "1" },
    { text: "How to", key: "2" },
    { text: "Do this", key: "3" },
    { text: "Globally", key: "4" }
  ]);
  const pressHandler = key => {
    setExpenses(prevExpenses => {
      Alert.alert("Warning!", "Take this out of the budget?");
      return prevExpenses.filter(expense => expense.key != key);
    });
  };
  return (
    <View>
      <Spending />
      <ViewExpenses />
      <VictoryPie
        height={350}
        colorScale={[
          "#68A047",
          "#FFDD0E",
          "#E9AE0B",
          "#526c5b",
          "#dcdcbb",
          "#fa6e06",
          "#244c3c",
          "#590202",
          "#a7bf50"
        ]}
        // filled in with dummy data
        data={[
          { x: 1, y: 12, label: "Rent" },
          { x: 2, y: 12, label: "Subscriptions" },
          { x: 3, y: 25, label: "Only" },
          { x: 3, y: 12, label: "Food" },
          { x: 3, y: 25, label: "Alcohol" },
          { x: 3, y: 25, label: "Electric" }
        ]}
      />
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem item={item} pressHandler={pressHandler} />
        )}
      />
    </View>
  );
}

function MyTabs({ route }) {
  console.log(route.params.paramKey);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showIcon: true,
        activeTintColor: "#000",
        inactiveTintColor: "#fff",
        style: {
          backgroundColor: "#68A047",
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0
        }
      }}
    >
      <Tab.Screen
        name="Budget"
        component={BudgetStack}
        options={{
          headerShown: false
        }}
        NavigationOptions={{
          tabBarIcon: ({ tintColor }) => (
            <Icon name="Icon" size={30} color="#900" />
          )
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManageScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Spending"
        component={SpendingScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} headerMode="none" />
    </Tab.Navigator>
  );
}

function homeScreen({ navigation, route }) {
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

function ForgotPassword({ navigation }) {
  return (
    <View style={styles.container1}>
      <Forgot />
    </View>
  );
}

// function LoginScreen({ navigation }) {
// var login;

// login = async (email, pass) => {
//   let response = await fetch(
//     "https://budgetmanagerpro.herokuapp.com/auth/login",
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: email,
//         password: pass
//       })
//     }
//   );
//   let json = await response.json();
//   alert(json.success);
// };

// return (
//   <View style={styles.container4}>
//     <Login />

{
  /* <View style={styles.container}>
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
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            Alert.alert(
              "Signing In",
              "Welcome!",
              [
                {
                  text: "Dont Sign in",
                  onPress: () => console.log(this.state.email)
                },
                {
                  text: "OK",
                  onPress: () => login(this.state.email, this.state.password)
                }
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.SignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View> */
}
//     </View>
//   );
// }

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
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
            component={Sign}
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
              headerShown: false,
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
  SignUpcontainer: {
    // flex: 4,
    backgroundColor: "#68A047",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100
  },
  LoginContainer: {
    flex: 1,
    backgroundColor: "#68A047",
    alignItems: "center",
    justifyContent: "center"
  },
  container1: {
    flex: 1,
    backgroundColor: "#68A047",
    justifyContent: "center"
    // alignItems: "center"
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 30
  },
  container3: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  container4: {
    flex: 1,
    paddingTop: 160,
    backgroundColor: "#68A047",
    justifyContent: "center"
  },
  budgetContainer: {
    flex: 1,
    alignItems: "center"
  },
  signUpButton: {
    flex: 1,
    backgroundColor: "#68A047",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  profileButton: {
    marginTop: 0,
    alignContent: "center",
    justifyContent: "center"
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
  bugdetButton: {
    color: "black",
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
  loginBtn1: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  prevBudgetButton: {
    width: "80%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    color: "white"
  },
  SignUp: {
    color: "white",
    textDecorationLine: "underline"
    // marginBottom: 300
  },
  SignUp2: {
    color: "white"
    // textDecorationLine: "underline"
    // marginBottom: 300
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
  },
  LoginLogo: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#fff",
    marginTop: 140,
    textAlign: "center",
    fontStyle: "italic"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#fff",
    marginTop: 100,

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
  }
});
