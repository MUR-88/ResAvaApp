import React, { useEffect, useState } from "react";
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
import { useMasterSector } from "../../hooks/useMasterSector";

const Home = ({ navigation }) => {
  async function mySync() {
    try {
      await synchronize({
          database,
          pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
            const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
              JSON.stringify(migration)
            )}`;
            const response = await API.get(`master_estate/sync?${urlParams}`);
            // console.log(JSON.stringify(response, null, 2));
    
            // Check if the request was successful
            if (response.status_code !== 200) {
              throw new Error(`Request failed with status ${response.status}`);
            }
            const timestamp = dayjs().unix();
    
            console.log("data Estate", response.data.length);
            return { changes: response.data, timestamp: timestamp };

          },
      });
    } catch (error) {
      console.log("Catch Mysync", error);
    }
  }

  const timeStamp = async () => {
    const currentUnixTimestamp = dayjs().unix();
    console.log(currentUnixTimestamp);

    const formattedDate = dayjs
      .unix(currentUnixTimestamp)
      .format("YYYY-MM-DD HH:mm:ss");
    console.log(formattedDate);
  };

  const [masterCompany, setMasterCompany] = useState([]);
  const [masterSector, setMasterSector] = useState([]);

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

  const onDelete = async (sectorId) => {
    try {
      // Find the specific masterSector object by its ID
      // const sectorToDelete = masterSector.find(masterSector => masterSector.id === sectorId);

      // if (sectorToDelete) {
      // Delete the masterSector object permanently
      await database.write(async () => {
        await masterSector.destroyAllPermanently();
      });
      console.log("Sector deleted");
      // } else {
      console.log("Master Sector not found");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const runSector = async () => {
    try {
      // Membuat data baru
      const newSector = await database.write(async () => {
        const masterSector = await database
          .get(MasterSector.table)
          .create((sector) => {
            sector.name = "Bas";
            // sector.isSynced = true;
            // sector.isConnected = true;
          });

        return masterSector;
      });

      console.log("Company created:", newSector);

      // Mendapatkan semua data dari tabel
      const allSector = await database.get(MasterSector.table).query().fetch();

      console.log("All Sector:", allSector);

      setMasterSector(allSector.map((masterSector) => masterSector._raw));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // manggil data dari hook

  const onReadSector = async () => {
    try {
      const allCompany = await database.get(MasterSector.table).query().fetch();

      console.log("All Company:", allCompany);

      setMasterSector(allCompany.map((masterCompany) => masterCompany._raw));
    } catch (error) {
      console.log("error", error);
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

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const postsCollection = database.get("posts");
  //     const allPosts = await postsCollection.query().fetch();
  //     setPosts(allPosts);
  //   };

  //   fetchPosts();
  // }, []);

  //load data from database

  const queryClient = useQueryClient();
  // Queries
  const getHistory = () => {
    return API.get("history");
  };

  const query = useQuery({ queryKey: ["history"], queryFn: getHistory });
  // console.log(query?.data?.data?.data);

  // useEffect(() => {
  //   // Extract _raw data from allCompanies array
  //   const masterCompany = allCompanies.map((company) => company._raw);
  //   setRawData(masterCompany);
  // }, []);
  const dateNow = Date.now();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar style="light" />
      <RefreshControl style={{ flex: 1 }}>
        {isConnected ? (
          <ScrollView style={{ flex: 1 }}>
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
              {/* {query?.data?.data?.data?.map((item, index) => {
              return() })} */}
              <View
                style={{
                  width: 100,
                  marginLeft: 20,
                  justifyContent: "center",
                  backgroundColor: "black",
                }}
              >
                <Button
                  buttonStyle={{ borderRadius: 20 }}
                  item={{
                    title: "Check Connection",
                    textcolor: "black",
                    backgroundcolor: "white",
                    alginSelf: "center",
                    onPress: () => navigation.navigate("NewForm"),
                    // width:20
                  }}
                />
                <Button
                  buttonStyle={{ borderRadius: 20 }}
                  item={{
                    title: "Login",
                    textcolor: "black",
                    backgroundcolor: "white",
                    alginSelf: "center",
                    onPress: () => navigation.navigate("Login"),
                    // width:20
                  }}
                />
              </View>
              <TouchableOpacity onPress={mySync} style={{ marginVertical: 5 }}>
                <Text>Sync</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={runSector}
                style={{ marginVertical: 5 }}
              >
                <Text>Sector</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onReadSector}
                style={{ marginVertical: 5 }}
              >
                <Text>onRead</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={timeStamp}
                style={{ marginVertical: 5 }}
              >
                <Text>timeStamp</Text>
              </TouchableOpacity>
              {masterSector.map((sector, index) => (
                <View style={[styles.Isi]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    key={`master_sector_${index}`}
                  >
                    <Text
                      style={{
                        color: "#3C3C43",
                        marginVertical: 5,
                        marginLeft: 10,
                        opacity: 0.6,
                      }}
                    >
                      17 OCtober, 2023
                    </Text>
                    <TouchableOpacity
                      onPress={onDelete}
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
                        <Text>ID: {sector.id}</Text>
                        <Text>Name: {sector.name}</Text>
                        <Text>Sync: {sector.isSync}</Text>
                        <Text>
                          Create: {sector.last_pulled_at}
                          {/* {dayjs(sector.deleted_at)
                            .locale("id")
                            .format("DD/MMM/YYYY ")} */}
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
                        {dayjs(sector.created_at)
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
      </RefreshControl>
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
