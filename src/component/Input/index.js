import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import Text from "../Text";
const Input = ({
  onChangeText,
  editable = true,
  onFocus,
  keyboardType = "default",
  item,
  secureTextEntry = false,
  numberOfLines = 1,
  multiline = false,
  buttonStyle
}) => {
  return (
    <View style={styles.Login}>
      <View style={{flex:1, justifyContent: 'center',alignContent:'center'}}> 
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={item.placeholder}
        style={[styles.input, buttonStyle]}
        keyboardType={keyboardType}
        value={item.values}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onFocus={onFocus}
        editable={editable}
      />

        </View>
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  Login: {
    flex: 1,
  },
  label: {
    flex: 1,
    fontWeight: "700",
    justifyContent: "flex-start",
    fontFamily: "PoppinsSemiBold",
    justifyContent: "flex-end",
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    height: 30,
    marginBottom: 5,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 8,
  },
});
