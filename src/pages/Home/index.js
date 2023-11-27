import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
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

const Home = ({ navigation }) => {
  // { const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = database.get("MasterCompanies");
      const allPosts = await postsCollection.query().fetch();
      setPosts(allPosts);
    };
    fetchPosts();
  }, []);
  
      // {" "}
      // {posts.map((post) => (
      //   <Text key={post.id}>{post.title}</Text>
      // ))}{" "}

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = database.get("posts");
      const allPosts = await postsCollection.query().fetch();
      setPosts(allPosts);
    };

    fetchPosts();
  }, []);

  const queryClient = useQueryClient();
  // Queries
  const getHistory = () => {
    return API.get("history");
  };

  const query = useQuery({ queryKey: ["history"], queryFn: getHistory });
  console.log(query?.data?.data?.data);

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
                <View style={[styles.Profile_Circle]}>
                  <AutoHeightImage
                    source={Profile_Set}
                    width={35}
                    style={{ justifyContent: "center" }}
                  />
                </View>
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
              <View style={[styles.Isi]}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
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
                    17 OCtober, 2023
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("")}
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
                    <Text style={[styles.IsiText]}>PT.Rimba Sejahtera</Text>
                    <Text style={[styles.IsiText, { fontWeight: 900 }]}>
                      Tesso West A-023
                    </Text>
                    <Text
                      style={[
                        styles.IsiText,
                        { fontSize: 10, marginVertical: 2 },
                      ]}
                    >
                      Updated at 17/10/2023, 17:15 Wib
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
