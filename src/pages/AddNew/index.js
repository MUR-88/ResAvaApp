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
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
// import {color} from "../..variabel";
import "dayjs/locale/id";
import { Dropdown } from "react-native-element-dropdown";
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
import MasterSector from "../../assets/Model/master_sectors";
import MasterLogActivity from "../../assets/Model/master_log_activity";

const AddNew = ({ navigation }) => {
  // let schema = yup.object().shape({
  //   id_master_sector: yup.string().required("Required"),
  //   hm_current : yup.string().required("Mohon masukkan format yang benar"),
  //   id_master_company: yup.string().required("Required"),
  //   Date: yup.string().required("Required"),
  // });

  const {
    data: dataSector,
    isLoading: isLoadingSector,
    connected: connectedMasterSector,
  } = useMasterSector({ isGetData: true });
  console.log("data sector", dataSector.length);
  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  console.log("data Company", dataCompany.length);
  const {
    data: dataEstate,
    isLoading: isLoadingEstate,
    connected: connectedMasterEstate,
  } = useMasterEstate({ isGetData: true });
  console.log("data Estate", dataEstate.length);
  // console.log(JSON.stringify(dataEstate, null, 2));

  const {
    data: dataMachineType,
    isLoading: isLoadingMachineType,
    connected: connectedMasterMachineType,
  } = useMasterMachineType({ isGetData: true });
  console.log("data Machine Type", dataMachineType.length);
  // console.log(JSON.stringify(dataMachineType, null, 2));
  const {
    data: dataMachine,
    isLoading: isLoadingMachine,
    connected: connectedMasterMachine,
  } = useMasterMachine({ isGetData: true });
  console.log("data Machine", dataMachine.length);
  // console.log(JSON.stringify(dataMachine, null, 2));
  const {
    data: dataMainActivity,
    isLoading: isLoadingMainActivity,
    connected: connectedMasterMainActivity,
  } = useMasterMainActivity({ isGetData: true });
  console.log("data Main Activity", dataMainActivity.length);
  // console.log(JSON.stringify(dataMainActivity, null, 2));
  const {
    data: dataMasterLog,
    isLoading: isLoadingLog,
    connected: connectedMasterLog,
  } = useMasterLog({ isGetData: true });
  console.log("data Log", dataMasterLog.length);
  // console.log(JSON.stringify(dataMasterLog, null, 2));

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
  const [date, setDate] = useState(undefined);
  const [showTime, setShowTime] = useState(false);

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
      id_master_sector: "",
      id_master_company: "",
      Date: "",
      keterangan: "",
      hm_current: "",
      id_master_machine: "",
      id_master_estate: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
    },
    onSubmit: async (values) => {
      await database.write(async () => {
        const masterLog = await database
          .get(MasterLogActivity.table)
          .create((master_log_activities) => {
            master_log_activities.id_master_sector = values.id_master_sector;
            master_log_activities.id_master_company = values.id_master_company;
            master_log_activities.date = values.Date;
            master_log_activities.keterangan = values.keterangan;
            master_log_activities.hm_current = values.hm_current;
            master_log_activities.id_master_machine = values.id_master_machine;
            master_log_activities.id_master_estate = values.id_master_estate;
            master_log_activities.id_master_machine_types =
              values.id_master_machine_types;
            master_log_activities.id_master_main_activities =
              values.id_master_main_activities;
            // sector.isSynced = true;
            // sector.isConnected = true;
          });

        return masterLog;
      });
      console.log(values);
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <StatusBar style="light" />
      <RefreshControl>
        <Formik
          initialValues={
            {
              // id_master_sector, id_master_company, date
            }
          }
          onSubmit={async (values) => {}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmit,
            setFieldValue,
          }) => (
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
                            display="spinner"
                            minimumDate={startDate}
                            selected={date}
                            onDateChange={handleChangeDate}
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
                      props: dataCompany.map((company) => ({
                        label: company.name,
                        value: company.id_master_company,
                      })),
                      placeholder: dataCompany.find(
                        (item) =>
                          item.id_master_company ===
                          formik.values.id_master_company
                      )?.name,
                      onchange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue("id_master_company", item.value);
                        console.log(item);
                      },
                    }}
                  />
                  <DropdownComp
                    title="Sector"
                    item={{
                      props: dataSector.map((sector) => ({
                        label: sector.name,
                        value: sector.id_master_sectors,
                      })),
                      placeholder: dataSector.find(
                        (item) =>
                          item.id_master_sectors ===
                          formik.values.id_master_sector
                      )?.name,
                      onchange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue("id_master_sector", item.value);
                        console.log(item);
                      },
                    }}
                  />

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
                      props: dataMachine.map((machine) => ({
                        label: machine.machine_id,
                        value: machine.id_master_machine,
                      })),
                      placeholder: dataMachine.find(
                        (item) =>
                          item.id_master_machine ===
                          formik.values.id_master_machine
                      )?.name,
                      onchange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue("id_master_machine", item.value);
                        console.log(item);
                      },
                    }}
                  />
                  <DropdownComp
                    title="Estate"
                    item={{
                      props: dataEstate.map((estate) => ({
                        label: estate.name,
                        value: estate.id_master_estate,
                      })),
                      placeholder: dataEstate.find(
                        (item) =>
                          item.id_master_estate ===
                          formik.values.id_master_estate
                      )?.name,
                      onchange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue("id_master_estate", item.value);
                        console.log(item);
                      },
                    }}
                  />
                  <InputData
                    Title="Compartement ID"
                    item={{
                      placeholder: "XXX",
                      value: formik.values.compartement_id,
                    }}
                    buttonStyle={{
                      borderWidth: 0.1,
                      borderColor: "#DDDDDD",
                    }}
                  />
                  <DropdownComp
                    title="Machine Type"
                    item={{
                      props: dataMachineType.map((type) => ({
                        label: type.name,
                        value: type.id_master_machine_types,
                      })),
                      placeholder: dataMachineType.find(
                        (item) =>
                          item.id_master_machine_types ===
                          formik.values.id_master_machine_types
                      )?.name,
                      onchange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue(
                          "id_master_machine_types",
                          item.value
                        );
                        console.log(item);
                      },
                    }}
                  />
                  <DropdownComp
                    title="Main Activity"
                    item={{
                      props: dataMainActivity.map((mainActivity) => ({
                        label: mainActivity.name,
                        value: mainActivity.id_master_main_activities,
                      })),
                      placeholder: dataMainActivity.find(
                        (item) =>
                          item.id_master_main_activities ===
                          formik.values.id_master_main_activities
                      )?.name,
                      onchange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue(
                          "id_master_main_activities",
                          item.value
                        );
                        console.log(item);
                      },
                    }}
                  />
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
                          style={[
                            styles.container,
                            { backgroundColor: "white" },
                          ]}
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
                        Title="Current HM"
                        item={{
                          placeholder: "XXX",
                          value: formik.values.hm_current,
                        }}
                        buttonStyle={{
                          borderColor: "#DDDDDD",
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
                <View
                  style={[styles.container, { paddingVertical: 10 }]}
                ></View>
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
                    style={[
                      styles.containerInput,
                      { backgroundColor: "#D8D8D8" },
                    ]}
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
                    onPress: () => handleSubmit("Home"),
                  }}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
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
