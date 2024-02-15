import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { Button, DropdownComp, Input, InputData } from "../../component";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
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
import MasterMachine from "../../assets/Model/master_machine";
const Register = ({ navigation }) => {
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
  const [isFocus, setIsFocus] = useState(true);

  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  console.log("data Company", dataCompany.length);
  const {
    data: dataMachine,
    isLoading: isLoadingMachine,
    connected: connectedMasterMachine,
  } = useMasterMachine({ isGetData: true });
  console.log("data Machine", dataCompany.length);
  console.log(JSON.stringify(dataMachine, null, 2));
  const {
    data: dataMachineType,
    isLoading: isLoadingMachineType,
    connected: connectedMasterMachineType,
  } = useMasterMachineType({ isGetData: true });
  console.log("data Machine Type", dataMachineType.length);
  // console.log(JSON.stringify(dataMachineType, null, 2));
  const {
    data: dataMainActivity,
    isLoading: isLoadingMainActivity,
    connected: connectedMasterMainActivity,
  } = useMasterMainActivity({ isGetData: true });
  console.log("data Main Activity", dataMainActivity.length);
  // console.log(JSON.stringify(dataMainActivity, null, 2));

  const formik = useFormik({
    initialValues: {
      id_master_company: "",
      brand: "",
      class: "",
      machine_id: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
      hm_current: "",
    },
    validationSchema: schema,

    onSubmit: async (values) => {
      try {
        //   console.log("value", values.date);
        //   console.log("value", dayjs(values.date).unix());
        await database.write(async () => {
          const masterMachine = await database
            .get(MasterMachine.table)
            .create((item) => {
              item.master_machine_id = dataMachine.length + 1;
              item.master_company_id = values.id_master_company;
              item.brand = values.brand;
              item.class = values.class;
              item.machine_id = values.machine_id;
              item.master_machine_types_id = values.id_master_machine_types;
              item.master_main_activity_id = values.id_master_main_activities;
              item.hm_current = values.hm_current;
              item.isSynced = false;
              item.isConnected = false;
            });
          console.log("masterMachine", database);
          return masterMachine;
        });
        Toast.show({
          visibilityTime: 10000,
          type: "success",
          text1: "Yeay, Berhasil!",
          text2: "Data Mesin Berhasil Ditambahkan",
        });
        navigation.replace("Mytabs");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
        console.log(database);
      }
    },
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
                marginLeft: 5,
              }}
            >
              Details
            </Text>
            {/* {dataMachine.map((item, index, array) => {
              if (index === array.length - 1) {
                console.log("item", item);
              }
            })} */}
            <View style={[styles.MechInfo]}>
              <DropdownComp
                title="Company ID"
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
              <InputData
                Title="Brand"
                onChangeText={formik.handleChange("brand")}
                item={{
                  placeholder: "KOMATSU",
                  value: formik.values.brand,
                  Input: {
                    // borderWidth: 0.5,
                    // borderColor: "#88888D",
                    marginHorizontal: 10,
                    height: 45,
                  },
                }}
              />
              <InputData
                Title="Equipment Class (TON)"
                onChangeText={formik.handleChange("class")}
                item={{
                  placeholder: "30",
                  value: formik.values.class,
                  Input: {
                    // borderWidth: 0.5,
                    // borderColor: "#88888D",
                    marginHorizontal: 10,
                    height: 45,
                  },
                }}
              />
              <InputData
                Title="Machine ID"
                onChangeText={formik.handleChange("machine_id")}
                item={{
                  placeholder: "MCH_301",
                  value: formik.values.machine_id,
                  Input: {
                    marginHorizontal: 10,
                    height: 45,
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

              <InputData
                Title="HM Current"
                onChangeText={formik.handleChange("hm_current")}
                item={{
                  placeholder: "XXX",
                  value: formik.values.hm_current,
                  Input: {
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
            </View>
            <View style={[styles.container, { paddingVertical: 10 }]}></View>
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

  containerInput: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: "95%",
    height: 100,
    borderColor: "#8888D",
    alignItems: "center",
    opacity: 0.4,
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
