import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Touchable,
  Alert,
} from "react-native";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Delete,
  NoSync,
  Profile_Set,
  Sync,
  delete_icon,
} from "../../assets/icon";
import AutoHeightImage from "react-native-auto-height-image";
import { Button, Input, PilihTanggal } from "../../component";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

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
} from "../../hooks";
import Toast from "react-native-toast-message";
import { getFormatedDate } from "react-native-modern-datepicker";
// Todo
// tombol sync = done
// tombol status di home = done
// simbol sync bulat hijau & dark grey = done
// isi value warna Hitam
// estate hilangin = done
// comparttement di pindah ke bawah sector = done
// Sync belum masuk = done
// Register data already recorded = done
// Delete date ada 3 = done delete 1
// Restrict to HM = done

// Push changes di lanjutkan 
// Fix get Data from other tables = priority to fix
// Fix sync update data
// Filament fix the data create
// fix lagg issue
// delete estate table db = on going

const Home = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const response = await API.post("logout");
      navigation.replace("Login"); // Assuming 'Login' is the login screen route name
      console.log(response);
    } catch (error) {
      console.error("Error logging out:", error);
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
          console.log("Log not found");
        }
      });
    } catch (error) {
      Toast.show({
        visibilityTime: 100,
        type: "error",
        text1: error.message,
      });
      console.error("Error:", error);
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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      navigation.navigate("Mytabs");
      setRefreshing(false);
    }, 200);
  };
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
    isLoading: isLoadingLog,
    connected: connectedMasterLog,
  } = useMasterLog({ isGetData: true });
  console.log(JSON.stringify(dataMasterLog, null, 2));
  console.log("data Log", dataMasterLog.length);

  const queryClient = useQueryClient();
  // Queries
  const getHistory = () => {
    return API.get("history");
  };

  const query = useQuery({ queryKey: ["history"], queryFn: getHistory });
  // console.log(query?.data?.data?.data);

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
          </View>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            {dataMasterLog
              .sort((a, b) => dayjs(b.created_at) - dayjs(a.created_at))
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
                          backgroundColor: item.isSync === true ? "#6BBC3B" : "#BCBCBC",
                          width: 15,
                          justifyContent: "center",
                          borderRadius: 50,
                          height: 15,
                          marginTop: 5,
                        }}
                      />
                      <TouchableOpacity
                        // onPress={onDelete}
                        onPress={() => deleteAllRecords(item.id)}
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
                            })
                            }
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
                        <Text style={[styles.IsiText2, { fontWeight: 900 }]}>
                          HM : {item.current_hour_meter}
                        </Text>
                        <Text style={[styles.IsiText3]}>
                          Create :{" "}
                          {dayjs(item.created_at)
                            .locale("id")
                            .format(" DD/MM/YYYY,  HH:mm [WIB]")}
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
                      {dayjs(item.created_at)
                        .locale("id")
                        .format("DD/MMM/YYYY ") >=
                      getFormatedDate(today.setDate(today.getDate() - 2)) ? (
                        <Button
                          buttonStyle={{ borderRadius: 20 }}
                          item={{
                            title: "Edit",
                            textcolor: "#007AFF",
                            backgroundcolor: "#D6E8FD",
                            alginSelf: "center",
                            onPress: () =>
                              navigation.navigate("Edit", {
                                masterLog: item,
                              }),
                          }}
                        />
                      ) : null}
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
                    <View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("")}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Text>?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("")}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          marginRight: 10,
                          opacity: 0.1,
                        }}
                      >
                        <Image
                          source={Delete}
                          style={{
                            height: 20,
                            width: 20,
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
        </ScrollView>
      ) : (
        <Alert.Alert title="No Internet Connection" />
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
});
