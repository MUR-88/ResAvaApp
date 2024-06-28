import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputData = ({
  Title,
  onChangeText,
  editable = true,
  onFocus,
  keyboardType = "default",
  item,
  secureTextEntry = false,
  numberOfLines = 1,
  multiline = false,
  buttonStyle,
}) => {
  return (
    <View
      style={[
        item.Input,
        {
          flexDirection: "row",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 5,
          marginTop: 10,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            backgroundColor: "white",
            flex: 1,
          },
        ]}
      >
        <Text style={styles.Abu}> {Title} </Text>
      </View>
      <View
        style={[styles.container, { backgroundColor: "white", marginLeft: -4 }]}
      >
        <View
          style={[
            styles.containerInput1,
            {
              alignItems: "flex-end",
              justifyContent: "center",
              marginTop: 5,
            },
          ]}
        >
          <View style={styles.Login}>
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={item.placeholder}
              autoCapitalize="characters"
              style={[styles.input, buttonStyle]}
              // style={[styles.input, {height:50, textAlignVertical: 'top', paddingVertical:8, paddingHorizontal:6}, buttonStyle]}
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
      </View>
    </View>
  );
};

export default InputData;

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    // height:200
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
    // borderWidth: 0.4,
    height: 30,
    marginBottom: 5,
    borderRadius: 10,
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  Abu: {
    color: "black",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  containerInput1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    // marginHorizontal: ,
    marginRight:-12
  },
});
