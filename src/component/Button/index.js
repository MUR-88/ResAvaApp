import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
// import {  } from 'react-native';

const Button = ({ item, buttonStyle }) => {
  return (
    <TouchableOpacity
      onPress={item.onPress}
      style={[
        styles.Button,
        buttonStyle,
        { backgroundColor: item.backgroundcolor },
        { width: item.width ? item.width : "100%"},
        { height: item.height ? item.height : 30},
        { borderRadius: item.borderRadius ? item.borderRadius : 10}
      ]}
    >
      <Text style={[styles.ButtonText, { color: item.textcolor }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Button: {
    flex: 1,
    height: 30,
    width: "100%",
    // borderRadius: 10,
    justifyContent: "center",
  },

  ButtonText: {
    textAlign: "center",
    fontSize: 16,
    justifyContent: "flex-end",
    borderRadius: 1,
    fontFamily: "Poppins",
  },
});
