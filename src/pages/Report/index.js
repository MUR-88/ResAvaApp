import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";
import { Button, DropdownComp } from "../../component";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import "dayjs/locale/id";
import { Formik, useFormik } from "formik";
import { database } from "../../assets/Model/db";
import Toast from "react-native-toast-message";
import MasterLogActivity from "../../assets/Model/master_log_activity";
import dayjs from "dayjs";
import {
  useMasterSector,
  useMasterCompany,
  useMasterMachineType,
  useMasterMachine,
  useMasterMainActivity,
  useMasterLog,
} from "../../hooks";
import Clipboard from "@react-native-clipboard/clipboard";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const Report = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();

  const startDate = getFormatedDate(today.setDate(today.getDate() - 2));

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [text, setText] = useState("Computer On Or Off ?");
  const [isFocus, setIsFocus] = useState(true);
  const [date, setDate] = useState(undefined);

  const [showAlert, setShowAlert] = useState(false);

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedUserId !== null) {
          // User ID retrieved successfully
          console.log("User ID:", storedUserId);
          setUserId(storedUserId); // Update userId state with retrieved value
        } else {
          // No user ID stored yet
          console.log("No user ID stored");
          setUserId(null); // or handle accordingly based on your application's logic
        }
      } catch (error) {
        // Error retrieving user ID
        console.error("Error retrieving user ID:", error.message);
        setUserId(null); // or handle accordingly based on your application's error handling strategy
      }
    };

    fetchUserId();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const copyToClipboard = async (selectedCompanyId) => {
    console.log("selectedCompanyId", selectedCompanyId);
    let clipboardContent = "";

    try {
      // Check if selectedCompanyId is provided
      if (!selectedCompanyId) {
        alert("Please select a company");
        return;
      }

      console.log("userId", userId); // Ensure userId is logged or used in your logic

      clipboardContent = `Tanggal : ${dayjs()
        .subtract(1, "day")
        .format("DD/MMM/")} - ${dayjs().format("DD/MMM")}\n`;

      const selectedCompany = dataCompany.find(
        (company) => company.id_master_company === selectedCompanyId
      );

      if (!selectedCompany) {
        alert("Company details not found.");
        return;
      }

      clipboardContent += `Contractor : ${selectedCompany.name}\n\n\n`;

      dataMasterLog
        .filter((item) => item.master_company_id === selectedCompanyId)
        .filter(
          (item) => dayjs(item.date).date() === dayjs(formik.values.date).date()
        )
        // .filter((item) => item.user_id === userId)
        .forEach((item, index) => {
          clipboardContent += `No: ${index + 1}\n`;
          clipboardContent += `Contractor: ${selectedCompany.name}\n`;
          clipboardContent += `Activity: ${
            dataMainActivity.find(
              (activity) =>
                activity.id_master_main_activities ===
                item.master_main_activity_id
            )?.name || ""
          }\n`;
          clipboardContent += `Id Unit: ${
            dataMachine.find(
              (machine) => machine.master_machine_id === item.master_machine_id
            )?.machine_id || ""
          }\n`;
          clipboardContent += `Sector: ${
            dataSector.find(
              (sector) => sector.id_master_sectors === item.master_sector_id
            )?.name || ""
          }\n`;
          clipboardContent += `Compartement: ${item.compartement_id}\n`;
          clipboardContent += `Hour Meter: ${
            dataMasterLog.length > 0
              ? Math.abs(
                  dataMasterLog[dataMasterLog.length - 1].current_hour_meter -
                    item.current_hour_meter
                )
              : "No previous hour meter available"
          }\n`;
          clipboardContent += `Working Hour: ${item.working_hour}\n`;
          clipboardContent += `Remark: ${item.keterangan}\n`;
          clipboardContent += `Create: ${dayjs(item.date)
            .locale("id")
            .format(" DD/MM/YYYY ")}\n\n`;
        });

      // Copy clipboardContent to clipboard
      Clipboard.setString(clipboardContent);
      alert("Data copied to clipboard!");
      console.log("clipboardContent", clipboardContent);
    } catch (error) {
      console.error("Error copying data:", error);
      // Handle AsyncStorage errors or other errors appropriately
      alert("Error copying data. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      id_master_sectors: "",
      id_master_company: "",
      id_master_machine: "",
      master_machine_id: "",
      id_master_estate: "",
      compartement_id: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
      hm_current: "",
      keterangan: "",
    },
    // validationSchema: schema,

    onSubmit: async (values) => {
      try {
        //   console.log("value", values.date);
        //   console.log("value", dayjs(values.date).unix());
        await database.write(async () => {
          const masterLog = await database
            .get(MasterLogActivity.table)
            .create((item) => {});

          console.log("masterLog", database);
          return masterLog;
        });
        // navigation.replace("Mytabs");
        // console.log("value", values.date);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
        // console.log(database);
      }
    },
  });

  const {
    data: dataSector,
    isLoading: isLoadingSector,
    connected: connectedMasterSector,
  } = useMasterSector({ isGetData: true });
  // console.log("data sector", dataSector.length);
  // console.log(JSON.stringify(dataSector, null, 2));
  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  // console.log("data Company", dataCompany.length);
  const {
    data: dataMachineType,
    isLoading: isLoadingMachineType,
    connected: connectedMasterMachineType,
  } = useMasterMachineType({ isGetData: true });
  // console.log("data Machine Type", dataMachineType.length);
  // console.log(JSON.stringify(dataMachineType, null, 2));
  const {
    data: dataMachine,
    isLoading: isLoadingMachine,
    connected: connectedMasterMachine,
  } = useMasterMachine({ isGetData: true });
  // console.log("data Machine", dataMachine.length);
  // console.log(JSON.stringify(dataMachine, null, 2));
  const {
    data: dataMainActivity,
    isLoading: isLoadingMainActivity,
    connected: connectedMasterMainActivity,
  } = useMasterMainActivity({ isGetData: true });
  // console.log("data Main Activity", dataMainActivity.length);
  // console.log(JSON.stringify(dataMainActivity, null, 2));
  const {
    data: dataMasterLog,
    isLoading: isLoadingLog,
    connected: connectedMasterLog,
  } = useMasterLog({ isGetData: true });
  console.log(JSON.stringify(dataMasterLog, null, 2));
  console.log("data Log", dataMasterLog.length);

  return (
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
                Report Activity
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: -1, flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
              <Text style={[styles.Judul1, { marginLeft: 10, marginTop: 20 }]}>
                Date {"         "}:
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  marginLeft: 30,
                  marginTop: 20,
                }}
              >
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
                        onSelectedChange={(date) => setDate(date)}
                        mode="calendar"
                        display="spinner"
                        // minimumDate={startDate}
                        selected={date}
                        onDateChange={(date) => {
                          formik.setFieldValue("date", date);
                        }}
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
                  // style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      { color: formik.setFieldValue ? "#88888D" : "black" },
                    ]}
                  >
                    {formik.values.date
                      ? dayjs(formik.values.date)
                          .locale("id")
                          .format("DD/MMM/YYYY ")
                      : "Pilih Tanggal"}
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 15,
                  marginLeft: -20,
                  alignItems: "flex-end",
                  marginRight: 30,
                }}
              ></View>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 30, flexDirection: "row" }}>
            <DropdownComp
              title="Contractor :"
              item={{
                values: dataCompany.map((company) => ({
                  label: company.name,
                  value: company.id_master_company,
                })),
                marginRight: 160,
                placeholder: dataCompany.find(
                  (item) =>
                    item.id_master_company === formik.values.id_master_company
                )?.name,
                onChange: (item) => {
                  setIsFocus(false);
                  formik.setFieldValue("id_master_company", item.value);
                  copyToClipboard(item.value); // Call copyToClipboard with selected company ID
                },
                Dropdown: {
                  marginLeft: -10,
                  marginTop: -10,
                },
                container: {
                  marginLeft: -10,
                  marginHorizontal: -10,
                },
                containerStyle: {
                  marginRight: 15,
                  marginLeft: -100,
                },
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              fontWeight: "bold",
              marginBottom: 10,
              borderBottomColor: "#BFBFC1",
              borderBottomWidth: 1,
            }}
          >
            <Text style={[styles.judul, { flex: 1 }]}>No</Text>
            <Text style={[styles.judul, { flex: 4 }]}>Title</Text>
            <Text style={[styles.judul, { flex: 5, marginBottom: 5 }]}>
              Data
            </Text>
          </View>
          {dataMasterLog
            .sort((a, b) => dayjs(b.created_at) - dayjs(a.created_at))
            .sort((a, b) => a.main_activity || b.main_activity)
            .filter(
              (item) =>
                item.master_company_id === formik.values.id_master_company
            )
            .filter(
              (item) =>
                dayjs(item.date).date() === dayjs(formik.values.date).date()
            )
            // .filter((item) => item.user_id === userId)
            .map((item, index) => (
              <View style={[styles.Garis]}>
                <View style={[styles.Isi]}>
                  <Text
                    style={{
                      color: "#3C3C43",
                      marginVertical: 5,
                      marginLeft: 5,
                      // opacity: 0.6,
                      flex: 1,
                    }}
                  >
                    {index + 1}
                  </Text>
                  <View style={[{ flex: 3, marginLeft: -12 }]}>
                    <Text style={[styles.IsiText2]}>Contractor</Text>
                    <Text style={[styles.IsiText2]}>Id Unit</Text>
                    <Text style={[styles.IsiText2]}>Compartement</Text>
                    <Text style={[styles.IsiText2]}>Activity</Text>
                    <Text style={[styles.IsiText2]}>HM</Text>
                    <Text style={[styles.IsiText2]}>Working Hours</Text>
                    <Text style={[styles.IsiText2]}>Remarks</Text>
                    <Text style={[styles.IsiText2]}>Sector</Text>
                    <Text style={[styles.IsiText2]}>User Id</Text>
                    <Text style={[styles.IsiText2]}>Create</Text>
                  </View>
                  <View style={[{ flex: 4 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.IsiText2]}>
                        {dataCompany
                          .filter(
                            (select) =>
                              select.id_master_company ===
                              item.master_company_id
                          )
                          .map((matchedCompany) => {
                            return matchedCompany.name;
                          })}
                      </Text>
                      <Text style={[styles.IsiText2]}>
                        {dataMachine
                          .filter(
                            (select) =>
                              select.master_machine_id ===
                              item.master_machine_id
                          )
                          .map((matchedMachine) => {
                            return matchedMachine.machine_id;
                          })}
                      </Text>
                      <Text style={[styles.IsiText2]}>
                        {item.compartement_id}
                      </Text>
                      <Text style={[styles.IsiText2]}>
                        {dataMainActivity
                          .filter(
                            (select) =>
                              select.id_master_main_activities ===
                              item.master_main_activity_id
                          )
                          .map((matchedMainActivity) => {
                            return matchedMainActivity.name;
                          })}
                      </Text>
                      <Text style={[styles.IsiText2, { fontWeight: 700 }]}>
                        {item.current_hour_meter} Hour
                      </Text>
                      <View style={[styles.Label, { marginBottom: 5 }]}>
                        <Text style={[styles.IsiText2, { fontWeight: 700 }]}>
                          {/* {item.current_hour_meter -
                            item.current_hour_meter
                              .dayjs(item.created_at)
                              .subtract(1, "day")
                              .format("HH:mm")} */}
                          Hour
                        </Text>
                      </View>
                      <Text style={[styles.IsiText2]}>{item.keterangan}</Text>
                      <Text style={[styles.IsiText2]}>
                        {dataSector
                          .filter(
                            (select) =>
                              select.id_master_sectors === item.master_sector_id
                          )
                          .map((matchedSector) => {
                            return matchedSector.name;
                          })}
                      </Text>
                      <Text style={[styles.IsiText2]}>{userId}</Text>
                      <Text style={[styles.IsiText2]}>
                        {dayjs(item.date).locale("id").format(" DD/MM/YYYY ")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          {dataMasterLog.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Silahkan Pilih Tanggal dan Contractor
            </Text>
          )}
        </ScrollView>
      </RefreshControl>
    </SafeAreaView>
  );
};

export default Report;

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
  Judul1: {
    marginRight: 25,
    justifyContent: "center",
    marginTop: 8,
    fontSize: 16,
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
  judul: {
    fontWeight: "bold",
    fontSize: 12,
    marginHorizontal: 2,
  },
  Content: {
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  MechInfo: {
    flex: 1,
    width: "98%",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "column",
    // marginLeft: 4,
  },
  Isi: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  Garis: {
    flex: 1,
    marginHorizontal: 10,
    borderBottomColor: "#BFBFC1",
    borderBottomWidth: 1,
  },

  containerInput: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: "95%",
    height: 100,
    borderColor: "#8888D",
    alignItems: "center",
  },
  IsiText2: {
    flex: 1,
    marginVertical: 2,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  Abu: {
    color: "#88888D",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#007AFF",
  },
  textStyle: {
    textAlign: "center",
    color: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
