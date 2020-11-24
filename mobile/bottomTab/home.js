import React, { Component, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { VictoryPie } from "victory-native";
import Header from "../components/header";

const Home = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(month + "/" + date + "/" + year + " ");
  }, []);

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.Welcome}> Welcome Back</Text>
        <Text style={styles.textStyle}>Todays date is {currentDate}</Text>
        <Text style={styles.Current}>Current Monthly Budget: </Text>
        <Text style={styles.Budget}>$4,000</Text>
        <Text style={styles.Current}>Current Daily Budget: </Text>
        <Text style={styles.daily}>$133</Text>
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
          data={[
            { x: 1, y: 3, label: "Rent" },
            { x: 2, y: 3, label: "Subscriptions" },
            { x: 3, y: 3, label: "OnlyFans" }
          ]}
        />
        <Text style={styles.Body}>
          It looks like you are currently [-$difference] according to your
          current budget. lets fix that
        </Text>
      </View>
    </View>
  );
};

export default Home;

// export default class Home extends React.Component {

//   render() {
//     return (
//       <View>
//         <Header />
//         <View style={styles.container}>
//           <Text style={styles.Welcome}> Welcome Back</Text>
//           <Text>{this.ShowCurrentDate}</Text>
//           <Text style={styles.Current}>Current Monthly Budget: </Text>
//           <Text style={styles.Budget}>$4,000</Text>

//           <Text style={styles.Current}>Current Daily Budget: </Text>
//           <Text style={styles.daily}>$133</Text>

//           <Text style={styles.Body}>
//             It looks like you are currently [-$difference] according to your
//             current budget. lets fix that (if statement whether or not you are
//             above or below a budget)
//           </Text>
//         </View>
//       </View>
//     );
//   };
// }

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "black"
  },
  container: {
    alignItems: "center"
    // justifyContent: "center"
  },
  Current: {
    marginTop: 10,
    fontSize: 30,
    alignItems: "center"
  },
  Welcome: {
    marginTop: 30,
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
  }
});
