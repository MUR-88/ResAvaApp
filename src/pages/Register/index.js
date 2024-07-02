import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import {
  Button,
  CustomAlert,
  DropdownComp,
  Input,
  InputData,
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
import MasterMachine from "../../assets/Model/master_machine";
const Register = ({ navigation }) => {
  const [isFocus, setIsFocus] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleSubmit = () => {
    setShowAlert(false);
    formik.handleSubmit();
  };

  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  // console.log("data Company", dataCompany.length);
  const {
    data: dataMachine,
    isLoading: isLoadingMachine,
    connected: connectedMasterMachine,
  } = useMasterMachine({ isGetData: true });
  console.log("data Machine", dataMachine.length);
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

  let schema = yup.object().shape({
    current_hour_meter: yup
      .number()
      .required("Mohon masukkan format HM yang benar"),
    id_master_company: yup.string().required("Pilih Company"),
    id_master_machine: yup.string().required("Masukkan Machine ID"),
    id_master_machine_types: yup.string().required("Pilih Machine Type"),
    id_master_main_activities: yup.string().required("Pilih Main Activity"),
    brand: yup.string().required("Masukkan Brand"),
    class: yup.number().required("Masukkan Class"),
  });
  const formik = useFormik({
    initialValues: {
      id_master_company: "",
      master_machine_id: "",
      current_hour_meter: "",
      brand: "",
      class: "",
      id_master_machine: "",
      id_master_machine_types: "",
      id_master_main_activities: "",
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
              item.class = parseInt(values.class);
              item.current_hour_meter = parseInt(values.current_hour_meter);
              item.machine_id = values.id_master_machine;
              item.master_machine_types_id = values.id_master_machine_types;
              item.master_main_activity_id = values.id_master_main_activities;
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
                Register Machine
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
              {/* <DropdownComp
                title="Contractor"
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
                    // console.log(item);
                  },
                  Dropdown: {
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                }}
              /> */}
              <DropdownComp
                title="Contractor"
                item={{
                  values: dataCompany.map((company) => ({
                    label: company.name,
                    value: company.id_master_company,
                  })),
                  marginRight: -100,
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
                    // borderWidth: 0.4,
                    // borderColor: "#88888D",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                  containerStyle: {
                    marginRight: 100,
                    marginLeft: -100,
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
                    marginHorizontal: 10,
                    height: 45,
                  },
                }}
              />
              {formik.errors.brand
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.brand}
                    </Text>;
                  }
                : null}
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  marginRight: 40,
                  width: "100%",
                }}
              >
                <Text
                  style={[
                    styles.Abu,
                    { fontStyle: "italic", alignItems: "flex-end" },
                  ]}
                >
                  * Masukkan Full Brand Name
                </Text>
              </View>
              <InputData
                Title="Equipment Class"
                onChangeText={formik.handleChange("class")}
                item={{
                  placeholder: "30 (Ton)",
                  value: formik.values.class,
                  Input: {
                    marginHorizontal: 10,
                    height: 45,
                  },
                }}
                keyboardType="numeric"
              />
              {formik.errors.class
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.class}
                    </Text>;
                  }
                : null}
              <InputData
                Title="Machine ID"
                onChangeText={formik.handleChange("id_master_machine")}
                item={{
                  placeholder: "MCH001",
                  value: formik.values.id_master_machine,
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
                  marginRight: -100,
                  placeholder: dataMachineType.find(
                    (item) =>
                      item.id_master_machine_types ===
                      formik.values.id_master_machine_types
                  )?.name,
                  onChange: (item) => {
                    setIsFocus(false);
                    formik.setFieldValue("id_master_machine_types", item.value);
                    // console.log(item);
                  },
                  Dropdown: {
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                  containerStyle: {
                    marginRight: 100,
                    marginLeft: -100,
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
                  marginRight: -100,
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
                    marginHorizontal: 10,
                    marginVertical: 10,
                  },
                  containerStyle: {
                    marginRight: 100,
                    marginLeft: -100,
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
                onChangeText={formik.handleChange("current_hour_meter")}
                item={{
                  placeholder: "XXXX",
                  value: formik.values.current_hour_meter,
                  Input: {
                    marginHorizontal: 10,
                    height: 45,
                  },
                }}
                keyboardType="numeric"
              />
              {formik.errors.current_hour_meter
                ? () => {
                    <Text style={globalStyles.textError}>
                      {formik.errors.current_hour_meter}
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
                onPress: () => setShowAlert(true),
              }}
            />
            <CustomAlert
              visible={showAlert}
              message="Are you sure you want to submit the form?"
              onCancel={handleCancel}
              onConfirm={handleSubmit}
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
