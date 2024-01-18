import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";
import React, { useState } from "react";
import AutoHeightImage from "react-native-auto-height-image";
import { Button, Input } from "../../component";
import { globalStyles } from "../../styles";
import * as yup from "yup";
import { Fiber, Logo, Profile_Set, RAPP } from "../../assets/icon";
import { setLoadingGlobal, setToken, setUser } from "../../Redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosPost } from "../../function";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Formik, useFormik } from "formik";
import API from "../../function/API";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  let schema = yup.object().shape({
    SAP: yup.string().required("SAP harus diisi"),
    password: yup.string().required("Password harus diisi"),
  });

  const [isLoading, setIsLoading] = useState(true);

  //hook

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { SAP: "123456", password: "12345678" },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await API.post("login", values);
        await AsyncStorage.setItem("token", response.token.plainTextToken);
        API.setToken(response.token.plainTextToken);
        setIsLoading(false);
        navigation.replace("Mytabs");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
        console.log(error);
      }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            Data Collection
          </Text>
          <View style={styles.containerInput}>
            <View style={{ flex: 1, height: 120 }}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Input
                  onChangeText={formik.handleChange("SAP")}
                  item={{
                    label: "SAP",
                    backgroundColor: "black",
                    // width: 50,
                    // vales: values.SAP,
                    marginBottom: 10,
                    placeholder: "Isi SAP",
                  }}
                  buttonStyle={{
                    borderWidth: 0.5,
                    borderColor: "#DDDDDD",
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                />
                {formik.errors.SAP
                  ? () => {
                      <Text style={globalStyles.textError}>
                        {formik.errors.SAP}
                      </Text>;
                    }
                  : null}
                <Input
                  secureTextEntry={true}
                  onChangeText={formik.handleChange("password")}
                  item={{
                    label: "Password",
                    // value: values.password,
                    placeholder: "Password",
                  }}
                  buttonStyle={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: "#DDDDDD",
                    paddingHorizontal: 10,
                  }}
                />
                {formik.errors.password
                  ? () => {
                      <Text style={globalStyles.textError}>
                        {formik.errors.password}
                      </Text>;
                    }
                  : null}
                <View style={{ height: 24 }} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                item={{
                  title: "Login",
                  backgroundcolor: "#003871",
                  textcolor: "#FFFFFF",
                  borderRadius: 10,
                  onPress: () => formik.handleSubmit(),
                  // onPress: () => navigation.navigate('Mytabs')
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default Login;