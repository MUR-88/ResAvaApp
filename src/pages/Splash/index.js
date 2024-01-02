import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { API } from "../../function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMasterCompany, useMasterSector, useMasterEstate, } from "../../hooks";

const Splash = ({ navigation }) => {
  // make use effect to get token from async storage
  // if token exist, navigate to home
  // else navigate to login

  //imoorting fetching
  const { fetching: fatchingCompany } = useMasterCompany();
  const { fetching: fatchingSector } = useMasterSector();
	const { fetching: fatchingEstate } = useMasterEstate();
	// const { fetching: fatchingMachineType } = useMasterMachineType();

  useEffect(() => {
    (async () => {
      await fatchingCompany();
      await fatchingSector();
			await fatchingEstate();
			// await fatchingMachineType();
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
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
