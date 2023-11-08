import { View, Text, StyleSheet, TextInput, StatusBar } from 'react-native' ;
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { Logo_Laksa } from '../../assets/images';
import { useFont } from 'expo-font';
import { Button, Input } from '../../component'
import { globalStyles } from '../../styles';
import { Profile_Set, RAPP } from '../../assets/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  // state = {
  //   email : string().required('email harus diisi'),
  //   password : string().required('password harus diisi')
  // }


  // state = {
  //   username  : "",
  //   password : "",
  //   token : "",
  // }
  // constructor = (props)  => {
  //   super (props);
  // };
  // onSubmit = () => {this.setState({toke : 'abc123'})}

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f2f2f2'}}>
      <StatusBar style="light"/>
        <ScrollView contentContainerStyle={{flexGrow:1, alignContent:'center'}}>
        <View style={styles.container}>
        <AutoHeightImage source={RAPP} width={160} />
        <Text style={{ marginBottom: 20 }}>Data Collection</Text>
          <View style={styles.containerInput}>
            <Input 
              item={{
                label: 'Email',
                backgroundColor:'black',
                // value : 'email',
                height:200,
                width:50,
                marginBottom:10,
                placeholder: 'Isi email'
              }} />
            {/* { errors.email_no_hp ? <Text style={globalStyles.textError}>{ errors.email_no_hp }</Text> : null } */}
            <Input 
              secureTextEntry={true}
              item={{
                label: 'Password',
                //   value: values.password,
                placeholder: 'Password'
              }} />
            {/* { errors.password ? <Text style={globalStyles.textError}>{ errors.password }</Text> : null } */}
            
            <View style={{ height: 24}} />   
          </View>
          <View style={{width:'90%'}}>
            <Button item={{
              title: 'Login',
              backgroundcolor:'#003871',
              textcolor:'#FFFFFF',
              borderRadius:10,
              onPress:() => navigation.navigate('Mytabs'),
            }} />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles=StyleSheet.create({
  
  containerInput:{
      width: '100%',
      paddingHorizontal: 24,
      marginVertical:20,
      // backgroundColor:'red',
      height:150
  },
  

  container:{
    flex:1, 
    // marginBottom:200,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'
  }


})

export default Login;
