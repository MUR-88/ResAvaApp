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
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
// import {color} from "../..variabel";
import "dayjs/locale/id";
import * as yup from "yup";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import {
  useMasterSector,
  useMasterCompany,
  useMasterEstate,
  useMasterMachineType,
  useMasterMachine,
  useMasterMainActivity,
  useMasterLog,
} from "../../hooks";
import { Formik, useFormik } from "formik";
import { database } from "../../assets/Model/db";
import Toast from "react-native-toast-message";
import { globalStyles } from '../../styles';
import MasterLogActivity from "../../assets/Model/master_log_activity";

const AddNew = ({ navigation }) => {
  let schema = yup.object().shape({
    hm_current: yup.number().required("Mohon masukkan format yang benar"),
    compartement_id: yup
      .string()
      .matches(/^\d{1,3}$/, "Input must be a number with 1 to 3 digits")
      .min(1)
      .required("Masukkan Compartement ID"),
    // Date: yup.date().required("Required"),
    id_master_sector: yup.string().required("Pilih Sector"),
    id_master_company: yup.string().required("Pilih Company"),
    // id_master_machine: yup.string().required("Pilih Machine ID"),
    id_master_estate: yup.string().required("Pilih Estate"),
    id_master_machine_types: yup.string().required("Pilih Machine Type"),
    id_master_main_activities: yup.string().required("Pilih Main Activity"),
  });

  const {
    data: dataSector,
    isLoading: isLoadingSector,
    connected: connectedMasterSector,
  } = useMasterSector({ isGetData: true });
  // console.log("data sector", dataSector.length);
  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  // console.log("data Company", dataCompany.length);
  const {
    data: dataEstate,
    isLoading: isLoadingEstate,
    connected: connectedMasterEstate,
  } = useMasterEstate({ isGetData: true });
  // console.log("data Estate", dataEstate.length);
  // console.log(JSON.stringify(dataEstate, null, 2));

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
  // console.log(JSON.stringify(dataMasterLog, null, 2));
  // console.log("data Log", dataMasterLog.length);

  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();

  const startDate = getFormatedDate(today.setDate(today.getDate() - 1));

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isEnable, setIsEnable] = useState(true);
  const [text, setText] = useState("Computer On Or Off ?");
  const [isFocus, setIsFocus] = useState(true);
  const [date, setDate] = useState(undefined);
  const [showTime, setShowTime] = useState(false);

  const mySync = async () => {
    try {
      // Membuat data baru
      const newLog = await database.write(async () => {
        const masterLog = await database
          .get(MasterLogActivity.table)
          .create((item) => {
            item.keterangan = "Bas";
            // sector.isSynced = true;
            // sector.isConnected = true;
          });

        return masterLog;
      });

      console.log("Company created:", newLog);

      // Mendapatkan semua data dari tabel
      const allLog = await database
        .get(MasterLogActivity.table)
        .query()
        .fetch();

      console.log("All Log:", allLog);

      // setMasterLog(allSector.map((masterSector) => masterSector._raw));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const showLog = async () => {
    // console.log(JSON.stringify(dataMasterLog, null, 2));
    console.log("data Log", dataMasterLog.length);
  };

  function handleOnPress() {
    setOpen(!open);
  }

  function handleChangeDate(Date) {
    // setShowTime(!showTime );
    console.log("tanggal pilih", Date);
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
  const formik = useFormik({
    initialValues: {
      date: "",
      id_master_sector: "",
      id_master_company: "",
      id_master_machine: "",
      id_master_estate: "",
      compartement_id: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
      hm_current: "",
      keterangan: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await database.write(async () => {
        try {
          const masterLog = await database
            .get(MasterLogActivity.table)
            .create((item) => {
              item.created_at = values.date;
              item.id_master_sector = values.id_master_sector;
              item.id_master_company = values.id_master_company;
              item.id_master_machine = values.id_master_machine;
              item.id_master_estate = values.id_master_estate;
              item.compartement_id = values.compartement_id;
              item.id_master_machine_types = values.id_master_machine_types;
              item.id_master_main_activities = values.id_master_main_activities;
              item.hm_current = values.hm_current;
              item.keterangan = values.keterangan;
              sector.isSynced = false;
              sector.isConnected = false;
            });
          console.log(JSON.stringify(MasterLogActivity, null, 2));
          console.log(JSON.stringify(masterLog, null, 2));
          console.log("masterLog", masterLog);
          return masterLog;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error.message,
          });
          console.log(database);
          // console.log(error);
        }
      });
      console.log("onSubmit", onSubmit());
      navigation.replace("Mytabs");
    },
  });
  console.log(formik.errors);

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
              <TouchableOpacity onPress={mySync} style={{ marginVertical: 5 }}>
                <Text>Sync</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showLog} style={{ marginVertical: 5 }}>
                <Text>Log</Text>
              </TouchableOpacity>
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
                        display="spinner"
                        minimumDate={startDate}
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
                {/* {showTime? } */}
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Pilih Tanggal</Text>
                </Pressable>
              </View>
              <DropdownComp
                title="Company"
                item={{
                  values: dataCompany.map((company) => ({
                    label: company.name,
                    value: company.id_master_company,
                  })),
                  placeholder: dataCompany.find(
                    (item) =>
                      item.id_master_company === formik.values.id_master_company
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue("id_master_company", item.value);
                    console.log(item);
                  },
                  Dropdown: {
                    borderWidth: 0.4,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              />
              {formik.errors.id_master_company
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.id_master_company}
                    </Text>;
                  }
                : null}
              <DropdownComp
                title="Sector"
                item={{
                  values: dataSector.map((sector) => ({
                    label: sector.name,
                    value: sector.id_master_sectors,
                  })),
                  placeholder: dataSector.find(
                    (item) =>
                      item.id_master_sectors === formik.values.id_master_sector
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue("id_master_sector", item.value);
                    console.log(item);
                  },
                  Dropdown: {
                    borderWidth: 0.4,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              />
              {formik.errors.id_master_sector
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.id_master_sector}
                    </Text>;
                  }
                : null}

              <View style={[styles.button_waktu1]}>
                <Button
                  buttonStyle={{
                    borderRadius: 20,
                    marginHorizontal: 10,
                    marginBottom: 10,
                  }}
                  item={{
                    title: "Check Status Machine",
                    height: 40,
                    textcolor: "#007AFF",
                    // marginTop: 10,
                    backgroundcolor: "#DEEBFF",
                    alginSelf: "center",
                    onPress: () => navigation.navigate("Status"),
                  }}
                />
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
              <DropdownComp
                title="Machine ID"
                item={{
                  values: dataMachine.map((machine) => ({
                    label: machine.machine_id,
                    value: machine.id_master_machine,
                  })),
                  placeholder: dataMachine.find(
                    (item) =>
                      item.id_master_machine === formik.values.id_master_machine
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue("machine_id", item.value);
                    console.log(item);
                  },
                  Dropdown: {
                    borderWidth: 0.4,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              />
              {formik.errors.id_master_machine
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.id_master_machine}
                    </Text>;
                  }
                : null}
              <DropdownComp
                title="Estate"
                item={{
                  values: dataEstate.map((estate) => ({
                    label: estate.name,
                    value: estate.id_master_estate,
                  })),
                  placeholder: dataEstate.find(
                    (item) =>
                      item.id_master_estate === formik.values.id_master_estate
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue("id_master_estate", item.value);
                    console.log(item);
                  },
                  Dropdown: {
                    borderWidth: 0.4,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              />
              {formik.errors.id_master_estate
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.id_master_estate}
                    </Text>;
                  }
                : null}
              <InputData
                Title="Compartement ID"
                onChangeText={formik.handleChange("compartement_id")}
                item={{
                  placeholder: "Ex : 001",
                  value: formik.values.compartement_id,
                  Input: {
                    borderWidth: 0.5,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    height: 45,
                  },
                }}
                buttonStyle={{
                  borderColor: "#DDDDDD",
                }}
              />
              {formik.errors.compartement_id
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.compartement_id}
                    </Text>;
                  }
                : null}
              <DropdownComp
                title="Machine Type"
                item={{
                  values: dataMachineType.map((type) => ({
                    label: type.name,
                    value: type.id_master_machine_types,
                  })),
                  placeholder: dataMachineType.find(
                    (item) =>
                      item.id_master_machine_types ===
                      formik.values.id_master_machine_types
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue("id_master_machine_types", item.value);
                    console.log(item);
                  },
                  Dropdown: {
                    borderWidth: 0.4,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              />
              {formik.errors.id_master_machine_types
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.id_master_machine_types}
                    </Text>;
                  }
                : null}
              <DropdownComp
                title="Main Activity"
                item={{
                  values: dataMainActivity.map((mainActivity) => ({
                    label: mainActivity.name,
                    value: mainActivity.id_master_main_activities,
                  })),
                  placeholder: dataMainActivity.find(
                    (item) =>
                      item.id_master_main_activities ===
                      formik.values.id_master_main_activities
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue(
                      "id_master_main_activities",
                      item.value
                    );
                    console.log(item);
                  },
                  Dropdown: {
                    borderWidth: 0.4,
                    borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              />
              {formik.errors.id_master_main_activities
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.id_master_main_activities}
                    </Text>;
                  }
                : null}
              {isEnable ? (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      backgroundColor: "white",
                      borderWidth: 0.4,
                      borderColor: "#88888D",
                      borderRadius: 10,
                      height: 45,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 10,
                      marginBottom: 10,
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
                      <Text style={styles.Abu}>Last HM </Text>
                    </View>
                    <View
                      style={[styles.container, { backgroundColor: "white" }]}
                    >
                      <View
                        style={[
                          styles.container,
                          {
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            marginRight: 20,
                          },
                        ]}
                      >
                        <Text style={{ fontSize: 16, color: "#88888D" }}>
                          XXX
                        </Text>
                      </View>
                    </View>
                  </View>
                  <InputData
                    Title="HM Current"
                    onChangeText={formik.handleChange("hm_current")}
                    item={{
                      placeholder: "XXX",
                      value: formik.values.hm_current,
                      Input: {
                        borderWidth: 0.5,
                        borderColor: "#88888D",
                        marginHorizontal: 10,
                        height: 45,
                      },
                    }}
                    buttonStyle={{
                      borderColor: "#DDDDDD",
                    }}
                  />
                  {formik.errors.hm_current
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.hm_current}
                    </Text>;
                  }
                : null}
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
                    label: "Keterangan",
                    placeholder: "Maintainance to Workshop for Repairment",
                    value: formik.values.keterangan,
                    backgroundColor: "red",
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
                onPress: () => formik.handleSubmit(),
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  MechInfo: {
    flex: 1,
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    marginLeft: 4,
  },
  Details1: {
    flex: 1,
    width: "95%",
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: 5,
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
    color: "#",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
});
