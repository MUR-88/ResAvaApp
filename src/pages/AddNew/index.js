import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Switch,
  Modal,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { Button, Input } from "../../component";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
// import {color} from "../..variabel";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect } from "react";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
// import { getToday, getFormatedDate } from "react-native-modern-datepicker";

// const dispatch = useDispatch()
//   const { status_ordered, reservasi }  = useSelector(state => state.invoice)

// const handleStatusOrdered = (tipe)=>{
//   dispatch(setStatusOrdered(tipe))
// }

const countries = ["Peranap", "Tesso West", "Australia", "Ireland"];
// useEffect = () => {
//   var config = {
//     method: 'get',
//     url: /variabel/baseApi,
//     header: {

//     }
//   }
// };
const AddNew = ({ navigation }) => {
  const sector = [
    { label: "Basrah", value: "1" },
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
  const machine_id = [
    { label: "MCH 1", value: "1" },
    { label: "MCH 2", value: "2" },
    { label: "MCH 3", value: "3" },
    { label: "MCH 4", value: "4" },
    { label: "MCH 5", value: "5" },
    { label: "MCH 6", value: "6" },
    { label: "MCH 7", value: "7" },
    { label: "MCH 8", value: "8" },
  ];
  const estate = [
    { label: "A", value: "1" },
    { label: "B", value: "2" },
    { label: "C", value: "3" },
    { label: "D", value: "4" },
    { label: "F", value: "5" },
    { label: "G", value: "6" },
    { label: "H", value: "7" },
    { label: "I", value: "8" },
  ];
  const compartement = [
    { label: "101", value: "1" },
    { label: "102", value: "2" },
    { label: "103", value: "3" },
    { label: "104", value: "4" },
    { label: "105", value: "5" },
    { label: "106", value: "6" },
    { label: "107", value: "7" },
    { label: "108", value: "8" },
  ];
  const type = [
    { label: "Barging Jumbo", value: "1" },
    { label: "Barging Semi", value: "2" },
    { label: "Barging Standard", value: "3" },
    { label: "Debarker", value: "4" },
    { label: "bucket", value: "5" },
    { label: "G", value: "6" },
    { label: "H", value: "7" },
    { label: "I", value: "8" },
  ];
  const main_activity = [
    { label: "Grapple", value: "1" },
    { label: "Barging ", value: "2" },
    { label: "Felling", value: "3" },
    // { label: "Debarker", value: "4" },
    // { label: "bucket", value: "5" },
    { label: "G", value: "6" },
    { label: "H", value: "7" },
    { label: "I", value: "8" },
  ];
  const lastUpdate = [
    { label: "9.8", value: "1" },
    { label: "9.6", value: "2" },
    { label: "10.4", value: "3" },
    { label: "12.1", value: "4" },
    { label: "bucket", value: "5" },
    { label: "G", value: "6" },
    { label: "H", value: "7" },
    { label: "I", value: "8" },
  ];
  const current = [
    { label: "8.8", value: "1" },
    { label: "9.76", value: "2" },
    { label: "9.5", value: "3" },
    { label: "12.1", value: "4" },
    { label: "bucket", value: "5" },
    { label: "G", value: "6" },
    { label: "H", value: "7" },
    { label: "I", value: "8" },
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate() - 1),
    "YYYY/MM/DD"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isEnable, setIsEnable] = useState(true);
  const [text, setText] = useState("Computer On Or Off ?");
  const [isFocus, setIsFocus] = useState(true);
  const [date, setDate] = useState(current);

  function handleOnPress() {
    setOpen(!open);
  }

  function handleChange(Date) {
    console.log(Date);
    setDate(Date);
  }

  const toggleSwitch = () => {
    try {
      if (isEnable) {
        setText("Active");
      } else {
        setText("Inactive");
      }
      setIsEnable((previouvsState) => !previouvsState);
      console.log(isEnable);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // use if status bar overlaying
    // <SafeAreaView style={{flex:1, marginTop:Constants.statusBarHeight
    // }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <StatusBar style="light" />
      <RefreshControl>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#007AFF",
              height: 100,
              justifyContent: "flex_start",
            }}
          >
            <View style={[styles.Kotak]}>
              <Text style={[styles.Header1, { marginBottom: -10 }]}>
                Resources Update
              </Text>
            </View>
          </View>
          <View style={[styles.Content]}>
            <Text
              style={{
                color: "#007AFF",
                fontSize: 18,
                fontFamily: "Poppins-Medium",
                marginTop: 5,
              }}
            >
              Details
            </Text>
            <View style={[styles.Details1]}>
              <View style={[styles.button_waktu]}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <DatePicker
                        onSelectedChange={(date) => setSelectedDate(date)}
                        mode="calendar"
                        minimumDate={startDate}
                        selected={date}
                        onDateChange={handleChange}
                      />
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>{}Simpan</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Pilih Tanggal</Text>
                </Pressable>
              </View>
              <View style={[styles.container, { paddingVertical: 10 }]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={sector}
                  maxHeight={300}
                  placeholder={!isFocus ? "Sector" : ""}
                  labelField="label"
                  valueField="value"
                  text="sector"
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={[styles.container, { paddingVertical: 10 }]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={company}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Company" : ""}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                <View style={[styles.button_waktu1]}>
                  <Button
                    buttonStyle={{ borderRadius: 20 }}
                    item={{
                      title: "Check Status Machine",
                      height: 40,
                      textcolor: "#007AFF",
                      marginTop: 10,
                      backgroundcolor: "#DEEBFF",
                      alginSelf: "center",
                      onPress: () => navigation.navigate("Status"),
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: -20,
                borderBottomColor: "#3C3C43",
                opacity: 0.3,
                borderBottomWidth: 1,
                marginVertical: 15,
                marginRight: -200,
              }}
            />
            <Text
              style={{
                marginBottom: 20,
                color: "#88888D",
                fontFamily: "Poppins-Regular",
                fontWeight: 900,
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Machine Information
            </Text>
            <View style={[styles.MechInfo]}>
              <Dropdown
                style={[
                  styles.dropdownMech,
                  { marginTop: 20 },
                  isFocus && { borderColor: "#8888D" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={machine_id}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Machine ID" : ""}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[
                  styles.dropdownMech,
                  isFocus && { borderColor: "#8888D" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={estate}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Estate" : ""}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <View style={styles.Compartement_input1}>
                <View
                  style={[
                    styles.container,
                    { justifyContent: "center", flex: 1 },
                  ]}
                >
                  <Text style={styles.Abu}>Compartement Id </Text>
                </View>
                <View style={[styles.container]}>
                  <View
                    style={[
                      styles.container1,
                      { justifyContent: "flex-end", alignContent: "flex-end" },
                    ]}
                  >
                    <Input
                      item={{
                        placeholder: "13 TON",
                        borderWidth: 0.5,
                      }}
                    />
                  </View>
                </View>
              </View>
              <Dropdown
                style={[
                  styles.dropdownMech,
                  isFocus && { borderColor: "#8888D" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={type}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Type" : ""}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[
                  styles.dropdownMech,
                  { marginTop: 5 },
                  isFocus && { borderColor: "#8888D" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={main_activity}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Main Activity" : ""}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />

              {isEnable ? (
                <>
                  <Dropdown
                    style={[
                      styles.dropdownMech,
                      isFocus && { borderColor: "#8888D" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={lastUpdate}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "HM-Last Update" : ""}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownMech,
                      { marginBottom: 20 },
                      isFocus && { borderColor: "#8888D" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={current}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "HM-Current" : ""}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </>
              ) : null}

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "row",
                  marginHorizontal: 5,
                  marginVertical: 3,
                }}
              >
                <View
                  style={[
                    styles.container,
                    { justifyContent: "center", flex: 1 },
                  ]}
                >
                  <Text style={{ opacity: 0.4 }}>Computer HM ? </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row ",
                      alignContent: "center",
                      marginVertical: 2,
                    }}
                  >
                    <Switch
                      trackColor={{ false: "#FB9797", true: "#CAE6CA" }}
                      // tumbColor={isEnable ? "red" : "green"}
                      onValueChange={toggleSwitch}
                      value={isEnable}
                    />
                    <Text style={{ color: "#AFAFAF" }}>
                      {isEnable ? "on" : "off"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.container, { paddingVertical: 10 }]}></View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 20,
              flex: 1,
            }}
          >
            <View style={[styles.atas, { borderRadius: 10 }]}>
              <View
                style={[styles.containerInput, { backgroundColor: "#D8D8D8" }]}
              >
                <Input
                  item={{
                    height: 200,
                    marginHorizontal: 20,
                    label: "Keterangan",
                    placeholder: "Maintainance to Workshop for Repairment",
                  }}
                  input={{ backgroundColor: "black" }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 20,
            }}
          >
            <Button
              item={{
                title: "Submit",
                backgroundcolor: "#8296FF",
                textcolor: "#FFFFFF",
                width: "100%",
                justifyContent: "center",
                onPress: () => navigation.navigate(""),
              }}
            />
          </View>
        </ScrollView>
      </RefreshControl>
    </SafeAreaView>
  );
};

export default AddNew;

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
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: "900",
    color: "white",
  },
  Kotak: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  Content: {
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  Content1: {
    marginTop: 50,
    flexDirection: "column",
    marginLeft: 10,
  },
  Container_bar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 24,
    shadowColor: "#000",
    height: 40,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    marginTop: -40,
  },

  IsiContent: {
    flexDirection: "row",
    marginVertical: 5,
  },
  IsiText: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
  button_waktu: {
    width: "95%",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 5,
  },
  button_waktu1: {
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "center",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // marginHorizontal:,
    justifyContent: "center",
    marginHorizontal:8
  },
  container1: {
    // flex: 1,
    // flexDirection: "column",
    // marginHorizontal:,
    justifyContent: "center",
  },
  Compartement_input1: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    marginLeft: 10,
    borderColor: "black",
    marginTop: 10,
    shadowColor: "#000",
    height: 40,
    flex: 1,
    backgroundColor: "#D8D8D8",
    opacity: 0.5,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    // width:'95%',
    // borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  MechInfo: {
    flex: 1,
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    // backgroundColor:'red',
    flexDirection: "column",
    // marginHorizontal: 7,
    // marginRight: 7,
    marginLeft: 4
    // marginRight:10
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
    borderWidth: 0.5,
    backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownMech: {
    height: 40,
    flex: 1,
    backgroundColor: "#D8D8D8",
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
  icon: {
    marginRight: 5,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 8,
    width: "100%",
    marginHorizontal: 12.5,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
  },

  containerInput: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: "95%",
    height: 100,
    borderColor: "#8888D",
    alignItems: "center",
    opacity: 0.4,
  },

  Compartement_input: {
    flexDirection: "row",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    marginLeft: 10,
    borderColor: "black",
    marginTop: 10,
    shadowColor: "#000",
    height: 40,
    flex: 1,
    backgroundColor: "#D8D8D8",
    opacity: 0.5,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#007AFF",
  },
  textStyle: {
    color: "#",
    // fontWeight: "",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
