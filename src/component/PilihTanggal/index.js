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
import { Button, DropdownComp, Input, InputData } from "../../component";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/id";

const index = (item) => {
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const startDate = getFormatedDate(today.setDate(today.getDate() - 2));
  const [date, setDate] = useState(undefined);

  return (
    <SafeAreaView style={styles.container}>
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
                onSelectedChange={item.onDateChange}
                mode="calendar"
                display="spinner"
                minimumDate={startDate}
                selected={item.date}
                onDateChange={item.value}
              />
              {/* {console.log(item.value)} */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{}Simpan</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* {showTime? } */}
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle1}>Pilih Tanggal</Text>

          {/* {item.value ? (
            <Text style={styles.textStyle1}>Pilih</Text>
          ) : (
            <Text style={styles.textStyle1}>
              Tanggal :{dayjs(item.value).locale("id").format("DD/MMM/YYYY")}
            </Text>
          )} */}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
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
    shadowRadius: 4,
    elevation: 5,
  },
  button_waktu: {
    width: "93%",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    height: 45,
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#007AFF",
  },
  textStyle: {
    color: "#",
    textAlign: "center",
  },
  textStyle1: {
    color: "#88888D",
    textAlign: "center",
    opacity: 0.5,
  },
});
