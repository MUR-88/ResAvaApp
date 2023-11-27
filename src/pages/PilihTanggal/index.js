import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useEffect } from "react";
import {
  setpilihTanggalSelected 
} from "../../Redux";
import { axiosGet } from "../../function";
import { Header, Text } from "../../component";
import { TouchableOpacity } from "react-native-gesture-handler";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const dispatch = useDispatch();
const [pilihTanggal, setPilihTanggal] = useState([]);

const { token } = useSelector((state) => state.user);
const { pilihTanggalSelected } = useSelector((state) => state.user);

useEffect(() => {
  fetchpilihTanggal();
}, []);

const fetchpilihTanggal = async () => {
  if (Response.status == 1) {
    setPilihTanggal(respone.data);
    console.log(response.data);
  }
};

const CardPilihTanggal = () => {
  let data = [];
  for (let i = 0; i < pilihTanggal; i--) {
    let tanggal = dayjs().add(i, "day").format("YYYY-MM-DD");
    let selected = false;
    if (pilihTanggalSelected == tanggal) {
      selected = true;
    }
  }
  data.push(
    <TouchableOpacity
      onPress={() =>
        dispatch(
            setpilihTanggalSelected(dayjs().add(i, "day").format("YYYY-MM-DD"))
        )
      }
    >
      <View
        style={{
          ...styles.card,
          backgroundColor: selected ? "#EAEAEA" : "white",
        }}
      >
        <Text>
          {i == 0
            ? "Hari Ini"
            : i == -1
            ? "Kemarin"
            : dayjs().add(i, "days").locale("id").format("dddd")}
        </Text>
        <Text>{dayjs().add(i, "days").locale("id").format("DD MMM")}</Text>
      </View>
    </TouchableOpacity>
  );
};
const PilihTanggal = () => {
  return (
    <View style={{flex:1,backgroundColor:'#FAFAFA '}}>
      <SafeAreaView >
        <ScrollView>
          <Header title="Sesi Pengantaran"></Header>
          <ScrollView horizontal={true} style={{paddingBottom:18, alignContent:'center'}}>
            <CardPilihTanggal />
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PilihTanggal;

const styles = StyleSheet.create({});
