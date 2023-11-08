import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AutoHeightImage from 'react-native-auto-height-image'
import { Basket, Lost_Signal } from '../../assets/icon'

const Report = () => {
  return (
    <View style={{
      flex:1,
      backgroundColor:'white',
      justifyContent: 'center',
      alignItems: "center",
      flexDirection:'column',
      alignContent:'center',
    }}>
      <AutoHeightImage source={Lost_Signal} width={250} style={{marginBottom: 12 }} />
      <Text style={styles.Text}>Under maintenance :(</Text>
      <Text style={styles.Text}>Please Be Patient!</Text>
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
  Text: {
    opacity:0.5,
    fontSize:22
  }
})