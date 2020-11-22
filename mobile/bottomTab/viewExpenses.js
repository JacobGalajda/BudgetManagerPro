import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ViewExpenses() {
  return (
    <View>
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
        placeholder="Spending By Category"
        containerStyle={{ height: 40 }}
        style={{ color: "#68A047" }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomColor: 1,
    color: "#68A047",
    borderBottomColor: "white"
  }
});
