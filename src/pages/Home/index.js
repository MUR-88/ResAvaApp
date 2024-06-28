import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Delete, Export, Export_Biru, Profile_Set } from "../../assets/icon";
import AutoHeightImage from "react-native-auto-height-image";
import { Button, CustomAlert, Input, PilihTanggal } from "../../component";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import API from "../../function/API";
import dayjs from "dayjs";
import NetInfo from "@react-native-community/netinfo";
import { database } from "../../assets/Model/db";
import {
  useMasterSector,
  useMasterCompany,
  useMasterMachineType,
  useMasterMachine,
  useMasterMainActivity,
  useMasterLog,
  useLoadingStore,
} from "../../hooks";
import Toast from "react-native-toast-message";

const Home = ({ navigation }) => {
  const { isLoading } = useLoadingStore();
  const [exportedData, setExportedData] = useState(null);
  // console.log("isLoading", isLoading);
  const [showAlert, setShowAlert] = useState(false);

  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleSubmit = (item) => {
    setShowAlert(false);
    // navigation.navigate("Edit");
    navigation.navigate("Edit", {
      masterLog: item,
    });
  };

  const handleLogout = async () => {
    try {
      const response = await API.post("logout");
      navigation.replace("Login"); // Assuming 'Login' is the login screen route name
      // console.log(response);
    } catch (error) {
      // console.error("Error logging out:", error);
    }
  };

  const deleteAllRecords = async (id) => {
    try {
      // Menghapus data
      await database.write(async () => {
        const log = await database.get("master_log_activities").find(id);
        if (log) {
          // await log.destroyPermanently(); // Use destroyPermanently to immediately remove the record
          await log.markAsDeleted(); // syncAble
          // navigation.replace("Home");
          // console.log("Log deleted", database);
          Toast.show({
            visibilityTime: 100,
            type: "success",
            text1: "Yeay, Berhasil!",
            text2: "Data Log Activity Berhasil Dihapus",
          });
        } else {
          // console.log("Log not found");
        }
      });
    } catch (error) {
      Toast.show({
        visibilityTime: 100,
        type: "error",
        text1: error.message,
      });
      // console.error("Error:", error);
    }
  };

  const [isConnected, setIsConnected] = useState(true);

  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkInternetConnection();
  }, []);

  const today = new Date();

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
    getAllLog,
    isLoading: isLoadingLog,
    connected: connectedMasterLog,
  } = useMasterLog({ isGetData: true });
  console.log("data Log", dataMasterLog.length);
  console.log(JSON.stringify(dataMasterLog, null, 2));

  const queryClient = useQueryClient();
  // Queries
  const getHistory = () => {
    return API.get("history");
  };

  const query = useQuery({ queryKey: ["history"], queryFn: getHistory });
  // console.log("query data", query?.data?.data?.data);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getAllLog();
    setRefreshing(false);
  };
  const [isExport, setIsExport] = useState(false);

  // const exportData = async () => {
  //   try {
  //     const response = await API.get("export_data");
  //     console.log(response);
  //     setIsExport(true);
  //   } catch (error) {
  //     console.error("Error exporting data:", error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get("export_data"); // Replace with your backend URL
      const data = await response.json();
      setExportedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const shareViaWhatsApp = () => {
    try {
      if (exportedData) {
        const message = `Check out the exported data: ${exportedData.message}`;
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
          message
        )}`;

        Linking.openURL(whatsappUrl)
          .then(() => console.log("Message sent to WhatsApp"))
          .catch((error) => console.error("Error opening WhatsApp:", error));
      }
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar style="light" />
      {isConnected ? (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              backgroundColor: "#007AFF",
              height: 100,
              justifyContent: "flex_start",
            }}
          >
            <View style={[styles.Kotak]}>
              <Text style={[styles.Header1]}>Home</Text>
              <TouchableOpacity onPress={handleLogout}>
                <View style={[styles.Profile_Circle]}>
                  <AutoHeightImage
                    source={Profile_Set}
                    width={35}
                    style={{ justifyContent: "center" }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.Content2, { marginHorizontal: 10 }]}>
            <View style={{ flexDirection: "row", marginTop: 5, flex: 1 }}>
              <View>
                <Text
                  style={{
                    color: "#007AFF",
                    fontSize: 18,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Today's Update
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginRight: -30,
                }}
              >
                <View style={{ flex: 1, marginLeft: 50 }}>
                  <Button
                    buttonStyle={{
                      borderRadius: 20,
                    }}
                    item={{
                      title: "Status",
                      height: 25,
                      width: "100%",
                      textcolor: "#007AFF",
                      backgroundcolor: "#DEEBFF",
                      alginSelf: "center",
                      borderRadius: 20,
                      onPress: () => navigation.navigate("Status"),
                    }}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Button
                    buttonStyle={{
                      borderRadius: 20,
                    }}
                    item={{
                      title: "Sync",
                      height: 25,
                      width: "60%",
                      textcolor: "#007AFF",
                      backgroundcolor: "#DEEBFF",
                      borderRadius: 20,
                      alginSelf: "center",
                      onPress: () => navigation.navigate("Splash"),
                    }}
                  />
                </View>
              </View>
            </View>
            {/* <TouchableOpacity onPress={exportData}> */}
            {exportedData ? null : (
              <TouchableOpacity onPress={shareViaWhatsApp}>
                <AutoHeightImage
                  source={Export_Biru}
                  width={30}
                  style={{ marginTop: 10, marginBottom: 10 }}
                />
              </TouchableOpacity>
            )}
          </View>
          {isLoading ? (
            <>
              <View style={[styles.loading, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            </>
          ) : (
            <>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                {dataMasterLog
                  .sort((a, b) => dayjs(b.created_at) - dayjs(a.created_at))
                  .filter(
                    (item) =>
                      dayjs(item.date) >= today.setDate(today.getDate() - 5)
                  )
                  .map((item, index) => (
                    <View style={[styles.Isi]}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        key={`master_Activity${index}`}
                      >
                        <Text
                          style={{
                            color: "#3C3C43",
                            marginVertical: 5,
                            marginLeft: 10,
                            opacity: 0.6,
                          }}
                        >
                          {dayjs(item.updated_at)
                            .locale("id")
                            .format("DD/MMM/YYYY ")}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignContent: "center",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor:
                                item.isSync === true ? "#6BBC3B" : "#88888D",
                              width: 15,
                              justifyContent: "center",
                              borderRadius: 50,
                              height: 15,
                              marginTop: 5,
                            }}
                          />
                          <TouchableOpacity
                            // onPress={onDelete}
                            // onPress={() => deleteAllRecords(item.id)}
                            onPress={() => {
                              Alert.alert(
                                "Confirm Deletion",
                                "Are you sure you want to delete This records?",
                                [
                                  {
                                    text: "Cancel",
                                    style: "cancel",
                                  },
                                  {
                                    text: "Delete",
                                    onPress: () => deleteAllRecords(item.id),
                                  },
                                ],
                                { cancelable: false }
                              );
                            }}
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              marginRight: 5,
                              opacity: 0.4,
                            }}
                          >
                            <Image
                              source={Delete}
                              style={{
                                height: 24,
                                width: 24,
                                marginHorizontal: 8,
                              }}
                            ></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: 10,
                          borderBottomColor: "#3C3C43",
                          opacity: 0.3,
                          borderBottomWidth: 1,
                        }}
                      />
                      <View style={[styles.IsiContent]}>
                        <AutoHeightImage
                          source={Profile_Set}
                          width={40}
                          style={{ marginLeft: 10, marginBottom: 5 }}
                        />
                        <View style={{ flex: 1 }}>
                          <View style={{ flex: 1 }}>
                            <Text style={[styles.IsiText]}>
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
                                })}{" "}
                              -{item.compartement_id}
                            </Text>
                            <Text
                              style={[styles.IsiText2, { fontWeight: 900 }]}
                            >
                              HM : {item.current_hour_meter}
                            </Text>
                            <Text style={[styles.IsiText3]}>
                              Create :{" "}
                              {dayjs(item.date)
                                .locale("id")
                                .format(" DD/MM/YYYY ")}
                            </Text>
                          </View>
                          {/* <Text
                        style={[
                          styles.IsiText,
                          { fontSize: 10, marginVertical: 2 },
                        ]}
                      >
                        {dayjs(item.created_at)
                          .locale("id")
                          .format("DD/MMM/YYYY ")}
                      </Text> */}
                        </View>
                        <View
                          style={{
                            width: 80,
                            marginRight: 20,
                            justifyContent: "center",
                          }}
                        >
                          {/* {dayjs(item.created_at)
                            .locale("id")
                            .format("DD/MMM/YYYY") <=
                          dayjs(today)
                            .subtract(2, "days")
                            .format("DD/MMM/YYYY") ? ( */}
                          <Button
                            buttonStyle={{ borderRadius: 20 }}
                            item={{
                              title: "Edit",
                              textcolor: "#007AFF",
                              backgroundcolor: "#D6E8FD",
                              alginSelf: "center",
                              // onPress: () =>
                              //   navigation.navigate("Edit", {
                              //     masterLog: item,
                              //   }),
                              onPress: () => setShowAlert(true),
                            }}
                        />
                          <CustomAlert
                            visible={showAlert}
                            message="Are you sure you want to submit the form?"
                            onCancel={handleCancel}
                            onConfirm={() => handleSubmit(item)}
                          />
                          {/* ) : null} */}
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
              <View style={[styles.Content1]}>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 18,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  30 Days History
                </Text>

                {query?.data?.data?.data.map((item, index) => {
                  return (
                    <View style={[styles.Isi]}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "#3C3C43",
                            marginVertical: 5,
                            marginLeft: 10,
                            opacity: 0.6,
                          }}
                        >
                          {dayjs(item.created_at)
                            .locale("id")
                            .format("dddd, DD MMMM YYYY")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: 10,
                          borderBottomColor: "#3C3C43",
                          opacity: 0.3,
                          borderBottomWidth: 1,
                        }}
                      />
                      <View style={[styles.IsiContent]}>
                        <AutoHeightImage
                          source={Profile_Set}
                          width={40}
                          style={{
                            marginLeft: 10,
                            marginBottom: 5,
                            marginRight: 5,
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.IsiText]}>
                            {item.master_company.name}
                          </Text>
                          <Text style={[styles.IsiText2, { fontWeight: 900 }]}>
                            Bas EA002
                          </Text>
                          <Text style={[styles.IsiText3]}>
                            Updated at{" "}
                            {dayjs(item.updated_at)
                              .locale("id")
                              .format(" DD MM YYYY")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>
      ) : (
        <Alert.alert title="No Internet Connection" />
      )}
    </SafeAreaView>
  );
};

export default Home;

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
  Profile_Circle: {
    alignContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  Kotak: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
  },

  Content: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  },
  Content2: {
    flex: 1,
    flexDirection: "column",
  },
  Content1: {
    marginTop: 20,
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  },

  Isi: {
    flexDirection: "column",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: "98%",
    fle1: 1,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 5,
  },
  IsiContent: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  IsiText: {
    fontSize: 12,
    fontWeight: "bold",
    // opacity: 0.4,
    fontFamily: "Poppins",
    fontWeight: "900",
  },
  IsiText2: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  IsiText3: {
    fontSize: 11,
    fontFamily: "Poppins",
  },
  loading: {
    flex: 1,
    // marginLeft: -20,

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
