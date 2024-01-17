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
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import API from "../../function/API";
import {
  useMasterCompany,
  useMasterMachineType,
  useMasterMainActivity,
} from "../../hooks";
import { Formik, useFormik } from "formik";
import { Button, DropdownComp, Input, InputData } from "../../component";
import { Dropdown } from "react-native-element-dropdown";

const Register = () => {
  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  console.log("data Company", dataCompany.length);

  const {
    data: dataMainActivity,
    isLoading: isLoadingMainActivity,
    connected: connectedMasterMainActivity,
  } = useMasterMainActivity({ isGetData: true });
  console.log("data Main Activity", dataMainActivity.length);
  // console.log(JSON.stringify(dataMainActivity, null, 2));

  const {
    data: dataMachineType,
    isLoading: isLoadingMachineType,
    connected: connectedMasterMachineType,
  } = useMasterMachineType({ isGetData: true });
  console.log("data Machine Type", dataMachineType.length);
  // console.log(JSON.stringify(dataMachineType, null, 2));

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

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const formik = useFormik({
    initialValues: {
      Date: "",
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
    // validationSchema: schema,
    onSubmit: async (values) => {
      await database.write(async () => {
        try {
          const masterLog = await database
            .get(MasterLogActivity.table)
            .create((item) => {
              item.created_at = values.Date;
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
          navigation.replace("Mytabs");
          return masterLog;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error.message,
          });
          console.log(error);
        }
      });
      console.log(values);
    },
  });

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
            <DropdownComp
              title="Company"
              item={{
                props: dataCompany.map((company) => ({
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
                Dropdown: { height: 50 },
              }}
            />

            <InputData
              Title="Equipment Brand"
              item={{
                placeholder: "CATTERPILAR",
                value: formik.values.brand,
                Input: { height: 45 },
              }}
              buttonStyle={{
                borderColor: "#DDDDDD",
              }}
            />

            <InputData
              Title="Equipment Class (Ton)"
              item={{
                placeholder: "40",
                value: formik.values.clas,
                Input: { height: 45 },
              }}
              buttonStyle={{
                borderColor: "#DDDDDD",
              }}
            />

            <InputData
              Title="Machine ID"
              item={{
                placeholder: "MCH_123",
                value: formik.values.machine_id,
                Input: { height: 45 },
              }}
              buttonStyle={{
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
                onChange: (item) => {
                  setIsFocus(false);
                  formik.setFieldValue("id_master_machine_types", item.value);
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
                onChange: (item) => {
                  setIsFocus(false);
                  formik.setFieldValue("id_master_main_activities", item.value);
                  console.log(item);
                },
              }}
            />
            {/* <View
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
            </View> */}
             <InputData
              Title="Hour Meter - Current"
              item={{
                placeholder: "40",
                value: formik.values.hm_current,
                Input: { height: 45 },
              }}
              buttonStyle={{
                borderColor: "#DDDDDD",
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              justifyContent: "center",
              alignContent: "center",
              marginBottom: 20,
              marginTop:10
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
    justifyContent: "center",
    alignContent: "center",
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
    flexDirection: "column",
    marginHorizontal: 10,
  },
  dropdown: {
    height: 40,
    backgroundColor: "white",
    opacity: 0.4,
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
