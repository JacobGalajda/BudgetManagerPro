import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Alert
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./bottomTab/home";
import Manage from "./bottomTab/manage";
import Forgot from "./screens/forgot";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Header from "./components/header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { VictoryPie } from "victory-native";
import DropDownPicker from "react-native-dropdown-picker";

const Tab = createBottomTabNavigator();

class Sign extends React.Component {
  state = {
    email: "",
    phone: "",
    name: "",
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
            placeholder="Name (First and Last)"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ name: text })}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="UserName"
            placeholderTextColor="#003asdf5c"
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
          onPress={async () => {
            if (
              this.state.password == this.state.confirmPassword &&
              this.state.password != ""
            ) {
              let response = await fetch(
                "https://budgetmanagerpro.herokuapp.com/api/users",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email: this.state.email,
                    name: this.state.name,
                    username: this.state.userName,
                    password: this.state.password
                  })
                }
              );
              let user = await response.json();

              this.props.navigation.navigate("Login");
              Alert.alert("Notice!", "Verify Email Before Signing In!");
            } else {
              Alert.alert("Error", "Passwords do not match");
            }
          }}
        >
          <Text style={styles.SignUp2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Login extends React.Component {
  //function Login({ navigation }) {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: ""
  };

  render() {
    var res;
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
            // Alert.alert("Hello");
            try {
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
              res = await response.json();
            } catch (err) {
              console.log(err);
            }
            // console.log("Verified::: " + res.verified);
            // console.log("Success::: " + res.success);
            if (res.success == false) {
              Alert.alert("Uh Oh!", "Email or Password is incorrect");
            }
            if (res.success) {
              if (res.user.verified == false) {
                Alert.alert(
                  "Uh Oh!",
                  "Please verify account before signing in!"
                );
              }
              if (res.user.verified) {
                this.props.navigation.navigate("MyTabs", {
                  paramKeys: res.user,
                  token: res.token,
                  email: this.state.email,
                  password: this.state.password
                });
              }
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

function ProfileScreen({ route, navigation }) {
  const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
  // console.log("parent params", parentState.routes[parentState.index].params);
  const user = parentState.routes[parentState.index].params;
  // console.log("\n\n\n:::::Testing: " + user.email);
  console.log("User: " + JSON.stringify(user));
  return (
    <ScrollView>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={require("./images/Profile.png")} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View style={styles.buttonContainer}>
            <Text>You're a Pro Budget Manager!</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Name: {user.paramKeys.name}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Email: {user.email}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Username: {user.paramKeys.username}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            Alert.alert(
              "Log Out?",
              "Are you sure you want to log out?",
              [
                {
                  text: "No"
                  // onPress: () => console.log("No Pressed!")
                },
                {
                  text: "Yes",
                  onPress: () => navigation.navigate("Login")
                }
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
// function AddExpense({ submitHandler }) {
//   // const [expenseCategory, setExpenseCategory] = useState("");
//   // const [expenseName, setExpenseName] = useState("");
//   // const [price, setPrice] = useState("");
//   const [checked, setChecked] = useState(false);
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);
//   const [state, setState] = React.useState({
//     firstName: "",
//     lastName: ""
//   });

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   const showMode = currentMode => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode("date");
//   };

//   const showTimepicker = () => {
//     showMode("time");
//   };

//   const changeHandler = val => {
//     setExpenseName(val);
//   };

//   return (
//     <View>
//       <DropDownPicker
//         items={[
//           { label: "Rent", value: "rent" },
//           { label: "Utilites", value: "utilites" },
//           { label: "Subscriptions", value: "subscriptions" },
//           { label: "Gas", value: "gas" },
//           { label: "Groceries", value: "groceries" },
//           { label: "Student Loans", value: "groceries" },
//           { label: "Insurance", value: "insurance" },
//           { label: "Car", value: "car" }
//         ]}
//         placeholder="Expense Category"
//         containerStyle={{ height: 40 }}
//         style={{ color: "#68A047" }}
//         dropDownStyle={{ backgroundColor: "#fafafa" }}
//         onChangeItem={item =>
//           this.setState({
//             category: item.value
//           })
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="New Expense.."
//         onChangeText={name => changeHandler(name)}
//         // value={this.state.name}
//       />
//       <TextInput
//         keyboardType="numeric"
//         style={styles.input}
//         placeholder="Price"
//         // onChangeText={price => this.setState({ price })}
//         // value={this.state.price}
//       />

//       {/* <Checkbox.Item
//         label="Has this Been Paid Already?"
//         labelStyle="#68A047"
//         status={checked ? "checked" : "unchecked"}
//         color="#68A047"
//         onPress={() => {
//           setChecked(!checked);
//         }}
//       /> */}
//       <View style={styles.container}>
//         <Text style={styles.time}>Select the Date The Expense is Due</Text>
//       </View>
//       <DateTimePicker
//         testID="dateTimePicker"
//         value={date}
//         mode={mode}
//         is24Hour={true}
//         display="default"
//         onChange={onChange}
//       />
//       {/* <DropDownPicker
//         items={[
//           { label: "One Time Expense", value: "oneTime" },
//           { label: "Weekly", value: "weekly" },
//           { label: "BiWeekly", value: "biweekly" },
//           { label: "Monthly", value: "monthly" },
//           { label: "Annual", value: "annual" }
//         ]}
//         placeholder="Billing Cycle"
//         containerStyle={{ height: 40 }}
//         style={{ color: "#68A047" }}
//         dropDownStyle={{ backgroundColor: "#fafafa" }}
//       /> */}

//       <Button
//         onPress={async () => {
//           try {
//             let response = await fetch(
//               "https://budgetmanagerpro.herokuapp.com/api/users/" +
//                 user.paramKeys._id +
//                 "/budgets",
//               {
//                 method: "GET",
//                 headers: {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                   Authorization: "Bearer " + user.token
//                 }
//               }
//             );
//             res = await response.json();
//           } catch (err) {
//             console.log(err);
//           }

//           try {
//             let response = await fetch(
//               "https://budgetmanagerpro.herokuapp.com/api/users/" +
//                 user.paramKeys._id +
//                 "/budgets/" +
//                 //res[0].id
//                 res.user_budgets._id,
//               {
//                 method: "PUT",
//                 headers: {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                   Authorization: "Bearer " + user.token
//                 },
//                 body: JSON.stringify({
//                   user_budgets: []
//                 })
//               }
//             );
//             res = await response.json();
//           } catch (err) {
//             console.log(err);
//           }

//           submitHandler(expenseName);
//         }}
//         title="add to budget"
//         color="#68A047"
//       />
//     </View>
//   );
// }

function ManageScreen({ navigation }) {
  const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
  // console.log("parent params", parentState.routes[parentState.index].params);
  const user = parentState.routes[parentState.index].params;
  const [flag, setFlag] = useState(false);
  const [expenses, setExpenses] = useState([
    { name: "Example Name", price: 0, category: "Select a Category", key: "1" }
  ]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  var res;
  const pressHandler = key => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.key != key);
    });
  };

  const submitHandler = (text1, text2, text3) => {
    Alert.alert("Yay!", "Added to list!");
    setExpenses(prevExpenses => {
      return [
        {
          name: text1,
          price: text2,
          category: text3,
          key: Math.random().toString()
        },
        ...prevExpenses
      ];
    });
  };

  const forceUpdateHandler = () => {
    this.forceUpdate();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const changeHandler1 = val => {
    setExpenseName(val);
  };
  const changeHandler2 = val => {
    setPrice(val);
  };
  const changeHandler3 = val => {
    // console.log("Entered with value " + JSON.stringify(val));
    setExpenseCategory(val.label);
  };

  const reRender = () => setRandom(Math.random());

  return (
    <View>
      <Manage />
      <DropDownPicker
        items={[
          { label: "Rent", value: "rent" },
          { label: "Utilites", value: "utilites" },
          { label: "Subscriptions", value: "subscriptions" },
          { label: "Gas", value: "gas" },
          { label: "Groceries", value: "groceries" },
          { label: "Student Loans", value: "groceries" },
          { label: "Insurance", value: "insurance" },
          { label: "Car", value: "car" }
        ]}
        placeholder="Expense Category"
        containerStyle={{ height: 40 }}
        activeLabelStyle={{ color: "#68A047" }}
        style={{ color: "#68A047" }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={changeHandler3}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        onChangeText={changeHandler1}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Expense Price (in USD)"
        onChangeText={changeHandler2}
      />

      <View style={styles.container}>
        <Text style={styles.time}>Select the Date The Expense is Due</Text>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />

      {/* Name of Expense: expenseName */}
      {/* Price Of Expense: price */}
      {/* Category of Expense: expoenseCategry */}

      <Button
        onPress={async () => {
          try {
            let response = await fetch(
              "https://budgetmanagerpro.herokuapp.com/api/users/" +
                user.paramKeys._id +
                "/budgets",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + user.token
                }
              }
            );
            res = await response.json();
          } catch (err) {
            console.log(err);
          }

          res[0].budget_expense.push({
            expense_category: expenseCategory,
            expense_name: expenseName,
            expense_cost: parseInt(price, 10)
          });
          console.log("RES[0] : " + JSON.stringify(res[0].budget_expense)); //TESTING REMOVE LATER

          try {
            let response = await fetch(
              "https://budgetmanagerpro.herokuapp.com/api/users/" +
                user.paramKeys._id +
                "/budgets/" +
                res[0].id,
              {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + user.token
                },
                body: JSON.stringify(res[0])
              }
            );
            res = await response.json();
          } catch (err) {
            console.log(err);
          }
          console.log(res); //TESTING REMOVE LATER
          submitHandler(expenseName, price, expenseCategory);
          // forceUpdateHandler();
          // reRender();
        }}
        title="add to todays budget"
        color="#68A047"
      />

      <View>
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => pressHandler(item.key)}>
              <Text style={styles.item}>
                <Text style={styles.item1}>
                  {"\t\t"}Press Me To Remove From Budget{"\n"}
                </Text>
                <Text style={styles.item}>
                  Category: {item.category}
                  {"\n"}
                </Text>
                <Text style={styles.item}>
                  Name: {item.name} {"\n"}
                  <Text style={styles.item}>
                    Price: ${item.price}
                    {"\n"}
                  </Text>
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
function MyTabs({ route, navigation }) {
  const { paramKeys } = route.params;
  const { email } = route.params;
  const { token } = route.params;
  const { password } = route.params;

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
        name="Manage"
        component={ManageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-cash" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={24} />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={25} />
          )
        }}
        headerMode="none"
      />
    </Tab.Navigator>
  );
}

