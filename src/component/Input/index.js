import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Text from '../Text'


const Input = ({ onChangeText, editable=true, onFocus, keyboardType='default', item, secureTextEntry = false, numberOfLines=1, multiline=false }) => {
  return (
    <View style={styles.Login} >
        <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={item.placeholder}
            style={[styles.input, {height:100, textAlignVertical: 'top', paddingVertical:8, paddingHorizontal:12}]}
            keyboardType={keyboardType}
            value={item.value}
            onChangeText={onChangeText}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onFocus={onFocus}
            editable={editable}
        />
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({

    Login:{
        flex:1,
        // height:200
        },

    label:{
        flex:1,
        fontWeight:"700",
        justifyContent:'flex-start',    
        // marginLeft:10,
        fontFamily:'PoppinsSemiBold',
    },   
    input: {
        // height: 40
        flex:1,
        // width:'100%',
        fontSize:16,
        height:40,
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        marginBottom:5, 
        borderRadius:10,
        // textcolor:'black',
        // backgroundColor:'red',
        // paddingHorizontal:12,
        // marginVertical:5,
        // paddingVertical:8

                
    } 
})