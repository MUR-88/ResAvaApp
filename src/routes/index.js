import React, { useRef, useEffect, useState } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AutoHeightImage from "react-native-auto-height-image";
import { StyleSheet } from "react-native";
import {
  Home,
  AddNew,
  Register,
  Report,
  Login,
  PilihTanggal,
  Status,
  NewForm,
  Splash,
  Edit,
} from "../pages";
import {
  Add_Active,
  Add,
  delete_icon,
  History_Icon,
  History_Active,
  Profile_Set,
  Report_Icon,
  Report_Active,
  Home_Icon,
  Home_Active,
} from "../assets/icon";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function Mytabs({ navigation }) {
  const [activeTabs, setActiveTabs] = useState("Home");
  const scaleRef = useRef(new Animated.Value(0.4)).current;
  const scaleInnerRef = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    if (activeTabs) {
      scaleRef.setValue(0.4);
      scaleInnerRef.setValue(0.2);
      setTimeout(() => {
        Animated.timing(scaleRef, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start();
      }, 125);

      Animated.timing(scaleInnerRef, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }, [scaleRef, activeTabs]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      // scaleRef.setValue(0.4)
      Animated.timing(scaleRef, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
        // easing: Easing.ease
      }).start();

      alert("exec");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "grey",
          height: 60,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          position: "relative",
        },
        tabBarActiveTintColor: "#FF9974",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View style={styles.containerTabLabel}>
                  <Animated.View
                    style={[
                      styles.tabBarLabelOutter,
                      {
                        transform: [
                          {
                            scale: scaleRef,
                          },
                        ],
                      },
                    ]}
                  ></Animated.View>
                  <Animated.View
                    style={[
                      styles.tabBarLabelInner,
                      {
                        transform: [
                          {
                            scale: scaleInnerRef,
                          },
                        ],
                      },
                    ]}
                  >
                    <AutoHeightImage source={Home_Active} width={25} />
                  </Animated.View>
                </View>
              );
            } else {
              return <AutoHeightImage source={Home_Icon} width={25} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            setActiveTabs("Home");
          },
        }}
      />

      {/* Addnew */}
      <BottomTab.Screen
        name="AddNew"
        component={AddNew}
        options={{
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View style={styles.containerTabLabel}>
                  <Animated.View
                    style={[
                      styles.tabBarLabelOutter,
                      {
                        transform: [
                          {
                            scale: scaleRef,
                          },
                        ],
                      },
                    ]}
                  ></Animated.View>
                  <Animated.View
                    style={[
                      styles.tabBarLabelInner,
                      {
                        transform: [
                          {
                            scale: scaleInnerRef,
                          },
                        ],
                      },
                    ]}
                  >
                    <AutoHeightImage source={Add_Active} width={25} />
                  </Animated.View>
                </View>
              );
            } else {
              return <AutoHeightImage source={Add} width={25} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            setActiveTabs("AddNew");
          },
        }}
      />
      {/* Register */}
      <BottomTab.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View style={styles.containerTabLabel}>
                  <Animated.View
                    style={[
                      styles.tabBarLabelOutter,
                      {
                        transform: [
                          {
                            scale: scaleRef,
                          },
                        ],
                      },
                    ]}
                  ></Animated.View>
                  <Animated.View
                    style={[
                      styles.tabBarLabelInner,
                      {
                        transform: [
                          {
                            scale: scaleInnerRef,
                          },
                        ],
                      },
                    ]}
                  >
                    <AutoHeightImage source={History_Active} width={25} />
                  </Animated.View>
                </View>
              );
            } else {
              return <AutoHeightImage source={History_Icon} width={25} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            setActiveTabs("Register");
          },
        }}
      />
      {/* Report */}
      <BottomTab.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View style={styles.containerTabLabel}>
                  <Animated.View
                    style={[
                      styles.tabBarLabelOutter,
                      {
                        transform: [
                          {
                            scale: scaleRef,
                          },
                        ],
                      },
                    ]}
                  ></Animated.View>
                  <Animated.View
                    style={[
                      styles.tabBarLabelInner,
                      {
                        transform: [
                          {
                            scale: scaleInnerRef,
                          },
                        ],
                      },
                    ]}
                  >
                    <AutoHeightImage source={Report_Active} width={25} />
                  </Animated.View>
                </View>
              );
            } else {
              return <AutoHeightImage source={Report_Icon} width={25} />;
            }
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            setActiveTabs("Report");
          },
        }}
      />
      {/* Report */}
    </BottomTab.Navigator>
  );
}

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Mytabs" component={Mytabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="NewForm" component={NewForm} />

        {/* <Stack.Screen name="PilihTanggal" component={PilihTanggal} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    color: "white",
    marginBottom: 6,
  },
  tabBarLabelOutter: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    position: "absolute",
  },
  tabBarLabelInner: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    top: 0,
    left: 0,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerTabLabel: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    marginBottom: 36,
  },
});
