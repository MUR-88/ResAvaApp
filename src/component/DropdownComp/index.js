import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const index = ({ title, item }) => {
  const [isFocus, setIsFocus] = useState(true);

  return (
    <View style={[styles.Top, item.Dropdown]}>
      <View style={[styles.container]}>
        <Text style={styles.Abu}>{title} </Text>
      </View>
      <View style={[styles.container, { backgroundColor: "white" }]}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={item.values}
          maxHeight={item.height}
          search
          searchPlaceholder="Seacrh..."
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
  Top: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    // borderWidth: 0.4,
    // borderColor: "#88888D",
    borderRadius: 10,
    height: 45,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
  },
  dropdown: {
    height: 40,
    // borderWidth: 0.5,
    // backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  Abu: {
    color: "#88888D",
  },
});
