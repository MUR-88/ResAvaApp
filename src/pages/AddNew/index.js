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
import {
  Button,
  DropdownComp,
  Input,
  InputData,
  PilihTanggal,
} from "../../component";
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
import { globalStyles } from "../../styles";
import MasterLogActivity from "../../assets/Model/master_log_activity";
import dayjs from "dayjs";
import { synchronize } from "@nozbe/watermelondb/sync";
import { API } from "../../function";
import { hasUnsyncedChanges } from "@nozbe/watermelondb/sync";
import { Q } from "@nozbe/watermelondb";
// import { Alert } from "react-native-web";

const AddNew = ({ navigation }) => {
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
  console.log("data Company", dataCompany.length);
  const {
    data: dataEstate,
    isLoading: isLoadingEstate,
    connected: connectedMasterEstate,
  } = useMasterEstate({ isGetData: true });
  console.log("data Estate", dataEstate.length);
  // console.log(JSON.stringify(dataEstate, null, 2));d

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
  // console.log(JSON.stringify(dataMasterLog, null, 2));
  // console.log("data Log", dataMasterLog.length);

  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();

  const startDate = getFormatedDate(today.setDate(today.getDate() - 2));

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [text, setText] = useState("Computer On Or Off ?");
  const [isFocus, setIsFocus] = useState(true);
  const [date, setDate] = useState(undefined);

  const mySync = async () => {
    try {
      //batas sync

      await synchronize({
        database,
        pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
          console.log("last pull at masater Log", lastPulledAt);
          const urlParams = `last_pulled_at=${
            lastPulledAt ? lastPulledAt : ""
          }&schema_version=${schemaVersion}&migration=${encodeURIComponent(
            JSON.stringify(migration)
          )}`;
          const response = await API.get(`log_activity/sync?${urlParams}`);
          // Check if the request was successful
          if (response.status_code !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          const timestamp = dayjs().locale("id").unix() * 1000;

          console.log("last_pull_at", timestamp);
          return { changes: response.data, timestamp: timestamp };
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
          const masterLogCreated = changes.master_log_activities.created.filter(
            (item) => item.isSync === false
          );
          const masterLogUpdated = changes.master_log_activities.updated.filter(
            (item) => item.isSync === false
          );

          const masterMachineCreated = changes.master_machine.created.filter(
            (item) => item.isSync === false
          );
          const masterMachineUpdated = changes.master_machine.updated.filter(
            (item) => item.isSync === false
          );

          try {
            const response = await API.post("push/data", {
              master_log_activities: {
                created: masterLogCreated,
                updated: masterLogUpdated,
              },
              master_machine: {
                created: masterMachineCreated,
                updated: masterMachineUpdated,
              },
              last_pulled_at: lastPulledAt,
            });

            const allMasterLog = await database
              .get("master_log_activities")
              .query(Q.where("isSync", false))
              .fetch();

            for (let i = 0; i < allMasterLog.length; i++) {
              await allMasterLog[i].update((masterLog) => {
                masterLog.isSync = true;
              });
            }

            const allMasterMachine = await database
              .get("master_machine")
              .query(Q.where("isSync", false))
              .fetch();

            for (let i = 0; i < allMasterMachine.length; i++) {
              await allMasterMachine[i].update((masterMachine) => {
                masterMachine.isSync = true;
              });
            }

            console.log("response", response);
            return Promise.resolve();
          } catch (e) {
            console.log(e);
            return Promise.reject();
          }

          const response = await fetch(`=${lastPulledAt}`, {
            method: "POST",
            body: JSON.stringify(changes),
          });
          if (!response.ok) {
            throw new Error(await response.text());
          }
          console.log("push", changes);
          // console.log(JSON.stringify(changes, null, 2));
          return Promise.reject();
        },
        migrationsEnabledAtVersion: 1,
      });

      const response = await hasUnsyncedChanges({ database });
      console.log("response changes", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
  // let schema = yup.object().shape({
  //   // current_hour_meter: yup.number().when("filteredData", {
  //   //   is: (filteredData) => filteredData && filteredData.length > 0,
  //   //   then: yup
  //   //     .number()
  //   //     .required("Mohon masukkan format yang benar")
  //   //     .positive("Nilai harus positif")
  //   //     .max(24, "Nilai maksimum adalah 24")
  //   //     .test({
  //   //       name: "notMoreThanLastHM",
  //   //       exclusive: true,
  //   //       message: "Nilai tidak boleh lebih besar dari nilai terakhir",
  //   //       test: (value) => value <= getLastHM,
  //   //     }),
  //   //   else: yup.number(),
  //   // }),

  //   // Perform the validation
  //   // compartement_id: yup
  //   //   .string()
  //   //   .matches(/^\d{1,3}$/, "Input must be a number with 1 to 3 digits")
  //   //   .min(1)
  //   //   .required("Masukkan Compartement ID"),
  //   // // Date: yup.date().required("Required"),
  //   id_master_sector: yup.number().required("Pilih Sector"),
  //   id_master_company: yup.number().required("Pilih Company"),
  //   id_master_machine: yup.number().required("Pilih Machine ID"),
  //   id_master_estate: yup.number().required("Pilih Estate"),
  //   id_master_machine_types: yup.number().required("Pilih Machine Type"),
  //   id_master_main_activities: yup.number().required("Pilih Main Activity"),
  // });

  const formik = useFormik({
    initialValues: {
      date: "",
      id_master_sectors: "",
      id_master_company: "",
      master_machine_id: "",
      id_master_estate: "",
      compartement_id: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
      current_hour_meter: "",
      keterangan: "",
    },
    validationSchema: schema,

    onSubmit: async (values) => {
      try {
        // todo buat safety input hm <24 jam
        // Tambahkan Label Input 24 jam
        // install filament

        await database.write(async () => {
          const masterLog = await database
            .get(MasterLogActivity.table)
            .create((item) => {
              item.id_master_log_activity = dataMasterLog.length + 1;
              item.master_sector_id = values.id_master_sectors;
              item.master_company_id = values.id_master_company;
              item.master_machine_id = values.master_machine_id;
              item.master_estate_id = values.id_master_estate;
              item.compartement_id = values.compartement_id;
              item.master_machine_types_id = values.id_master_machine_types;
              item.master_main_activity_id = values.id_master_main_activities;
              item.current_hour_meter = parseInt(values.current_hour_meter);
              item.keterangan = values.keterangan;
              item.isSynced = false;
              item.isConnected = false;
              item.date = dayjs(values.date).unix() * 1000;
            });
          // console.log(JSON.stringify(masterLog, null, 2));
          Toast.show({
            visibilityTime: 500,
            type: "success",
            text1: "Yeay, Berhasil!",
            text2: "Data Log Activity Berhasil Ditambahkan",
          });
          console.log("masterLog", database);
          return masterLog;
        });
        navigation.replace("Mytabs");
      } catch (error) {
        visibilityTime: 500,
          Toast.show({
            type: "error",
            text1: error.message,
          });
        console.log(database);
      }
    },
  });

  let schema = yup.object().shape({
    current_hour_meter: yup.number().max(24, "tidak lebih dari 24 jam").required("Mohon masukkan format yang benar"),
    compartement_id: yup
      .string()
      .matches(/^[A-Za-z]{1,2}\d{1,3}$/, "Input must follow the format AB003")
      .min(1)
      .required("Masukkan Compartement ID"),
    // Date: yup.date().required("Required"),
    id_master_sectors: yup.string().required("Pilih Sector"),
    id_master_company: yup.string().required("Pilih Company"),
    master_machine_id: yup.string().required("Pilih Machine ID"),
    id_master_estate: yup.string().required("Pilih Estate"),
    id_master_machine_types: yup.string().required("Pilih Machine Type"),
    id_master_main_activities: yup.string().required("Pilih Main Activity"),
    compartement_id: yup.string().required("Masukkan Compartement ID"),
  });

  console.log(formik.errors);
  console.log("value", formik.values);

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
            <TouchableOpacity>
              <Text onPress={mySync}>Sync</Text>
            </TouchableOpacity>
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
                      item.id_master_sectors === formik.values.id_master_sectors
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
                      item.master_machine_id === formik.values.master_machine_id
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
                  {formik.errors.current_hour_meter ? (
                    <Text style={globalStyles.textError}>
                      {formik.errors.current_hour_meter}
                    </Text>
                  ) : null}
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
