import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownComp, Header } from "../../component";
import AutoHeightImage from "react-native-auto-height-image";
import { Profile_Set, PanahKiri } from "../../assets/icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMasterCompany, useMasterLog, useMasterMachine } from "../../hooks";
import { Formik, useFormik } from "formik";
import dayjs from "dayjs";
import { Dropdown } from "react-native-element-dropdown";

const Status = ({ navigation }) => {
  const [isFocus, setIsFocus] = React.useState(false);

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
        console.log(database);
      }
    },
  });
  // console.log(formik.errors);
  console.log("value", formik.values);
  const {
    data: dataCompany,
    isLoading: isLoadingCompany,
    connected: connectedMasterCompany,
  } = useMasterCompany({ isGetData: true });
  console.log("data Company", dataCompany.length);
  const {
    data: dataMasterLog,
    isLoading: isLoadingLog,
    connected: connectedMasterLog,
  } = useMasterLog({ isGetData: true });
  console.log("data Log", dataMasterLog.length);
  // console.log(JSON.stringify(dataMasterLog, null, 2));

  const {
    data: dataMachine,
    isLoading: isLoadingMachine,
    connected: connectedMasterMachine,
  } = useMasterMachine({ isGetData: true });
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <Header title="Status Machine" />
        <View
          style={{
            position: "absolute",
            height: height,
            width: width,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
        >
          <View style={styles.Container_bar}>
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ flex: 1, flexDirection: "row", backgroundColor: "" }}
                >
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AutoHeightImage
                      source={PanahKiri}
                      width={25}
                      style={{ marginTop: 7, marginRight: 5, opacity: 0.65 }}
                    />
                  </TouchableOpacity>
                  <AutoHeightImage
                    source={Profile_Set}
                    width={35}
                    style={{ justifyContent: "center" }}
                  />
                  <View style={{ flex: 1, width: 20, marginLeft:10 }}>
                    <Dropdown
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={dataCompany.map((company) => ({
                        label: company.name,
                        value: company.id_master_company,
                      }))}
                      maxHeight={300}
                      width={20}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={
                        dataCompany.find(
                          (item) =>
                            item.id_master_company ===
                            formik.values.id_master_company
                        )?.name
                      }
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setIsFocus(false);
                        formik.setFieldValue("id_master_company", item.value);
                        console.log(item);
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
                  marginTop: 15,
                  marginBottom: 10,
                  marginRight: -200,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  fontWeight: "bold",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Machine Id</Text>
                <Text style={{ fontWeight: "bold" }}>Last Update</Text>
                <Text style={{ fontWeight: "bold" }}>Status</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: -20,
                  borderBottomColor: "#3C3C43",
                  opacity: 0.3,
                  borderBottomWidth: 1,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              />
            </View>
            {dataMasterLog
              .filter(
                (item) =>
                  item.master_company_id === formik.values.id_master_company
              )
              .map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                    justifyItem: "center",
                    marginHorizontal: 15,
                    opacity: 0.8,
                    // marginRight:10
                  }}
                >
                  <Text style={{}}>
                    {
                      dataMachine.find(
                        (select) =>
                          select.id_master_machine === item.id_master_machine
                      )?.machine_id
                    }
                  </Text>
                  <Text style={{ marginVertical: 5, marginLeft: 10 }}>
                    {dayjs(item.updated_at).locale("id").format("DD/MMM/YYYY ")}
                  </Text>
                  <View
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor:
                        dayjs(item.updated_at)
                          .locale("id")
                          .format("DD/MMM/YYYY") ===
                        dayjs().format("DD/MMM/YYYY")
                          ? "green"
                          : "red",
                      width: 15,
                      height: 15,
                      borderRadius: 40,
                    }}
                  />
                </View>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  Container_bar: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 200,
    position: "absolute",
    bottom: 0,
    padding: 12,
    height: 450,
    width: "100%",
  },
});

const { width, height } = Dimensions.get("screen");
