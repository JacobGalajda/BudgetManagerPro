import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Checkbox } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddExpense({ submitHandler }) {
  const [expenseName, setExpenseName] = useState("");
  const [price, setPrice] = useState("");
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const changeHandler = val => {
    setExpenseName(val);
    setPrice(val);
  };

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
        placeholder="Expense Category"
        containerStyle={{ height: 40 }}
        style={{ color: "#68A047" }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
      />
      <TextInput
        style={style.input}
        placeholder="New Expense.."
        onChangeText={changeHandler}
      />
      <TextInput
        keyboardType="numeric"
        style={style.input}
        placeholder="$Price"
        onChangeText={changeHandler}
      />

      <Checkbox.Item
        label="Has this Been Paid Already?"
        labelStyle="#68A047"
        status={checked ? "checked" : "unchecked"}
        color="#68A047"
        onPress={() => {
          setChecked(!checked);
        }}
      />
      <View style={style.container}>
        <Text style={style.time}>Select the Date The Expense is Due</Text>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
      <DropDownPicker
        items={[
          { label: "One Time Expense", value: "oneTime" },
          { label: "Weekly", value: "weekly" },
          { label: "BiWeekly", value: "biweekly" },
          { label: "Monthly", value: "monthly" },
          { label: "Annual", value: "annual" }
        ]}
        placeholder="Billing Cycle"
        containerStyle={{ height: 40 }}
        style={{ color: "#68A047" }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
      />

      <Button
        onPress={() => {
          submitHandler(expenseName);
        }}
        title="add to budget"
        color="#68A047"
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30
  },
  wrapper: {
    padding: 10
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
  }
});
