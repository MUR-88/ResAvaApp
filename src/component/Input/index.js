import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Text from '../Text'


const Input = ({ onChangeText, editable=true, onFocus, keyboardType='default', item, secureTextEntry = false, numberOfLines=1, multiline=false }) => {
  return (
    <View style={styles.Login} >
        <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={item.placeholder}
            style={[styles.input, {height:50, textAlignVertical: 'top', paddingVertical:8, paddingHorizontal:6}]}
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
        justifyContent: 'flex-end',
    },   
    input: {
        flex:1,
        fontSize:16,
        height:30,
        // borderWidth: 0.5,
        borderColor: '#DDDDDD',
        marginBottom:5, 
        borderRadius:10,

                
    } 
})