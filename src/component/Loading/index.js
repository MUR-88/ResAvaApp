import { View, ActivityIndicator, Dimensions } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View
      style={{
        height,
        width,
        top: 0,
        left: 0,
        position: "absolute",
        zIndex: 100000000000000000,
        elevation: 100000000000000000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const { width, height } = Dimensions.get("screen");

export default Loading;
