import { View, Text, StyleSheet, TextInput, StatusBar } from "react-native";
import React from "react";
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

  
  //hook
  const formik = useFormik({
    validationSchema: schema,
    initialValues: { SAP: "", password: "" },
    onSubmit: async (values) => {
      try {
        const response = await API.post("login", values);
        API.setToken(response.token.plainTextToken);
        if(response.status == 1){
          try{
            await AsyncStorage.setItem("token", response.token.plainTextToken);
          } catch (err){
            Toast.show({
              type:"error",
              type1: err.message
            })
          }
        }
        navigation.replace("Mytabs");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    },
  });

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
            Data Collection
          </Text>
          <View style={styles.containerInput}>
            <View style={{ flex: 1, height: 150 }}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Input
                  onChangeText={formik.handleChange("SAP")}
                  item={{
                    label: "SAP",
                    backgroundColor: "black",
                    width: 50,
                    // vales: values.SAP,
                    marginBottom: 10,
                    placeholder: "Isi SAP",
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