// DOING NEW STUFF BETWEEN THIS
function useForceUpdate() {
  var pieData;
  const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
  const [pie, setPie] = useState([]);
  const [cost, setCost] = useState();
  const [weekly, setWeekly] = useState();

  const user = parentState.routes[parentState.index].params;

  const string =
    "https://budgetmanagerpro.herokuapp.com/api/users/" +
    user.paramKeys._id +
    "/budgets";
  useEffect(() => {
    pieData = fetch(string, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          "Expense name::: " + responseJson[0].budget_expense[0].expense_name
        );
        console.log(
          "Expense cost::: " + responseJson[0].budget_expense[0].expense_cost
        );
        console.log("ctr is fucking high: " + ctr++); // remove later
        if (responseJson != null) {
          let data = []; // EMPTY JSON ARRAY
          let expenseLength = responseJson[0].budget_expense.length; //logging array length to see if it works
          //logging expense name to see if it is a string

          var total = 0;
          for (var i = 0; i < expenseLength; i++) {
            total +=
              user.paramKeys.user_budgets[0].budget_expense[i].expense_cost;
          }

          setCost(total);
          setWeekly(total / 4);

          for (var i = 0; i < expenseLength; i++) {
            var object = {
              name: responseJson[0].budget_expense[i].expense_name, //maybe a string maybe not
              price: responseJson[0].budget_expense[i].expense_cost //already a number
            };
            data.push(object);
          }

          setPie(data);
        }
      })
      .catch(err => console.log(err));
  }, [1]);
}

