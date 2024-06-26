import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
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
  useMasterMachineType,
  useMasterMachine,
  useMasterMainActivity,
  useMasterLog,
} from "../../hooks";
import { Formik, useFormik } from "formik";
import { database } from "../../assets/Model/db";
import Toast from "react-native-toast-message";
import { globalStyles } from "../../styles";
import MasterLogActivity from "../../assets/Model/master_log_activity";
import dayjs from "dayjs";

const schema = yup.object().shape({
  current_hour_meter: yup
    .number()
    .max(24, "tidak lebih dari 24 jam")
    .required("Mohon masukkan format yang benar"),
  master_machine_id: yup
    .string()
    .matches(/^[A-Za-z]{1,2}\d{1,3}$/, "Input must follow the format AB003")
    .min(1)
    .required("Masukkan Machine Id"),
  id_master_sectors: yup.string().required("Pilih Sector"),
  id_master_company: yup.string().required("Pilih Company"),
  master_machine_id: yup.string().required("Pilih Machine ID"),
  id_master_machine_types: yup.string().required("Pilih Machine Type"),
  id_master_main_activities: yup.string().required("Pilih Main Activity"),
  compartement_id: yup.string().required("Pilih Compartement"),
  current_hour_meter: yup.string().required("Pilih Hour Meter"),
  date: yup.string().required("Pilih Date"),
});

