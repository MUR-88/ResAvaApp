import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = ({ item, buttonStyle }) => {
  return (
    <TouchableOpacity onPress={item.onPress} style={[styles.Button, buttonStyle ,{ backgroundColor:item.backgroundcolor} ]} >
      <Text style={[styles.ButtonText, { color:item.textcolor}] }>{ item.title }</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles=StyleSheet.create({

    Button:{
        height:40,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',

    },

    ButtonText:{
        textAlign:'center',
        fontSize:16,
        fontFamily: 'Poppins'
        
    }
})
