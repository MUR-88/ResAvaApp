import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, Easing  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AutoHeightImage from 'react-native-auto-height-image';
import { StyleSheet } from 'react-native';
import { Home } from '../pages';
import { Berhasil, Gagal, Success } from '../component';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();


export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
          <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    color: 'white',
    marginBottom: 6
  },
  tabBarLabelOutter: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    position: 'absolute'
  },
  tabBarLabelInner: {
    backgroundColor: '#2D2F30',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 34,
    top: 0,
    left: 0,
    alignSelf: 'center'
  },
  containerTabLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    marginBottom: 36,
  }
})