import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../component";
import AutoHeightImage from "react-native-auto-height-image";
import { Profile_Set, PanahKiri } from "../../assets/icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const Status = ({ navigation }) => {
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
                  <View style={{ flexDirection: "column", marginLeft: 12 }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontFamily: "PoppinsBold",
                        alignItems: "center",
                        fontSize: 12,
                        opacity: 0.7,
                      }}
                    >
                      PTSI
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        alignItems: "center",
                        fontSize: 12,
                        opacity: 0.5,
                      }}
                    >
                      26 November 2023 - Tesso West A 202
                    </Text>
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
                  marginRight: -200,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 15,
								opacity: 0.8
              }}
            >
              <Text>SL 503 </Text>
              <Text>16/10/2023 </Text>
              <View style={{alignContent:'center', justifyContent: 'center',backgroundColor:'red', width:20,borderRadius:40}}/>
            </View>
						<View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 15,
								marginVertical: 10,
								opacity: 0.8
              }}
            >
              <Text>SL 504 </Text>
              <Text>26/11/2023 </Text>
              <View style={{alignContent:'center', justifyContent: 'center',backgroundColor:'green', width:20,borderRadius:40}}/>
            </View>
						<View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 15,
								marginVertical: 10,
								opacity: 0.8
              }}
            >
              <Text>SL 502 </Text>
              <Text>26/11/2023 </Text>
              <View style={{alignContent:'center', justifyContent: 'center',backgroundColor:'green', width:20,borderRadius:40}}/>
            </View>
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
