import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Touchable,
} from "react-native";
import Constants from "expo-constants";
import { Delete, Profile_Set, delete_icon } from "../../assets/icon";
import AutoHeightImage from "react-native-auto-height-image";
import { Button, Input } from "../../component";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import API from "../../function/API";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import NetInfo from "@react-native-community/netinfo";
import { database } from "../../assets/Model/db";
import { Q } from "@nozbe/watermelondb";
import { writer } from "@nozbe/watermelondb/decorators";
import MasterCompany from "../../assets/Model/master_company";
import MasterSector from "../../assets/Model/master_sectors";
import { synchronize } from "@nozbe/watermelondb/sync";
import { getLastPulledAt } from "@nozbe/watermelondb/sync/impl";
import {
  useMasterSector,
  useMasterCompany,
  useMasterEstate,
  useMasterMachineType,
  useMasterMachine,
  useMasterMainActivity,
  useMasterLog,
} from "../../hooks";

const Home = ({ navigation }) => {
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
  // console.log(JSON.stringify(dataCompany, null, 2));
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
  console.log("data Log", dataMasterLog.length);

  const getCompanyName = (master_company_id) => {
    const company = dataCompany.find((company) => company.id === master_company_id);
    // console.log(JSON.stringify("company", company, null, 2))
    return company ? company.name : "Company not found";
  };
  
  const handleLogout = async () => {
    try {
      const response = await API.post("logout");
      // API.resetToken(response.token.plainTextToken);
      navigation.replace("Login"); // Assuming 'Login' is the login screen route name
      console.log(response);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  // const masterCompanies = database.collections.get("master_company");
  // const database = database(MasterCompany.table);
  // main.js

  const [masterLogActivity, setMasterLogActivity] = useState([]);

  const deleteAllRecords = async (id) => {
    try {
      // Menghapus data
      await database.write(async () => {
        const log = await database.get("master_log_activities").find(id);
        if (log) {
          // await log.destroyPermanently(); // Use destroyPermanently to immediately remove the record
          await log.markAsDeleted(); // syncAble
          navigation.replace("Home");

          console.log("Log deleted", database);
        } else {
          console.log("Log not found");
        }
      });
    } catch (error) {
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


  const queryClient = useQueryClient();
  // Queries
  const getHistory = () => {
    return API.get("history");
  };

  const query = useQuery({ queryKey: ["history"], queryFn: getHistory });
  

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      navigation.navigate("Mytabs");
      setRefreshing(false);
    }, 200);
  };

  // function deleteItem({id}){

  // }
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
          <View style={[styles.Content]}>
            <Text
              style={{
                color: "#007AFF",
                fontSize: 18,
                fontFamily: "Poppins-Medium",
              }}
            >
              Today's Update
            </Text>
            {dataMasterLog
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
                      {dayjs(item.date).locale("id").format("DD/MMM/YYYY ")}
                    </Text>
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
                      <View>
                        <Text>ID: {item.id}</Text>
                        <Text>{getCompanyName(item.master_company_id)}</Text>
                        <Text>Brand: {item.brand}</Text>
                        <Text>Sync: {item.isSync}</Text>
                        <Text>HM: {item.current_hour_meter}</Text>

                        <Text>
                          Create:{" "}
                          {dayjs(item.date).locale("id").format("DD/MMM/YYYY ")}
                        </Text>
                        {/* Add more fields as needed */}
                        <Text style={[styles.IsiText, { fontWeight: 900 }]}>
                          {/* {company.name} */}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.IsiText,
                          { fontSize: 10, marginVertical: 2 },
                        ]}
                      >
                        {dayjs(item.updated_at)
                          .locale("id")
                          .format("DD/MMM/YYYY ")}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 80,
                        marginRight: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        buttonStyle={{ borderRadius: 20 }}
                        item={{
                          title: "Edit",
                          textcolor: "#007AFF",
                          backgroundcolor: "#D6E8FD",
                          alginSelf: "center",
                          // width:20
                          onPress: () => navigation.navigate("Edit", {masterLog: item}),
                        }}
                      />
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
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("")}
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            // backgroundColor: "red",
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
                        {item.master_sector.name} {item.master_estate.name}-
                        {item.compartement_id}
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
    opacity: 0.4,
    fontFamily: "Poppins",
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
