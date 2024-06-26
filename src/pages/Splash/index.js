import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "../../function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useAllSync,
} from "../../hooks";
import AutoHeightImage from "react-native-auto-height-image";
import { Logo } from "../../assets/icon";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Splash = ({ navigation }) => {
  // make use effect to get token from async storage
  // if token exist, navigate to home
  // else navigate to login
  const [isLoading, setIsLoading] = useState(true);

  //imoorting fetching
  const { fetching: fatchingAllSync } = useAllSync({ isGetData: false });
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await fatchingAllSync();
        Toast.show({
          visibilityTime: 10000,
          type: "success",
          text1: "Yeay, Berhasil!",
          text2: "Data Berhasil Sync",
        });
        setIsLoading(false);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
        // console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        API.setToken(token);
        navigation.replace("Mytabs");
      } else {
        navigation.replace("Login");
      }
    };
    getToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignContent: "center" }}
      >
        <View style={styles.container}>
          <AutoHeightImage source={Logo} width={300} />
          {/* <AutoHeightImage source={Fiber}  width={200} style={{ height:100}}/> */}
          <Text
            style={{
              color: "grey",
              marginTop: -40,
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 30,
              marginBottom: 20,
            }}
          >
            Fiber Supply
          </Text>
          <Text style={{ marginBottom: 20, marginTop: -20 }}>
            Please Wait a while during Collecting Data.....
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  containerInput: {
    width: "100%",
    paddingHorizontal: 24,
    // height: 150,
    flexDirection: "column",
  },

  containerIpnt: {
    width: "100%",
    // marginVertical: 20,
    // backgroundColor:'red',
  },
  container: {
    flex: 1,
    // marginBottom:200,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'red'
  },
});
