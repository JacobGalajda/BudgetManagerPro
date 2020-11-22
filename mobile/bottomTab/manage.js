import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import Header from "../components/header";
import ExpenseItem from "./expenseItem";
import AddExpense from "./addExpense";

export default function Manage() {
  const [expenses, setExpense] = useState([{ text: "Netflix", key: "1" }]);
  const pressHandler = key => {
    setExpense(prevExpenses => {
      return prevExpenses.filter(expense => expense.key != key);
    });
  };
  return (
    <View>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 4,
    backgroundColor: "#68A047",
    alignItems: "center",
    justifyContent: "center"
  }
});
