import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import { Button, Input } from "../../component";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Dropdown } from "react-native-element-dropdown";
import API from "../../function/API";

const master_machine_type = [
  { label: "Barging Jumbo", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const master_main_activity = [
  { label: "Barge", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const company = [
  { label: "PTSI", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const Register = () => {
  // const queryClient = useQueryClient();
  // // Queries
  // const postRegisterMachine = () => {
  //   return API.post("post_master_register_machine");
  // };

  // const query = useQuery({
  //   queryKey: ["post_master_register_machine"],
  //   queryFn: postRegisterMachine,
  // });
  // console.log(query);

  const queryClient = useQueryClient();
  // Queries
  const getMasterCompany = () => {
    return API.get("master_company");
  };

  const query = useQuery({
    queryKey: ["master_company"],
    queryFn: getMasterCompany,
  });

  // const query = useQuery({
  //   queryKey: ["master_company"],
  //   queryFn: getMasterRegisterMachine,
  // });
  // console.log(query.data);

  // const queryClient = useQueryClient();
  // // Queries
  // const getMasterCompany = () => {
  //   return API.get("master_company");
  // };

  // const query = useQuery({ queryKey: ["master_company"], queryFn: getMasterCompany });
  // // alert(query.data.data);
  // console.log(query?.data?.data);

  // const queryClient = useQueryClient();
  // // Queries
  // const getMasterRegisterMachine = () => {
  //   return API.get("master_machine_type");
  // };
  // const query = useQuery({
  //   queryKey: ["master_machine_type"],
  //   queryFn: getMasterRegisterMachine,
  // });

  // console.log(query?.data?.data);

  // const [selectedValueMachineType, setSelectedValueMachineType] = useState(null);
  // const [selectedValueMainActivity, setSelectedValueMainActivity] = useState(null);

  // const {
  //   data: masterMachineTypeData,
  //   isLoading: isLoadingMasterMachineType,
  // } = useQuery('masterMachineType', async () => {
  //   const response = await API.get("master_machine_type");
  //   return response.data;
  // });

  // const {
  //   data: masterMainActivityData,
  //   isLoading: isLoadingMasterMainActivity,
  // } = useQuery('masterMainActivity', async () => {
  //   const response = await API.get("master_main_activity");
  //   return response.data;
  // });

  // const [masterTypeMachine, setMasterTypeMachine] = useQuery();
  // const [masterMainActivity, setMasterMainActivity] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    // use if status bar overlaying
    // <SafeAreaView style={{flex:1, marginTop:Constants.statusBarHeight
    // }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <StatusBar style="light" />
      {/* <RefreshControl style={{flex:1}}> */}
      {/* <ScrollView > */}
      <ScrollView
        contentContainerStyle={{
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#007AFF",
            height: 100,
            justifyContent: "flex_start",
          }}
        >
          <View style={[styles.Kotak]}>
            <Text style={[styles.Header1, { marginBottom: -10 }]}>
              Register Machine ID
            </Text>
          </View>
        </View>
        <View style={[styles.Content]}>
          <Text
            style={{
              marginBottom: 10,
              color: "#88888D",
              fontFamily: "Poppins-Regular",
              fontWeight: 900,
              fontSize: 18,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            Machine Data
          </Text>
          <View style={[styles.MechInfo]}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
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
                <Text style={styles.Abu}>Company </Text>
              </View>
              <View style={[styles.container, { backgroundColor: "white" }]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={company}
                  maxHeight={300}
                  width={40}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? " PTSI" : ""}
                  value={company}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                borderColor: "black",
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
                <Text style={styles.Abu}>Equipment Brand </Text>
              </View>
              <View
                style={[
                  styles.container,
                  { backgroundColor: "white", marginLeft: -4 },
                ]}
              >
                <View style={styles.containerInput1}>
                  <Input
                    item={{
                      placeholder: "KOMATSU",
                    }}
                    style={{ borderWidth: 0.5 }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                borderColor: "black",
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
                <Text style={styles.Abu}>Equipment Class (Ton) </Text>
              </View>
              <View
                style={[
                  styles.container,
                  { backgroundColor: "white", marginLeft: -4 },
                ]}
              >
                <View style={styles.container}>
                  <Input
                    item={{
                      placeholder: "XX TON",
                      borderWidth: 0.5,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                borderColor: "black",
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
                <Text style={styles.Abu}>Machine Id </Text>
              </View>
              <View
                style={[
                  styles.container,
                  { marginLeft: -4, backgroundColor: "white" },
                ]}
              >
                <View style={styles.container}>
                  <Input
                    item={{
                      placeholder: "SL 500",
                      fontSize: 28,
                      borderWidth: 0.5,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                borderColor: "black",
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
                <Text style={styles.Abu}>Type </Text>
              </View>
              <View style={[styles.container, { backgroundColor: "white" }]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={master_machine_type}
                  maxHeight={300}
                  width={40}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? " Fix Grapple" : ""}
                  value={master_machine_type}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    // setSelectedValueMachineType(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                borderColor: "black",
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
                <Text style={styles.Abu}>Main Activity </Text>
              </View>
              <View style={[styles.container, { backgroundColor: "white" }]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={master_main_activity || []}
                  maxHeight={300}
                  width={40}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? " Loading" : ""}
                  value={master_machine_type}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    // setSelectedValueMainActivity(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                height: 50,
                borderColor: "black",
                marginTop: 10,
                marginBottom: 50,
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
                <Text style={styles.Abu}>Hour Meter - Current </Text>
              </View>
              <View
                style={[
                  styles.container,
                  { marginLeft: 22 },
                  { backgroundColor: "white" },
                ]}
              >
                <Input
                  item={{
                    placeholder: "XXX.XX",
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              justifyContent: "center",
              alignContent: "center",
              marginBottom: 20,
            }}
          >
            <Button
              item={{
                title: "Submit",
                backgroundcolor: "#8296FF",
                textcolor: "#FFFFFF",
                width: "95%",
                // height:50,
                // onPress: () =>(Home),
                onPress: () => navigation.navigate(""),
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* </RefreshControl> */}
    </SafeAreaView>
  );
};

export default Register;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  Header: {
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    marginVertical: 6,
    shadowColor: "#000",
    height: 200,
    width: width - 24,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  Header1: {
    marginLeft: 10,
    marginTop: 15,
    // marginBottom:10,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    // marginVertical:40,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "900",
    color: "white",
    // marginTop:20
  },
  Kotak: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  Content: {
    //  flex:1,
    flexDirection: "column",
    marginLeft: 10,
    //  backgroundColor:'red',
    justifyContent: "center",
    alignContent: "center",
  },
  Content1: {
    // flex:1,
    marginTop: 50,
    flexDirection: "column",
    marginLeft: 10,
  },

  Isi: {
    // marginLeft:10,
    // marginRight:10,
    // marginRight:20,
    flexDirection: "column",
    borderRadius: 10,
    marginBottom: 10,
    // backgroundColor:'white',
    width: "98%",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 5,
  },
  IsiContent: {
    flexDirection: "row",
    //  justifyContent:'space-between',
    marginVertical: 5,
  },
  IsiText: {
    fontSize: 12,
    fontFamily: "Poppins",
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
    marginHorizontal: 10,
  },
  MechInfo: {
    flex: 1,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    // backgroundColor:'white',
    // backgroundColor:'red',
    flexDirection: "column",
    marginHorizontal: 15,
  },
  MechDetails: {
    flex: 1,
    // width:'90%',
    borderRadius: 10,
    // alignItems:'center',
    // backgroundColor:'white',
    // backgroundColor:'red',
    flexDirection: "Row",
    // marginHorizontal:15,
  },
  Details1: {
    flex: 1,
    width: "95%",
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  dropdown: {
    height: 40,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownMech: {
    // height: 40,
    flex: 1,
    backgroundColor: "white",
    opacity: 0.4,
    marginVertical: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    width: "95%",
    // borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  atas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
  },

  containerInput: {
    width: "100%",
    paddingHorizontal: 24,
    marginVertical: 50,
  },
  Abu: {
    color: "#88888D",
  },
});
