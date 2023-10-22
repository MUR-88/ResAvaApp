import React from "react";
import {Text, View, SafeAreaView, StyleSheet, Dimensions} from "react-native";
import Constants  from "expo-constants";
import { Profile_Set } from "../../assets/icon";
import AutoHeightImage from 'react-native-auto-height-image';


const Home = () =>{
  return(
    // use if status bar overlaying
    // <SafeAreaView style={{flex:1, marginTop:Constants.statusBarHeight
    // }}>
    <SafeAreaView style={{flex:1,}}>

      <View style={{backgroundColor:'#007AFF', height:100,justifyContent:'flex_start',}} >
        <View style={[styles.Kotak]}>
          <Text style={[styles.Header1]}>Home</Text>
          <View style={[styles.Profile_Circle]}>
            <AutoHeightImage source={Profile_Set} width={35} style={{justifyContent:'center'}} />
          </View>
        </View>
      </View>
      <View style={[styles.Content]}>
          <Text style={{color:'#007AFF', fontSize:18, fontFamily:'Poppins-Medium'}}>Today's Update</Text>
          <View style={[styles.Isi]}>
            <Text>asdasd</Text>
          </View>
      </View>
    </SafeAreaView>
  )
}


export default Home;

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create ({
  Header: {
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    marginVertical:6,
    shadowColor: "#000",
    height:200,
    width:width-24,
    marginHorizontal:12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  Header1: {
    marginLeft:10,
    marginTop:15,
    // marginBottom:10,
    flex:1 ,
    alignItems:'center',
    flexDirection:'column',
    // marginVertical:40,
    fontSize:32,
    fontFamily: 'Poppins-Bold',
    fontWeight:'900',
    color:'white'
    // marginTop:20

  },
  Profile_Circle:{
    alignContent:'flex-end', 
    alignItems:'center', 
    marginRight:20, 
    marginTop:25, 
    backgroundColor:'white', 
    borderRadius:50, 
    width:40,
    height: 40,
  },
  Kotak: {
    flexDirection:'row', 
    justifyContent:'space-between',  
    marginVertical:25
  },
  Content: {
   flex:1,
   flexDirection:'column',
   marginLeft:15,
   marginVertical:10,
  //  backgroundColor:'black'
  },
  Isi: {
    marginHorizontal:10,
    // backgroundColor:'red',
  }
})