// END THIS

function homeScreen({ navigation, route }) {
  //const forceUpdate = useForceUpdate();
  var pieData;
  const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
  const [pie, setPie] = useState([]);
  const [cost, setCost] = useState();
  const [weekly, setWeekly] = useState();
  if (parentState.routes[parentState.index].params == null) {
    return <View></View>;
  }

  const user = parentState.routes[parentState.index].params;

  const string =
    "https://budgetmanagerpro.herokuapp.com/api/users/" +
    user.paramKeys._id +
    "/budgets";
  useEffect(() => {
    pieData = fetch(string, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != null) {
          let data = []; // EMPTY JSON ARRAY
          let expenseLength = responseJson[0].budget_expense.length; //logging array length to see if it works
          //logging expense name to see if it is a string

          var total = 0;
          for (var i = 0; i < expenseLength; i++) {
            total +=
              user.paramKeys.user_budgets[0].budget_expense[i].expense_cost;
          }

          setCost(total);
          setWeekly(total / 4);

          for (var i = 0; i < expenseLength; i++) {
            var object = {
              name: responseJson[0].budget_expense[i].expense_name, //maybe a string maybe not
              price: responseJson[0].budget_expense[i].expense_cost //already a number
            };
            data.push(object);
          }

          setPie(data);
        }
      })
      .catch(err => console.log(err));
  }, [1]);

  //if (run == true)
  return (
    <View>
      <View>
        <Header />
        <ScrollView>
          <View style={styles.homeContainer}>
            <Text style={styles.Welcome}>
              {" "}
              Welcome Back!{"\n   "}
              {user.paramKeys.name}!
            </Text>
            <Home />
            <Text style={styles.Current}>Current Monthly Spending: </Text>
            <Text style={styles.Budget}>${cost}</Text>
            <Text style={styles.Current}>Weekly Spending Average: </Text>
            <Text style={styles.daily}>${weekly}</Text>
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
              data={pie}
              x="name"
              y="price"
            />
            {/* [{ x: pie.x, y: pie.y }] */}

            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Manage")}>
                <Text style={styles.manage}>Manage Budget </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.manage}> Profile Screen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 300,
    paddingTop: 100
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
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomColor: 1,
    color: "#68A047",
    borderBottomColor: "white"
  },
  time: {
    height: 40,
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomColor: 1,
    alignContent: "center",
    color: "#68A047",
    borderBottomColor: "white"
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
  Current: {
    marginTop: 10,
    fontSize: 30,
    alignItems: "center"
  },
  Welcome: {
    fontSize: 30,
    alignItems: "center"
  },
  Date: {
    marginTop: 10,
    fontSize: 20,
    alignItems: "center"
  },
  Budget: {
    marginTop: 10,
    fontSize: 50,
    color: "green",
    alignItems: "center"
  },
  daily: {
    marginTop: 10,
    fontSize: 50,
    color: "green",
    alignItems: "center"
  },
  Body: {
    fontSize: 20,
    alignItems: "center",
    textAlign: "center"
  },
  red: {
    marginTop: 40,
    fontSize: 20,
    color: "red",
    alignItems: "center"
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
  manage: {
    color: "black",
    fontSize: 11,
    textDecorationLine: "underline"
  },
  bugdetButton: {
    color: "black",
    fontSize: 11,
    textDecorationLine: "underline"
  },
  rowContainer: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-around"
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
    marginTop: 40
    // marginBottom: 80
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
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10
  },
  item1: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10
  },
  SignUp2: {
    color: "white"
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
  boxSimple: {
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: "#000",
    padding: 10,
    margin: 20
  },
  boxText: {
    fontSize: 15,
    backgroundColor: "#fff"
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
    marginTop: 60,
    flex: 1,
    alignItems: "center",

    backgroundColor: "#fff"
  },
  name: {
    fontSize: 28,
    color: "#68A047",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    backgroundColor: "#fff",
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
  },
  buttonContainerPhone: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    borderRadius: 30,
    backgroundColor: "#68A047"
  }
});
