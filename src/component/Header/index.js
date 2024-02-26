import { StyleSheet, View } from 'react-native'
import React from 'react'
import AutoHeightImage from 'react-native-auto-height-image'
import {  PanahKiri } from "../../assets/icon";
import { useNavigation } from '@react-navigation/native'
import Text from '../Text'

const Header = ( {title, buttonStyle} ) => {
    const navigation = useNavigation()
    return (
    <View>
        <View style={[styles.header, buttonStyle]}>
            <AutoHeightImage source={PanahKiri} width={20} />
            <Text style={{ fontSize: 16, fontFamily:'PoppinsBold', marginLeft: 12 }}>{ title }</Text>
        </View>
        <View 
        style={{
            height:1, 
            width:'100%',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            
            elevation: 4,
             
            }}/>
    </View> 
  )
}

export default Header

const styles = StyleSheet.create({
    header: { 
        backgroundColor: 'white', 
        width: '100%', 
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginLeft:2
        
    }
})