const AddNew = ({ navigation, title }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();

  const startDate = getFormatedDate(today.setDate(today.getDate() - 2));

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [text, setText] = useState("Computer On Or Off ?");
  const [isFocus, setIsFocus] = useState(true);
  const [date, setDate] = useState(undefined);

  const toggleSwitch = () => {
    try {
      if (isEnable) {
        setText("Active");
      } else {
        setText("Inactive");
      }
      setIsEnable((previouvsState) => !previouvsState);
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      date: "",
      id_master_sectors: "",
      id_master_company: "",
      master_machine_id: "",
      compartement_id: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
      current_hour_meter: "",
      keterangan: "",
      id_master_log_activity: "",
    },
    validationSchema: schema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        await database.write(async () => {
          const masterLog = await database
            .get(MasterLogActivity.table)
            .create((item) => {
              item.id_master_log_activity = dataMasterLog.length + 1;
              item.master_sector_id = values.id_master_sectors;
              item.master_company_id = values.id_master_company;
              item.master_machine_id = values.master_machine_id;
              item.compartement_id = values.compartement_id;
              item.master_machine_types_id = values.id_master_machine_types;
              item.master_main_activity_id = values.id_master_main_activities;
              item.current_hour_meter = parseInt(values.current_hour_meter);
              item.keterangan = values.keterangan;
              item.isSynced = false;
              item.isConnected = false;
              item.created_at = dayjs(values.date).unix() * 1000;
              item.date = dayjs(values.date).unix() * 1000;
            });
          Toast.show({
            visibilityTime: 5000,
            type: "success",
            text1: "Yeay, Berhasil!",
            text2: "Data Log Activity Berhasil Ditambahkan",
          });

          // console.log("masterLog", database);
          console.log("date", dayjs(values.date).unix());
          return masterLog;
        });
        navigation.replace("Mytabs");
        // formik.resetForm();
      } catch (error) {
        Toast.show({
          visibilityTime: 5000,
          type: "error",
          text1: error.message,
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (formik.values.master_machine_id) {
      // query data machine type  berdasarkan machine id
      formik.setFieldValue(
        "id_master_machine_type",
        dataMachine.find(
          (item) => item.master_machine_id === formik.values.master_machine_id
        ).id_master_machine_types
      );
      // main activity
      formik.setFieldValue(
        "id_master_machine_type",
        dataMachine.find(
          (item) => item.master_machine_id === formik.values.master_machine_id
        ).id_master_machine_types
      );
    }
  }, [formik.values.master_machine_id]);

  console.log(formik.errors);
  console.log("value", formik.values);

  const {
    data: dataSector,
    isLoading: isLoadingSector,
    connected: connectedMasterSector,
  } = useMasterSector({ isGetData: true });
  console.log("data sector", dataSector.length);
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
  console.log("data Machine", dataMachine.length);
  console.log(JSON.stringify(dataMachine, null, 2));
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

  const [hm, setHm] = useState(0);

  useEffect(() => {
    const hmArray = dataMasterLog
      .filter(
        (item) => item.master_machine_id === formik.values.master_machine_id
      )
      .map((item, index, array) =>
        index === array.length - 1 ? item.current_hour_meter : null
      );

    setHm(hmArray.length > 0 ? hmArray[0] : 0);
  }, [formik.values.master_machine_id, dataMasterLog]);

  // const [refreshing, setRefreshing] = useState(false);
  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await getAllLog();
  //   await getAllMachine();
  //   await getAllCompany();
  //   await getAllSector();
  //   await getAllMachineType();
  //   await getAllMainActivity();
  //   setRefreshing(false);
  // };
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
                Add New
              </Text>
            </View>
          </View>
          {loading ? (
            <>
              <View style={[styles.loading, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            </>
          ) : (
            <>
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
                            onSelectedChange={(date) => setDate(date)}
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
                          : "pilih tanggal"}
                      </Text>
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
                          item.id_master_company ===
                          formik.values.id_master_company
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
                          item.id_master_sectors ===
                          formik.values.id_master_sectors
                      )?.name,
                      onChange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue("id_master_sectors", item.value);
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
                  {formik.errors.id_master_sectors
                    ? () => {
                        <Text style={globalStyles.textError}>
                          {formik.errors.id_master_sectors}
                        </Text>;
                      }
                    : null}

                  <InputData
                    Title="Compartement ID"
                    onChangeText={formik.handleChange("compartement_id")}
                    item={{
                      placeholder: "Ex : AB001",
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
                      values: dataMachine
                        .filter((selected) => {
                          return (
                            selected.master_company_id ===
                            formik.values.id_master_company
                          );
                          // console.log("Values", selected)
                        })
                        .map((machine) => ({
                          label: machine.machine_id,
                          value: machine.master_machine_id,
                        })),
                      placeholder: dataMachine.find(
                        (item) =>
                          item.master_machine_id ===
                          formik.values.master_machine_id
                      )?.machine_id,
                      onChange: (item) => {
                        setIsFocus(false);
                        formik.setFieldValue("master_machine_id", item.value);
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
                  {formik.errors.master_machine_id
                    ? () => {
                        <Text style={globalStyles.textError}>
                          {formik.errors.master_machine_id}
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
                        formik.setFieldValue(
                          "id_master_machine_types",
                          item.value
                        );
                        // console.log(item);
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
                      values: dataMainActivity
                        .filter((selected) => {
                          return (
                            selected.master_machine_types_id ===
                            formik.values.id_master_machine_types
                          );
                          // console.log("Values", selected)
                        })
                        .map((mainActivity) => ({
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
                        // console.log(item);
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
                              {dataMasterLog
                                .filter(
                                  (item) =>
                                    item.master_machine_id ===
                                    formik.values.master_machine_id
                                )
                                .map((item, index, array) => {
                                  if (index === array.length - 1) {
                                    return item.current_hour_meter;
                                  } else {
                                    return null;
                                  }
                                })}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <InputData
                        Title="HM Current"
                        onChangeText={formik.handleChange("current_hour_meter")}
                        item={{
                          placeholder: "XXX",
                          value: formik.values.current_hour_meter,
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
                      {/* <Label title="Mohon masukkan HM tidak lebih dari 24" /> */}
                      {formik.values.current_hour_meter - hm > 24 ? (
                        <View style={[styles.Label]}>
                          <Text style={globalStyles.textError}>
                            HM tidak boleh lebih dari 24 jam
                          </Text>
                        </View>
                      ) : null}
                      {formik.values.current_hour_meter < hm ? (
                        <View style={[styles.Label]}>
                          <Text style={globalStyles.textError}>
                            HM tidak boleh lebih dari 24 jam
                          </Text>
                        </View>
                      ) : null}
                      <View style={[styles.Label]}>
                        <Text
                          style={[
                            styles.Abu,
                            { fontStyle: "italic", alignItems: "flex-end" },
                          ]}
                        >
                          * Masukkan HM tidak lebih dari 24 jam
                        </Text>
                      </View>
                      {formik.errors.current_hour_meter ? (
                        <Text style={globalStyles.textError}>
                          {formik.errors.current_hour_meter}
                        </Text>
                      ) : null}
                    </>
                  ) : null}
                  <InputData
                    Title="Refueling Oil"
                    onChangeText={formik.handleChange("oil")}
                    item={{
                      placeholder: "100(Litre)",
                      value: formik.values.oil,
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
                  <View style={[styles.Label]}>
                    <Text
                      style={[
                        styles.Abu,
                        { fontStyle: "italic", alignItems: "flex-end" },
                      ]}
                    >
                      * Input hanya angka saja
                    </Text>
                  </View>
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
                  flex: 1,
                  alignItems: "flex-start",
                  marginLeft: 30,
                  width: "100%",
                }}
              >
                <Text
                  style={[
                    styles.Abu,
                    { fontStyle: "italic", alignItems: "flex-end" },
                  ]}
                >
                  Keterangan
                </Text>
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
                      Title="Ketrangan"
                      onChangeText={formik.handleChange("keterangan")}
                      item={{
                        placeholder: "Ex : Under Maintanance",
                        values: formik.values.keterangan.toString(),
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
                    {/* <InputData
                      onChangeText={formik.handleChange("keterangan")}
                      item={{
                        placeholder: "Ex : AB001",
                        value: formik.values.keterangan,
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
                    /> */}
                  </View>
                </View>
              </View>
              {formik.values.current_hour_meter !== formik.values.current_hour_meter ? (
                <View style={styles.Label}>
                  <Text style={globalStyles.textError}>
                    Silahkan Masukkan Justifikasi
                  </Text>
                </View>
              ) : null}
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
            </>
          )}
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
  Abu1: {
    color: "black",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  Label: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 40,
    width: "100%",
  },
  loading: {
    flex: 1,
    marginLeft: -20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
