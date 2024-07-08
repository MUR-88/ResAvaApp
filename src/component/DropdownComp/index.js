import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const index = ({ title, item }) => {
  const [isFocus, setIsFocus] = useState(true);

  return (
    <View style={[styles.Top, item.Dropdown]}>
      <View style={[styles.container, item.container]}>
        <Text style={styles.Abu}>{title} </Text>
      </View>
      <View style={[styles.container1, { marginRight: item.marginRight }]}>
        <Dropdown
          style={[styles.dropdown]}
          containerStyle={item.containerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={item.values}
          maxHeight={item.height}
          search
          searchPlaceholder="Search..."
          width={20}
          labelField="label"
          valueField="value"
          value={item.value}
          placeholder={item.placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item.onChange}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container2: {
    // width: "100%",
  },
  Top: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 10,
    height: 45,
    marginTop: 10,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
    // marginRight:-200
    // width: "100%",
  },
  dropdown: {
    height: 40,
    opacity: 0.4,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  Abu: {
    // color: "black",
  },
});
