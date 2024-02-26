import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Label = (item, title) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-end",
        marginRight: 40,
        width: "100%",
      }}
    >
      <Text
        style={[styles.Abu, { fontStyle: "italic", alignItems: "flex-end" }]}
      >
        {title}
      </Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  Abu: {
    color: "#88888D",
  },
});
