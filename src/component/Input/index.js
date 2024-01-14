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
  titleInput,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        borderWidth: 0.4,
        borderColor: "#88888D",
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 10,
        height: 45,
        marginTop: 10,
      }}
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
        <Text style={styles.Abu}> {titleInput}</Text>
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
              style={[
                styles.input,
                {
                  height: 50,
                  textAlignVertical: "top",
                  paddingVertical: 8,
                  paddingHorizontal: 6,
                },
              ]}
              keyboardType={keyboardType}
              value={item.value}
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

export default Input;
const styles = StyleSheet.create({
  Login: {
    flex: 1,
    // height:200
  },

  label: {
    flex: 1,
    fontWeight: "700",
    justifyContent: "flex-start",
    // marginLeft:10,
    fontFamily: "PoppinsSemiBold",
    justifyContent: "flex-end",
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 30,
    // borderWidth: 0.5,
    borderColor: "#DDDDDD",
    marginBottom: 5,
    borderRadius: 10,
  },
  containerInput1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  Abu: {
    color: "#88888D",
  },
});
